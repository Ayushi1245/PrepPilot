// ============================================
// 🌸 PrepPilot — Glass Card Component
// ============================================

import { createElement } from '../utils.js';

/**
 * Create a glass card element.
 * @param {Object} options
 * @param {'primary'|'secondary'|'floating'} options.level - Glass tier
 * @param {string} [options.className] - Additional CSS classes
 * @param {string} [options.id] - Element ID
 * @returns {HTMLElement}
 */
export function createGlassCard({ level = 'primary', className = '', id = '' } = {}) {
  const card = createElement('div', `glass-${level} ${className}`.trim());
  if (id) card.id = id;
  return card;
}

/**
 * Create a glass card with a header section.
 * @param {Object} options
 * @param {string} options.title - Card title
 * @param {string} [options.icon] - Emoji icon
 * @param {string} [options.badge] - Badge text
 * @param {'primary'|'secondary'|'floating'} [options.level]
 * @param {string} [options.className]
 * @returns {HTMLElement}
 */
export function createGlassCardWithHeader({ title, icon = '', badge = '', level = 'primary', className = '' } = {}) {
  const card = createGlassCard({ level, className });

  const header = createElement('div', 'flex items-center justify-between', `
    <h3 class="flex items-center gap-sm">
      ${icon ? `<span>${icon}</span>` : ''}
      ${title}
    </h3>
    ${badge ? `<span class="badge badge-pink">${badge}</span>` : ''}
  `);

  card.appendChild(header);
  return card;
}
