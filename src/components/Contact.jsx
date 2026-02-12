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
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        showNotification(result.message || 'Submission failed', 'error');
      }
    } catch {
      showNotification('Network error. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden z-10">
      {/* Background - removed to allow rain animation to show through */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/90 via-gray-50/95 to-white/90 dark:from-[#020617]/90 dark:via-[#020617]/95 dark:to-black/90"></div>

      <div className="relative max-w-7xl mx-auto px-6 z-10">
        {/* Title */}
        <h2 className="text-5xl font-bold text-center mb-20 text-gray-900 dark:text-white">
          Get In Touch
        </h2>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* LEFT COLUMN */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Let's Work Together
            </h3>
            <p className="text-gray-600 dark:text-slate-300 mb-10 leading-relaxed">
              I'm always interested in hearing about new projects and opportunities.
              Whether you're looking for a full-time engineer, freelance collaboration,
              or just want to discuss ideas, feel free to reach out!
            </p>

            {/* Contact Cards */}
            <div className="space-y-5">
              {[
                { icon: 'fa-envelope', title: 'Email', value: 'maniga.1love@gmail.com' },
                { icon: 'fa-phone', title: 'Phone', value: '+251 906 287 552' },
                { icon: 'fa-map-marker-alt', title: 'Location', value: 'Addis Ababa, Ethiopia' }
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-5 p-5 rounded-xl bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-200/50 dark:border-white/10 hover:border-accent-blue/40 transition"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-accent-blue/20 text-accent-blue">
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  <div>
                    <p className="text-gray-900 dark:text-white font-semibold">{item.title}</p>
                    <p className="text-gray-600 dark:text-slate-400">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 mt-8">
              {[
                { icon: 'github', url: 'https://github.com' },
                { icon: 'linkedin', url: 'https://linkedin.com' },
                { icon: 'upwork', url: 'https://upwork.com' }
              ].map((social) => (
                <a
                  key={social.icon}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-accent-blue hover:bg-accent-blue hover:text-white transition"
                >
                  <i className={`fab fa-${social.icon}`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN – FORM */}
          <form
            onSubmit={handleSubmit}
            className="p-10 rounded-2xl bg-white/90 dark:bg-white/5 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 shadow-2xl"
          >
            <div className="space-y-6">
              {['name', 'email', 'subject'].map((field) => (
                <input
                  key={field}
                  type={field === 'email' ? 'email' : 'text'}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                  required
                  className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-[#020617]/80 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-accent-blue/40 outline-none"
                />
              ))}

              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
                className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-[#020617]/80 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-accent-blue/40 outline-none resize-none"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-accent-blue to-purple-600 text-white font-semibold hover:scale-[1.02] transition"
              >
                {isSubmitting ? 'Sending…' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-6 right-6 px-6 py-4 rounded-xl text-white shadow-xl z-[60] ${
            notification.type === 'success'
              ? 'bg-green-600'
              : 'bg-red-600'
          }`}
        >
          {notification.message}
        </div>
      )}
    </section>
  );
};

export default Contact;
