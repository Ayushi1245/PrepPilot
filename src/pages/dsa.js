// ============================================
// 🌸 PrepPilot — DSA Dashboard Page
// ============================================

import { store } from '../store.js';
import { createElement, calculatePercentage } from '../utils.js';
import { createProgressRing } from '../components/progressRing.js';
import { createProgressBar } from '../components/progressBar.js';

export function renderDSA() {
  const page = createElement('div', 'dsa-page');
  const dsa = store.get('dsa', {});
  const easy = dsa.problems?.easy || { solved: 0, total: 150 };
  const medium = dsa.problems?.medium || { solved: 0, total: 250 };
  const hard = dsa.problems?.hard || { solved: 0, total: 100 };
  const totalSolved = easy.solved + medium.solved + hard.solved;
  const totalTarget = dsa.totalTarget || 500;
  const pct = calculatePercentage(totalSolved, totalTarget);

  // Header
  const header = createElement('div', 'page-header');
  header.innerHTML = `
    <h1>💻 DSA Dashboard</h1>
    <p>Track your problem-solving journey — every problem counts</p>
  `;
  page.appendChild(header);

  // --- Hero Card ---
  const hero = createElement('div', 'dsa-hero glass-primary animate-in');

  const heroLeft = createElement('div', 'dsa-hero-left');

  const ring = createProgressRing({
    value: pct,
    size: 150,
    strokeWidth: 12,
    label: `${totalSolved}`,
    sublabel: `/ ${totalTarget}`,
  });
  heroLeft.appendChild(ring);

  const heroStats = createElement('div', 'dsa-hero-stats');
  heroStats.innerHTML = `
    <div class="dsa-hero-total">Problems Solved</div>
    <div class="dsa-difficulty-row">
      <span class="dsa-difficulty-dot easy"></span>
      <span>Easy</span>
      <span class="font-semibold" style="margin-left:auto">${easy.solved}/${easy.total}</span>
    </div>
    <div class="dsa-difficulty-row">
      <span class="dsa-difficulty-dot medium"></span>
      <span>Medium</span>
      <span class="font-semibold" style="margin-left:auto">${medium.solved}/${medium.total}</span>
    </div>
    <div class="dsa-difficulty-row">
      <span class="dsa-difficulty-dot hard"></span>
      <span>Hard</span>
      <span class="font-semibold" style="margin-left:auto">${hard.solved}/${hard.total}</span>
    </div>
  `;
  heroLeft.appendChild(heroStats);
  hero.appendChild(heroLeft);

  // Right side — streak + weekly
  const heroRight = createElement('div', 'dsa-hero-right');

  const streakCard = createElement('div', 'stat-card glass-secondary');
  streakCard.innerHTML = `
    <span class="stat-icon">🔥</span>
    <span class="stat-value">${dsa.streak || 0}</span>
    <span class="stat-label">Day Streak</span>
  `;

  const weeklyCard = createElement('div', 'stat-card glass-secondary');
  weeklyCard.innerHTML = `
    <span class="stat-icon">📅</span>
    <span class="stat-value">${dsa.weeklyDone || 0}/${dsa.weeklyTarget || 15}</span>
    <span class="stat-label">This Week</span>
  `;

  heroRight.appendChild(streakCard);
  heroRight.appendChild(weeklyCard);
  hero.appendChild(heroRight);
  page.appendChild(hero);

  // --- Difficulty Bars ---
  const diffSection = createElement('div', 'section glass-primary animate-in');
  diffSection.style.padding = 'var(--space-xl)';
  diffSection.innerHTML = `<h3 class="section-title" style="margin-bottom:var(--space-lg)">📊 Difficulty Breakdown</h3>`;

  const diffBars = createElement('div', 'flex-col gap-md');
  diffBars.appendChild(createProgressBar({ label: `🟢 Easy — ${easy.solved}/${easy.total}`, value: calculatePercentage(easy.solved, easy.total), color: 'mint' }));
  diffBars.appendChild(createProgressBar({ label: `🟡 Medium — ${medium.solved}/${medium.total}`, value: calculatePercentage(medium.solved, medium.total), color: 'peach' }));
  diffBars.appendChild(createProgressBar({ label: `🔴 Hard — ${hard.solved}/${hard.total}`, value: calculatePercentage(hard.solved, hard.total), color: 'rose' }));
  diffSection.appendChild(diffBars);
  page.appendChild(diffSection);

  // --- Topic Progress ---
  const topicSection = createElement('div', 'section');
  topicSection.innerHTML = `<h3 class="section-title">📁 Topic Progress</h3>`;

  const topicGrid = createElement('div', 'grid grid-2 gap-md stagger-children');
  (dsa.topics || []).forEach(topic => {
    const topicPct = calculatePercentage(topic.solved, topic.total);
    const card = createElement('div', 'glass-secondary animate-in');
    card.style.padding = 'var(--space-md) var(--space-lg)';

    const bar = createProgressBar({
      label: `${topic.icon} ${topic.name} — ${topic.solved}/${topic.total}`,
      value: topicPct,
    });
    card.appendChild(bar);
    topicGrid.appendChild(card);
  });
  topicSection.appendChild(topicGrid);
  page.appendChild(topicSection);

  // --- Revision Due ---
  if (dsa.revisionDue && dsa.revisionDue.length > 0) {
    const revSection = createElement('div', 'section');
    revSection.innerHTML = `<h3 class="section-title">🔄 Revision Due</h3>`;

    const revList = createElement('div', 'flex-col gap-sm');
    dsa.revisionDue.forEach(item => {
      const revCard = createElement('div', 'glass-secondary flex items-center justify-between');
      revCard.style.padding = 'var(--space-md) var(--space-lg)';
      revCard.innerHTML = `
        <div>
          <div class="font-medium">${item.name}</div>
          <div class="text-sm text-secondary">${item.topic} · ${item.difficulty}</div>
        </div>
        <span class="badge badge-pink">Due ${item.dueDate === new Date().toISOString().split('T')[0] ? 'Today' : 'Tomorrow'}</span>
      `;
      revList.appendChild(revCard);
    });
    revSection.appendChild(revList);
    page.appendChild(revSection);
  }

  return page;
}
