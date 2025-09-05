import React from 'react';
import StarryBackground from './components/StarryBackground';
import ProfileCard from './components/ProfileCard';
import './index.css';
import { projects } from './data/project';
import ProjectCard from './components/ProjectCard';

function App() {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? projects.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === projects.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative min-h-screen text-gray-300 font-sans overflow-x-hidden">
      <StarryBackground />
      
      <div className="flex flex-col lg:flex-row min-h-screen"> {/* Flex column em mobile, row em desktop */}
        
        {/* ProfileCard para mobile e parte da coluna em desktop */}
        <div className="w-full lg:w-[30vw] flex flex-col items-center justify-center lg:min-h-screen bg-[#0d1117]">
          <ProfileCard
            name="Luziane Gering"
            imageUrl="https://avatars.githubusercontent.com/u/93748581?v=4"
          />
        </div>

        {/* Carrossel de Projetos - visível em todas as telas, mas com layout diferente */}
        <main className="w-full lg:w-[70vw] p-4 md:p-8 flex items-center justify-center min-h-screen">
          <div className="w-full max-w-4xl mx-auto relative group">
            <h2 className="text-4xl font-bold text-center mb-8 text-white">Meus Projetos</h2>
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
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;