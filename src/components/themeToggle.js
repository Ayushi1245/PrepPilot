// ============================================
// 🌸 PrepPilot — Theme Toggle Component
// ============================================

import { toggleTheme, getCurrentTheme } from '../theme.js';

export function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', (e) => {
    const option = e.target.closest('.theme-toggle-option');
    if (!option) return;

    const targetTheme = option.dataset.theme;
    const currentTheme = getCurrentTheme();

    if (targetTheme !== currentTheme) {
      toggleTheme();
    }
  });
}
