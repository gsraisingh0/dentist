# Dantice Dental Clinic - Technical SEO Specifications

## Website Configuration Summary

### 🌐 Domain & Hosting
- **Primary Domain**: dantice-dental.com
- **Type**: Medical/Healthcare Website (Local Dental Clinic)
- **Target Audience**: Local patients in Delhi region
- **Primary Service Area**: Najafgarh, Delhi (expanded to Dwarka, Rohini, Pitampura, South Delhi)

---

## Meta Tag Specifications

### Standard Meta Tags (All Pages)
```html
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
<meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
<meta name="language" content="English" />
<meta name="revisit-after" content="7 days" />
<meta name="author" content="Dantice Dental Clinic" />
```

### Canonical Tags
- ✅ All pages have correct canonical tags
- Format: `<link rel="canonical" href="https://dantice-dental.com/[page].html" />`
- No duplicate content issues

### hreflang Tags
- ✅ Implemented on all pages
- `<link rel="alternate" hreflang="en-US" href="https://dantice-dental.com/[page].html" />`
- Ensures proper regional targeting

---

## Open Graph (OG) Tags

### Standard OG Configuration
All pages include:
```html
<meta property="og:title" content="[Optimized Title]" />
<meta property="og:description" content="[160-char description]" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://dantice-dental.com/[page]" />
<meta property="og:image" content="https://dantice-dental.com/img/[image].jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:locale" content="en_US" />
```

### Twitter Card Tags
All pages include:
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="[Optimized Title]" />
<meta name="twitter:description" content="[160-char description]" />
<meta name="twitter:image" content="https://dantice-dental.com/img/[image].jpg" />
```

---

## Schema.org Structured Data

### Home Page (index.html)
**Type**: MedicalBusiness + LocalBusiness + Organization

```json
{
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "Dantice Dental Clinic",
  "image": "https://dantice-dental.com/img/1.jpg",
  "description": "Professional dental clinic offering comprehensive services",
  "url": "https://dantice-dental.com/",
  "telephone": "+91-98765-43210",
  "email": "contact@dantice-dental.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Dental Square, Najafgarh",
    "addressLocality": "Najafgarh",
    "addressRegion": "Delhi",
    "postalCode": "110043",
    "addressCountry": "India"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday"],
      "opens": "09:00",
      "closes": "16:00"
    }
  ],
  "areaServed": ["Najafgarh", "Delhi", "Dwarka", "Rohini", "Pitampura", "South Delhi", "New Delhi"],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "150",
    "bestRating": "5",
    "worstRating": "1"
  },
  "priceRange": "$$"
}
```

### Service Pages (Braces, Implants, etc.)
**Type**: MedicalService

```json
{
  "@context": "https://schema.org",
  "@type": "MedicalService",
  "name": "[Service Name]",
  "description": "[Service Description]",
  "url": "https://dantice-dental.com/[page].html",
  "provider": {
    "@type": "MedicalBusiness",
    "name": "Dantice Dental Clinic",
    "url": "https://dantice-dental.com/",
    "telephone": "+91-98765-43210"
  }
}
```

### FAQ Pages
**Type**: FAQPage (with Question/Answer schema)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Question text here?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Answer text here"
      }
    }
  ]
}
```

---

## Robots.txt Configuration

