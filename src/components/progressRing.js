// ============================================
// 🌸 PrepPilot — Progress Ring Component
// ============================================

/**
 * Create an SVG circular progress ring.
 * @param {Object} options
 * @param {number} options.value - Current value (0-100)
 * @param {number} [options.size] - Diameter in px
 * @param {number} [options.strokeWidth] - Stroke width
 * @param {string} [options.label] - Center label (e.g., "78%")
 * @param {string} [options.sublabel] - Small text below value
 * @param {string} [options.gradientId] - Unique ID for gradient
 * @returns {HTMLElement}
 */
export function createProgressRing({
  value = 0,
  size = 120,
  strokeWidth = 8,
  label = '',
  sublabel = '',
  gradientId = 'ring-grad-' + Math.random().toString(36).slice(2, 6),
} = {}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  const wrap = document.createElement('div');
  wrap.className = 'progress-ring-wrap';
  wrap.style.width = size + 'px';
  wrap.style.height = size + 'px';

  wrap.innerHTML = `
    <svg class="progress-ring-svg" width="${size}" height="${size}">
      <defs>
        <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color: var(--pink-300)" />
          <stop offset="100%" style="stop-color: var(--pink-600)" />
        </linearGradient>
      </defs>
      <circle
        class="progress-ring-bg"
        cx="${size / 2}"
        cy="${size / 2}"
        r="${radius}"
        stroke-width="${strokeWidth}"
      />
      <circle
        class="progress-ring-fg"
        cx="${size / 2}"
        cy="${size / 2}"
        r="${radius}"
        stroke-width="${strokeWidth}"
        stroke="url(#${gradientId})"
        stroke-dasharray="${circumference}"
        stroke-dashoffset="${circumference}"
        data-target-offset="${offset}"
      />
    </svg>
    <div class="progress-ring-label">
      <span class="ring-value">${label || value + '%'}</span>
      ${sublabel ? `<span class="ring-unit">${sublabel}</span>` : ''}
    </div>
  `;

  // Animate on next frame
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const fg = wrap.querySelector('.progress-ring-fg');
      if (fg) {
        fg.style.strokeDashoffset = offset;
      }
    });
  });

  return wrap;
}
