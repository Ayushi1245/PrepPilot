// ============================================
// 🌸 PrepPilot — Theme System
// ============================================

const THEME_KEY = 'prepilot_theme';

export function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  applyTheme(theme);

  // Listen for system theme changes (only if no saved preference)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(THEME_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}

export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
  updateToggleUI(theme);
}

export function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  return next;
}

export function getCurrentTheme() {
  return document.documentElement.getAttribute('data-theme') || 'light';
}

function updateToggleUI(theme) {
  const lightBtn = document.querySelector('.theme-toggle-option[data-theme="light"]');
  const darkBtn = document.querySelector('.theme-toggle-option[data-theme="dark"]');
  if (lightBtn && darkBtn) {
    lightBtn.classList.toggle('active', theme === 'light');
    darkBtn.classList.toggle('active', theme === 'dark');
  }
}
