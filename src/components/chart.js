// ============================================
// 🌸 PrepPilot — Chart Component
// ============================================

import { createElement } from '../utils.js';

/**
 * Create a simple bar chart.
 * @param {Object} options
 * @param {Array<{label: string, value: number}>} options.data
 * @param {number} [options.maxValue] - Maximum value for scaling
 * @param {string} [options.color] - Bar color variant
 * @returns {HTMLElement}
 */
export function createBarChart({ data, maxValue, color = '' } = {}) {
  const max = maxValue || Math.max(...data.map(d => d.value), 1);
  const container = createElement('div', 'chart-container');

  const barGroup = createElement('div', 'chart-bar-group');

  data.forEach((item, i) => {
    const barItem = createElement('div', 'chart-bar-item');
    const heightPercent = (item.value / max) * 100;

    barItem.innerHTML = `
      <span class="chart-bar-value">${item.value}</span>
      <div class="chart-bar ${color}" style="height: 0%;" data-height="${heightPercent}%"></div>
      <span class="chart-bar-label">${item.label}</span>
    `;

    barGroup.appendChild(barItem);
  });

  container.appendChild(barGroup);

  // Animate bars
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      container.querySelectorAll('.chart-bar').forEach(bar => {
        bar.style.height = bar.dataset.height;
      });
    });
  });

  return container;
}

/**
 * Create a simple donut/pie chart using CSS conic-gradient.
 * @param {Object} options
 * @param {Array<{label: string, value: number, color: string}>} options.segments
 * @param {number} [options.size] - Chart diameter
 * @param {string} [options.centerLabel] - Center text
 * @returns {HTMLElement}
 */
export function createDonutChart({ segments, size = 160, centerLabel = '' } = {}) {
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  let gradientParts = [];
  let cumulative = 0;

  segments.forEach(seg => {
    const start = (cumulative / total) * 360;
    cumulative += seg.value;
    const end = (cumulative / total) * 360;
    gradientParts.push(`${seg.color} ${start}deg ${end}deg`);
  });

  const container = createElement('div', 'flex flex-col items-center gap-md');

  const donut = createElement('div');
  donut.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    border-radius: 50%;
    background: conic-gradient(${gradientParts.join(', ')});
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  // Inner hole
  const hole = createElement('div');
  hole.style.cssText = `
    width: ${size * 0.65}px;
    height: ${size * 0.65}px;
    border-radius: 50%;
    background: var(--bg-base);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  `;

  if (centerLabel) {
    hole.innerHTML = `<span style="font-family:var(--font-heading);font-weight:700;font-size:1.2rem;color:var(--text-primary)">${centerLabel}</span>`;
  }

  donut.appendChild(hole);
  container.appendChild(donut);

  // Legend
  const legend = createElement('div', 'flex gap-md flex-wrap justify-center');
  segments.forEach(seg => {
    legend.innerHTML += `
      <div class="flex items-center gap-xs text-sm">
        <span style="width:10px;height:10px;border-radius:3px;background:${seg.color};display:inline-block;flex-shrink:0"></span>
        <span class="text-secondary">${seg.label}</span>
      </div>
    `;
  });
  container.appendChild(legend);

  return container;
}
