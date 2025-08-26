"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Wifi, 
  WifiOff, 
  CheckCircle, 
  XCircle, 
  RefreshCw,
  ArrowLeft
} from 'lucide-react'
import Link from 'next/link'

export default function OfflineTestPage() {
  const [isOnline, setIsOnline] = useState(true)
  const [serviceWorkerStatus, setServiceWorkerStatus] = useState<string>('checking')
  const [cacheStatus, setCacheStatus] = useState<string>('checking')

  useEffect(() => {
    // Check online status
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine)
    }

    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)
    updateOnlineStatus()

    // Check service worker status
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        if (registration.active) {
          setServiceWorkerStatus('active')
        } else {
          setServiceWorkerStatus('inactive')
        }
      }).catch(() => {
        setServiceWorkerStatus('error')
      })
    } else {
      setServiceWorkerStatus('not-supported')
    }

    // Check cache status
    if ('caches' in window) {
      caches.open('passmaster-v1.0.0').then((cache) => {
        cache.keys().then((keys) => {
          if (keys.length > 0) {
            setCacheStatus('cached')
          } else {
            setCacheStatus('empty')
          }
        })
      }).catch(() => {
        setCacheStatus('error')
      })
    } else {
      setCacheStatus('not-supported')
    }

    return () => {
      window.removeEventListener('online', updateOnlineStatus)
      window.removeEventListener('offline', updateOnlineStatus)
    }
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'cached':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'inactive':
      case 'empty':
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />
      case 'checking':
        return <RefreshCw className="h-5 w-5 text-yellow-500 animate-spin" />
      default:
        return <XCircle className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Service Worker Active'
      case 'inactive':
        return 'Service Worker Inactive'
      case 'error':
        return 'Service Worker Error'
      case 'not-supported':
        return 'Service Worker Not Supported'
      case 'cached':
        return 'Resources Cached'
      case 'empty':
        return 'Cache Empty'
      case 'checking':
        return 'Checking...'
      default:
        return 'Unknown Status'
    }
  }

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
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className={`p-4 rounded-full ${isOnline ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
              {isOnline ? (
                <Wifi className="h-12 w-12 text-green-600" />
              ) : (
                <WifiOff className="h-12 w-12 text-red-600" />
              )}
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Offline Functionality Test
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Test your PWA's offline capabilities and service worker status.
          </p>
        </motion.div>

        {/* Status Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Connection Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border ${
              isOnline ? 'border-green-200 dark:border-green-800' : 'border-red-200 dark:border-red-800'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Connection Status
              </h3>
              {isOnline ? (
                <Wifi className="h-6 w-6 text-green-500" />
              ) : (
                <WifiOff className="h-6 w-6 text-red-500" />
              )}
            </div>
            <p className={`text-sm ${isOnline ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {isOnline ? 'You are currently online' : 'You are currently offline'}
            </p>
          </motion.div>

          {/* Service Worker Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Service Worker
              </h3>
              {getStatusIcon(serviceWorkerStatus)}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {getStatusText(serviceWorkerStatus)}
            </p>
          </motion.div>

          {/* Cache Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Cache Status
              </h3>
              {getStatusIcon(cacheStatus)}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {getStatusText(cacheStatus)}
            </p>
          </motion.div>

          {/* PWA Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                PWA Status
              </h3>
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {isOnline && serviceWorkerStatus === 'active' && cacheStatus === 'cached' 
                ? 'Ready for offline use' 
                : 'Some features may not work offline'}
            </p>
          </motion.div>
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            How to Test Offline Functionality
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <p>Make sure you're online and the service worker is active (green checkmark above)</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <p>Navigate to the main page and let it fully load</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <p>Disconnect your internet connection (turn off WiFi or unplug ethernet)</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                4
              </div>
              <p>Try navigating back to the main page - it should still work offline!</p>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Go to Main Page
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Refresh Page
          </button>
        </motion.div>
      </div>
    </div>
  )
}
