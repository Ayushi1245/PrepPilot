// ============================================
// 🌸 PrepPilot — Progress Bar Component
// ============================================

import { createElement } from '../utils.js';

/**
 * Create an animated progress bar.
 * @param {Object} options
 * @param {string} options.label - Bar label text
 * @param {number} options.value - Current value (0-100)
 * @param {string} [options.color] - Color variant: pink (default), lavender, peach, mint, blue, rose
 * @param {boolean} [options.showValue] - Show percentage value
 * @returns {HTMLElement}
 */
export function createProgressBar({
  label = '',
  value = 0,
  color = '',
  showValue = true,
} = {}) {
  const wrap = createElement('div', 'progress-bar-wrap');

  if (label || showValue) {
    const header = createElement('div', 'progress-bar-header', `
      ${label ? `<span class="bar-label">${label}</span>` : ''}
      ${showValue ? `<span class="bar-value">${value}%</span>` : ''}
    `);
    wrap.appendChild(header);
  }

  const track = createElement('div', 'progress-bar-track');
  const fill = createElement('div', `progress-bar-fill ${color}`.trim());
  fill.style.width = '0%';

  track.appendChild(fill);
  wrap.appendChild(track);

  // Animate fill
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      fill.style.width = value + '%';
    });
  });

  return wrap;
}
