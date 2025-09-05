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
  Key,
  Globe,
  Zap
} from 'lucide-react'
import Link from 'next/link'

export default function ClientSidePage() {
  const securityFeatures = [
    {
      icon: Lock,
      title: "Client-Side Encryption",
      description: "All password generation happens locally in your browser using the Web Crypto API. Your passwords never leave your device."
    },
    {
      icon: Eye,
      title: "No Server Communication",
      description: "After the initial page load, the app works completely offline. No data is sent to or received from any servers."
    },
    {
      icon: Server,
      title: "Zero Data Storage",
      description: "We don't store any passwords, user data, or personal information. Everything is processed locally and immediately discarded."
    },
  ]

  const technicalDetails = [
    {
      title: "Web Crypto API",
      items: [
        "Cryptographically secure random number generation",
        "Industry-standard encryption algorithms",
        "Hardware-based entropy when available",
        "No reliance on Math.random() or weak PRNGs"
      ]
    },
    {
      title: "Local Processing",
      items: [
        "All password generation in JavaScript",
        "No network requests during generation",
        "Immediate memory cleanup after use",
        "No persistent storage of generated passwords"
      ]
    },
    {
      title: "Privacy Protection",
      items: [
        "Privacy-focused analytics (optional)",
        "Cookie consent controls",
        "Minimal trusted third-party services",
        "Transparent data collection practices"
      ]
    }
  ]

  const securityBenefits = [
    {
      icon: Key,
      title: "Maximum Security",
      description: "Your passwords are generated using the same cryptographic standards used by banks and government agencies."
    },
    {
      icon: Globe,
      title: "Complete Privacy",
      description: "No one, including us, can see or access your generated passwords. They exist only on your device."
    },
    {
      icon: Zap,
      title: "Instant Generation",
      description: "Generate passwords in milliseconds without any network delays or server dependencies."
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
            <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-full">
              <Shield className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Client-Side Security
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Maximum security through local processing. Your passwords are generated exclusively in your browser and never leave your device.
          </p>
        </motion.div>

        {/* Security Features */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Security Features
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Every aspect of PassMaster is designed to maximize your security.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {securityFeatures.map((feature, index) => (
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
                    <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                      <feature.icon className="h-6 w-6 text-green-600" />
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

        {/* Security Benefits */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Client-Side Security?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              The benefits of local password generation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {securityBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-full">
                    <benefit.icon className="h-8 w-8 text-green-600" />
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

        {/* Technical Details */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Technical Details
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              How PassMaster ensures your security.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {technicalDetails.map((detail, index) => (
              <motion.div
                key={detail.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {detail.title}
                </h3>
                <ul className="space-y-3">
                  {detail.items.map((item, itemIndex) => (
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

        {/* Implementation Details */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center mb-6">
              <FileText className="h-8 w-8 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Technical Implementation
              </h2>
            </div>
            
            <div className="prose dark:prose-invert max-w-none">
              <h3 className="text-lg font-semibold mb-4">How PassMaster Works</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Local Processing:</strong> All password generation happens in your browser using JavaScript</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>No Network Requests:</strong> The app works completely offline after initial load</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Minimal Dependencies:</strong> We only use trusted services for analytics and advertising (with your consent)</span>
                </li>
              </ul>
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
            className="bg-green-50 dark:bg-green-900/20 rounded-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Questions About Security?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We are committed to transparency. If you have questions about our security practices, 
              please contact us.
            </p>
            <div className="flex justify-center">
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
