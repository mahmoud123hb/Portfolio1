// ═══════════════════════════════════════════
//  NAVBAR SCROLL + MOBILE TOGGLE
// ═══════════════════════════════════════════
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  highlightNav();
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ═══════════════════════════════════════════
//  ACTIVE NAV HIGHLIGHT
// ═══════════════════════════════════════════
function highlightNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

// ═══════════════════════════════════════════
//  SKILL CATEGORY TABS
// ═══════════════════════════════════════════
const skillCats = document.querySelectorAll('.skill-cat');
const skillPanels = document.querySelectorAll('.skill-panel');

skillCats.forEach(cat => {
  cat.addEventListener('click', () => {
    const target = cat.dataset.cat;

    skillCats.forEach(c => c.classList.remove('active'));
    cat.classList.add('active');

    skillPanels.forEach(p => p.classList.remove('active'));
    const panel = document.getElementById('panel-' + target);
    if (panel) {
      panel.classList.add('active');
      // Animate bars
      animateBars(panel);
    }
  });
});

// ═══════════════════════════════════════════
//  SKILL BAR ANIMATION
// ═══════════════════════════════════════════
function animateBars(panel) {
  panel.querySelectorAll('.sb-fill').forEach(fill => {
    const width = fill.dataset.width;
    fill.style.width = '0';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        fill.style.width = width + '%';
      });
    });
  });
}

// ═══════════════════════════════════════════
//  INTERSECTION OBSERVER – SKILL BARS
// ═══════════════════════════════════════════
const skillsSection = document.getElementById('skills');
let skillsAnimated = false;

const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !skillsAnimated) {
      skillsAnimated = true;
      const activePanel = document.querySelector('.skill-panel.active');
      if (activePanel) animateBars(activePanel);
    }
  });
}, { threshold: 0.2 });

if (skillsSection) skillsObserver.observe(skillsSection);

// ═══════════════════════════════════════════
//  PROJECT FILTER
// ═══════════════════════════════════════════
const filters = document.querySelectorAll('.proj-filter');
const projCards = document.querySelectorAll('.proj-card');

filters.forEach(btn => {
  btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    projCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeIn 0.35s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ═══════════════════════════════════════════
//  SCROLL FADE-UP ANIMATION
// ═══════════════════════════════════════════
const fadeEls = document.querySelectorAll(
  '.proj-card, .cert-card, .exp-card, .tl-card, .stat-card, .exp-stat-card, .contact-info-card, .terminal-card'
);

fadeEls.forEach(el => el.classList.add('fade-up'));

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => fadeObserver.observe(el));

// ═══════════════════════════════════════════
//  TERMINAL TYPING EFFECT
// ═══════════════════════════════════════════
const terminalLines = document.querySelectorAll('.terminal-line');

terminalLines.forEach((line, index) => {
  line.style.opacity = '0';
  setTimeout(() => {
    line.style.opacity = '1';
    line.style.transition = 'opacity 0.4s ease';
  }, 400 + index * 500);
});

// ═══════════════════════════════════════════
//  CONTACT FORM (UI ONLY)
// ═══════════════════════════════════════════
const btnSend = document.querySelector('.btn-send');
if (btnSend) {
  btnSend.addEventListener('click', (e) => {
    e.preventDefault();
    const orig = btnSend.innerHTML;
    btnSend.innerHTML = '✓ Message Sent!';
    btnSend.style.background = 'linear-gradient(90deg, #22c55e, #16a34a)';
    setTimeout(() => {
      btnSend.innerHTML = orig;
      btnSend.style.background = '';
    }, 3000);
  });
}

// Pause scroll animation on hover
const track = document.querySelector('.tech-icons-track');
if (track) {
  track.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
  track.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
}

// ═══════════════════════════════════════════
//  ANIMATED COUNTERS
// ═══════════════════════════════════════════
function animateCounter(el) {
  const text = el.textContent.trim();
  const num = parseInt(text.match(/\d+/)?.[0] || '0', 10);
  const suffix = text.replace(/\d+/g, '');
  const duration = 1800;
  const start = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * num);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

const counterEls = document.querySelectorAll('.stat-num, .exp-stat-num');
let countersAnimated = false;

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersAnimated) {
      countersAnimated = true;
      counterEls.forEach(el => {
        el.dataset.original = el.textContent.trim();
        animateCounter(el);
      });
    }
  });
}, { threshold: 0.3 });

if (counterEls.length > 0) counterObserver.observe(counterEls[0].closest('.hero-stats, .exp-stats-row') || counterEls[0].parentElement);