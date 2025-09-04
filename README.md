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
- 📊 **SEO & AEO Optimized** - Answer Engine Optimization for ChatGPT/Perplexity, structured data, meta tags, and semantic HTML
- 🔍 **IndexNow Integration** - Automatic search engine notifications for content updates
- 🤖 **Answer Engine Ready** - Optimized for AI crawlers (GPTBot, PerplexityBot, Claude-Web)

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
# Next.js Configuration
NEXT_PUBLIC_SITE_URL=https://passmaster.app

# IndexNow Configuration
INDEXNOW_KEY=your-indexnow-key-here
SITE_HOST=passmaster.app

# SEO/AEO Configuration
ORG_NAME="PassMaster"
ORG_LOGO_URL=https://passmaster.app/icons/icon-512.png
CONTACT_EMAIL=contact@passmaster.app
DEFAULT_AUTHOR_NAME="PassMaster Team"
DEFAULT_AUTHOR_URL=https://passmaster.app/about

# Social Media
LINKEDIN_URL=https://www.linkedin.com/company/passmaster
TWITTER_URL=https://twitter.com/passmaster

# Feature Flags
ENABLE_INDEXNOW=true
ENABLE_SCHEMA_VALIDATION=true
```

### PWA Configuration

The PWA is configured in `next.config.js` and `public/manifest.json`. Update the manifest with your app details.

## 📱 PWA Features

- **Offline Support**: Works without internet connection
- **Install Prompt**: Users can install as a native app
- **App Shortcuts**: Quick access to password generation
- **Splash Screen**: Custom loading screen
- **Theme Colors**: Consistent branding

## 🤖 Answer Engine Optimization (AEO) Setup

PassMaster is optimized for AI search engines like ChatGPT, Perplexity, and Claude. Here's how to set it up:

### 1. IndexNow Configuration

Get your IndexNow API key from [Microsoft IndexNow](https://www.indexnow.org/) and add it to your environment:

```bash
INDEXNOW_KEY=your-unique-key
SITE_HOST=passmaster.app
ENABLE_INDEXNOW=true
```

The key file will be automatically created at `/public/{INDEXNOW_KEY}.txt`.

### 2. Manual IndexNow Pinging

Use the CLI tool to manually notify search engines about updates:

```bash
# Test with homepage
npx tsx scripts/ping-indexnow.ts --test

# Ping specific URLs
npx tsx scripts/ping-indexnow.ts https://passmaster.app/offline https://passmaster.app/client-side

# Ping all main pages
npx tsx scripts/ping-indexnow.ts --all

# Check status
npx tsx scripts/ping-indexnow.ts --status
```

### 3. Automatic Pinging

IndexNow automatically triggers when:
- Pages are updated or published
- New content is added
- Sitemap is updated

Use the API endpoint for programmatic pinging:

```javascript
// Queue URLs for IndexNow notification
await fetch('/api/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    urls: ['https://passmaster.app/new-page']
  })
})
```

### 4. JSON-LD Schema Usage

Add structured data to your pages:

```tsx
import { FAQPageJsonLd, HowToJsonLd, ArticleJsonLd } from '@/components/seo/JsonLd'

// FAQ Page
<FAQPageJsonLd faqs={[
  { question: 'Wie funktioniert der Generator?', answer: 'Der Generator...' },
  // ... more FAQs
]} />

// How-To Content
<HowToJsonLd
  name="Sicheres Passwort erstellen"
  description="Schritt-für-Schritt Anleitung"
  steps={[
    { name: "Generator öffnen", text: "Gehen Sie zu..." },
    { name: "Einstellungen wählen", text: "Wählen Sie..." },
    // ... more steps
  ]}
/>

// Article Content
<ArticleJsonLd
  headline="Client-seitige Passwort-Sicherheit"
  description="Warum lokale Generierung sicherer ist"
  url="https://passmaster.app/client-side"
  datePublished="2024-01-01T00:00:00Z"
  dateModified="2024-01-15T00:00:00Z"
  author={{ name: "PassMaster Team" }}
/>
```

### 5. Content Metadata

Add publication and update dates to your content:

```tsx
import { ContentMeta, AuthorBox } from '@/components/seo/ContentMeta'

<ContentMeta
  publishedDate="2024-01-01"
  updatedDate="2024-01-15"
  author={{
    name: "PassMaster Team",
    url: "https://passmaster.app/about"
  }}
  readingTime={5}
/>
```

### 6. Canonical URLs

Ensure proper canonical URLs on all pages:

```tsx
import { Canonical } from '@/components/seo/Canonical'

// Automatic canonical based on current path
<Canonical />

// Custom canonical URL
<Canonical url="https://passmaster.app/custom-page" />
```

## 🔍 AEO Validation

### Robots.txt Validation

```bash
curl https://passmaster.app/robots.txt
# Should show: User-agent: PerplexityBot, Allow: /
# Should show: User-agent: GPTBot, Allow: /
```

### Schema Validation

```bash
# Check JSON-LD on any page
curl https://passmaster.app/ | grep -o '<script type="application/ld\+json">.*</script>'

# Validate with structured data testing tool
# https://search.google.com/test/rich-results
```

### Sitemap Validation

```bash
curl https://passmaster.app/sitemap.xml | head -20
# Should show proper XML structure with <lastmod> dates
```

### IndexNow Testing

```bash
# Test IndexNow API manually
npx tsx scripts/ping-indexnow.ts --test

# Check queue status
curl http://localhost:3000/api/indexnow
```

## 🤖 Answer Engine Features

- **PerplexityBot Support**: Explicitly allowed in robots.txt
- **GPTBot Support**: Optimized for ChatGPT crawling
- **Claude-Web Support**: Compatible with Claude's web search
- **FAQ Schema**: Structured Q&A data for answer engines
- **HowTo Schema**: Step-by-step instructions for AI responses
- **Article Schema**: Rich content metadata for citations
- **Updated Dates**: Visible "Zuletzt aktualisiert" timestamps
- **Author Information**: Clear attribution for content
- **Canonical URLs**: Single source of truth for content
- **IndexNow Integration**: Real-time search engine notifications

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