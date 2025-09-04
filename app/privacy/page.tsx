"use client"

import { motion } from 'framer-motion'
import { 
  Shield, 
  Lock, 
  Eye, 
  Server, 
  FileText, 
  CheckCircle,
  ArrowLeft
} from 'lucide-react'
import Link from 'next/link'

export default function PrivacyPage() {
  const privacyFeatures = [
    {
      icon: Lock,
      title: "Client-Side Only",
      description: "All password generation happens locally in your browser. No data is ever sent to our servers."
    },
    {
      icon: Eye,
      title: "No Tracking",
      description: "We don't use cookies, analytics, or any tracking mechanisms. Your privacy is guaranteed."
    },
    {
      icon: Server,
      title: "No Server Storage",
      description: "We don't store any passwords, user data, or personal information on our servers."
    },
  ]

  const dataPractices = [
    {
      title: "What We Don't Collect",
      items: [
        "Passwords or generated content",
        "Personal information",
        "IP addresses",
        "Browser history",
        "Usage analytics",
        "Device information"
      ]
    },
    {
      title: "What We Don't Store",
      items: [
        "User accounts",
        "Password history",
        "Settings or preferences",
        "Session data",
        "Cookies or local storage",
        "Any personal data"
      ]
    },
    {
      title: "What We Don't Share",
      items: [
        "No third-party services",
        "No advertising networks",
        "No analytics providers",
        "No data brokers",
        "No government requests",
        "No commercial use"
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
            Your privacy is our top priority. PassMaster is designed with privacy-first principles.
          </p>
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
              Privacy-First Design
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Every aspect of PassMaster is built to protect your privacy.
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

        {/* Data Practices */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Data Practices
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Transparency about how we handle (or don't handle) your data.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {dataPractices.map((practice, index) => (
              <motion.div
                key={practice.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {practice.title}
                </h3>
                <ul className="space-y-3">
                  {practice.items.map((item, itemIndex) => (
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

        {/* Technical Details */}
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
                  <span><strong>No Dependencies:</strong> We don't use external services or third-party libraries that could track you</span>
                </li>
              </ul>
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
            className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Questions About Privacy?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We're committed to transparency. If you have any questions about our privacy practices, 
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
