// ============================================
// 🌸 PrepPilot — Checkbox Component
// ============================================

import { createElement } from '../utils.js';

/**
 * Create an animated checkbox.
 * @param {Object} options
 * @param {string} options.label - Checkbox label text
 * @param {boolean} [options.checked] - Initial checked state
 * @param {Function} [options.onChange] - Change callback
 * @param {string} [options.id] - Optional ID
 * @returns {HTMLElement}
 */
export function createCheckbox({ label, checked = false, onChange, id = '' } = {}) {
  const wrap = createElement('div', `custom-checkbox ${checked ? 'checked' : ''}`);
  if (id) wrap.dataset.id = id;

  wrap.innerHTML = `
    <div class="checkbox-box"></div>
    <span class="checkbox-label">${label}</span>
  `;

  wrap.addEventListener('click', () => {
    const isChecked = wrap.classList.toggle('checked');
    onChange?.(isChecked);
  });

  return wrap;
}
