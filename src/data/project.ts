export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Projeto 1: E-commerce Moderno',
    description: 'Um e-commerce completo com carrinho de compras, autenticação e integração com Stripe.',
    image: 'https://via.placeholder.com/300x200?text=Projeto+1',
    link: 'https://github.com/yourusername/project1',
    tags: ['React', 'Node.js', 'Stripe'],
  },
  {
    id: '2',
    title: 'Projeto 2: App de Notas Colaborativo',
    description: 'Aplicação web para criar e compartilhar notas em tempo real, utilizando WebSockets.',
    image: 'https://via.placeholder.com/300x200?text=Projeto+2',
    link: 'https://github.com/yourusername/project2',
    tags: ['Vue.js', 'WebSockets', 'Express'],
  },
  {
    id: '3',
    title: 'Projeto 3: Dashboard Analítico',
    description: 'Dashboard interativo para visualização de dados, com gráficos e filtros avançados.',
    image: 'https://via.placeholder.com/300x200?text=Projeto+3',
    link: 'https://github.com/yourusername/project3',
    tags: ['D3.js', 'React', 'Tailwind'],
  },
  {
    id: '4',
    title: 'Projeto 4: Jogo da Velha (React)',
    description: 'Uma implementação clássica do jogo da velha, desenvolvida com React hooks.',
    image: 'https://via.placeholder.com/300x200?text=Projeto+4',
    link: 'https://github.com/yourusername/project4',
    tags: ['React', 'TypeScript', 'Vite'],
  },
];
