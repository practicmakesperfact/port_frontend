import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Footer = () => {
  const { isDark } = useTheme();
  const [profileData, setProfileData] = useState(null);

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

  return (
    <footer className={`${
      isDark 
        ? 'bg-dark-navy/90 border-accent-blue/10' 
        : 'bg-white border-gray-200'
    } border-t py-12 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className={`${
            isDark ? 'text-slate-500' : 'text-gray-600'
          } mb-2`}>
            &copy; 2024 {profileData?.name || 'Haymanot Asmare'}. All rights reserved.
          </p>
          <p className={`${
            isDark ? 'text-slate-600' : 'text-gray-500'
          } text-sm`}>
            Built with <i className="fas fa-heart text-accent-blue"></i> using React Vite, Django & Modern Web Technologies
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
