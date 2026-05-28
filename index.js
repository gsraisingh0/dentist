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

        // ===== HERO CANVAS ANIMATED BACKGROUND =====
        (function(){
          const heroCanvas = document.getElementById('heroCanvas');
          if(!heroCanvas) return;
          
          const ctx = heroCanvas.getContext('2d');
          const colors = ['rgba(10, 166, 166', 'rgba(0, 217, 217'];
          let particles = [];
          let animationFrame;
          
          class Particle {
            constructor(x, y) {
              this.x = x;
              this.y = y;
              this.baseX = x;
              this.baseY = y;
              this.size = Math.random() * 80 + 40;
              this.speedX = (Math.random() - 0.5) * 0.3;
              this.speedY = (Math.random() - 0.5) * 0.3;
              this.opacity = Math.random() * 0.2 + 0.08;
              this.color = colors[Math.floor(Math.random() * colors.length)];
              this.wobble = Math.random() * 0.02;
            }
            
            update() {
              this.x += this.speedX;
              this.y += this.speedY;
              
              // Gentle wobble effect
              this.speedX += (Math.random() - 0.5) * 0.02;
              this.speedY += (Math.random() - 0.5) * 0.02;
              
              // Damping
              this.speedX *= 0.99;
              this.speedY *= 0.99;
              
              // Boundary wrapping
              if(this.x < -this.size) this.x = heroCanvas.width + this.size;
              if(this.x > heroCanvas.width + this.size) this.x = -this.size;
              if(this.y < -this.size) this.y = heroCanvas.height + this.size;
              if(this.y > heroCanvas.height + this.size) this.y = -this.size;
            }
            
            draw(ctx) {
              const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
              gradient.addColorStop(0, this.color + ', ' + (this.opacity * 0.6) + ')');
              gradient.addColorStop(0.5, this.color + ', ' + (this.opacity * 0.3) + ')');
              gradient.addColorStop(1, this.color + ', 0)');
              ctx.fillStyle = gradient;
              ctx.beginPath();
              ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
              ctx.fill();
            }
          }
          
          function resizeCanvas() {
            const hero = document.querySelector('.hero');
            if(!hero) return;
            heroCanvas.width = hero.offsetWidth;
            heroCanvas.height = hero.offsetHeight;
            initParticles();
          }
          
          function initParticles() {
            particles = [];
            const count = Math.max(4, Math.floor(heroCanvas.width / 250));
            for(let i = 0; i < count; i++) {
              const x = Math.random() * heroCanvas.width;
              const y = Math.random() * heroCanvas.height;
              particles.push(new Particle(x, y));
            }
          }
          
          function animate() {
            // Clear with transparent background
            ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
            
            // Draw subtle animated gradient
            const bgGradient = ctx.createLinearGradient(0, 0, heroCanvas.width, heroCanvas.height);
            bgGradient.addColorStop(0, 'rgba(10, 166, 166, 0.08)');
            bgGradient.addColorStop(0.5, 'rgba(0, 217, 217, 0.04)');
            bgGradient.addColorStop(1, 'rgba(10, 166, 166, 0.06)');
            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, heroCanvas.width, heroCanvas.height);
            
            // Update and draw particles
            particles.forEach(p => {
              p.update();
              p.draw(ctx);
            });
            
            // Draw connecting lines between nearby particles
            for(let i = 0; i < particles.length; i++) {
              for(let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if(distance < 300) {
                  ctx.strokeStyle = 'rgba(10, 166, 166, ' + (0.1 * (1 - distance / 300)) + ')';
                  ctx.lineWidth = 0.5;
                  ctx.beginPath();
                  ctx.moveTo(particles[i].x, particles[i].y);
                  ctx.lineTo(particles[j].x, particles[j].y);
                  ctx.stroke();
                }
              }
            }
            
            animationFrame = requestAnimationFrame(animate);
          }
          
          // Initialize
          resizeCanvas();
          animate();
          
          // Handle window resize
          window.addEventListener('resize', resizeCanvas);
        })();
        // ===== END HERO CANVAS ANIMATION =====
      })();