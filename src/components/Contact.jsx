import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Contact = () => {
  const { isDark } = useTheme();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      showNotification('Please fill in all fields', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append('access_key', '61fcebab-1e60-4b17-b097-6abc5e229ad9');
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append(
        'message',
        `Subject: ${formData.subject}\n\n${formData.message}`
      );
      data.append('botcheck', '');

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data
      });

      const result = await response.json();

      if (result.success) {
        showNotification('Message sent successfully!', 'success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        showNotification(result.message || 'Submission failed', 'error');
      }
    } catch (error) {
      showNotification('Network error. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-accent-blue to-purple-600 bg-clip-text text-transparent">
          Get In Touch
        </h2>

        <form onSubmit={handleSubmit} className="glass-card p-8 max-w-2xl mx-auto transform hover:scale-105 transition-all duration-300">
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-slate-300' : 'text-gray-700'
                }`}>
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className={`w-full px-4 py-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-blue/30 focus:border-accent-blue/50 ${
                    isDark 
                      ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-slate-300' : 'text-gray-700'
                }`}>
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className={`w-full px-4 py-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-blue/30 focus:border-accent-blue/50 ${
                    isDark 
                      ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-slate-300' : 'text-gray-700'
              }`}>
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Project Inquiry"
                required
                className={`w-full px-4 py-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-blue/30 focus:border-accent-blue/50 ${
                  isDark 
                    ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-slate-300' : 'text-gray-700'
              }`}>
                Message
              </label>
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                required
                className={`w-full px-4 py-3 rounded-lg resize-vertical transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-blue/30 focus:border-accent-blue/50 ${
                  isDark 
                    ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              ></textarea>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-accent-blue/25 ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-accent-blue via-purple-600 to-pink-600 hover:from-accent-blue/90 hover:via-purple-600/90 hover:to-pink-600/90 text-white'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-3">
                  <i className="fas fa-spinner fa-spin"></i>
                  <span>Sending...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center gap-3">
                  <i className="fas fa-paper-plane"></i>
                  <span>Send Message</span>
                </span>
              )}
            </button>
          </div>
        </form>
      </div>

      {notification && (
        <div
          className={`fixed top-6 right-6 px-8 py-4 rounded-2xl shadow-2xl z-[60] transform transition-all duration-500 backdrop-blur-sm ${
            notification.type === 'success'
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-green-500/25'
              : 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-red-500/25'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              notification.type === 'success' ? 'bg-green-500/20' : 'bg-red-500/20'
            }`}>
              <i className={`fas ${
                notification.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'
              } text-white`}></i>
            </div>
            <div>
              <p className="font-semibold text-white mb-1">
                {notification.type === 'success' ? 'Success!' : 'Error'}
              </p>
              <p className="text-white/90 text-sm">
                {notification.message}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
