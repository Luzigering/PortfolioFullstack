import React from 'react';
import type { Project } from '../data/project';
import AnimatedText from './AnimatedText';
interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project,  }) => {
  return (
       <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-slate-900/50 rounded-2xl shadow-lg border border-slate-800 backdrop-blur-sm transition-all duration-300 ease-in-out hover:border-purple-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20 p-6 h-full"
    >
      <div className="flex flex-col h-full">
        <div className="w-full aspect-video mb-5 overflow-hidden rounded-lg">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover rounded-lg border border-slate-700 transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-start flex-grow">
          <h3 className="text-2xl font-bold text-slate-100 mb-2">{project.title}</h3>
          <AnimatedText text={project.description}  className="text-slate-400 mb-4 text-base" />
        </div>
        <div className="mt-auto flex items-center justify-between">
            <div className="flex gap-2">
                {project.tags.map(tag => (
                    <span key={tag} className="bg-purple-900/50 text-purple-300 text-xs font-medium px-2.5 py-1 rounded-full">{tag}</span>
                ))}
            </div>
            <span className="text-purple-400 font-semibold flex items-center gap-2 text-sm transition-all duration-300 group-hover:gap-3">
              Ver mais
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </span>
        </div>
      </div>
    </a>
  );}
export default ProjectCard;