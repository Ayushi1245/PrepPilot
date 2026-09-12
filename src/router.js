// ============================================
// 🌸 PrepPilot — SPA Router
// ============================================

class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    this.container = null;
  }

  init(containerId) {
    this.container = document.getElementById(containerId);
    window.addEventListener('hashchange', () => this._handleRoute());
    // Handle initial route
    if (!window.location.hash) {
      window.location.hash = '#/dashboard';
    } else {
      this._handleRoute();
    }
  }

  register(path, renderFn) {
    this.routes[path] = renderFn;
  }

  navigate(path) {
    window.location.hash = '#' + path;
  }

  _handleRoute() {
    const hash = window.location.hash.slice(1) || '/dashboard';
    const renderFn = this.routes[hash];

    if (renderFn && this.container) {
      this.currentRoute = hash;

      // Animate out/in
      this.container.style.opacity = '0';
      this.container.style.transform = 'translateY(12px)';

      setTimeout(() => {
        this.container.innerHTML = '';
        const content = renderFn();
        if (typeof content === 'string') {
          this.container.innerHTML = content;
        } else if (content instanceof HTMLElement) {
          this.container.appendChild(content);
        }

        // Trigger animations
        requestAnimationFrame(() => {
          this.container.style.opacity = '1';
          this.container.style.transform = 'translateY(0)';
        });

        // Update sidebar active state
        this._updateNav(hash);

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 150);
    }
  }

  _updateNav(hash) {
    // Desktop sidebar
    document.querySelectorAll('.nav-item').forEach((item) => {
      item.classList.toggle('active', item.dataset.route === hash);
    });
    // Mobile nav
    document.querySelectorAll('.mobile-nav-item').forEach((item) => {
      item.classList.toggle('active', item.dataset.route === hash);
    });
  }

  getCurrentRoute() {
    return this.currentRoute;
  }
}

export const router = new Router();
