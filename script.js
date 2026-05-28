      /*
        JS responsibilities:
        - Mobile menu open/close
        - Close mobile menu on link click
        - Toggle header 'scrolled' class for subtle shadow
        - Contact form client-side validation and success message
        - Populate current year
        - Dark mode toggle
      */

      (function(){
        // Dark mode initialization (run immediately)
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);

        // Elements
        const menuBtn = document.getElementById('menuBtn');
        const mobileNav = document.getElementById('mobileNav');
        const mobileLinks = document.querySelectorAll('.mobile-link');
        const header = document.querySelector('.site-header');
        const form = document.getElementById('contactForm');
        const successBox = document.getElementById('formSuccess');
        const themeToggle = document.getElementById('themeToggle');

        // Update theme icon on load
        function updateThemeIcon(theme){
          if(themeToggle){
            const sunIcon = themeToggle.querySelector('.sun-icon');
            const moonIcon = themeToggle.querySelector('.moon-icon');
            if(theme === 'dark'){
              sunIcon.style.display = 'none';
              moonIcon.style.display = 'block';
            } else {
              sunIcon.style.display = 'block';
              moonIcon.style.display = 'none';
            }
          }
        }

        updateThemeIcon(savedTheme);

        // Theme toggle click handler
        if(themeToggle){
          themeToggle.addEventListener('click', ()=>{
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
          });
        }

        // Mobile menu toggle
        function openMobile(){
          mobileNav.classList.add('open');
          mobileNav.setAttribute('aria-hidden','false');
          menuBtn.setAttribute('aria-expanded','true');
        }
        function closeMobile(){
          mobileNav.classList.remove('open');
          mobileNav.setAttribute('aria-hidden','true');
          menuBtn.setAttribute('aria-expanded','false');
        }
        menuBtn.addEventListener('click', ()=>{
          if(mobileNav.classList.contains('open')) closeMobile(); else openMobile();
        });
        mobileLinks.forEach(a=>a.addEventListener('click', ()=> closeMobile()));

        // Close mobile menu on ESC
        document.addEventListener('keydown', (e)=>{
          if(e.key === 'Escape') closeMobile();
        });

        // Toggle header shadow when scrolling
        function onScroll(){
          if(window.scrollY > 12) header.classList.add('scrolled'); else header.classList.remove('scrolled');
        }
        window.addEventListener('scroll', onScroll, {passive:true});
        onScroll();

        // Simple client-side validation + success message
        function validateEmail(email){
          // Basic email regex — tweak if needed
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        if (form) {
          // Ensure there's a success message container; create if missing
          let successEl = successBox;
          if (!successEl) {
            successEl = document.createElement('div');
            successEl.id = 'formSuccess';
            successEl.style.display = 'none';
            form.parentNode.insertBefore(successEl, form);
          }

          form.addEventListener('submit', function(e){
            e.preventDefault();
            // Clear previous
            successEl.style.display = 'none';
            successEl.textContent = '';

            const name = (form.name && form.name.value) ? form.name.value.trim() : '';
            const email = (form.email && form.email.value) ? form.email.value.trim() : '';
            const phone = (form.phone && form.phone.value) ? form.phone.value.trim() : '';
            const message = (form.message && form.message.value) ? form.message.value.trim() : '';

            // Basic validation
            const errors = [];
            if(!name) errors.push('Please enter your name.');
            if(!email || !validateEmail(email)) errors.push('Please enter a valid email.');
            if(!message) errors.push('Please enter a message.');

            if(errors.length){
              successEl.style.display = 'block';
              successEl.style.background = '#fff3f2';
              successEl.style.borderLeft = '4px solid #ff7b7b';
              successEl.textContent = errors.join(' ');
              if (typeof successEl.focus === 'function') successEl.focus();
              return;
            }

            // If validation passes, show success message
            successEl.style.display = 'block';
            successEl.style.background = '#e6fff9';
            successEl.style.borderLeft = '4px solid var(--accent)';
            successEl.textContent = 'Thanks, ' + (name.split(' ')[0] || name) + '! Your message was received. We will contact you shortly.';

            // Reset form for further entries
            if (typeof form.reset === 'function') form.reset();
          });
        }

        // Populate current year
        document.getElementById('year').textContent = new Date().getFullYear();

        // Set active navbar link based on current page
        function setActiveNav() {
          const currentPath = window.location.pathname;
          const currentFile = currentPath.split('/').pop() || 'index.html';
          // Only use the actual hash if present; do not default to '#home'
          // because that incorrectly marks Home active on pages with no hash.
          const currentHash = window.location.hash || '';
          
          // Get all navigation links (desktop and mobile)
          const allNavLinks = document.querySelectorAll('nav.main-nav a, .mobile-link');
          
          allNavLinks.forEach(link => {
            const href = link.getAttribute('href');
            let isActive = false;
            
            // Check if this link matches current page
            if (href === '#home') {
              // Home button is active on index.html or when hash is #home
              isActive = (currentFile === 'index.html' || currentFile === '') || currentHash === '#home';
            } else if (href && href.startsWith('#')) {
              // For anchor links like #about, #services, #gallery, #contact
              // Consider them active when the hash matches OR when the current page
              // is the page that the anchor would normally target (e.g. '#about' -> 'about.html').
              isActive = (currentHash === href);
              if (!isActive) {
                const anchorName = href.slice(1); // remove '#'
                const mappedFile = (anchorName === 'home') ? 'index.html' : (anchorName + '.html');
                isActive = currentFile === mappedFile;
              }
            } else if (href && !href.startsWith('#')) {
              // For page links like braces.html, aligners.html, about.html, services.html, etc.
              const hrefFile = href.split('/').pop();
              isActive = currentFile === hrefFile;
            }
            
            // If an anchor hash is active (e.g. #about) also mark the
            // corresponding page-link (about.html) as active so desktop
            // and mobile navs stay in sync.
            if (!isActive && currentHash && currentHash.startsWith('#') && href && !href.startsWith('#')) {
              const hrefFile = href.split('/').pop();
              const mappedFile = (currentHash.slice(1) === 'home') ? 'index.html' : (currentHash.slice(1) + '.html');
              if (hrefFile === mappedFile) isActive = true;
            }

            // Add or remove active class
            if (isActive) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
        
        setActiveNav();
        
        // Also update active state when hash changes (for anchor links)
        window.addEventListener('hashchange', setActiveNav);

        // Smooth scroll for internal links (enhanced behavior)
        document.querySelectorAll('a[href^="#"]').forEach(a=>{
          a.addEventListener('click', function(e){
            const target = this.getAttribute('href');
            if(target && target.startsWith('#')){
              // Let default behavior handle top anchor; close mobile if open
              if(mobileNav.classList.contains('open')) closeMobile();
            }
          });
        });
      })();