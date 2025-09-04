'use client'

interface JsonLdProps {
  data: Record<string, any>
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 2) }}
    />
  )
}

// JSON-LD Builder Functions

export interface OrganizationData {
  name: string
  url: string
  logo: string
  contactEmail: string
  sameAs?: string[]
  description?: string
}

export function buildOrganizationJsonLd(data: OrganizationData) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": data.name,
    "url": data.url,
    "logo": {
      "@type": "ImageObject",
      "url": data.logo,
      "width": "512",
      "height": "512"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": data.contactEmail,
      "contactType": "customer service"
    },
    ...(data.sameAs && { "sameAs": data.sameAs }),
    ...(data.description && { "description": data.description })
  }
}

export interface WebSiteData {
  name: string
  url: string
  description?: string
  author?: {
    name: string
    url?: string
  }
}

export function buildWebSiteJsonLd(data: WebSiteData) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": data.name,
    "url": data.url,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${data.url}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    ...(data.description && { "description": data.description }),
    ...(data.author && {
      "author": {
        "@type": "Person",
        "name": data.author.name,
        ...(data.author.url && { "url": data.author.url })
      }
    })
  }
}

export interface ArticleData {
  headline: string
  description: string
  url: string
  datePublished: string
  dateModified: string
  author: {
    name: string
    url?: string
  }
  images?: string[]
  publisher?: {
    name: string
    logo: string
  }
  mainEntityOfPage?: string
}

export function buildArticleJsonLd(data: ArticleData) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": data.headline,
    "description": data.description,
    "url": data.url,
    "datePublished": data.datePublished,
    "dateModified": data.dateModified,
    "author": {
      "@type": "Person",
      "name": data.author.name,
      ...(data.author.url && { "url": data.author.url })
    },
    ...(data.images && {
      "image": data.images.map(img => ({
        "@type": "ImageObject",
        "url": img
      }))
    }),
    ...(data.publisher && {
      "publisher": {
        "@type": "Organization",
        "name": data.publisher.name,
        "logo": {
          "@type": "ImageObject",
          "url": data.publisher.logo
        }
      }
    }),
    ...(data.mainEntityOfPage && { "mainEntityOfPage": data.mainEntityOfPage })
  }
}

export interface FAQItem {
  question: string
  answer: string
}

export function buildFAQPageJsonLd(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }
}

export interface HowToStep {
  name: string
  text: string
  image?: string
  url?: string
}

export interface HowToData {
  name: string
  description: string
  image?: string
  totalTime?: string
  estimatedCost?: {
    currency: string
    value: string
  }
  supply?: string[]
  tool?: string[]
  steps: HowToStep[]
}

export function buildHowToJsonLd(data: HowToData) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": data.name,
    "description": data.description,
    ...(data.image && {
      "image": {
        "@type": "ImageObject",
        "url": data.image
      }
    }),
    ...(data.totalTime && { "totalTime": data.totalTime }),
    ...(data.estimatedCost && {
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": data.estimatedCost.currency,
        "value": data.estimatedCost.value
      }
    }),
    ...(data.supply && {
      "supply": data.supply.map(item => ({
        "@type": "HowToSupply",
        "name": item
      }))
    }),
    ...(data.tool && {
      "tool": data.tool.map(item => ({
        "@type": "HowToTool",
        "name": item
      }))
    }),
    "step": data.steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      ...(step.image && {
        "image": {
          "@type": "ImageObject",
          "url": step.image
        }
      }),
      ...(step.url && { "url": step.url })
    }))
  }
}

export interface BreadcrumbItem {
  name: string
  url: string
}

export function buildBreadcrumbListJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }
}

export interface SoftwareApplicationData {
  name: string
  description: string
  applicationCategory: string
  operatingSystem: string
  url: string
  downloadUrl?: string
  version?: string
  price?: string
  priceCurrency?: string
  screenshot?: string[]
  featureList?: string[]
  author?: {
    name: string
    url?: string
  }
}

export function buildSoftwareApplicationJsonLd(data: SoftwareApplicationData) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": data.name,
    "description": data.description,
    "applicationCategory": data.applicationCategory,
    "operatingSystem": data.operatingSystem,
    "url": data.url,
    ...(data.downloadUrl && { "downloadUrl": data.downloadUrl }),
    ...(data.version && { "softwareVersion": data.version }),
    "offers": {
      "@type": "Offer",
      "price": data.price || "0",
      "priceCurrency": data.priceCurrency || "EUR"
    },
    "isAccessibleForFree": !data.price || data.price === "0",
    ...(data.screenshot && {
      "screenshot": data.screenshot.map(img => ({
        "@type": "ImageObject",
        "url": img
      }))
    }),
    ...(data.featureList && { "featureList": data.featureList }),
    ...(data.author && {
      "author": {
        "@type": "Organization",
        "name": data.author.name,
        ...(data.author.url && { "url": data.author.url })
      }
    })
  }
}

// Helper Components

export function OrganizationJsonLd(props: OrganizationData) {
  return <JsonLd data={buildOrganizationJsonLd(props)} />
}

export function WebSiteJsonLd(props: WebSiteData) {
  return <JsonLd data={buildWebSiteJsonLd(props)} />
}

export function ArticleJsonLd(props: ArticleData) {
  return <JsonLd data={buildArticleJsonLd(props)} />
}

export function FAQPageJsonLd({ faqs }: { faqs: FAQItem[] }) {
  return <JsonLd data={buildFAQPageJsonLd(faqs)} />
}

export function HowToJsonLd(props: HowToData) {
  return <JsonLd data={buildHowToJsonLd(props)} />
}

export function BreadcrumbListJsonLd({ items }: { items: BreadcrumbItem[] }) {
  return <JsonLd data={buildBreadcrumbListJsonLd(items)} />
}

export function SoftwareApplicationJsonLd(props: SoftwareApplicationData) {
  return <JsonLd data={buildSoftwareApplicationJsonLd(props)} />
}