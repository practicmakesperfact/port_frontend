import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import portfolioData from '../data/portfolio.json';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      showNotification('Please fill in all fields', 'error');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create email content
      const emailContent = {
        to: portfolioData.profile.email,
        subject: `Portfolio Contact: ${formData.subject}`,
        body: `
Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}
        `.trim()
      };
      
      // Use Web3Forms API (free, no backend needed)
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: 'YOUR_FREE_KEY', // You'll need to get this from web3forms.com
          subject: emailContent.subject,
          from_name: formData.name,
          from_email: formData.email,
          message: emailContent.body
        })
      });
      
      if (response.ok) {
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      // Fallback to mailto
      const subject = encodeURIComponent(formData.subject);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
      const mailtoLink = `mailto:${portfolioData.profile.email}?subject=${subject}&body=${body}`;
      
      window.open(mailtoLink, '_blank');
      showNotification('Email client opened! Please click "Send" to deliver your message to maniga.1love@gmail.com', 'success');
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const contactMethods = [
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      info: 'maniga.1love@gmail.com'
    },
    {
      icon: 'fas fa-phone',
      title: 'Phone',
      info: '+251 906 287 552'
    },
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Location',
      info: 'Addis Ababa, Ethiopia'
    }
  ];

  const socialLinks = [
    { icon: 'fab fa-github', url: 'https://github.com' },
    { icon: 'fab fa-linkedin', url: 'https://linkedin.com' },
    { icon: 'fab fa-upwork', url: 'https://upwork.com' }
  ];

  return (
    <section id="contact" className="py-24 relative">
      <div className={`absolute inset-0 ${
        isDark 
          ? 'bg-gradient-to-br from-accent-blue/5 to-transparent' 
          : 'bg-gradient-to-br from-accent-blue/2 to-transparent'
      }`}></div>
      
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <h2 className="section-title">Get In Touch</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-slate-200 mb-4">Let's Work Together</h3>
            <p className="text-gray-700 dark:text-slate-300 text-lg mb-8 leading-relaxed">
              I'm always interested in hearing about new projects and opportunities. 
              Whether you're looking for a full-time engineer, freelance collaboration, 
              or just want to discuss ideas, feel free to reach out!
            </p>
            
            <div className="space-y-4 mb-8">
              {contactMethods.map((method, index) => (
                <div
                  key={index}
                  className="glass-card p-4 flex items-center gap-4 hover:bg-accent-blue/10 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-accent-blue/10 rounded-xl flex items-center justify-center">
                    <i className={`${method.icon} text-accent-blue text-xl`}></i>
                  </div>
                  <div>
                    <h4 className="text-gray-900 dark:text-slate-200 font-semibold">{method.title}</h4>
                    <p className="text-gray-600 dark:text-slate-400">{method.info}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="glass-card p-8">
              <div className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className={`w-full px-4 py-3 rounded-xl text-gray-900 dark:text-slate-200 placeholder-gray-500 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent-blue/20 transition-all duration-300 ${
                      isDark 
                        ? 'bg-dark-navy/50 border border-accent-blue/20' 
                        : 'bg-white/50 border border-gray-200'
                    }`}
                    required
                  />
                </div>
                
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className={`w-full px-4 py-3 rounded-xl text-gray-900 dark:text-slate-200 placeholder-gray-500 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent-blue/20 transition-all duration-300 ${
                      isDark 
                        ? 'bg-dark-navy/50 border border-accent-blue/20' 
                        : 'bg-white/50 border border-gray-200'
                    }`}
                    required
                  />
                </div>
                
                <div>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className={`w-full px-4 py-3 rounded-xl text-gray-900 dark:text-slate-200 placeholder-gray-500 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent-blue/20 transition-all duration-300 ${
                      isDark 
                        ? 'bg-dark-navy/50 border border-accent-blue/20' 
                        : 'bg-white/50 border border-gray-200'
                    }`}
                    required
                  />
                </div>
                
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    rows="5"
                    className={`w-full px-4 py-3 rounded-xl text-gray-900 dark:text-slate-200 placeholder-gray-500 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent-blue/20 transition-all duration-300 resize-vertical ${
                      isDark 
                        ? 'bg-dark-navy/50 border border-accent-blue/20' 
                        : 'bg-white/50 border border-gray-200'
                    }`}
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      Sending...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane"></i>
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-4 right-4 px-6 py-4 rounded-xl shadow-2xl z-50 transform transition-all duration-300 ${
            notification.type === 'success'
              ? 'bg-green-500/90 text-white'
              : 'bg-red-500/90 text-white'
          }`}
        >
          <div className="flex items-center gap-3">
            <i className={`fas fa-${notification.type === 'success' ? 'check-circle' : 'exclamation-circle'}`}></i>
            <span>{notification.message}</span>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
