/**
 * Siddharth Arora — Digital Marketing & SEO Executive Portfolio Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. ULTRA-SMOOTH SCROLLING
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navHeight = 72;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        if (history.pushState) {
          history.pushState(null, null, targetId);
        }
      }
    });
  });

  // 2. NAVBAR SCROLL ELEVATION
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }, { passive: true });

  // 3. MOBILE NAVIGATION DRAWER
  const mobileToggleBtn = document.getElementById('mobile_toggle_btn');
  const drawerCloseBtn = document.getElementById('drawer_close_btn');
  const mobileDrawer = document.getElementById('mobile_drawer');
  const drawerBackdrop = document.getElementById('drawer_backdrop');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    mobileDrawer?.classList.add('open');
    drawerBackdrop?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer?.classList.remove('open');
    drawerBackdrop?.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (mobileToggleBtn) mobileToggleBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);
  drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

  // 4. ACTIVE SECTION INTERSECTION OBSERVER
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(item => {
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => sectionObserver.observe(sec));

  // 5. ACCORDION DETAILS TOGGLE
  document.querySelectorAll('.breakdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const content = toggle.nextElementSibling;
      const isExpanded = content.classList.contains('active');

      if (isExpanded) {
        content.classList.remove('active');
        toggle.querySelector('.toggle-arrow').textContent = '▼ View Details';
      } else {
        content.classList.add('active');
        toggle.querySelector('.toggle-arrow').textContent = '▲ Close Details';
      }
    });
  });

  // 6. INQUIRY FORM SUBMISSION & GA4 TRACKING
  const contactForm = document.getElementById('consultation_form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending Message...';

      // GA4 Event
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'submit_lead_form', {
          event_category: 'Contact',
          event_label: 'Siddharth Inquiry Form'
        });
      }

      setTimeout(() => {
        submitBtn.innerHTML = '✓ Message Sent!';
        showToast('Thank you! Your message has been sent to Siddharth Arora. I will reach out promptly.');
        contactForm.reset();

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }, 3500);
      }, 700);
    });
  }

  // 7. GA4 EVENT TRACKING FOR WHATSAPP
  document.querySelectorAll('a[href*="wa.me"]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'click_whatsapp', {
          event_category: 'Connect',
          event_label: 'WhatsApp Chat CTA'
        });
      }
    });
  });
});

// Toast Notification Generator
function showToast(message) {
  let toast = document.getElementById('global_toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global_toast';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}
