"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Lock, 
  Zap, 
  Globe, 
  Copy, 
  Check, 
  Eye, 
  EyeOff, 
  RefreshCw, 
  Info,
  ChevronDown,
  ChevronUp,
  Key,
  Smartphone,
  Users,
  ArrowUp
} from 'lucide-react'
import { PasswordGenerator } from '@/components/PasswordGenerator'
import { FAQ } from '@/components/FAQ'
import { FloatingCTA } from '@/components/FloatingCTA'
import { PWAInstallPrompt } from '@/components/PWAInstallPrompt'
import { PWAResponsiveAd, PWABannerAd, PWASquareAd } from '@/components/PWAAdSense'

export default function HomePage() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  
  // Initialize AdSense on page load
  useEffect(() => {
    console.log('%c🎯 HOMEPAGE USEEFFECT RUNNING', 'background: red; color: white; font-size: 16px;')
    console.log('🔍 Looking for AdSense components...')
    
    // Check if AdSense components are rendered
    setTimeout(() => {
      const adContainers = document.querySelectorAll('.adsense-container')
      console.log(`%c📊 Found ${adContainers.length} AdSense containers on page`, 'background: green; color: white;')
      
      adContainers.forEach((container, index) => {
        console.log(`Ad ${index + 1}:`, container.querySelector('.text-sm')?.textContent)
      })
      
      // Also check for any divs with "Ad" in them
      const allDivs = document.querySelectorAll('div')
      let adDivs = 0
      allDivs.forEach(div => {
        if (div.textContent?.includes('Ad Placement') || div.textContent?.includes('AdSense')) {
          adDivs++
          console.log('Found ad-related div:', div.textContent)
        }
      })
      console.log(`Total ad-related divs found: ${adDivs}`)
    }, 1000)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const features = [
    {
      icon: Lock,
      title: "100% Client-seitige Verschlüsselung",
      description: "Ihre Passwörter werden lokal in Ihrem Browser generiert. Nichts wird jemals an unsere Server gesendet. Web Crypto API für maximale Sicherheit."
    },
    {
      icon: Zap,
      title: "Funktioniert offline (PWA)",
      description: "Als App installieren und Passwörter auch ohne Internetverbindung generieren. Service Worker für echte Offline-Nutzung."
    },
    {
      icon: Globe,
      title: "Open Source & Privacy-Focused",
      description: "Transparenter, auditierbarer Code auf GitHub. DSGVO-konform mit optionalen Analytics zur Verbesserung des Services."
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div style={{
            background: 'linear-gradient(45deg, red, blue)', 
            color: 'white', 
            padding: '40px', 
            fontSize: '32px', 
            textAlign: 'center', 
            marginBottom: '40px',
            border: '10px solid yellow',
            borderRadius: '20px'
          }}>
            🚨🚨🚨 MEGA TEST - SIEHST DU DAS??? 🚨🚨🚨<br/>
            WENN JA: Claude Code funktioniert!<br/>
            WENN NEIN: Du schaust falsche Seite!
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary-100 dark:bg-primary-900/20 rounded-full">
                <Shield className="h-12 w-12 text-primary-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              🔴 TEST: Passwort Generator für maximale Sicherheit
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Sichere Passwörter generieren – 100% client-seitig, offline, DSGVO-konform und Open-Source.
            </p>
          </motion.div>

          {/* High-Impact Top Banner Ad */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <div className="bg-red-100 border-2 border-red-500 p-4 text-center mb-4">
              <h3 className="text-red-800 font-bold">SIMPLE TEST AD PLACEMENT</h3>
              <p className="text-red-600">If you see this, JSX rendering works</p>
            </div>
            <PWABannerAd className="mx-auto" />
          </motion.div>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <a 
              href="#generator"
              className="btn-primary text-lg px-8 py-4 inline-flex items-center space-x-2"
            >
              <Key className="h-5 w-5" />
              <span>Passwort generieren</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Web Crypto statt Math.random | Offline & PWA | DSGVO-Check
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Entwickelt mit Datenschutz und Sicherheit als Fundament – nicht als nachträglicher Gedanke.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Left Sidebar Ad */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="hidden md:block"
            >
              <div className="sticky top-8">
                <PWASquareAd className="mx-auto" />
              </div>
            </motion.div>
            
            {/* Features Content */}
            <div className="md:col-span-2 grid gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="card text-center group cursor-pointer"
                >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary-100 dark:bg-primary-900/20 rounded-full group-hover:bg-primary-200 dark:group-hover:bg-primary-900/40 transition-colors duration-200">
                    <feature.icon className="h-8 w-8 text-primary-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
              ))}
            </div>
            
            {/* Right Sidebar Ad */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="hidden md:block"
            >
              <div className="sticky top-8">
                <PWASquareAd className="mx-auto" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Password Generator Section */}
      <section id="generator" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Ihr starkes Passwort generieren
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Passen Sie Ihre Passwort-Einstellungen an und generieren Sie sofort sichere Passwörter.
            </p>
          </motion.div>

          <PasswordGenerator />
          
          {/* High-Converting Ad after Generator */}
          <div className="mt-12 mb-8">
            <PWAResponsiveAd className="mx-auto" />
          </div>
          
          {/* Secondary Banner for Mobile Users */}
          <div className="mt-8 md:hidden">
            <PWABannerAd className="mx-auto" />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Häufig gestellte Fragen
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Alles was Sie über PassMaster und Passwort-Sicherheit wissen müssen.
            </p>
          </motion.div>

          <FAQ />
          
          {/* Bottom High-Impact Ad */}
          <div className="mt-12 mb-8">
            <PWABannerAd className="mx-auto" />
          </div>
          
          {/* Final Conversion Ad */}
          <div className="mt-8">
            <PWAResponsiveAd className="mx-auto" />
          </div>
        </div>
      </section>

      {/* Floating CTA */}
      <FloatingCTA />

      {/* PWA Install Prompt */}
      <PWAInstallPrompt />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg transition-colors duration-200"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </div>
  )
}
