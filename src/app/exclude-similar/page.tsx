"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Eye, 
  EyeOff, 
  AlertTriangle, 
  CheckCircle, 
  Copy, 
  RefreshCw,
  Info,
  BarChart3,
  Settings
} from 'lucide-react'
import { generatePassword, calculateEntropy } from '@/utils/passwordGenerator'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Passwort Generator: ähnliche Zeichen ausschließen | PassMaster',
  description: 'Generiere Passwörter ohne ähnliche Zeichen. Bessere Lesbarkeit, weniger Verwechselung. l, I, 1, 0, O ausschließen.',
  keywords: ['exclude similar characters', 'ähnliche zeichen', 'passwort lesbarkeit', 'verwechslung vermeiden', 'l I 1 0 O'],
  openGraph: {
    title: 'Passwort Generator: ähnliche Zeichen ausschließen | PassMaster',
    description: 'Generiere Passwörter ohne ähnliche Zeichen. Bessere Lesbarkeit, weniger Verwechselung.',
  },
}

export default function ExcludeSimilarPage() {
  const [password, setPassword] = useState('')
  const [excludeSimilar, setExcludeSimilar] = useState(false)
  const [showPassword, setShowPassword] = useState(true)
  const [copied, setCopied] = useState(false)

  const similarCharacters = [
    { char: 'l', description: 'Kleinbuchstabe L', confusesWith: 'I, 1, |' },
    { char: 'I', description: 'Großbuchstabe i', confusesWith: 'l, 1, |' },
    { char: '1', description: 'Ziffer Eins', confusesWith: 'l, I, |' },
    { char: '0', description: 'Ziffer Null', confusesWith: 'O, o, Q' },
    { char: 'O', description: 'Großbuchstabe O', confusesWith: '0, o, Q' },
    { char: 'o', description: 'Kleinbuchstabe o', confusesWith: '0, O, Q' }
  ]

  const generateNewPassword = () => {
    const options = {
      length: 16,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: true,
      excludeSimilar: excludeSimilar
    }
    
    const newPassword = generatePassword(options)
    setPassword(newPassword)
  }

  const copyToClipboard = async () => {
    if (password) {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const entropy = password ? calculateEntropy(password) : 0

  const getEntropyLevel = (entropy: number) => {
    if (entropy < 28) return { level: 'Schwach', color: 'text-red-500', bgColor: 'bg-red-100 dark:bg-red-900/20' }
    if (entropy < 35) return { level: 'Mittel', color: 'text-yellow-500', bgColor: 'bg-yellow-100 dark:bg-yellow-900/20' }
    if (entropy < 59) return { level: 'Stark', color: 'text-green-500', bgColor: 'bg-green-100 dark:bg-green-900/20' }
    return { level: 'Sehr Stark', color: 'text-blue-500', bgColor: 'bg-blue-100 dark:bg-blue-900/20' }
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary-100 dark:bg-primary-900/20 rounded-full">
              <Eye className="h-12 w-12 text-primary-600" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Ähnliche Zeichen ausschließen
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Generieren Sie Passwörter ohne verwirrende, ähnlich aussehende Zeichen für bessere Lesbarkeit.
          </p>
        </motion.div>

        {/* Password Generator Demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Live-Demo: Unterschied mit/ohne ähnliche Zeichen
          </h2>
          
          <div className="space-y-6">
            {/* Toggle */}
            <div className="flex items-center justify-center space-x-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={excludeSimilar}
                  onChange={(e) => {
                    setExcludeSimilar(e.target.checked)
                    if (password) generateNewPassword()
                  }}
                  className="w-5 h-5 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="text-lg font-medium text-gray-900 dark:text-white">
                  Ähnliche Zeichen ausschließen
                </span>
              </label>
            </div>

            {/* Password Display */}
            <div className="relative">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
                <div className="flex-1">
                  {password ? (
                    <div className="font-mono text-lg break-all">
                      {showPassword ? (
                        <span className="text-gray-900 dark:text-white">
                          {password}
                        </span>
                      ) : (
                        <span className="text-gray-400">
                          {'•'.repeat(password.length)}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="text-gray-400 italic">
                      Klicken Sie auf "Generieren" um zu starten
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                    aria-label={showPassword ? "Passwort verstecken" : "Passwort anzeigen"}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                  
                  <button
                    onClick={copyToClipboard}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                    disabled={!password}
                    aria-label="In Zwischenablage kopieren"
                  >
                    <Copy className={`h-5 w-5 ${copied ? 'text-green-500' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Entropy Display */}
              {password && (
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Entropie: {entropy.toFixed(1)} Bits
                    </span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getEntropyLevel(entropy).bgColor} ${getEntropyLevel(entropy).color}`}>
                    {getEntropyLevel(entropy).level}
                  </div>
                </div>
              )}
            </div>

            {/* Generate Button */}
            <div className="text-center">
              <button
                onClick={generateNewPassword}
                className="btn-primary px-8 py-3 inline-flex items-center space-x-2"
              >
                <RefreshCw className="h-5 w-5" />
                <span>Passwort generieren</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Character Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Zeichen-Übersicht | Entropie | FAQ
          </h2>
          
          <div className="card overflow-hidden">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Ausgeschlossene ähnliche Zeichen
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      Zeichen
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      Beschreibung
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      Verwechslungsgefahr mit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {similarCharacters.map((item, index) => (
                    <motion.tr
                      key={item.char}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="border-b border-gray-100 dark:border-gray-800"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <span className="font-mono text-2xl bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 px-3 py-1 rounded">
                            {item.char}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-900 dark:text-white">
                        {item.description}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          <span className="text-gray-600 dark:text-gray-300 font-mono">
                            {item.confusesWith}
                          </span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Impact on Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card border-l-4 border-green-500">
              <CheckCircle className="h-8 w-8 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Vorteile
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Bessere Lesbarkeit bei manueller Eingabe</li>
                <li>• Reduzierte Fehlerrate beim Abtippen</li>
                <li>• Weniger Verwechslungen in verschiedenen Schriftarten</li>
                <li>• Einfachere Kommunikation bei Support-Fällen</li>
              </ul>
            </div>
            
            <div className="card border-l-4 border-yellow-500">
              <Info className="h-8 w-8 text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Einfluss auf Sicherheit
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Minimaler Entropie-Verlust (~6 Zeichen weniger)</li>
                <li>• Immer noch kryptographisch sicher</li>
                <li>• Kompensiert durch längere Passwörter</li>
                <li>• Praktischer Nutzen überwiegt minimal reduzierten Zeichensatz</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Usage Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-16"
        >
          <div className="card bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <Settings className="h-6 w-6 text-blue-600" />
              <span>Empfehlungen für die Nutzung</span>
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-3">
                  Verwenden Sie "Ähnliche Zeichen ausschließen" für:
                </h4>
                <ul className="space-y-1 text-blue-800 dark:text-blue-300 text-sm">
                  <li>• Passwörter die Sie manuell eingeben müssen</li>
                  <li>• Kommunikation über Telefon oder Chat</li>
                  <li>• Handschriftliche Notizen (temporär)</li>
                  <li>• Präsentationen oder Screenshots</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-3">
                  Verwenden Sie alle Zeichen für:
                </h4>
                <ul className="space-y-1 text-blue-800 dark:text-blue-300 text-sm">
                  <li>• Passwort-Manager (automatische Eingabe)</li>
                  <li>• API-Keys und technische Tokens</li>
                  <li>• Maximale kryptographische Stärke</li>
                  <li>• Automatisierte Systeme</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="card"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Häufige Fragen
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Warum ähnliche Zeichen ausschließen?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Ähnlich aussehende Zeichen wie 'l', 'I' und '1' können in verschiedenen Schriftarten praktisch identisch aussehen. 
                Dies führt zu Fehlern bei der manuellen Eingabe und erschwert die Kommunikation von Passwörtern.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Welche Zeichen werden genau ausgeschlossen?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Standardmäßig werden ausgeschlossen: 'l' (kleines L), 'I' (großes i), '1' (Eins), '0' (Null), 'O' (großes O), 
                und 'o' (kleines O). Diese Zeichen werden oft verwechselt, besonders in bestimmten Schriftarten.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Wie stark beeinflusst das die Sicherheit?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Der Einfluss ist minimal. Bei einem 16-Zeichen-Passwort reduziert sich die Entropie nur geringfügig. 
                Die verbesserte Benutzerfreundlichkeit wiegt den minimalen Sicherheitsverlust meist auf, 
                da Benutzer eher längere Passwörter akzeptieren, wenn sie gut lesbar sind.
              </p>
            </div>
          </div>
        </motion.div>

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Warum ähnliche Zeichen ausschließen?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Ähnlich aussehende Zeichen können zu Fehlern bei der manuellen Eingabe führen und erschweren die Kommunikation von Passwörtern."
                  }
                },
                {
                  "@type": "Question",  
                  "name": "Welche Zeichen werden ausgeschlossen?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Standardmäßig: 'l', 'I', '1', '0', 'O', 'o' - Diese Zeichen werden oft verwechselt, besonders in bestimmten Schriftarten."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Einfluss auf Sicherheit?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Der Einfluss ist minimal. Die verbesserte Benutzerfreundlichkeit wiegt den geringfügigen Sicherheitsverlust meist auf."
                  }
                }
              ]
            })
          }}
        />
      </div>
    </div>
  )
}