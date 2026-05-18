# 🎨 AYVEK-Image

> **Advanced AI-Powered Image Processing & Generation Platform**

[![TypeScript](https://img.shields.io/badge/TypeScript-97%25-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-purple?style=flat-square)](https://ayvek-image.vercel.app)

---

## ✨ Overview

**AYVEK-Image** is a cutting-edge web application that combines modern AI capabilities with intuitive UI/UX to deliver powerful image processing and generation features. Built with Next.js 16, React 19, and TypeScript, it provides a seamless experience for users to transform, enhance, and create stunning visuals.

### 🎯 Key Highlights

- 🤖 **AI-Powered Processing** - Leverage advanced AI models for intelligent image manipulation
- ⚡ **Lightning-Fast Performance** - Optimized for speed with modern web technologies
- 🎨 **Beautiful UI** - Radix UI components with smooth animations powered by Framer Motion
- 📱 **Fully Responsive** - Works flawlessly on desktop, tablet, and mobile devices
- 🌙 **Dark Mode Support** - Built-in theme switching with next-themes
- 📊 **Advanced Analytics** - Integrated with Vercel Analytics
- 🔐 **Type-Safe** - 100% TypeScript for reliability and developer experience

---

## 🚀 Features

### Core Capabilities
- ✅ Image upload and processing
- ✅ AI-powered image generation
- ✅ Real-time image preview
- ✅ Multiple export formats
- ✅ Batch processing
- ✅ Advanced filtering options

### Technical Excellence
- ✅ Server-side rendering (SSR) with Next.js
- ✅ Responsive design system
- ✅ Form validation with React Hook Form & Zod
- ✅ Rich component library (40+ Radix UI components)
- ✅ Carousel functionality with Embla
- ✅ Date picking capabilities

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) - React framework for production
- **Runtime**: [React 19](https://react.dev/) - UI library
- **Language**: [TypeScript 5](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS framework

### UI & Components
- **Component Library**: [Radix UI](https://www.radix-ui.com/) - Unstyled accessible components
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful icon library
- **Animations**: [Framer Motion](https://www.framer.com/motion/) - Production-ready animations
- **Toast Notifications**: [Sonner](https://sonner.emilkowal.ski/) - React toast library

### Forms & Data
- **Form Management**: [React Hook Form](https://react-hook-form.com/) - Performant form handling
- **Validation**: [Zod](https://zod.dev/) - TypeScript-first schema validation
- **Date Handling**: [date-fns](https://date-fns.org/) - Modern date utility library

### AI & Media
- **AI Integration**: [Replicate](https://replicate.com/) - Run open-source models in the cloud
- **Carousel**: [Embla Carousel React](https://www.embla-carousel.com/) - Flexible carousel component
- **Charts**: [Recharts](https://recharts.org/) - Composable charting library

### Utilities
- **Class Management**: [clsx](https://github.com/lukeed/clsx) & [Tailwind Merge](https://github.com/dcastil/tailwind-merge)
- **Theme Switching**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)
- **Command Palette**: [cmdk](https://cmdk.paco.sh/) - Fast command palette

---

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ayvazekin/AYVEK-Image.git
   cd AYVEK-Image
   ```

2. **Install dependencies**
   ```bash
   cd Web/A.Y.V.E.K_Web
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Add your API keys (Replicate, Supabase, etc.)

4. **Run development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser

---

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start dev server on port 3000

# Production
npm run build        # Build for production
npm start           # Start production server on port 3000

# Code Quality
npm run lint        # Run ESLint to check code quality
```

---

## 🏗️ Project Structure

```
AYVEK-Image/
├── Web/
│   ├── A.Y.V.E.K_Engine/      # AI processing engine
│   └── A.Y.V.E.K_Web/         # Main web application
│       ├── app/               # Next.js app directory
│       ├── components/        # React components
│       ├── lib/              # Utility functions
│       └── public/           # Static assets
└── README.md
```

---

## 🚀 Deployment

This project is optimized for deployment on **Vercel**:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fayvazekin%2FAYVEK-Image)

### Manual Deployment
1. Push to GitHub
2. Connect repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy!

**Live Demo**: https://ayvek-image.vercel.app

---

## 🎨 Customization

### Theme Configuration
Customize colors and design in:
- `tailwind.config.js` - Tailwind CSS configuration
- CSS variables for component colors

### UI Components
All Radix UI components are pre-configured and ready to use. Customize styling in component files within the components directory.

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Ayvek**
- GitHub: [@ayvazekin](https://github.com/ayvazekin)
- Email: Contact via GitHub

---

## 🙏 Acknowledgments

- [Vercel](https://vercel.com/) for hosting and analytics
- [Replicate](https://replicate.com/) for AI model integration
- [Radix UI](https://www.radix-ui.com/) for accessible components
- All open-source contributors

---

## 📞 Support

- 🐛 Found a bug? [Open an issue](https://github.com/ayvazekin/AYVEK-Image/issues)
- 💡 Have a suggestion? [Start a discussion](https://github.com/ayvazekin/AYVEK-Image/discussions)
- 📧 Need help? Reach out on GitHub

---

<div align="center">

**Made with ❤️ by Ayvek**

⭐ If you find this project useful, please consider giving it a star! ⭐

</div>