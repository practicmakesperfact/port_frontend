import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const About = () => {
  const { isDark } = useTheme();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  const highlights = [
    { icon: 'fas fa-code', text: 'Clean, Maintainable Code' },
    { icon: 'fas fa-mobile-alt', text: 'Responsive Design' },
    { icon: 'fas fa-rocket', text: 'Performance Optimized' },
    { icon: 'fas fa-users', text: 'Team Collaboration' }
  ];

  useEffect(() => {
    // Fetch profile data from API
    fetch('/api/profile/data/')
      .then(response => response.json())
      .then(data => {
        // Convert relative image URL to absolute if needed
        if (data.profile_image && !data.profile_image.startsWith('http')) {
          data.profile_image = `http://localhost:8000${data.profile_image}`;
        }
        
        setProfileData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching profile data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section id="about" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <h2 className="section-title">About Me</h2>
          <div className="text-center">Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-24 relative">
      <div className={`absolute inset-0 ${
        isDark 
          ? 'bg-gradient-to-br from-accent-blue/5 to-transparent' 
          : 'bg-gradient-to-br from-accent-blue/2 to-transparent'
      }`}></div>
      
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <h2 className="section-title">About Me</h2>
        
        <div className="w-full max-w-none">
          <div className="glass-card p-6 md:p-12 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
              {/* Profile Image - Left Side */}
              <div className="lg:col-span-1 flex justify-center lg:justify-start">
                <div className="glass-card p-6 w-full max-w-sm">
                  {profileData?.profile_image ? (
                    <div className="relative">
                      <img 
                        src={profileData.profile_image} 
                        alt={profileData.name}
                        className="w-full h-80 rounded-xl object-cover shadow-2xl"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
                    </div>
                  ) : (
                    <div className="w-full h-80 rounded-xl bg-gradient-to-br from-accent-blue to-accent-blue-light flex items-center justify-center shadow-2xl">
                      <div className="text-center">
                        <i className="fas fa-user text-white text-6xl mb-4"></i>
                        <span className="text-white text-2xl font-bold">
                          {profileData?.name?.split(' ').map(n => n[0]).join('') || 'HA'}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {/* Profile Info */}
                  <div className="mt-6 text-center">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-slate-200 mb-2">
                      {profileData?.name || 'Haymanot Asmare'}
                    </h3>
                    <p className="text-accent-blue font-medium mb-4">
                      {profileData?.title || 'Full Stack Software Engineer'}
                    </p>
                    
                    {/* Social Links */}
                    <div className="flex justify-center gap-3">
                      {profileData?.github_url && (
                        <a href={profileData.github_url} target="_blank" rel="noopener noreferrer" 
                           className="p-2 rounded-lg bg-accent-blue/10 hover:bg-accent-blue/20 transition-all duration-300">
                          <i className="fab fa-github text-accent-blue"></i>
                        </a>
                      )}
                      {profileData?.linkedin_url && (
                        <a href={profileData.linkedin_url} target="_blank" rel="noopener noreferrer" 
                           className="p-2 rounded-lg bg-accent-blue/10 hover:bg-accent-blue/20 transition-all duration-300">
                          <i className="fab fa-linkedin text-accent-blue"></i>
                        </a>
                      )}
                      {profileData?.upwork_url && (
                        <a href={profileData.upwork_url} target="_blank" rel="noopener noreferrer" 
                           className="p-2 rounded-lg bg-accent-blue/10 hover:bg-accent-blue/20 transition-all duration-300">
                          <i className="fab fa-upwork text-accent-blue"></i>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Content - Right Side */}
              <div className="lg:col-span-2">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-200 mb-4">
                    About Me
                  </h2>
                  <p className="text-gray-700 dark:text-slate-300 text-lg leading-relaxed mb-6">
                    {profileData?.bio || "I'm a passionate Full Stack Software Engineer with extensive experience in building scalable web applications and creating exceptional digital experiences. My expertise spans across modern frontend frameworks, robust backend systems, and intuitive UI/UX design."}
                  </p>
                  <p className="text-gray-700 dark:text-slate-300 text-lg leading-relaxed mb-8">
                    {profileData?.detailed_bio || "I specialize in transforming complex business requirements into elegant, efficient solutions that drive measurable results. With a strong foundation in both engineering and design principles, I bridge the gap between technical implementation and user experience."}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 bg-accent-blue/10 rounded-xl border border-accent-blue/20 hover:bg-accent-blue/15 transition-all duration-300 hover:transform hover:-translate-y-1"
                    >
                      <i className={`${highlight.icon} text-accent-blue text-xl`}></i>
                      <span className="text-gray-900 dark:text-slate-200">{highlight.text}</span>
                    </div>
                  ))}
                </div>
                
                {/* Statistics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="glass-card p-6 text-center hover:transform hover:-translate-y-2 transition-all duration-300">
                    <h3 className="text-3xl font-bold text-accent-blue mb-2">
                      {profileData?.years_experience || 5}+
                    </h3>
                    <p className="text-gray-600 dark:text-slate-400 text-sm">Years Experience</p>
                  </div>
                  
                  <div className="glass-card p-6 text-center hover:transform hover:-translate-y-2 transition-all duration-300">
                    <h3 className="text-3xl font-bold text-accent-blue mb-2">
                      {profileData?.projects_delivered || 50}+
                    </h3>
                    <p className="text-gray-600 dark:text-slate-400 text-sm">Projects Delivered</p>
                  </div>
                  
                  <div className="glass-card p-6 text-center hover:transform hover:-translate-y-2 transition-all duration-300">
                    <h3 className="text-3xl font-bold text-accent-blue mb-2">
                      {profileData?.happy_clients || 30}+
                    </h3>
                    <p className="text-gray-600 dark:text-slate-400 text-sm">Happy Clients</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
