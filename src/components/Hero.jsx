import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Hero = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const { isDark } = useTheme();
  const [profileData, setProfileData] = useState(null);

  const roles = [
    'Full Stack Developer',
    'Problem Solver',
    'React Developer',
    'Django Expert'
  ];

  useEffect(() => {
    // Fetch profile data from API
    fetch('/api/profile/data/')
      .then(response => response.json())
      .then(data => {
        setProfileData(data);
      })
      .catch(error => {
        console.error('Error fetching profile data:', error);
      });
  }, []);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    
    const handleTyping = () => {
      if (!isDeleting) {
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    };

    const timeout = setTimeout(handleTyping, isDeleting ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRoleIndex, roles]);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative">
      <div className={`absolute inset-0 ${
        isDark 
          ? 'bg-gradient-to-br from-accent-blue/10 to-transparent' 
          : 'bg-gradient-to-br from-accent-blue/5 to-transparent'
      }`}></div>
      
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="block text-lg md:text-xl font-normal text-gray-600 dark:text-slate-400 mb-2">Hello, I'm</span>
              <span className={`block bg-gradient-to-r ${
                isDark 
                  ? 'from-accent-blue to-accent-blue-light' 
                  : 'from-accent-blue-dark to-accent-blue'
              } bg-clip-text text-transparent`}>
                {profileData?.name || 'Haymanot Asmare'}
              </span>
            </h1>
            
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 text-gray-900 dark:text-slate-200">
              <span>{displayText}</span>
              <span className="text-accent-blue animate-pulse">|</span>
            </h2>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Building scalable web applications with modern technologies. 
              Specialized in React, Django, and creating exceptional user experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a href="#projects" className="btn-primary justify-center">
                <i className="fas fa-briefcase"></i>
                View Projects
              </a>
              <a href="#contact" className="btn-secondary justify-center">
                <i className="fas fa-envelope"></i>
                Get In Touch
              </a>
            </div>
            
            <div className="flex justify-center gap-4">
              <a href={profileData?.github_url || "https://github.com"} target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-github"></i>
              </a>
              <a href={profileData?.linkedin_url || "https://linkedin.com"} target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href={profileData?.upwork_url || "https://upwork.com"} target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-upwork"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
