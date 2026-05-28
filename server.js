const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== COMPLETE ROUTE MAPPING =====
const routes = {
  '/': 'index.html',
  '/index': 'index.html',
  '/about': 'about.html',
  '/services': 'services.html',
  '/braces': 'braces.html',
  '/aligners': 'aligners.html',
  '/dental-cleaning': 'dental-cleaning.html',
  '/scaling-polishing': 'scaling-polishing.html',
  '/dental-implant': 'dental-implant.html',
  '/dental-bridge': 'dental-bridge.html',
  '/dentures': 'dentures.html',
  '/tips': 'tips.html',
  '/faqs-guide': 'faqs-guide.html',
  '/before-after-guide': 'before-after-guide.html',
  '/why-dental-cleaning-important': 'why-dental-cleaning-important.html',
  '/dental-cleaning-why': 'dental-cleaning-why.html',
  '/dental-cleaning-regular': 'dental-cleaning-regular.html',
  '/dental-cleaning-deep': 'dental-cleaning-deep.html',
  '/dental-cleaning-painful': 'dental-cleaning-painful.html',
  '/dental-cleaning-time': 'dental-cleaning-time.html',
  '/dental-cleaning-more': 'dental-cleaning-more.html',
  '/orthodontics-guide': 'orthodontics-guide.html',
  '/orthodontics-kids-adults-guide': 'orthodontics-kids-adults-guide.html',
  '/orthodontic-problems-guide': 'orthodontic-problems-guide.html',
  '/orthodontic-treatment-cost-guide': 'orthodontic-treatment-cost-guide.html',
  '/orthodontic-treatment-procedure-guide': 'orthodontic-treatment-procedure-guide.html',
  '/types-orthodontic-treatment': 'types-orthodontic-treatment.html',
  '/BenefitsAligners': 'BenefitsAligners.html',
  '/Types-Aligners': 'Types-Aligners.html',
  '/clear-aligners-guide': 'clear-aligners-guide.html',
  '/dental-braces-guide': 'dental-braces-guide.html',
  '/aligner-jobs': 'aligner-jobs.html',
};

// Serve clean URL routes
Object.entries(routes).forEach(([route, file]) => {
  app.get(route, (req, res) => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).send('Page not found');
    }
  });
});

// ===== 301 REDIRECTS: .html TO CLEAN URLS =====
const redirectMap = {
  'index.html': '/',
  'about.html': '/about',
  'services.html': '/services',
  'braces.html': '/braces',
  'aligners.html': '/aligners',
  'dental-cleaning.html': '/dental-cleaning',
  'scaling-polishing.html': '/scaling-polishing',
  'dental-implant.html': '/dental-implant',
  'dental-bridge.html': '/dental-bridge',
  'dentures.html': '/dentures',
  'tips.html': '/tips',
  'faqs-guide.html': '/faqs-guide',
  'before-after-guide.html': '/before-after-guide',
  'why-dental-cleaning-important.html': '/why-dental-cleaning-important',
  'dental-cleaning-why.html': '/dental-cleaning-why',
  'dental-cleaning-regular.html': '/dental-cleaning-regular',
  'dental-cleaning-deep.html': '/dental-cleaning-deep',
  'dental-cleaning-painful.html': '/dental-cleaning-painful',
  'dental-cleaning-time.html': '/dental-cleaning-time',
  'dental-cleaning-more.html': '/dental-cleaning-more',
  'orthodontics-guide.html': '/orthodontics-guide',
  'orthodontics-kids-adults-guide.html': '/orthodontics-kids-adults-guide',
  'orthodontic-problems-guide.html': '/orthodontic-problems-guide',
  'orthodontic-treatment-cost-guide.html': '/orthodontic-treatment-cost-guide',
  'orthodontic-treatment-procedure-guide.html': '/orthodontic-treatment-procedure-guide',
  'types-orthodontic-treatment.html': '/types-orthodontic-treatment',
  'BenefitsAligners.html': '/BenefitsAligners',
  'Types-Aligners.html': '/Types-Aligners',
  'clear-aligners-guide.html': '/clear-aligners-guide',
  'dental-braces-guide.html': '/dental-braces-guide',
  'aligner-jobs.html': '/aligner-jobs',
};

Object.entries(redirectMap).forEach(([file, route]) => {
  app.get(`/${file}`, (req, res) => {
    res.redirect(301, route);
  });
});

// Handle form submission
app.post('/api/contact', (req, res) => {
  const { name, email, phone, message } = req.body;
  console.log('Contact form:', { name, email, phone, message, timestamp: new Date().toISOString() });
  res.json({ success: true, message: 'Message received! We will contact you soon.' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Page Not Found - Dantice Dental Clinic</title>
    <style>body{font-family:system-ui,sans-serif;text-align:center;padding:4rem 2rem;background:#f5fafc;color:#0d2f34}
    a{color:#0aa6a6;text-decoration:none;font-weight:600}
    h1{font-size:5rem;margin:0;background:linear-gradient(135deg,#0aa6a6,#078a8a);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
    </style></head>
    <body>
      <h1>404</h1>
      <p>The page you were looking for was not found.</p>
      <a href="/">← Go Back to Home</a>
    </body>
    </html>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Dantice Dental Clinic running at http://localhost:${PORT}`);
  console.log(`🌐 Clean URLs active for all ${Object.keys(routes).length} pages`);
  console.log(`🔀 301 redirects from .html to clean URLs`);
});
