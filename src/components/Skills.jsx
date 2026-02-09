import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import portfolioData from '../data/portfolio.json';

const Skills = () => {
  const skillsRef = useRef([]);
  const { isDark } = useTheme();
  const [skillsData, setSkillsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load skills data from local JSON
    setSkillsData(portfolioData.skills);
    setLoading(false);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    skillsRef.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [skillsData]);

  if (loading) {
    return (
      <section id="skills" className="py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <h2 className="section-title">Skills & Expertise</h2>
          <div className="text-center">Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-24">
      <div className="w-full px-5 sm:px-6 lg:px-8">
        <h2 className="section-title">Skills & Expertise</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          {skillsData.map((category, index) => (
            <div
              key={`category-${index}`}
              ref={(el) => (skillsRef.current[index] = el)}
              className="glass-card p-6 hover:transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:shadow-accent-blue/20 w-full"
              style={{ opacity: '0', transform: 'translateY(30px)' }}
            >
              <div className="flex items-center gap-3 mb-6">
                <i className={`${category.icon || 'fas fa-code'} text-accent-blue text-xl`}></i>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-slate-200">{category.name}</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {category.skills?.map((skill, skillIndex) => (
                  <div
                    key={`skill-${index}-${skillIndex}`}
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-accent-blue/5 border border-accent-blue/10 hover:bg-accent-blue/10 hover:shadow-lg hover:shadow-accent-blue/20 transition-all duration-300 group"
                  >
                    <i className={`${skill.icon || 'fas fa-code'} text-accent-blue text-2xl mb-2 group-hover:scale-110 transition-transform duration-300`}></i>
                    <span className="text-gray-900 dark:text-slate-200 text-sm font-medium text-center">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
