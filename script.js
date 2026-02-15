const navItems = [
  { href: 'index.html', label: 'Home', key: 'home' },
  { href: 'about.html', label: 'About Us', key: 'about' },
  { href: 'services.html', label: 'Services', key: 'services' },
  { href: 'portfolio.html', label: 'Portfolio', key: 'portfolio' },
  { href: 'contact.html', label: 'Request Quote / Contact', key: 'contact' }
];

function renderHeaderFooter() {
  const page = document.body.dataset.page;

  const header = document.getElementById('site-header');
  const footer = document.getElementById('site-footer');
  if (!header || !footer) return;

  header.innerHTML = `
    <nav class="site-nav" aria-label="Main Navigation">
      <div class="container nav-wrap">
        <a href="index.html" class="logo">TOTAL WOOD WORKS</a>
        <button class="menu-toggle" id="menu-toggle" aria-label="Toggle menu">☰</button>
        <div class="nav-links" id="nav-links">
          ${navItems
            .map(
              (item) =>
                `<a href="${item.href}" class="${page === item.key ? 'active' : ''}">${item.label}</a>`
            )
            .join('')}
        </div>
      </div>
    </nav>`;

  footer.innerHTML = `
    <div class="site-footer">
      <div class="container footer-grid">
        <div>
          <h3>TOTAL WOOD WORKS</h3>
          <p>Premium custom furniture manufacturing and carpentry solutions.</p>
        </div>
        <div>
          <p><strong>Phone:</strong> +234 800 000 0000</p>
          <p><strong>Email:</strong> info@totalwoodworks.com</p>
          <p>© <span id="year"></span> Total Wood Works. All rights reserved.</p>
        </div>
      </div>
    </div>`;

  document.getElementById('year').textContent = new Date().getFullYear();

  const toggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  toggle?.addEventListener('click', () => navLinks.classList.toggle('open'));
}

function setupPortfolioFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  if (!buttons.length || !cards.length) return;

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      buttons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');

      cards.forEach((card) => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.style.display = show ? 'block' : 'none';
      });
    });
  });
}

function setupFormValidation() {
  const form = document.getElementById('quote-form');
  if (!form) return;

  const feedback = document.getElementById('form-feedback');

  const validators = {
    name: (value) => value.trim().length >= 2 || 'Please enter at least 2 characters.',
    phone: (value) => /^[0-9+\-\s]{7,15}$/.test(value) || 'Please enter a valid phone number.',
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Please enter a valid email address.',
    service: (value) => value.trim() !== '' || 'Please select a service.',
    message: (value) => value.trim().length >= 10 || 'Message should have at least 10 characters.'
  };

  const validateField = (field) => {
    const rule = validators[field.name];
    if (!rule) return true;
    const result = rule(field.value);
    const errorEl = field.parentElement.querySelector('.error-msg');

    if (result === true) {
      errorEl.textContent = '';
      field.setAttribute('aria-invalid', 'false');
      return true;
    }

    errorEl.textContent = result;
    field.setAttribute('aria-invalid', 'true');
    return false;
  };

  form.querySelectorAll('input, select, textarea').forEach((field) => {
    field.addEventListener('blur', () => validateField(field));
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    feedback.textContent = '';

    const fields = [...form.querySelectorAll('input, select, textarea')];
    const allValid = fields.every((field) => validateField(field));

    if (!allValid) {
      feedback.textContent = 'Please correct the highlighted errors before submitting.';
      feedback.style.color = '#b00020';
      return;
    }

    feedback.textContent = 'Thank you! Your quotation request has been submitted.';
    feedback.style.color = '#17612d';
    form.reset();
  });
}

renderHeaderFooter();
setupPortfolioFilter();
setupFormValidation();
