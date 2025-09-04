'use client'

import { CalendarDays, User, Clock } from 'lucide-react'

interface Author {
  name: string
  url?: string
  avatar?: string
  bio?: string
}

interface ContentMetaProps {
  publishedDate?: Date | string
  updatedDate?: Date | string
  author?: Author
  readingTime?: number
  showLastUpdated?: boolean
  showPublished?: boolean
  showAuthor?: boolean
  showReadingTime?: boolean
  className?: string
  locale?: string
}

export function ContentMeta({
  publishedDate,
  updatedDate,
  author,
  readingTime,
  showLastUpdated = true,
  showPublished = true,
  showAuthor = true,
  showReadingTime = true,
  className = '',
  locale = 'de-DE'
}: ContentMetaProps) {
  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    
    try {
      return dateObj.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    } catch (error) {
      console.error('Error formatting date:', error)
      return dateObj.toISOString().split('T')[0]
    }
  }

  const getISODate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return dateObj.toISOString()
  }

  return (
    <div className={`flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 ${className}`}>
      {/* Published Date */}
      {showPublished && publishedDate && (
        <div className="flex items-center space-x-1">
          <CalendarDays className="h-4 w-4" />
          <span>Veröffentlicht:</span>
          <time dateTime={getISODate(publishedDate)} className="font-medium">
            {formatDate(publishedDate)}
          </time>
        </div>
      )}

      {/* Last Updated */}
      {showLastUpdated && updatedDate && (
        <div className="flex items-center space-x-1">
          <Clock className="h-4 w-4" />
          <span>Zuletzt aktualisiert:</span>
          <time dateTime={getISODate(updatedDate)} className="font-medium">
            {formatDate(updatedDate)}
          </time>
        </div>
      )}

      {/* Author */}
      {showAuthor && author && (
        <div className="flex items-center space-x-1">
          <User className="h-4 w-4" />
          <span>Von:</span>
          {author.url ? (
            <a
              href={author.url}
              className="font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
              rel="author"
            >
              {author.name}
            </a>
          ) : (
            <span className="font-medium">{author.name}</span>
          )}
        </div>
      )}

      {/* Reading Time */}
      {showReadingTime && readingTime && (
        <div className="flex items-center space-x-1">
          <Clock className="h-4 w-4" />
          <span>{readingTime} Min. Lesezeit</span>
        </div>
      )}
    </div>
  )
}

interface AuthorBoxProps {
  author: Author
  publishedDate?: Date | string
  updatedDate?: Date | string
  className?: string
  locale?: string
}

export function AuthorBox({
  author,
  publishedDate,
  updatedDate,
  className = '',
  locale = 'de-DE'
}: AuthorBoxProps) {
  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return dateObj.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getISODate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return dateObj.toISOString()
  }

  return (
    <div className={`card bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 ${className}`}>
      <div className="flex items-start space-x-4">
        {author.avatar && (
          <img
            src={author.avatar}
            alt={`Avatar von ${author.name}`}
            className="w-16 h-16 rounded-full object-cover"
          />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {author.url ? (
                <a
                  href={author.url}
                  className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
                  rel="author"
                >
                  {author.name}
                </a>
              ) : (
                author.name
              )}
            </h3>
          </div>

          {author.bio && (
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
              {author.bio}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            {publishedDate && (
              <div className="flex items-center space-x-1">
                <CalendarDays className="h-3 w-3" />
                <span>Veröffentlicht:</span>
                <time dateTime={getISODate(publishedDate)}>
                  {formatDate(publishedDate)}
                </time>
              </div>
            )}

            {updatedDate && (
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>Aktualisiert:</span>
                <time dateTime={getISODate(updatedDate)}>
                  {formatDate(updatedDate)}
                </time>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper to calculate reading time
export function calculateReadingTime(text: string, wordsPerMinute = 200): number {
  const words = text.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

// Helper to extract text content from HTML
export function extractTextContent(html: string): string {
  // Simple HTML tag removal for reading time calculation
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

// Hook for getting file modification dates (for MDX files)
export function useContentDates(filePath?: string) {
  // This would be implemented based on your content system
  // For now, return current date as fallback
  return {
    publishedDate: new Date(),
    updatedDate: new Date()
  }
}