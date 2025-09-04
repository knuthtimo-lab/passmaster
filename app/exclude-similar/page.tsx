"use client"

import { motion } from 'framer-motion'
import { 
  Eye, 
  CheckCircle, 
  XCircle,
  ArrowLeft,
  BookOpen,
  Target,
  Users,
  Zap
} from 'lucide-react'
import Link from 'next/link'

export default function ExcludeSimilarPage() {
  const readabilityFeatures = [
    {
      icon: Eye,
      title: "Ähnliche Zeichen ausschließen",
      description: "Verwirrende Zeichen wie 0/O, 1/l/I werden automatisch ausgeschlossen, um Lesbarkeit zu verbessern."
    },
    {
      icon: BookOpen,
      title: "Bessere Lesbarkeit",
      description: "Passwörter sind leichter zu lesen und zu tippen, ohne die Sicherheit zu beeinträchtigen."
    },
    {
      icon: Target,
      title: "Weniger Fehler",
      description: "Reduziert Tippfehler beim manuellen Eingeben von Passwörtern erheblich."
    },
    {
      icon: Users,
      title: "Benutzerfreundlich",
      description: "Besonders nützlich für ältere Benutzer oder bei der Eingabe auf mobilen Geräten."
    }
  ]

  const excludedCharacters = [
    {
      category: "Zahlen und Buchstaben",
      characters: ["0 (Null)", "O (Großes O)", "1 (Eins)", "l (kleines L)", "I (Großes i)"],
      reason: "Diese Zeichen sehen in vielen Schriftarten identisch aus"
    },
    {
      category: "Sonderzeichen",
      characters: ["| (Pipe)", "` (Backtick)", "' (Apostroph)", "\" (Anführungszeichen)"],
      reason: "Können in verschiedenen Kontexten verwirrend sein"
    },
    {
      category: "Leerzeichen",
      characters: [" (Leerzeichen)", "  (Mehrfache Leerzeichen)"],
      reason: "Können beim Kopieren/Einfügen Probleme verursachen"
    }
  ]

  const benefits = [
    {
      icon: Zap,
      title: "Schnellere Eingabe",
      description: "Weniger Verwirrung beim manuellen Tippen von Passwörtern."
    },
    {
      icon: CheckCircle,
      title: "Weniger Fehler",
      description: "Reduziert Tippfehler und damit verbundene Frustration."
    },
    {
      icon: Eye,
      title: "Bessere UX",
      description: "Verbessert die Benutzererfahrung ohne Sicherheitsverlust."
    }
  ]

  const securityImpact = [
    {
      title: "Sicherheit bleibt hoch",
      items: [
        "Entropie wird nur minimal reduziert",
        "Noch immer über 80 Zeichen verfügbar",
        "Kryptographisch sichere Generierung",
        "Ausreichend für alle praktischen Zwecke"
      ]
    },
    {
      title: "Praktische Vorteile",
      items: [
        "Einfachere manuelle Eingabe",
        "Weniger Support-Anfragen",
        "Bessere Benutzerakzeptanz",
        "Reduzierte Fehlerrate"
      ]
    },
    {
      title: "Empfohlene Verwendung",
      items: [
        "Für manuell eingegebene Passwörter",
        "Bei älteren Benutzern",
        "Auf mobilen Geräten",
        "In Umgebungen mit schlechter Sichtbarkeit"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <Link 
              href="/"
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Zurück zu PassMaster
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-full">
              <Eye className="h-12 w-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Lesbarkeit & Benutzerfreundlichkeit
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Verbessern Sie die Lesbarkeit Ihrer Passwörter ohne Sicherheit zu opfern. 
            Ähnliche Zeichen werden automatisch ausgeschlossen.
          </p>
        </motion.div>

        {/* Readability Features */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Lesbarkeits-Features
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Wie PassMaster die Benutzerfreundlichkeit verbessert.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {readabilityFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <feature.icon className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Excluded Characters */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ausgeschlossene Zeichen
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Diese Zeichen werden automatisch ausgeschlossen, um Verwirrung zu vermeiden.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {excludedCharacters.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {category.category}
                </h3>
                <ul className="space-y-2 mb-4">
                  {category.characters.map((char, charIndex) => (
                    <li key={charIndex} className="flex items-center space-x-2">
                      <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300 font-mono text-sm">{char}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                  {category.reason}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Vorteile der Lesbarkeit
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Warum lesbare Passwörter wichtig sind.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                    <benefit.icon className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Security Impact */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Sicherheit vs. Lesbarkeit
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Wie wir das perfekte Gleichgewicht finden.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {securityImpact.map((impact, index) => (
              <motion.div
                key={impact.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {impact.title}
                </h3>
                <ul className="space-y-3">
                  {impact.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Example Comparison */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Beispiel-Vergleich
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <XCircle className="h-5 w-5 text-red-500 mr-2" />
                  Ohne Lesbarkeits-Filter
                </h3>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg font-mono text-sm">
                  <div className="text-red-600 dark:text-red-400 mb-2">Schwer lesbar:</div>
                  <div>K9mP0lI|nQ2v</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Verwirrende Zeichen: 0, l, I, |
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Mit Lesbarkeits-Filter
                </h3>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg font-mono text-sm">
                  <div className="text-green-600 dark:text-green-400 mb-2">Leicht lesbar:</div>
                  <div>K9mP3nQ2vX7w</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Keine verwirrenden Zeichen
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Bereit für bessere Lesbarkeit?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Aktivieren Sie die Lesbarkeits-Option in PassMaster und generieren Sie 
              benutzerfreundliche, aber dennoch sichere Passwörter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Jetzt ausprobieren
              </Link>
              <Link
                href="/client-side"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Sicherheit erfahren
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  )
}
