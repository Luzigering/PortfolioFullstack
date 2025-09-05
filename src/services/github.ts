import { marked } from 'marked';

export interface GitHubProject {
  id: string;
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  link: string;
  tags: string[];
}

const decodeBase64 = (content: string): string => {
  try {
    if (typeof window !== 'undefined' && typeof atob === 'function') {
      const binaryString = atob(content);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return new TextDecoder('utf-8').decode(bytes);
    }
    return Buffer.from(content, 'base64').toString('utf-8');
  } catch (error) {
    console.error('Erro ao decodificar Base64:', error);
    return '';
  }
};

const getFirstParagraph = (markdown: string): string => {
  try {
    const tokens = marked.lexer(markdown);
    const firstParagraph = tokens.find(token => token.type === 'paragraph');
    
    if (firstParagraph && 'text' in firstParagraph) {
      let text = (firstParagraph as any).text;
      return text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
                 .replace(/\*\*([^*]+)\*\*/g, '$1')
                 .replace(/\*([^*]+)\*/g, '$1')
                 .replace(/`([^`]+)`/g, '$1')
                 .trim();
    }
    return '';
  } catch (error) {
    console.error('Erro ao extrair primeiro parágrafo:', error);
    return '';
  }
};

const getFirstMedia = (markdown: string): { url: string; type: 'image' | 'video' } | null => {
  try {
    const tokens = marked.lexer(markdown);
    
    for (const token of tokens) {
      if (token.type === 'paragraph' || token.type === 'html') {
        const raw = (token as any).raw || '';
        
        const imageRegex = /!\[.*?\]\((.*?)\)|<img[^>]+src=["']([^"']+)["']/gi;
        const videoRegex = /<video[^>]+src=["']([^"']+)["']/gi;
        const iframeRegex = /<iframe[^>]+src=["']([^"']+)["']/gi;

        const imageMatches = [...raw.matchAll(imageRegex)];
        for (const match of imageMatches) {
          const url = match[1] || match[2];
          if (url && (url.startsWith('http') || url.startsWith('https') || url.startsWith('/'))) {
            return { url, type: 'image' };
          }
        }

        const videoMatches = [...raw.matchAll(videoRegex)];
        for (const match of videoMatches) {
          if (match[1] && (match[1].startsWith('http') || match[1].startsWith('https') || match[1].startsWith('/'))) {
            return { url: match[1], type: 'video' };
          }
        }

        const iframeMatches = [...raw.matchAll(iframeRegex)];
        for (const match of iframeMatches) {
          if (match[1] && (match[1].includes('youtube') || match[1].includes('vimeo') || match[1].includes('youtu.be'))) {
            return { url: match[1], type: 'video' };
          }
        }
      }
    }
    
    return null;
  } catch (error) {
    console.error('Erro ao extrair mídia:', error);
    return null;
  }
};

const cleanDescription = (text: string): string => {
  let cleaned = text.trim();
  if (cleaned.length > 150) {
    cleaned = cleaned.substring(0, 150).trim();
    const lastSpace = cleaned.lastIndexOf(' ');
    if (lastSpace > 0) {
      cleaned = cleaned.substring(0, lastSpace);
    }
    cleaned += '...';
  }
  return cleaned;
};

const convertToAbsoluteUrl = (url: string, username: string, repoName: string, defaultBranch: string): string => {
  if (url.startsWith('http') || url.startsWith('https')) {
    return url;
  }
  
  const cleanUrl = url.startsWith('./') ? url.substring(2) : url;
  
  if (cleanUrl.startsWith('/')) {
    return `https://raw.githubusercontent.com/${username}/${repoName}/${defaultBranch}${cleanUrl}`;
  }
  
  return `https://raw.githubusercontent.com/${username}/${repoName}/${defaultBranch}/${cleanUrl}`;
};

export const fetchGitHubProjects = async (username: string, token?: string): Promise<GitHubProject[]> => {
  try {
    const headers: HeadersInit = token 
      ? { Authorization: `token ${token}` } 
      : {};

    const repoResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc`, { headers });
    
    if (!repoResponse.ok) {
      throw new Error(`Erro ao buscar repositórios: ${repoResponse.statusText}`);
    }
    
    const repos = await repoResponse.json();

    const projectsPromises = repos.map(async (repo: any) => {
      const repoNameLower = repo.name.toLowerCase();
      if (repo.fork || repo.archived || repoNameLower === 'portfoliofullstack') {
        return null;
      }

      let readmeContent = '';
      let languages: Record<string, number> = {};

      try {
        const [readmeResponse, languagesResponse] = await Promise.all([
          fetch(`https://api.github.com/repos/${username}/${repo.name}/readme`, { headers }),
          fetch(repo.languages_url, { headers })
        ]);
        
        if (readmeResponse.ok) {
          const readmeData = await readmeResponse.json();
          if (readmeData.content) {
            readmeContent = decodeBase64(readmeData.content);
          }
        }

        if (languagesResponse.ok) {
          languages = await languagesResponse.json();
        }
      } catch (error) {
        console.warn(`Erro ao processar repositório ${repo.name}:`, error);
        return null;
      }

      const media = getFirstMedia(readmeContent);
      
      if (!media) {
        console.log(`Repositório ${repo.name} descartado: sem mídia no README`);
        return null;
      }

      let finalMediaUrl = convertToAbsoluteUrl(
        media.url, 
        username, 
        repo.name, 
        repo.default_branch
      );

      const rawDescription = getFirstParagraph(readmeContent) || repo.description || 'Sem descrição.';
      const cleanedDescription = cleanDescription(rawDescription);
      
      const tags = repo.topics && repo.topics.length > 0
        ? repo.topics
        : Object.keys(languages);

      return {
        id: repo.id.toString(),
        title: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
        description: cleanedDescription,
        mediaUrl: finalMediaUrl,
        mediaType: media.type,
        link: repo.html_url,
        tags: tags.slice(0, 5),
      };
    });

    const projects = await Promise.all(projectsPromises);
    
    const validProjects = projects.filter((project): project is GitHubProject => 
      project !== null && 
      project.description !== 'Sem descrição.' &&
      project.mediaUrl !== ''
    );

    console.log(`Encontrados ${validProjects.length} projetos com mídia`);
    
    return validProjects;
  } catch (error) {
    console.error('Erro geral ao buscar projetos do GitHub:', error);
    return [];
  }
};
