"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "Ist der Passwort Generator 100% client-seitig?",
    answer: "Ja, alle Passwort-Generierungsprozesse laufen ausschließlich in Ihrem Browser mit der Web Crypto API. Keine Daten werden jemals an unsere Server übertragen. PassMaster verwendet window.crypto.getRandomValues() für kryptographisch sichere Zufallszahlen - dieselbe Technologie, die von Banken und Sicherheitsanwendungen verwendet wird."
  },
  {
    question: "Funktioniert der Generator offline als PWA?",
    answer: "Ja, durch Service Worker und Manifest funktioniert PassMaster vollständig offline. Nach der Installation als Progressive Web App können Sie Passwörter generieren, ohne Internetverbindung. Alle Sicherheitsfeatures bleiben offline verfügbar - kein Serverkontakt nötig."
  },
  {
    question: "Kann man ähnliche Zeichen ausschließen?",
    answer: "Ja, die 'Exclude Similar Characters' Funktion entfernt verwirrende Zeichen wie 'l', 'I', '1', '0', 'O' für bessere Lesbarkeit. Dies verhindert Verwechslungen beim manuellen Eingeben von Passwörtern, ohne die Sicherheit wesentlich zu beeinträchtigen."
  },
  {
    question: "Entspricht der Generator DSGVO-Richtlinien?",
    answer: "Ja, PassMaster ist vollständig DSGVO-konform. Es erfolgt keine Speicherung oder Übertragung von Daten. Alle Prozesse laufen lokal in Ihrem Browser ab. Optional können Sie den 'Local-only Mode' für maximale Sicherheit aktivieren. Keine Cookies, kein Tracking, keine Datenverarbeitung auf Servern."
  },
  {
    question: "Wie wird die Sicherheit der Passwörter gewährleistet?",
    answer: "PassMaster verwendet ausschließlich window.crypto.getRandomValues() - niemals Math.random(). Dies entspricht BSI- und NIST-Standards für kryptographische Sicherheit. Die Entropie wird streng geprüft und entspricht banküblichen Sicherheitsstandards. Der Code ist vollständig auditierbar und open-source."
  },
  {
    question: "Was bedeutet 'Web Crypto API' für die Sicherheit?",
    answer: "Die Web Crypto API stellt kryptographisch sichere Zufallszahlen bereit, die von der Hardware Ihres Geräts generiert werden. Dies ist derselbe Standard, der von Finanzinstituten verwendet wird. Im Gegensatz zu Math.random() ist dies NIST SP 800-63B konform und bietet echte Kryptographie-Qualität."
  },
  {
    question: "Wie kann ich die Sicherheit selbst überprüfen?",
    answer: "Der gesamte Code ist open-source und auf GitHub auditierbar. Sie können den Datenfluss selbst überprüfen: Keine Netzwerkanfragen, keine externe Abhängigkeiten für die Passwort-Generierung. Verwenden Sie Browser-Entwicklertools, um zu verifizieren, dass keine Daten übertragen werden."
  },
  {
    question: "Warum ist lokale Generierung sicherer als Online-Tools?",
    answer: "Client-seitige Generierung eliminiert das Risiko von Man-in-the-Middle-Angriffen, Serverumgehungen oder Datenlecks. Ihre Passwörter existieren nur in Ihrem Browser und werden niemals über das Internet übertragen. Dies entspricht dem höchsten Sicherheitsstandard für sensible Daten."
  },
  {
    question: "Unterstützt PassMaster Diceware-Passphrasen?",
    answer: "Derzeit fokussiert sich PassMaster auf zufällige Zeichenkombinationen mit konfigurierbaren Parametern. Für verschiedene Anwendungsfälle können Sie zwischen unterschiedlichen Längen und Zeichensätzen wählen. Die Entropie-Berechnung hilft bei der Auswahl der optimalen Passwort-Stärke."
  }
]

export function FAQ() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

  return (
    <div className="space-y-4">
      {faqData.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="card"
        >
          <button
            onClick={() => toggleItem(index)}
            className="w-full flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded-lg p-4"
            aria-expanded={openItems.has(index)}
            aria-controls={`faq-answer-${index}`}
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
              {item.question}
            </h3>
            <div className="flex-shrink-0">
              {openItems.has(index) ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </div>
          </button>
          
          <AnimatePresence>
            {openItems.has(index) && (
              <motion.div
                id={`faq-answer-${index}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}

      {/* JSON-LD Schema for FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map((item, index) => ({
              "@type": "Question",
              "name": item.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
              }
            }))
          })
        }}
      />
    </div>
  )
}
