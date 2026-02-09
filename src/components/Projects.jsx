import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import portfolioData from '../data/portfolio.json';

const Projects = () => {
  const projectCardsRef = useRef([]);
  const { isDark } = useTheme();
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  // Get project background image - use local images
  const getProjectBackground = (project) => {
    if (project.image) {
      return project.image;
    }
    return null;
  };

  // Get project overlay based on title
  const getProjectOverlay = (projectTitle) => {
    if (projectTitle.toLowerCase().includes('cfitp') || projectTitle.toLowerCase().includes('feedback') || projectTitle.toLowerCase().includes('issue tracking')) {
      return 'from-white-900/80 to-white-600/60';
    } else if (projectTitle.toLowerCase().includes('yoni') || projectTitle.toLowerCase().includes('electronics') || projectTitle.toLowerCase().includes('shopping')) {
      return 'from-white-900/80 to-white-600/60';
    } else if (projectTitle.toLowerCase().includes('biib') || projectTitle.toLowerCase().includes('designs') || projectTitle.toLowerCase().includes('architectural')) {
      return 'from-white-900/80 to-white-600/60';
    }
    return 'from-white-900/80 to-white-600/60';
  };

  useEffect(() => {
    // Load projects data from local JSON
    setProjectsData(portfolioData.projects);
    setLoading(false);
    setLastUpdate(Date.now());
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    projectCardsRef.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [projectsData]);

  if (loading) {
    return (
      <section id="projects" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <h2 className="section-title">Featured Projects</h2>
          <div className="text-center">Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-24 relative">
      <div className={`absolute inset-0 ${
        isDark 
          ? 'bg-gradient-to-br from-accent-blue/5 to-transparent' 
          : 'bg-gradient-to-br from-accent-blue/2 to-transparent'
      }`}></div>
      
      <div className="w-full px-5 sm:px-6 lg:px-8 relative z-10">
        <h2 className="section-title">Featured Projects</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {projectsData.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (projectCardsRef.current[index] = el)}
              className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:transform hover:-translate-y-3 hover:shadow-2xl hover:shadow-accent-blue/30 w-full"
              style={{ opacity: '0', transform: 'translateY(30px)' }}
            >
              {/* Project Image Container */}
              <div className="h-80 relative overflow-hidden border-b border-gray-200 dark:border-accent-blue/10">
                {getProjectBackground(project) ? (
                  <img 
                    src={getProjectBackground(project)}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className={`absolute inset-0 ${
                    isDark 
                      ? 'bg-gradient-to-br from-accent-blue/20 to-accent-blue/10' 
                      : 'bg-gradient-to-br from-accent-blue/10 to-accent-blue/5'
                  }`}></div>
                )}
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${getProjectOverlay(project.title)}`}></div>
                
                {/* Icon Overlay - Show only if no image */}
                {!getProjectBackground(project) && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <i className={`${project.icon} text-white text-6xl opacity-80`}></i>
                  </div>
                )}
              </div>
              
              {/* Project Title Overlay */}
              <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/60 to-transparent">
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
              </div>
              
              {/* Hover Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-gray-200 text-sm mb-4 line-clamp-3">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies?.slice(0, 3).map((tech, techIndex) => (
                    <span key={techIndex} className="bg-accent-blue/20 text-accent-blue px-2 py-1 rounded-full text-xs font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <a
                    href={project.github_url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 text-white hover:text-accent-blue transition-colors duration-300 rounded-lg border border-white/20 hover:bg-white/10"
                    title="GitHub"
                  >
                    <i className="fab fa-github"></i>
                  </a>
                  <a
                    href={project.live_url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 text-white hover:text-accent-blue transition-colors duration-300 rounded-lg border border-white/20 hover:bg-white/10"
                    title="Live Demo"
                  >
                    <i className="fas fa-external-link-alt"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
