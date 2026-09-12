// ============================================
// 🌸 PrepPilot — Main Entry Point
// ============================================

// Styles
import './styles/index.css';
import './styles/sidebar.css';
import './styles/components.css';
import './styles/animations.css';
import './styles/responsive.css';

// Core
import { router } from './router.js';
import { initTheme } from './theme.js';
import { seedData } from './seed.js';
import { renderSidebar, renderMobileNav } from './components/sidebar.js';
import { initThemeToggle } from './components/themeToggle.js';

// Pages
import { renderDashboard } from './pages/dashboard.js';
import { renderTasks } from './pages/tasks.js';
import { renderHabits } from './pages/habits.js';
import { renderStudy } from './pages/study.js';
import { renderDSA } from './pages/dsa.js';
import { renderCompanies } from './pages/companies.js';
import { renderApplications } from './pages/applications.js';
import { renderCoach } from './pages/coach.js';

// Initialize
function init() {
  // Seed demo data on first visit
  seedData();

  // Apply theme
  initTheme();

  // Render sidebar
  renderSidebar();
  renderMobileNav();

  // Init theme toggle
  initThemeToggle();

  // Register routes
  router.register('/dashboard', renderDashboard);
  router.register('/tasks', renderTasks);
  router.register('/habits', renderHabits);
  router.register('/study', renderStudy);
  router.register('/dsa', renderDSA);
  router.register('/companies', renderCompanies);
  router.register('/applications', renderApplications);
  router.register('/coach', renderCoach);

  // Start router
  router.init('page-content');
}

// Wait for DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
