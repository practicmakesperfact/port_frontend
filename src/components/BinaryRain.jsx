import React, { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const BinaryRain = () => {
  const canvasRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const fontSize = 14;
    const drops = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Recalculate drops when canvas resizes
      const newColumns = Math.floor(canvas.width / fontSize);
      drops.length = newColumns;
      drops.fill(1);
    };
    
    resize();
    window.addEventListener('resize', resize);
    
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
    </div>
  );
};

export default BinaryRain;