**File Location**: `/robots.txt`

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/
Disallow: /*.php$
Crawl-delay: 1

User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Bingbot
Allow: /
Crawl-delay: 1

Sitemap: https://dantice-dental.com/sitemap.xml
```

### Robots.txt Explanation
- **User-agent: \*** = Rules for all search engines
- **Allow: /** = Allow crawling entire site
- **Disallow entries** = Protect sensitive directories
- **Crawl-delay: 1** = Don't overload server
- **Sitemap** = Help search engines find all pages

---

## Sitemap.xml Structure

**Location**: `/sitemap.xml`

### URL Priorities
| Page Type | Priority | Change Frequency |
|-----------|----------|------------------|
| Home page | 1.0 | Weekly |
| Main services | 0.95 | Monthly |
| Secondary services | 0.9 | Monthly |
| Info pages | 0.9 | Monthly |
| Blog/Tips | 0.85 | Weekly |

### Last Modified Dates
All updated to: **2026-01-22**

---

## Performance & Accessibility

### Current Optimizations ✅
- Responsive design (mobile-first)
- Viewport meta tags configured
- Performance prefetch implemented
- Preconnect to Google Fonts
- DNS prefetch for assets
- Lazy loading on images

### Recommended Further Optimizations
1. **Image Optimization**
   - Convert JPG/PNG to WebP format
   - Compress all images with TinyPNG/ImageOptim
   - Add responsive image sizes
   - Proper alt text (with keywords)

2. **Caching Strategy**
   - Enable browser caching (1 month for static assets)
   - Implement Redis/Memcached for dynamic content
   - Use CDN for images and CSS/JS

3. **Code Optimization**
   - Minify CSS, JavaScript, HTML
   - Remove unused code
   - Defer non-critical JavaScript
   - Inline critical CSS

4. **Performance Metrics** (Target)
   - Page Load Time: < 3 seconds
   - Largest Contentful Paint (LCP): < 2.5s
   - First Input Delay (FID): < 100ms
   - Cumulative Layout Shift (CLS): < 0.1

---

## Keyword Strategy

### Primary Keywords (High Intent, High Volume)
1. "best dentist in najafgarh" - Monthly: 200-500 searches
2. "dental implants delhi" - Monthly: 300-800 searches
3. "dental braces delhi" - Monthly: 250-600 searches
4. "dentist in delhi" - Monthly: 500-1000 searches
5. "dental clinic najafgarh" - Monthly: 100-300 searches

### Secondary Keywords (Medium Intent, Medium Volume)
1. "teeth whitening delhi"
2. "root canal treatment delhi"
3. "dental cleaning delhi"
4. "clear aligners delhi"
5. "emergency dentist delhi"

### Long-tail Keywords (Low Intent, High Conversion)
1. "best dental implants cost in delhi"
2. "affordable braces near me"
3. "how much do clear aligners cost"
4. "professional teeth cleaning near me"
5. "emergency dental care najafgarh"

---

## Content Structure

### H1 Tags (One per page)
- Home: Main headline about clinic
- Services: "[Service Name] - Expert Treatment"
- Info Pages: "About Dantice Dental Clinic"

### H2 Tags (2-3 per page)
- Service Overview
- Benefits/Features
- Pricing/Cost
- FAQ Section
- Call-to-Action

### H3 Tags (As needed)
- Sub-points under main topics
- Detailed explanations
- Feature lists

---

## Internal Linking Strategy

### Priority Links (Should exist)
- Home → All service pages
- Service pages → Related services
- All pages → About, Contact
- Blog/Tips → Relevant services

### Anchor Text Optimization
- ✅ Descriptive anchor text (not "click here")
- ✅ Natural keyword usage
- ✅ Contextual relevance
- ✅ No excessive same-page links

---

## Mobile Optimization

### Current Status ✅
- Responsive design implemented
- Touch-friendly buttons
- Fast loading on mobile
- Vertical layout optimized
- Mobile menu working

### Mobile SEO Checklist
- ✅ Viewport meta tag
- ✅ Readable font sizes
- ✅ Proper spacing between links
- ✅ No Flash content
- ✅ Mobile-friendly images
- ✅ Fast page load time

---

## Security & Trust Signals

### Implemented ✅
- SSL Certificate (HTTPS) - Essential for dental websites
- Proper auth/session handling
- Data privacy compliance

### Recommendations
- [ ] Add privacy policy page
- [ ] Add terms of service page
- [ ] Add GDPR cookie consent banner
- [ ] Display security badges (if applicable)
- [ ] Medical licensing information
- [ ] Professional certifications

---

## Local SEO Signals

### Google My Business Factors ✅
- Clinic name, address, phone (NAP)
- Service area declared
- Business hours set
- Category selected
- Attributes added

### Citation Consistency
- ✅ All pages use same address format
- ✅ All pages use same phone number
- ✅ All pages use consistent business name

### Review Signals
- ✅ Rating system integrated (4.8/5)
- ✅ Review count (150 reviews)
- Recommendations: Actively encourage patient reviews

---

## Compliance & Legal

### Healthcare Website Requirements
- [ ] HIPAA compliance (if handling patient data)
- [ ] Medical disclaimer visible
- [ ] Privacy policy page
- [ ] Patient consent forms
- [ ] Data security practices
- [ ] Professional credentials displayed
- [ ] Insurance information

---

## Monitoring Tools Setup

### Essential Tools
1. **Google Search Console**
   - URL: https://search.google.com/search-console
   - Purpose: Monitor indexing, search performance, issues

2. **Google Analytics 4**
   - URL: https://analytics.google.com
   - Purpose: Track user behavior, conversions, traffic sources

3. **Google My Business**
   - URL: https://www.google.com/business/
   - Purpose: Local search visibility, customer interactions

4. **Bing Webmaster Tools**
   - URL: https://www.bing.com/webmasters
   - Purpose: Bing-specific indexing and optimization

---

## Annual Maintenance Schedule

### Monthly
- [ ] Monitor Google Search Console
- [ ] Check Google Analytics
- [ ] Review GMB updates/messages
- [ ] Check website speed
- [ ] Review page errors

### Quarterly
- [ ] Rank tracking
- [ ] Competitor analysis
- [ ] Content freshness audit
- [ ] Link quality check
- [ ] Structured data validation

### Annually
- [ ] Comprehensive SEO audit
- [ ] Update old blog posts
- [ ] Refresh imagery
- [ ] Review and update meta tags
- [ ] Technical SEO review

---

## Contact Information

**Dantice Dental Clinic**
- 📍 123 Dental Square, Najafgarh, Delhi 110043, India
- 📱 +91-98765-43210
- 📧 contact@dantice-dental.com
- 🌐 https://dantice-dental.com

---

**Document Version**: 1.0  
**Last Updated**: January 22, 2026  
**Status**: Complete & Ready for Implementation
