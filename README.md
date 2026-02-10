# Portfolio 

A modern, responsive portfolio website built with React, Vite, and Tailwind CSS.

## 🚀 Features

- **Modern UI/UX** with glass morphism effects and smooth animations
- **Dark/Light Theme** toggle with persistent preferences
- **Responsive Design** that works seamlessly on all devices
- **Interactive Components** including binary rain background effect
- **Contact Form** with Web3Forms API integration
- **Project Showcase** with GitHub and live demo links
- **Skills Section** with categorized technical skills
- **Smooth Scrolling** and section navigation

## 🛠️ Technologies Used

- **React 18** - Modern component-based architecture
- **Vite** - Fast development server and build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Beautiful icon library
- **React Context** - State management for theme

## 📁 Project Structure

```
frontend/
├── public/                 # Static assets
│   ├── images/            # Profile and project images
│   └── projects/          # Project showcase images
├── src/
│   ├── components/         # React components
│   │   ├── About.jsx
│   │   ├── BinaryRain.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   ├── Projects.jsx
│   │   └── Skills.jsx
│   ├── contexts/          # React contexts
│   │   └── ThemeContext.jsx
│   ├── data/             # JSON data files
│   │   └── portfolio.json
│   ├── App.jsx            # Main App component
│   ├── index.css          # Global styles
│   └── main.jsx           # Entry point
├── .env            # Environment variables (not tracked)
├── .gitignore           # Git ignore rules
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind configuration
└── vite.config.js       # Vite configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/practicmakesperfact/port_frontend.git
   cd port_frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**
   ```bash
   # Create .env. file
   cp .env.example .env 
   
   # Add your environment variables
   VITE_WEB3FORMS_ACCESS_KEY=your_web3forms_key
   VITE_RECIPIENT_EMAIL=your_email@example.com
   ```

4. **Start development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in browser:**
   ```
   http://localhost:5173
   ```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Customization

### Theme Colors

The theme uses accent colors that can be customized in `tailwind.config.js`:

- **Primary Blue:** `#3B82F6`
- **Purple:** `#9333EA`
- **Dark Navy:** `#0F172A`

### Portfolio Data

Update your portfolio information in `src/data/portfolio.json`:

```json
{
  "profile": {
    "name": "Your Name",
    "title": "Your Title",
    "email": "your.email@example.com",
    "github_url": "https://github.com/yourusername",
    "linkedin_url": "https://linkedin.com/in/yourprofile"
  },
  "skills": [...],
  "projects": [...]
}
```

## 📧 Contact Form

The contact form uses Web3Forms API for email sending:

1. **Get your free API key** at [web3forms.com](https://web3forms.com/)
2. **Add it to `.env.`:**
   ```
   VITE_WEB3FORMS_ACCESS_KEY=your_api_key_here
   ```
3. **Configure recipient email:**
   ```
   VITE_RECIPIENT_EMAIL=your.email@example.com
   ```

## 🌐 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Add environment variables** in Vercel dashboard
3. **Deploy automatically** on push to main

### Netlify

1. **Connect repository** to Netlify
2. **Set build command:** `npm run build`
3. **Set publish directory:** `dist`
4. **Add environment variables** in Netlify dashboard

## 🔧 Environment Variables

| Variable | Description | Required |
|-----------|-------------|-----------|
| `VITE_WEB3FORMS_ACCESS_KEY` | Web3Forms API key | Yes |
| `VITE_RECIPIENT_EMAIL` | Contact form recipient | Yes |

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Haymanot Asmare** - Full Stack Developer

- **Portfolio:** [Live Demo](https://haymanot.vercel.app)
- **GitHub:** [github.com/haymanot](https://github.com/practicmakesperfact)
- **LinkedIn:** [linkedin.com/in/haymanot-asmare](https://linkedin.com/in/haymanot-asmare)

---

⭐ **Star this repository if it helped you!**
