      /*
        JS responsibilities:
        - Mobile menu open/close
        - Close mobile menu on link click
        - Toggle header 'scrolled' class for subtle shadow
        - Contact form client-side validation and success message
        - Populate current year
      */

      (function(){
        // Elements
        const menuBtn = document.getElementById('menuBtn');
        const mobileNav = document.getElementById('mobileNav');
        const mobileLinks = document.querySelectorAll('.mobile-link');
        const header = document.querySelector('.site-header');
        const form = document.getElementById('contactForm');
        const successBox = document.getElementById('formSuccess');

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

        form.addEventListener('submit', function(e){
          e.preventDefault();
          // Clear previous
          successBox.style.display = 'none';
          successBox.textContent = '';

          const name = form.name.value.trim();
          const email = form.email.value.trim();
          const phone = form.phone.value.trim();
          const message = form.message.value.trim();

          // Basic validation
          const errors = [];
          if(!name) errors.push('Please enter your name.');
          if(!email || !validateEmail(email)) errors.push('Please enter a valid email.');
          if(!message) errors.push('Please enter a message.');

          if(errors.length){
            successBox.style.display = 'block';
            successBox.style.background = '#fff3f2';
            successBox.style.borderLeft = '4px solid #ff7b7b';
            successBox.textContent = errors.join(' ');
            successBox.focus();
            return;
          }

          // If validation passes, show success message
          successBox.style.display = 'block';
          successBox.style.background = '#e6fff9';
          successBox.style.borderLeft = '4px solid var(--accent)';
          successBox.textContent = 'Thanks, ' + (name.split(' ')[0] || name) + '! Your message was received. We will contact you shortly.';

          // Reset form for further entries
          form.reset();
        });

        // Populate current year
        document.getElementById('year').textContent = new Date().getFullYear();

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