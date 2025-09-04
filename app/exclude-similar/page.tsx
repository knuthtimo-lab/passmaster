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
      title: "Exclude Similar Characters",
      description: "Confusing characters like 0/O, 1/l/I are automatically excluded to improve readability."
    },
    {
      icon: BookOpen,
      title: "Better Readability",
      description: "Passwords are easier to read and type without compromising security."
    },
    {
      icon: Target,
      title: "Fewer Errors",
      description: "Significantly reduces typing errors when manually entering passwords."
    },
    {
      icon: Users,
      title: "User-Friendly",
      description: "Especially useful for older users or when typing on mobile devices."
    }
  ]

  const excludedCharacters = [
    {
      category: "Numbers and Letters",
      characters: ["0 (Zero)", "O (Capital O)", "1 (One)", "l (lowercase L)", "I (Capital I)"],
      reason: "These characters look identical in many fonts"
    },
    {
      category: "Special Characters",
      characters: ["| (Pipe)", "` (Backtick)", "' (Apostrophe)", "\" (Quotation marks)"],
      reason: "Can be confusing in different contexts"
    },
    {
      category: "Spaces",
      characters: [" (Space)", "  (Multiple spaces)"],
      reason: "Can cause problems when copying/pasting"
    }
  ]

  const benefits = [
    {
      icon: Zap,
      title: "Faster Input",
      description: "Less confusion when manually typing passwords."
    },
    {
      icon: CheckCircle,
      title: "Fewer Errors",
      description: "Reduces typing errors and associated frustration."
    },
    {
      icon: Eye,
      title: "Better UX",
      description: "Improves user experience without security loss."
    }
  ]

  const securityImpact = [
    {
      title: "Security Remains High",
      items: [
        "Entropy is only minimally reduced",
        "Still over 80 characters available",
        "Cryptographically secure generation",
        "Sufficient for all practical purposes"
      ]
    },
    {
      title: "Practical Benefits",
      items: [
        "Easier manual input",
        "Fewer support requests",
        "Better user acceptance",
        "Reduced error rate"
      ]
    },
    {
      title: "Recommended Usage",
      items: [
        "For manually entered passwords",
        "For older users",
        "On mobile devices",
        "In environments with poor visibility"
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
              <Eye className="h-12 w-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Readability & User-Friendliness
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Improve the readability of your passwords without sacrificing security. 
            Similar characters are automatically excluded.
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
              Readability Features
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              How PassMaster improves user-friendliness.
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
              Excluded Characters
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              These characters are automatically excluded to avoid confusion.
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
              Benefits of Readability
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Why readable passwords are important.
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
              Security vs. Readability
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              How we find the perfect balance.
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
              Example Comparison
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <XCircle className="h-5 w-5 text-red-500 mr-2" />
                  Without Readability Filter
                </h3>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg font-mono text-sm">
                  <div className="text-red-600 dark:text-red-400 mb-2">Hard to read:</div>
                  <div>K9mP0lI|nQ2v</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Confusing characters: 0, l, I, |
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  With Readability Filter
                </h3>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg font-mono text-sm">
                  <div className="text-green-600 dark:text-green-400 mb-2">Easy to read:</div>
                  <div>K9mP3nQ2vX7w</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    No confusing characters
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
              Ready for Better Readability?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Enable the readability option in PassMaster and generate 
              user-friendly, yet secure passwords.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Try Now
              </Link>
              <Link
                href="/client-side"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Learn About Security
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  )
}
