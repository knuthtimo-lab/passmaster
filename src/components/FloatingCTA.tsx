"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Key } from 'lucide-react'

export function FloatingCTA() {
  const [showFloatingCTA, setShowFloatingCTA] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      
      // Show floating CTA when user has scrolled past the hero section and generator is not in view
      const shouldShow = scrollY > windowHeight * 0.5 && scrollY < documentHeight - windowHeight * 0.3
      setShowFloatingCTA(shouldShow)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToGenerator = () => {
    const generatorElement = document.getElementById('generator')
    if (generatorElement) {
      generatorElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <AnimatePresence>
      {showFloatingCTA && (
        <motion.div
          className="fixed bottom-6 left-6 z-50"
          initial={{ opacity: 0, x: -100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -100, scale: 0.8 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <motion.button
            onClick={scrollToGenerator}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-2 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Generate password"
          >
            <Key className="h-5 w-5" />
            <span className="font-medium">Generate Password</span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
