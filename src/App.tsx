import React, { useEffect, useState } from 'react';
import StarryBackground from './components/StarryBackground';
import ProfileCard from './components/ProfileCard';
import './index.css';
import ProjectCard from './components/ProjectCard';
import { fetchGitHubProjects, type GitHubProject } from './services/github';

function App() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [projects, setProjects] = useState<GitHubProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const githubToken = import.meta.env.VITE_GITHUB_TOKEN;
        if (!githubToken) {
            console.warn("Atenção: O token da API do GitHub não foi configurado. Você pode atingir o limite de taxa rapidamente.");
        }
        const fetchedProjects = await fetchGitHubProjects('Luzigering', githubToken);
        setProjects(fetchedProjects);
      } catch (error) {
        console.error("Falha ao buscar os projetos do GitHub:", error);
      } finally {
        setLoading(false);
      }
    };
    getProjects();
  }, []);

  const prevSlide = () => {
    if (projects.length === 0) return;
    setCurrentIndex(currentIndex === 0 ? projects.length - 1 : currentIndex - 1);
  };

  const nextSlide = () => {
    if (projects.length === 0) return;
    setCurrentIndex(currentIndex === projects.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div className="relative min-h-screen text-gray-300 font-sans overflow-x-hidden">
      <StarryBackground />
      <div className="flex flex-col lg:flex-row min-h-screen">
        <div className="w-full lg:w-[30vw] flex flex-col items-center justify-center lg:min-h-screen bg-[#0d1117] p-4">
          <ProfileCard
            name="Luziane Gering"
            imageUrl="https://avatars.githubusercontent.com/u/93748581?v=4"
          />
        </div>
        <main className="w-full lg:w-[70vw] p-4 md:p-8 flex items-center justify-center min-h-screen">
          <div className="w-full max-w-4xl mx-auto relative group">
            <h2 className="text-4xl font-bold text-center mb-8 text-white">Meus Projetos</h2>
            {loading ? (
              <div className="text-center text-white text-lg">Buscando projetos no GitHub...</div>
            ) : projects.length > 0 ? (
              <>
                <div className="overflow-hidden relative rounded-lg shadow-2xl">
                  <div 
                    className="flex transition-transform ease-out duration-500"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                  >
                    {projects.map((project) => (
                      <div className="min-w-full p-1" key={project.id}>
                         <ProjectCard project={project} />
                      </div>
                    ))}
                  </div>
                </div>
                <button onClick={prevSlide} className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12 z-20 p-2 bg-slate-800/50 rounded-full hover:bg-slate-700/80 transition-all opacity-0 group-hover:opacity-100 text-white">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button onClick={nextSlide} className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12 z-20 p-2 bg-slate-800/50 rounded-full hover:bg-slate-700/80 transition-all opacity-0 group-hover:opacity-100 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </button>
                <div className="flex items-center justify-center gap-2 pt-4">
                  {projects.map((_, index) => (
                    <div 
                      key={index} 
                      onClick={() => setCurrentIndex(index)}
                      className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${currentIndex === index ? 'bg-purple-400 scale-125' : 'bg-slate-600'}`}
                    ></div>
                  ))}
                </div>
              </>
            ) : (
                <div className="text-center text-white text-lg">Nenhum projeto encontrado no GitHub.</div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;