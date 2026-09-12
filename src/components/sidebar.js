// ============================================
// 🌸 PrepPilot — Sidebar Component
// ============================================

import { router } from '../router.js';

const NAV_ITEMS = [
  { route: '/dashboard', icon: '🏠', label: 'Dashboard' },
  { route: '/tasks', icon: '✅', label: 'Tasks' },
  { route: '/habits', icon: '🔥', label: 'Habits' },
  { route: '/study', icon: '📚', label: 'Study' },
  { route: '/dsa', icon: '💻', label: 'DSA' },
  { route: '/companies', icon: '🏢', label: 'Companies' },
  { route: '/applications', icon: '💼', label: 'Applications' },
  { route: '/coach', icon: '🤖', label: 'AI Coach' },
];

export function renderSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  sidebar.innerHTML = `
    <a class="sidebar-logo" href="#/dashboard">
      <span class="logo-icon">🌸</span>
      <span class="logo-text">PrepPilot</span>
    </a>
    <nav class="sidebar-nav">
      ${NAV_ITEMS.map(item => `
        <a class="nav-item" data-route="${item.route}" href="#${item.route}">
          <span class="nav-icon">${item.icon}</span>
          <span class="nav-label">${item.label}</span>
        </a>
      `).join('')}
    </nav>
    <div class="sidebar-footer">
      <div class="theme-toggle" id="theme-toggle">
        <button class="theme-toggle-option" data-theme="light" title="Light mode">☀️</button>
        <button class="theme-toggle-option" data-theme="dark" title="Dark mode">🌙</button>
      </div>
    </div>
  `;

  // Click handlers
  sidebar.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      router.navigate(item.dataset.route);
    });
  });
}

export function renderMobileNav() {
  const mobileNav = document.getElementById('mobile-nav');
  if (!mobileNav) return;

  // Show subset of nav items for mobile
  const mobileItems = NAV_ITEMS.slice(0, 6);

  mobileNav.innerHTML = `
    <div class="mobile-nav-inner">
      ${mobileItems.map(item => `
        <button class="mobile-nav-item" data-route="${item.route}">
          <span class="mobile-nav-icon">${item.icon}</span>
          <span>${item.label}</span>
        </button>
      `).join('')}
      <button class="mobile-nav-item" id="mobile-more-btn">
        <span class="mobile-nav-icon">⋯</span>
        <span>More</span>
      </button>
    </div>
  `;

  mobileNav.querySelectorAll('.mobile-nav-item[data-route]').forEach(item => {
    item.addEventListener('click', () => {
      router.navigate(item.dataset.route);
    });
  });
}
