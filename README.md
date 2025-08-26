# PassMaster - Free Offline Secure Password Generator

A modern, privacy-first password generator built with Next.js, TypeScript, and TailwindCSS. Generate ultra-secure passwords instantly with client-side encryption - your passwords never leave your device.

## ✨ Features

- 🔒 **Client-Side Encryption** - All password generation happens locally in your browser
- 📱 **Progressive Web App (PWA)** - Install as an app and work offline
- 🌙 **Dark Mode Support** - Automatic theme switching with system preference detection
- 🎯 **Password Strength Meter** - Real-time entropy calculation and time-to-crack estimation
- ⚡ **Instant Generation** - Generate passwords in milliseconds with cryptographically secure randomness
- 🔧 **Customizable Options** - Length, character types, and exclude similar characters
- 📋 **One-Click Copy** - Copy passwords to clipboard with visual feedback
- ♿ **Accessible** - Full keyboard navigation and screen reader support
- 📊 **SEO Optimized** - Structured data, meta tags, and semantic HTML

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/passmaster.git
cd passmaster
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Theme**: next-themes
- **PWA**: next-pwa
- **State Management**: React hooks + localStorage

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Home page
│   ├── privacy/           # Privacy policy page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── layout/           # Layout components
│   ├── PasswordGenerator.tsx
│   ├── FAQ.tsx
│   ├── FloatingCTA.tsx
│   └── theme-provider.tsx
└── utils/                # Utility functions
    └── passwordGenerator.ts
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### PWA Configuration

The PWA is configured in `next.config.js` and `public/manifest.json`. Update the manifest with your app details.

## 📱 PWA Features

- **Offline Support**: Works without internet connection
- **Install Prompt**: Users can install as a native app
- **App Shortcuts**: Quick access to password generation
- **Splash Screen**: Custom loading screen
- **Theme Colors**: Consistent branding

## 🎨 Customization

### Colors

Update the primary color in `tailwind.config.js`:

```js
colors: {
  primary: {
    50: '#eff6ff',
    // ... other shades
    900: '#1e3a8a',
  },
}
```

### Icons

Replace icons in `public/icons/` directory. The app uses multiple sizes for different devices.

## 📊 SEO & Performance

- **Lighthouse Score**: Optimized for 95+ Performance, 100 SEO, 95+ Accessibility
- **Structured Data**: JSON-LD schemas for FAQ and SoftwareApplication
- **Meta Tags**: Open Graph and Twitter Card support
- **Performance**: Optimized images, fonts, and bundle size

## 🔒 Security

- **Cryptographic Randomness**: Uses Web Crypto API's `getRandomValues()`
- **No Data Collection**: Zero tracking or analytics
- **Client-Side Only**: No server-side password processing
- **Open Source**: Transparent code for security review

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/passmaster/issues)
- **Email**: privacy@passmaster.app
- **Documentation**: [Wiki](https://github.com/your-username/passmaster/wiki)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [TailwindCSS](https://tailwindcss.com/) for the utility-first CSS
- [Lucide](https://lucide.dev/) for the beautiful icons
- [Framer Motion](https://www.framer.com/motion/) for the smooth animations

---

Made with ❤️ for privacy and security