// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Theme toggle (persisted in localStorage; falls back to system preference)
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

function getStoredTheme() {
  try { return localStorage.getItem('theme'); } catch (e) { return null; }
}
function storeTheme(value) {
  try { localStorage.setItem('theme', value); } catch (e) { /* ignore */ }
}

const stored = getStoredTheme();
if (stored === 'light' || stored === 'dark') {
  root.setAttribute('data-theme', stored);
}

themeToggle.addEventListener('click', () => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const current = root.getAttribute('data-theme') || (prefersDark ? 'dark' : 'light');
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  storeTheme(next);
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});
