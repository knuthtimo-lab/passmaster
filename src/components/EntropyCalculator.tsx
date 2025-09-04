"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  Calculator, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Info,
  Clock,
  Target
} from 'lucide-react'
import { calculateEntropy, estimateTimeToCrack } from '@/utils/passwordGenerator'

interface EntropyCalculatorProps {
  password?: string
  className?: string
}

export function EntropyCalculator({ password = '', className = '' }: EntropyCalculatorProps) {
  const [mounted, setMounted] = useState(false)
  const [inputPassword, setInputPassword] = useState(password)
  const [entropy, setEntropy] = useState(0)
  const [crackTime, setCrackTime] = useState('')
  const [recommendation, setRecommendation] = useState('')

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (password) {
      setInputPassword(password)
    }
  }, [password])

  useEffect(() => {
    if (inputPassword) {
      const entropyValue = calculateEntropy(inputPassword)
      setEntropy(entropyValue)
      setCrackTime(estimateTimeToCrack(inputPassword))
      
      // Generate recommendation based on entropy
      if (entropyValue < 28) {
        setRecommendation('Sehr schwach - Verwenden Sie längere Passwörter mit mehr Zeichentypen')
      } else if (entropyValue < 35) {
        setRecommendation('Schwach - Fügen Sie mehr Zeichen oder Symbole hinzu')
      } else if (entropyValue < 59) {
        setRecommendation('Gut - Ausreichend für die meisten Anwendungen')
      } else if (entropyValue < 77) {
        setRecommendation('Stark - Sehr sicher für sensible Daten')
      } else {
        setRecommendation('Sehr stark - Excellente Sicherheit')
      }
    } else {
      setEntropy(0)
      setCrackTime('')
      setRecommendation('')
    }
  }, [inputPassword])

  const getEntropyLevel = () => {
    if (entropy < 28) return { 
      level: 'Sehr schwach', 
      color: 'text-red-600', 
      bgColor: 'bg-red-100 dark:bg-red-900/20',
      icon: AlertTriangle,
      width: '20%'
    }
    if (entropy < 35) return { 
      level: 'Schwach', 
      color: 'text-orange-600', 
      bgColor: 'bg-orange-100 dark:bg-orange-900/20',
      icon: AlertTriangle,
      width: '35%'
    }
    if (entropy < 59) return { 
      level: 'Gut', 
      color: 'text-yellow-600', 
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
      icon: Info,
      width: '60%'
    }
    if (entropy < 77) return { 
      level: 'Stark', 
      color: 'text-green-600', 
      bgColor: 'bg-green-100 dark:bg-green-900/20',
      icon: CheckCircle,
      width: '80%'
    }
    return { 
      level: 'Sehr stark', 
      color: 'text-blue-600', 
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
      icon: Shield,
      width: '100%'
    }
  }

  const entropyData = getEntropyLevel()
  const IconComponent = entropyData.icon

  const securityStandards = [
    { name: 'Basis-Sicherheit', minEntropy: 28, description: 'Mindestanforderung für einfache Accounts' },
    { name: 'Empfohlene Sicherheit', minEntropy: 50, description: 'Gut für die meisten Online-Services' },
    { name: 'Hohe Sicherheit', minEntropy: 64, description: 'Empfohlen für Finanz- und Gesundheitsdaten' },
    { name: 'Maximale Sicherheit', minEntropy: 80, description: 'Höchste Sicherheit für kritische Systeme' }
  ]

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Input Section */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-4">
          <Calculator className="h-6 w-6 text-primary-600" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Entropie-Rechner
          </h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="password-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Passwort eingeben oder generieren lassen:
            </label>
            <input
              id="password-input"
              type="text"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              placeholder="Geben Sie ein Passwort ein..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Results Section */}
      {inputPassword && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Entropy Visualization */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                Passwort-Stärke Analyse
              </h4>
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${entropyData.bgColor}`}>
                <IconComponent className={`h-4 w-4 ${entropyData.color}`} />
                <span className={`text-sm font-medium ${entropyData.color}`}>
                  {entropyData.level}
                </span>
              </div>
            </div>

            {/* Entropy Bar */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Entropie</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {entropy.toFixed(1)} Bits
                </span>
              </div>
              
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: entropyData.width }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`h-3 rounded-full ${entropyData.color.replace('text-', 'bg-')}`}
                />
              </div>
              
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>0 Bits</span>
                <span>100+ Bits</span>
              </div>
            </div>

            {/* Time to Crack */}
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Geschätzte Zeit zum Knacken (Brute Force)
                </span>
              </div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {crackTime}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Bei 1 Trillion Versuchen pro Sekunde
              </p>
            </div>
          </div>

          {/* Recommendation */}
          <div className={`card border-l-4 ${entropyData.color.replace('text-', 'border-')}`}>
            <div className="flex items-start space-x-3">
              <Target className={`h-5 w-5 mt-1 ${entropyData.color}`} />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Empfehlung
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {recommendation}
                </p>
              </div>
            </div>
          </div>

          {/* Security Standards Chart */}
          <div className="card">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-primary-600" />
              <span>Sicherheitsstandards Vergleich</span>
            </h4>
            
            <div className="space-y-3">
              {securityStandards.map((standard, index) => (
                <motion.div
                  key={standard.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    entropy >= standard.minEntropy 
                      ? 'bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800'
                      : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {entropy >= standard.minEntropy ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-gray-300 dark:border-gray-600" />
                    )}
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {standard.name}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {standard.description}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {standard.minEntropy}+ Bits
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Technical Details */}
          <div className="card bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-3">
              Wie wird die Entropie berechnet?
            </h4>
            <div className="text-blue-800 dark:text-blue-300 text-sm space-y-2">
              <p>
                Die Entropie misst die Unvorhersagbarkeit eines Passworts in Bits. 
                Sie wird berechnet als: <strong>log₂(Zeichensatz^Länge)</strong>
              </p>
              <p>
                <strong>Zeichensatz-Größen:</strong> Kleinbuchstaben (26), Großbuchstaben (26), 
                Zahlen (10), Symbole (~32)
              </p>
              <p>
                <strong>Ihr Passwort:</strong> {inputPassword.length} Zeichen, 
                geschätzter Zeichensatz: {Math.round(Math.pow(2, entropy/inputPassword.length))}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Passwort Entropie Rechner",
            "description": "Berechnen Sie die Entropie und Sicherheit von Passwörtern. Analyse der Passwort-Stärke nach NIST-Standards.",
            "applicationCategory": "SecurityApplication",
            "operatingSystem": "Web",
            "isAccessibleForFree": true,
            "featureList": [
              "Entropie-Berechnung in Bits",
              "Brute-Force-Zeit-Schätzung", 
              "Sicherheitsstandards-Vergleich",
              "NIST SP 800-63B konform"
            ]
          })
        }}
      />
    </div>
  )
}