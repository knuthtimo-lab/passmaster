'use client'

import { useState, useEffect } from 'react'
import { Cookie, X, Settings } from 'lucide-react'

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  advertising: boolean
}

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    advertising: false
  })

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setShowBanner(true)
    } else {
      const savedPreferences = JSON.parse(consent)
      setPreferences(savedPreferences)
    }
  }, [])

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(prefs))
    localStorage.setItem('cookie-consent-date', new Date().toISOString())
    setPreferences(prefs)
    setShowBanner(false)
    setShowSettings(false)

    // Show reload message if needed
    if (!prefs.analytics || !prefs.advertising) {
      alert('Your preferences have been saved. Please reload the page for changes to take effect.')
    }
  }

  const acceptAll = () => {
    savePreferences({
      necessary: true,
      analytics: true,
      advertising: true
    })
  }

  const acceptNecessary = () => {
    savePreferences({
      necessary: true,
      analytics: false,
      advertising: false
    })
  }

  const handlePreferenceChange = (type: keyof CookiePreferences, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [type]: value
    }))
  }

  if (!showBanner) {
    return null
  }

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg z-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex items-start gap-3 flex-1">
              <Cookie className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-gray-700 dark:text-gray-300">
                <p className="font-medium mb-1">We use cookies to enhance your experience</p>
                <p>
                  This site uses essential cookies for functionality, and optional cookies for analytics and advertising. 
                  You can customize your preferences or accept all cookies.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <button
                onClick={() => setShowSettings(true)}
                className="flex items-center justify-center gap-2 px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <Settings className="h-4 w-4" />
                Customize
              </button>
              <button
                onClick={acceptNecessary}
                className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Necessary Only
              </button>
              <button
                onClick={acceptAll}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Cookie Preferences</h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                {/* Necessary Cookies */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">Necessary Cookies</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Essential for website functionality. These cannot be disabled.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={true}
                      disabled
                      className="h-4 w-4 text-blue-600 rounded border-gray-300"
                    />
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">Analytics Cookies</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Currently disabled. No analytics or tracking data is collected.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => handlePreferenceChange('analytics', e.target.checked)}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300"
                    />
                  </div>
                </div>

                {/* Advertising Cookies */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">Advertising Cookies</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Used to show you relevant ads based on your interests. 
                      Provided by Google AdSense and other advertising partners.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={preferences.advertising}
                      onChange={(e) => handlePreferenceChange('advertising', e.target.checked)}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => savePreferences(preferences)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Preferences
                </button>
                <button
                  onClick={acceptAll}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}