// ============================================
// 🌸 PrepPilot — Study Dashboard Page
// ============================================

import { store } from '../store.js';
import { createElement, calculatePercentage } from '../utils.js';
import { createProgressRing } from '../components/progressRing.js';
import { createCheckbox } from '../components/checkbox.js';

export function renderStudy() {
  const page = createElement('div', 'study-page');

  // Header
  const header = createElement('div', 'page-header');
  header.innerHTML = `
    <h1>📚 Study Dashboard</h1>
    <p>Master your CS fundamentals — track every subject and topic</p>
  `;
  page.appendChild(header);

  // Subject cards grid
  const subjectsGrid = createElement('div', 'grid grid-auto gap-lg stagger-children');
  const subjects = store.get('subjects', []);

  subjects.forEach(subject => {
    subjectsGrid.appendChild(createSubjectCard(subject));
  });
  page.appendChild(subjectsGrid);

  return page;
}

function createSubjectCard(subject) {
  const completed = subject.topics?.filter(t => t.completed)?.length || 0;
  const total = subject.topics?.length || 0;
  const pct = calculatePercentage(completed, total);

  const card = createElement('div', 'subject-card glass-primary animate-in');

  // Header row with icon + ring
  const headerRow = createElement('div', 'subject-card-header');

  const iconAndMeta = createElement('div', 'flex items-center gap-md');
  iconAndMeta.style.flex = '1';
  iconAndMeta.innerHTML = `
    <span class="subject-card-icon">${subject.icon}</span>
    <div class="subject-card-meta">
      <div class="subject-card-name">${subject.name}</div>
      <div class="subject-card-count">${completed}/${total} topics</div>
    </div>
  `;

  const ring = createProgressRing({
    value: pct,
    size: 64,
    strokeWidth: 5,
    label: pct + '%',
  });

  headerRow.appendChild(iconAndMeta);
  headerRow.appendChild(ring);
  card.appendChild(headerRow);

  // Topic checklist (collapsed by default)
  const topicsWrap = createElement('div', 'flex-col gap-xs');
  topicsWrap.style.cssText = 'max-height:0;overflow:hidden;transition:max-height 0.35s ease;margin-top:0;';

  subject.topics?.forEach(topic => {
    const cb = createCheckbox({
      label: topic.name,
      checked: topic.completed,
      onChange: (checked) => {
        store.update('subjects', (subs) =>
          subs.map(s => {
            if (s.id !== subject.id) return s;
            return {
              ...s,
              topics: s.topics.map(t =>
                t.id === topic.id ? { ...t, completed: checked } : t
              )
            };
          })
        );
        // Update progress ring
        const updatedSubject = store.get('subjects', []).find(s => s.id === subject.id);
        if (updatedSubject) {
          const newCompleted = updatedSubject.topics.filter(t => t.completed).length;
          const newPct = calculatePercentage(newCompleted, total);
          const ringValue = card.querySelector('.ring-value');
          const ringFg = card.querySelector('.progress-ring-fg');
          const countEl = card.querySelector('.subject-card-count');
          if (ringValue) ringValue.textContent = newPct + '%';
          if (countEl) countEl.textContent = `${newCompleted}/${total} topics`;
          if (ringFg) {
            const r = (64 - 5) / 2;
            const circ = 2 * Math.PI * r;
            ringFg.style.strokeDashoffset = circ - (newPct / 100) * circ;
          }
        }
      }
    });
    topicsWrap.appendChild(cb);
  });

  card.appendChild(topicsWrap);

  // Click to expand/collapse
  let expanded = false;
  card.addEventListener('click', (e) => {
    // Don't toggle if clicking a checkbox
    if (e.target.closest('.custom-checkbox')) return;

    expanded = !expanded;
    if (expanded) {
      topicsWrap.style.maxHeight = topicsWrap.scrollHeight + 'px';
      topicsWrap.style.marginTop = 'var(--space-md)';
    } else {
      topicsWrap.style.maxHeight = '0';
      topicsWrap.style.marginTop = '0';
    }
  });

  return card;
}
