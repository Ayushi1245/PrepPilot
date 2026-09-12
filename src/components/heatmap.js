// ============================================
// 🌸 PrepPilot — Heatmap Component
// ============================================

import { store } from '../store.js';
import { getDateKey, getMonthName, getDayName, formatDate } from '../utils.js';

/**
 * Create a GitHub-style contribution heatmap.
 * @param {Object} [options]
 * @param {number} [options.weeks] - Number of weeks to display
 * @returns {HTMLElement}
 */
export function createHeatmap({ weeks = 26 } = {}) {
  const container = document.createElement('div');
  container.className = 'heatmap-container glass-primary';

  const heatmapData = store.get('heatmap', {});
  const today = new Date();

  // Calculate start date (start of the week, `weeks` weeks ago)
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - (weeks * 7) - startDate.getDay());

  // Build week columns
  const weeksHtml = [];
  const monthLabels = [];
  let lastMonth = -1;
  let weekIndex = 0;

  const tempDate = new Date(startDate);

  while (tempDate <= today) {
    const weekCells = [];

    for (let day = 0; day < 7; day++) {
      const cellDate = new Date(tempDate);
      cellDate.setDate(cellDate.getDate() + day);

      if (cellDate > today) {
        weekCells.push('<div class="heatmap-cell" style="visibility:hidden"></div>');
        continue;
      }

      const key = getDateKey(cellDate);
      const data = heatmapData[key] || { level: 0 };
      const dateStr = formatDate(cellDate, 'long');

      weekCells.push(
        `<div class="heatmap-cell" data-level="${data.level}" data-date="${key}" title="${dateStr}"></div>`
      );
    }

    // Track month labels
    const firstDayOfWeek = new Date(tempDate);
    if (firstDayOfWeek.getMonth() !== lastMonth) {
      monthLabels.push({ index: weekIndex, month: firstDayOfWeek.getMonth() });
      lastMonth = firstDayOfWeek.getMonth();
    }

    weeksHtml.push(`<div class="heatmap-week">${weekCells.join('')}</div>`);
    tempDate.setDate(tempDate.getDate() + 7);
    weekIndex++;
  }

  // Month labels positioned
  const cellWidth = 17; // 14px cell + 3px gap
  const monthLabelsHtml = monthLabels.map(m =>
    `<span class="heatmap-month-label" style="position:absolute;left:${m.index * cellWidth}px">${getMonthName(m.month, true)}</span>`
  ).join('');

  container.innerHTML = `
    <div style="position:relative;margin-bottom:4px;height:16px;margin-left:30px">
      ${monthLabelsHtml}
    </div>
    <div class="heatmap-body">
      <div class="heatmap-day-labels">
        <div class="heatmap-day-label" style="visibility:hidden">M</div>
        <div class="heatmap-day-label">Mon</div>
        <div class="heatmap-day-label" style="visibility:hidden">W</div>
        <div class="heatmap-day-label">Wed</div>
        <div class="heatmap-day-label" style="visibility:hidden">F</div>
        <div class="heatmap-day-label">Fri</div>
        <div class="heatmap-day-label" style="visibility:hidden">S</div>
      </div>
      <div class="heatmap-grid">
        ${weeksHtml.join('')}
      </div>
    </div>
    <div class="heatmap-legend">
      <span class="legend-label">Less</span>
      <div class="legend-cells">
        <div class="legend-cell" style="background:var(--heatmap-0)"></div>
        <div class="legend-cell" style="background:var(--heatmap-1)"></div>
        <div class="legend-cell" style="background:var(--heatmap-2)"></div>
        <div class="legend-cell" style="background:var(--heatmap-3)"></div>
        <div class="legend-cell" style="background:var(--heatmap-4)"></div>
      </div>
      <span class="legend-label">More</span>
    </div>
  `;

  // Tooltip
  const tooltip = document.createElement('div');
  tooltip.className = 'heatmap-tooltip';
  document.body.appendChild(tooltip);

  container.addEventListener('mouseover', (e) => {
    const cell = e.target.closest('.heatmap-cell');
    if (!cell || cell.style.visibility === 'hidden') return;

    const key = cell.dataset.date;
    const data = heatmapData[key] || {};

    tooltip.innerHTML = `
      <div class="tooltip-date">${formatDate(key, 'long')}</div>
      <div class="tooltip-stat">📚 Study: ${data.studyHours || 0}h</div>
      <div class="tooltip-stat">💻 DSA: ${data.dsaProblems || 0} problems</div>
      <div class="tooltip-stat">🔥 Habits: ${data.habitsCompleted || 0}/${data.habitsTotal || 7}</div>
      <div class="tooltip-stat">✅ Tasks: ${data.tasksCompleted || 0}/${data.tasksTotal || 10}</div>
    `;

    const rect = cell.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width / 2 + 'px';
    tooltip.style.top = rect.top - 10 + 'px';
    tooltip.style.transform = 'translate(-50%, -100%)';
    tooltip.classList.add('visible');
  });

  container.addEventListener('mouseout', (e) => {
    if (!e.target.closest('.heatmap-cell')) return;
    tooltip.classList.remove('visible');
  });

  return container;
}
