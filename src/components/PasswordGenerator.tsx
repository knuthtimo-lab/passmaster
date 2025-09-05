"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Copy, 
  Check, 
  Eye, 
  EyeOff, 
  RefreshCw, 
  Info,
  Key
} from 'lucide-react'
import { generatePassword, calculateEntropy, estimateTimeToCrack } from '@/utils/passwordGenerator'

interface PasswordOptions {
  length: number
  includeUppercase: boolean
  includeLowercase: boolean
  includeNumbers: boolean
  includeSymbols: boolean
  excludeSimilar: boolean
}

export function PasswordGenerator() {
  const [mounted, setMounted] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(true)
  const [copied, setCopied] = useState(false)
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    excludeSimilar: false,
  })

  // Mount and load settings from localStorage
  useEffect(() => {
    setMounted(true)
    const savedOptions = localStorage.getItem('passmaster-settings')
    if (savedOptions) {
      try {
        const parsed = JSON.parse(savedOptions)
        setOptions(prev => ({ ...prev, ...parsed }))
      } catch (error) {
        console.error('Failed to load saved settings:', error)
      }
    }
  }, [])

  // Save settings to localStorage when options change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('passmaster-settings', JSON.stringify(options))
    }
  }, [options, mounted])

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="card max-w-2xl mx-auto">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
          </div>
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded mt-6"></div>
        </div>
      </div>
    )
  }

  const handleGenerate = () => {
    const newPassword = generatePassword(options)
    setPassword(newPassword)
    setCopied(false)
    
  }

  const handleCopy = async () => {
    if (password) {
      try {
        await navigator.clipboard.writeText(password)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (error) {
        console.error('Failed to copy password:', error)
        // Fallback for older browsers
        const textArea = document.createElement('textarea')
        textArea.value = password
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    }
  }

  const getStrengthLevel = (entropy: number) => {
    if (entropy < 40) return { level: 'Weak', color: 'strength-weak', bg: 'bg-red-500' }
    if (entropy < 60) return { level: 'Medium', color: 'strength-ok', bg: 'bg-yellow-500' }
    if (entropy < 80) return { level: 'Strong', color: 'strength-strong', bg: 'bg-blue-500' }
    return { level: 'Very Strong', color: 'strength-excellent', bg: 'bg-green-500' }
  }

  const entropy = password ? calculateEntropy(password) : 0
  const timeToCrack = password ? estimateTimeToCrack(password) : ''
  const strength = getStrengthLevel(entropy)

  return (
    <div className="card max-w-2xl mx-auto">
      {/* Generated Password */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Generated Password
        </label>
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              readOnly
              className="input-field font-mono text-lg"
              placeholder="Click 'Generate Password' for a secure password"
              aria-label="Generated Password"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          <motion.button
            onClick={handleCopy}
            disabled={!password}
            className="px-4 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors duration-200"
            whileHover={{ scale: password ? 1.05 : 1 }}
            whileTap={{ scale: password ? 0.95 : 1 }}
            aria-label="Copy password"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Check className="h-4 w-4" />
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Copy className="h-4 w-4" />
                </motion.div>
              )}
            </AnimatePresence>
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </motion.button>
        </div>
        
        {/* Password Strength */}
        {password && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Strength:</span>
              <span className={`font-medium ${strength.color.replace('strength-', 'text-')}`}>
                {strength.level}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                className={`strength-meter ${strength.color}`}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((entropy / 100) * 100, 100)}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Entropy: {entropy.toFixed(1)} bits</span>
              <span>Time to crack: {timeToCrack}</span>
            </div>
          </div>
        )}
      </div>

      {/* Options */}
      <div className="space-y-6">
        {/* Length Slider */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Password Length: {options.length}
          </label>
          <input
            type="range"
            min="8"
            max="128"
            value={options.length}
            onChange={(e) => setOptions({ ...options, length: parseInt(e.target.value) })}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>8</span>
            <span>128</span>
          </div>
        </div>
        
        {/* Character Options */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Character Types</h3>
            {[
              { key: 'includeUppercase', label: 'Uppercase letters (A-Z)' },
              { key: 'includeLowercase', label: 'Lowercase letters (a-z)' },
              { key: 'includeNumbers', label: 'Numbers (0-9)' },
              { key: 'includeSymbols', label: 'Symbols (!@#$%^&*)' },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options[key as keyof PasswordOptions] as boolean}
                  onChange={(e) => setOptions({ ...options, [key]: e.target.checked })}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
              </label>
            ))}
          </div>
          
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Options</h3>
            <label className="flex items-start space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={options.excludeSimilar}
                onChange={(e) => setOptions({ ...options, excludeSimilar: e.target.checked })}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 mt-0.5"
              />
              <div className="flex-1">
                <span className="text-sm text-gray-700 dark:text-gray-300">Exclude similar characters</span>
                <div className="flex items-center space-x-1 mt-1">
                  <Info className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Excludes 0/O, l/I, 1/I to avoid confusion
                  </span>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <motion.button
        onClick={handleGenerate}
        className="w-full btn-primary mt-6 flex items-center justify-center space-x-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <RefreshCw className="h-5 w-5" />
        <span>Generate Password</span>
      </motion.button>

      {/* ARIA Live Region for Copy Feedback */}
      <div aria-live="polite" className="sr-only">
        {copied && 'Password copied to clipboard'}
      </div>
    </div>
  )
}
