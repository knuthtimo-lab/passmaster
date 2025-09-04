"use client"

import { motion } from 'framer-motion'
import { 
  Shield, 
  Lock, 
  Server, 
  Eye, 
  Code, 
  CheckCircle, 
  XCircle,
  ArrowRight,
  GitBranch,
  Database,
  Network
} from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Client-side Passwort Generator | PassMaster',
  description: '100% code-auditierbar, local-only. Keine Cloud, volle Transparenz. Web Crypto API, kein Math.random, DSGVO-konform.',
  keywords: ['client-side password generator', 'Web Crypto API', 'local-only', 'Math.random', 'DSGVO', 'auditierbar', 'transparenz'],
  openGraph: {
    title: 'Client-side Passwort Generator | PassMaster',
    description: '100% code-auditierbar, local-only. Keine Cloud, volle Transparenz.',
  },
}

export default function ClientSidePage() {
  const securityFeatures = [
    {
      icon: Lock,
      title: "Web Crypto API",
      description: "Verwendet window.crypto.getRandomValues() für kryptographisch sichere Zufallszahlen. NIST SP 800-63B konform.",
      status: "secure"
    },
    {
      icon: XCircle,
      title: "Kein Math.random()",
      description: "Niemals unsichere Math.random() Funktion. Nur hardwarebasierte Zufallsgeneratoren.",
      status: "secure"
    },
    {
      icon: Shield,
      title: "Keine Server-Kommunikation",
      description: "Zero externe Requests während der Passwort-Generierung. 100% lokale Verarbeitung.",
      status: "secure"
    },
    {
      icon: Code,
      title: "Open Source Audit",
      description: "Vollständig auditierbar auf GitHub. Jede Zeile Code ist öffentlich einsehbar.",
      status: "secure"
    }
  ]

  const dataFlow = [
    {
      step: 1,
      title: "Eingabe im Browser",
      description: "Benutzer wählt Passwort-Parameter (Länge, Zeichensätze)",
      location: "🌐 Ihr Browser"
    },
    {
      step: 2,
      title: "Lokale Verarbeitung",
      description: "Web Crypto API generiert sichere Zufallswerte",
      location: "💻 Lokale Hardware"
    },
    {
      step: 3,
      title: "Passwort-Aufbau",
      description: "Zeichensätze werden basierend auf Zufallswerten zusammengesetzt",
      location: "🔒 Browser-Speicher"
    },
    {
      step: 4,
      title: "Anzeige & Kopieren",
      description: "Fertiges Passwort wird angezeigt, optional in Zwischenablage",
      location: "📋 Lokale Zwischenablage"
    }
  ]

  const comparisonData = [
    {
      feature: "Datenübertragung",
      clientSide: "Keine",
      serverSide: "Vollständige Passwort-Daten",
      icon: Network
    },
    {
      feature: "Zufallsqualität", 
      clientSide: "Hardware-RNG (Web Crypto)",
      serverSide: "Unbekannt/Math.random",
      icon: Shield
    },
    {
      feature: "Auditierbarkeit",
      clientSide: "100% Open Source",
      serverSide: "Server-Code verborgen",
      icon: Eye
    },
    {
      feature: "DSGVO-Konformität",
      clientSide: "Vollständig konform",
      serverSide: "Abhängig vom Anbieter",
      icon: CheckCircle
    }
  ]

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary-100 dark:bg-primary-900/20 rounded-full">
              <Lock className="h-12 w-12 text-primary-600" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Client-seitige Passwort-Generierung
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            100% transparente, auditierbare Sicherheit. Ihre Passwörter verlassen niemals Ihren Browser.
          </p>

          <a 
            href="https://github.com/passmaster/passmaster"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-lg px-8 py-4 inline-flex items-center space-x-2"
          >
            <GitBranch className="h-5 w-5" />
            <span>Code auf GitHub prüfen</span>
          </a>
        </motion.div>

        {/* Security Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Web Crypto API | Datenfluss | DSGVO-Fakten
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="card text-center border-l-4 border-green-500"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
                    <feature.icon className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Data Flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Datenfluss-Diagramm: Was passiert im Browser?
          </h2>
          
          <div className="space-y-6">
            {dataFlow.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center space-x-6"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {step.step}
                </div>
                
                <div className="flex-1 card">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {step.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-primary-600 bg-primary-100 dark:bg-primary-900/20 px-3 py-1 rounded-full">
                        {step.location}
                      </div>
                    </div>
                  </div>
                </div>
                
                {index < dataFlow.length - 1 && (
                  <ArrowRight className="h-6 w-6 text-gray-400 flex-shrink-0" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Client-seitig vs. Server-basiert
          </h2>
          
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">
                      Sicherheitsaspekt
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-green-600">
                      Client-seitig (PassMaster)
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-red-600">
                      Server-basiert
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <motion.tr
                      key={row.feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="border-b border-gray-100 dark:border-gray-800"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <row.icon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                          <span className="font-medium text-gray-900 dark:text-white">
                            {row.feature}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="text-gray-900 dark:text-white">
                            {row.clientSide}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <XCircle className="h-5 w-5 text-red-500" />
                          <span className="text-gray-900 dark:text-white">
                            {row.serverSide}
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

        {/* Technical Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-16"
        >
          <div className="card bg-gray-50 dark:bg-gray-800 border-l-4 border-blue-500">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Technische Sicherheitsdetails
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Kryptographische Standards
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>NIST SP 800-63B konform</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>BSI-konforme Zufallsgenerierung</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Hardware-basierte Entropie</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Datenschutz & DSGVO
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Keine Datenverarbeitung auf Servern</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Keine Cookies oder Tracking</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Vollständige Datenhoheit</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="card"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Häufige Fragen zur Client-seitigen Sicherheit
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Was passiert im Browser?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Alle Passwort-Generierungsprozesse laufen ausschließlich in JavaScript in Ihrem Browser. 
                Die Web Crypto API stellt sichere Zufallszahlen bereit, die nie das Gerät verlassen.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Wie kann ich den Datenfluss überprüfen?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Öffnen Sie die Browser-Entwicklertools (F12), gehen Sie zum "Network" Tab und 
                generieren Sie ein Passwort. Sie werden sehen: Keine Netzwerk-Requests während der Generierung.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Wie kann man den Code auditieren?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Der gesamte Quellcode ist auf GitHub verfügbar. Jede Zeile kann überprüft werden. 
                Es gibt keine verschleierten oder minimifizierten Teile in der Passwort-Generierungslogik.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg"
        >
          <div className="flex items-start space-x-3">
            <Shield className="h-6 w-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
                Sicherheitshinweis
              </h3>
              <p className="text-blue-800 dark:text-blue-300 text-sm">
                Es werden keine Daten übertragen oder gespeichert. Optional Local-only Mode für maximale Sicherheit. 
                Diese Implementierung entspricht BSI- und NIST-Standards für Passwort-Generierung.
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
              "@type": "TechArticle",
              "headline": "Client-seitige Passwort-Generierung",
              "description": "100% transparente, auditierbare Sicherheit. Web Crypto API, kein Math.random, DSGVO-konform.",
              "author": {
                "@type": "Organization",
                "name": "PassMaster"
              },
              "datePublished": new Date().toISOString(),
              "keywords": "client-side, Web Crypto API, DSGVO, Sicherheit, Transparenz"
            })
          }}
        />
      </div>
    </div>
  )
}