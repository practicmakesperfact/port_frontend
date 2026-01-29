import React, { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const BinaryRain = () => {
  const canvasRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = new Array(columns).fill(1);
    
    const animate = () => {
      // Clear canvas with theme-aware background
      ctx.fillStyle = isDark ? 'rgba(2, 6, 23, 0.05)' : 'rgba(249, 250, 251, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Set text color based on theme
      ctx.fillStyle = isDark ? '#0EA5E9' : '#0284c7';
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        const text = Math.random() > 0.5 ? '1' : '0';
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.995) {
          drops[i] = 0;
        }
        drops[i] += 0.75; // 75% of original speed
      }
      
      setTimeout(() => {
        requestAnimationFrame(animate);
      }, 100); // More delay to slow down animation
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [isDark]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
      />
      <div className={`absolute inset-0 z-10 ${
        isDark 
          ? 'bg-gradient-to-b from-transparent to-dark-navy' 
          : 'bg-gradient-to-b from-transparent to-gray-50'
      }`} />
    </div>
  );
};

export default BinaryRain;
