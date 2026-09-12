// ============================================
// 🌸 PrepPilot — Dashboard Page
// ============================================

import { store } from '../store.js';
import { createElement, getGreeting, getMotivationalMessage, calculatePercentage, formatDate, animateNumber } from '../utils.js';
import { createProgressRing } from '../components/progressRing.js';
import { createProgressBar } from '../components/progressBar.js';
import { createCheckbox } from '../components/checkbox.js';

export function renderDashboard() {
  const page = createElement('div', 'dashboard-page');

  // --- Greeting ---
  const greeting = createElement('div', 'greeting-section animate-in');
  const dsa = store.get('dsa', {});
  const totalSolved = (dsa.problems?.easy?.solved || 0) + (dsa.problems?.medium?.solved || 0) + (dsa.problems?.hard?.solved || 0);
  const readiness = calculateReadiness();

  greeting.innerHTML = `
    <h1 class="greeting-text">${getGreeting()}, Ayushi 🌸</h1>
    <p class="greeting-sub">${getMotivationalMessage(readiness)}</p>
  `;
  page.appendChild(greeting);

  // --- Stats Row ---
  const statsRow = createElement('div', 'grid grid-4 gap-md section stagger-children');

  const stats = [
    { icon: '🔥', value: dsa.streak || 0, label: 'Day Streak' },
    { icon: '💻', value: totalSolved, label: 'Problems Solved' },
    { icon: '💼', value: store.get('applications', []).filter(a => a.status !== 'saved').length, label: 'Applications Sent' },
    { icon: '📚', value: getStudyCompletion() + '%', label: 'Study Progress' },
  ];

  stats.forEach(stat => {
    const card = createElement('div', 'stat-card glass-secondary animate-in');
    card.innerHTML = `
      <span class="stat-icon">${stat.icon}</span>
      <span class="stat-value">${stat.value}</span>
      <span class="stat-label">${stat.label}</span>
    `;
    statsRow.appendChild(card);
  });
  page.appendChild(statsRow);

  // --- Main Grid ---
  const mainGrid = createElement('div', 'grid gap-lg', '');
  mainGrid.style.gridTemplateColumns = '1.3fr 1fr';

  // Placement Readiness Card
  const readinessCard = createElement('div', 'glass-primary animate-in');
  readinessCard.style.padding = 'var(--space-xl)';

  const readinessHeader = createElement('div', 'flex items-center justify-between');
  readinessHeader.style.marginBottom = 'var(--space-lg)';
  readinessHeader.innerHTML = `
    <h2 class="flex items-center gap-sm">🎯 Placement Readiness</h2>
    <span class="badge badge-pink">${readiness}%</span>
  `;
  readinessCard.appendChild(readinessHeader);

  const readinessBody = createElement('div', 'flex items-center gap-xl');

  // Progress ring
  const ring = createProgressRing({
    value: readiness,
    size: 140,
    strokeWidth: 10,
    label: readiness + '%',
    sublabel: 'Ready',
  });
  readinessBody.appendChild(ring);

  // Category bars
  const categories = [
    { label: '💻 DSA', value: getDSAPercent(), color: '' },
    { label: '📚 CS Core', value: getStudyCompletion(), color: 'lavender' },
    { label: '🚀 Projects', value: 82, color: 'blue' },
    { label: '🎤 Interview', value: 61, color: 'peach' },
  ];

  const barsContainer = createElement('div', 'flex-col gap-md', '');
  barsContainer.style.flex = '1';
  categories.forEach(cat => {
    barsContainer.appendChild(createProgressBar(cat));
  });
  readinessBody.appendChild(barsContainer);
  readinessCard.appendChild(readinessBody);
  mainGrid.appendChild(readinessCard);

  // Today's Plan Card
  const planCard = createElement('div', 'glass-primary animate-in');
  planCard.style.padding = 'var(--space-xl)';

  const planHeader = createElement('div', 'flex items-center justify-between');
  planHeader.style.marginBottom = 'var(--space-lg)';
  const todayTasks = store.get('tasks', []).filter(t => !t.completed).slice(0, 6);
  planHeader.innerHTML = `
    <h2 class="flex items-center gap-sm">📋 Today's Plan</h2>
    <span class="text-sm text-secondary">${todayTasks.filter(t => t.completed).length}/${todayTasks.length} done</span>
  `;
  planCard.appendChild(planHeader);

  const taskList = createElement('div', 'flex-col gap-xs');
  todayTasks.forEach(task => {
    const categoryIcons = { dsa: '💻', cs: '📚', project: '🚀', application: '💼', interview: '🎤', habit: '🔥' };
    const cb = createCheckbox({
      label: `${task.title}`,
      checked: task.completed,
      id: task.id,
      onChange: (checked) => {
        store.updateItem('tasks', task.id, t => ({ ...t, completed: checked }));
      }
    });
    taskList.appendChild(cb);
  });

  if (todayTasks.length === 0) {
    taskList.innerHTML = `
      <div class="empty-state" style="padding: var(--space-lg)">
        <div class="emoji">🎉</div>
        <p>All tasks completed! Great work!</p>
      </div>
    `;
  }

  planCard.appendChild(taskList);
  mainGrid.appendChild(planCard);
  page.appendChild(mainGrid);

  // --- Achievements Row ---
  const achieveSection = createElement('div', 'section');
  achieveSection.innerHTML = `<h3 class="section-title">🏆 Achievements</h3>`;

  const achieveGrid = createElement('div', 'grid grid-4 gap-md stagger-children');
  const achievements = store.get('achievements', []).slice(0, 8);

  achievements.forEach(ach => {
    const card = createElement('div',
      `achievement-card glass-secondary animate-in ${ach.unlocked ? 'unlocked' : 'locked'}`
    );
    card.innerHTML = `
      <span class="achievement-icon">${ach.icon}</span>
      <div class="achievement-name">${ach.name}</div>
      <div class="achievement-desc">${ach.desc}</div>
    `;
    achieveGrid.appendChild(card);
  });

  achieveSection.appendChild(achieveGrid);
  page.appendChild(achieveSection);

  return page;
}

function calculateReadiness() {
  const dsaPct = getDSAPercent();
  const studyPct = getStudyCompletion();
  const projectPct = 82;
  const interviewPct = 61;
  return Math.round((dsaPct * 0.35 + studyPct * 0.25 + projectPct * 0.2 + interviewPct * 0.2));
}

function getDSAPercent() {
  const dsa = store.get('dsa', {});
  const solved = (dsa.problems?.easy?.solved || 0) + (dsa.problems?.medium?.solved || 0) + (dsa.problems?.hard?.solved || 0);
  return calculatePercentage(solved, dsa.totalTarget || 500);
}

function getStudyCompletion() {
  const subjects = store.get('subjects', []);
  if (subjects.length === 0) return 0;
  const totalTopics = subjects.reduce((s, sub) => s + (sub.topics?.length || 0), 0);
  const completedTopics = subjects.reduce((s, sub) => s + (sub.topics?.filter(t => t.completed)?.length || 0), 0);
  return calculatePercentage(completedTopics, totalTopics);
}
