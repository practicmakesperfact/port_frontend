# Portfolio Frontend

A modern, responsive React frontend for a personal portfolio website with dark mode support, smooth animations, and optimized performance.

## 🚀 Features

- **Modern Design** - Clean, professional UI with Tailwind CSS
- **Dark Mode** - Toggle between light and dark themes
- **Responsive Layout** - Mobile-first design approach
- **Smooth Animations** - Scroll animations and hover effects
- **Binary Rain Effect** - Animated background effect
- **Project Showcase** - Dynamic project cards with images
- **Contact Form** - Functional contact form with validation
- **Skills Display** - Categorized technical skills
- **Performance Optimized** - Lazy loading and optimized assets
- **SEO Friendly** - Meta tags and semantic HTML

## 🛠️ Tech Stack

- **Framework**: React 18+
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Font Awesome
- **Animations**: CSS3 + Intersection Observer
- **State Management**: React Context API
- **HTTP Client**: Fetch API

## 📋 Prerequisites

- Node.js 16+
- npm or yarn package manager

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <your-frontend-repo-url>
cd portfolio-frontend
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Setup
Create a `.env` file if needed (for API configuration):
```env
VITE_API_BASE_URL=http://localhost:8000
```

### 4. Start Development Server
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
portfolio-frontend/
├── public/
│   └── index.html           # HTML template
├── src/
│   ├── main.jsx            # React entry point
│   ├── App.jsx             # Main App component
│   ├── index.css           # Global styles
│   ├── components/         # React components
│   │   ├── Hero.jsx        # Hero section
│   │   ├── About.jsx       # About section
│   │   ├── Projects.jsx    # Projects showcase
│   │   ├── Skills.jsx      # Skills display
│   │   ├── Contact.jsx     # Contact form
│   │   ├── Navbar.jsx      # Navigation bar
│   │   ├── Footer.jsx      # Footer component
│   │   └── BinaryRain.jsx  # Background animation
│   └── contexts/           # React contexts
│       └── ThemeContext.jsx # Theme management
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS config
└── postcss.config.js       # PostCSS config
```

## 🎨 Components Overview

### Hero Section
- Animated text with typewriter effect
- Call-to-action buttons
- Responsive design

### Projects Showcase
- Dynamic project cards with hover effects
- Image backgrounds from API
- Technology stack badges
- GitHub and live demo links

### Skills Display
- Categorized technical skills
- Progress bars for skill levels
- Animated on scroll

### Contact Form
- Form validation
- Real-time feedback
- Integration with backend API

### Navigation
- Sticky header on scroll
- Smooth scroll to sections
- Mobile responsive menu

## 🎯 Features Details

### Dark Mode
- Toggle between light and dark themes
- Persistent theme preference
- Smooth transitions
- Optimized color schemes

### Animations
- Scroll-triggered animations
- Hover effects on interactive elements
- Loading states
- Binary rain background effect

### Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop
- Touch-friendly interactions
- Optimized images for different screen sizes

## 🔧 Configuration

### Tailwind CSS
Custom configuration in `tailwind.config.js`:
```javascript
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'accent-blue': '#3B82F6',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'monospace'],
      },
    },
  },
}
```

### Vite Configuration
Optimized build settings in `vite.config.js`:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    port: 3000,
    open: true,
  },
})
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🎨 Customization

### Colors
Primary color scheme defined in Tailwind config:
- `accent-blue`: Primary brand color
- Dark mode optimized colors

### Fonts
- Primary: Inter (system fonts)
- Monospace: JetBrains Mono

### Animations
Custom CSS animations in `index.css`:
- Fade-in effects
- Slide animations
- Hover transitions

## 🚀 Build & Deployment

### Development Build
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deployment
The `dist` folder contains the production-ready files. Deploy to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

## 🔗 API Integration

The frontend connects to the backend API for:
- Projects data (`/api/projects/data/`)
- Profile information (`/api/profile/data/`)
- Skills data (`/api/skills/data/`)
- Contact form submission (`/api/contact/`)

### Environment Variables
Configure API base URL in `.env`:
```env
VITE_API_BASE_URL=http://localhost:8000
```

## 🎯 Performance Optimization

- **Lazy Loading**: Images and components load as needed
- **Code Splitting**: Automatic with Vite
- **Asset Optimization**: Images and fonts optimized
- **Caching**: Proper cache headers for static assets
- **Minification**: CSS and JS minified in production

## 🧪 Testing

### Running Tests
```bash
npm test
```

### Linting
```bash
npm run lint
```

### Type Checking (if using TypeScript)
```bash
npm run type-check
```

## 📊 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Android Chrome)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Development Guidelines
- Follow React best practices
- Use semantic HTML5
- Maintain responsive design
- Test on multiple screen sizes
- Keep components modular

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
- Create an issue in the repository
- Check the documentation first
- Provide detailed bug reports

---

**Built with React ❤️ and Tailwind CSS**
