"use client"

import { motion } from 'framer-motion'
import { 
  Shield, 
  Lock, 
  Eye, 
  Server, 
  FileText, 
  CheckCircle,
  ArrowLeft,
  Cookie,
  BarChart3,
  Target
} from 'lucide-react'
import Link from 'next/link'

export default function PrivacyPage() {
  const privacyFeatures = [
    {
      icon: Lock,
      title: "Client-Side Password Generation",
      description: "All password generation happens locally in your browser. No passwords are ever sent to our servers."
    },
    {
      icon: Eye,
      title: "No Analytics Tracking",
      description: "We do not collect any analytics or tracking data. Your usage patterns remain completely private."
    },
    {
      icon: Server,
      title: "No Password Storage",
      description: "We don't store any passwords, user data, or personal information on our servers."
    },
    {
      icon: Shield,
      title: "Open Source",
      description: "All code is publicly available and auditable. You can verify our privacy claims yourself."
    }
  ]

  const dataCollection = [
    {
      title: "What We Collect",
      items: [
        "Essential cookies for basic website functionality only",
        "AdSense cookies for advertising (with your consent)",
        "Locally stored preferences (never transmitted to servers)",
        "No analytics, tracking, or behavioral data whatsoever"
      ]
    },
    {
      title: "What We NEVER Collect",
      items: [
        "Generated passwords or any password-related data",
        "Personal information, names, emails, or identity data",
        "Usage analytics, page views, or behavioral tracking",
        "Technical fingerprinting or device identification",
        "Location data or browsing history",
        "Any data that could compromise your privacy"
      ]
    },
    {
      title: "How We Protect Your Privacy",
      items: [
        "100% client-side password generation - nothing sent to servers",
        "No analytics tracking means your usage patterns stay private",
        "Only essential cookies and optional advertising cookies",
        "Open source code allows you to verify our privacy claims",
        "GDPR-compliant with transparent data handling",
        "You control all cookie preferences and can opt out anytime"
      ]
    }
  ]

  const thirdPartyServices = [
    {
      name: "Google AdSense",
      purpose: "Display relevant advertisements to support the free service",
      dataShared: "Anonymous browsing data for ad targeting, interaction with ads",
      optOut: "Yes - via cookie preferences and Google Ad Settings",
      icon: Target
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
              Back to PassMaster
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
              <Shield className="h-12 w-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Your privacy matters to us. This page explains exactly what data we collect, how we use it, and how you can control your privacy preferences.
          </p>
        </motion.div>

        {/* Last Updated */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-12 text-sm text-gray-500 dark:text-gray-400"
        >
          Last updated: {new Date().toLocaleDateString()}
        </motion.div>

        {/* Privacy Features */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Privacy Principles
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              We believe in transparency and giving you control over your data.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {privacyFeatures.map((feature, index) => (
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

        {/* Data Collection */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Data Collection & Usage
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Complete transparency about what data we collect and why.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {dataCollection.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.items.map((item, itemIndex) => (
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

        {/* Third-Party Services */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Third-Party Services
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              We use these trusted services to provide and improve our service.
            </p>
          </motion.div>

          <div className="space-y-8">
            {thirdPartyServices.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <service.icon className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {service.name}
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-1">Purpose:</h4>
                        <p className="text-gray-600 dark:text-gray-300">{service.purpose}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-1">Data Shared:</h4>
                        <p className="text-gray-600 dark:text-gray-300">{service.dataShared}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-1">Opt-Out:</h4>
                        <p className="text-gray-600 dark:text-gray-300">{service.optOut}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Cookie Information */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center mb-6">
              <Cookie className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Cookie Usage
              </h2>
            </div>
            
            <div className="prose dark:prose-invert max-w-none">
              <h3 className="text-lg font-semibold mb-4">How We Use Cookies</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Essential Cookies</h4>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li>• Remember your cookie preferences</li>
                    <li>• Maintain site functionality</li>
                    <li>• These cannot be disabled</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Optional Cookies</h4>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li>• Advertising cookies (Google AdSense)</li>
                    <li>• You can opt-out of these anytime</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Your Control:</strong> You can manage your cookie preferences through our cookie banner 
                  or adjust your browser settings to block cookies entirely.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Technical Security */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center mb-6">
              <FileText className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Technical Implementation & Security
              </h2>
            </div>
            
            <div className="prose dark:prose-invert max-w-none">
              <h3 className="text-lg font-semibold mb-4">How PassMaster Protects Your Privacy</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Client-Side Processing:</strong> All password generation happens in your browser using JavaScript - never on our servers</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>No Password Transmission:</strong> Generated passwords never leave your device</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Open Source:</strong> All code is publicly available on GitHub for verification</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Secure Dependencies:</strong> We only use trusted, privacy-focused third-party services</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>HTTPS Encryption:</strong> All data transmission is encrypted using modern security protocols</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </section>

        {/* Your Rights */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Your Privacy Rights
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">You Have the Right To:</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Opt-out of analytics and advertising cookies</li>
                  <li>• Request information about data we collect</li>
                  <li>• Delete your data (though we store very little)</li>
                  <li>• Use the service without accepting optional cookies</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">How to Exercise Your Rights:</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Use our cookie preferences panel</li>
                  <li>• Adjust your browser settings</li>
                  <li>• Contact us directly</li>
                  <li>• Visit third-party opt-out pages</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Contact */}
        <section className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Questions About Privacy?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We're committed to transparency. If you have any questions about our privacy practices, 
              please review our source code or contact us directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com/your-repo/passmaster"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                View Source Code
              </a>
              <Link
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Back to Generator
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  )
}