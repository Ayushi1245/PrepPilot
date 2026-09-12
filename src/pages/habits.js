// ============================================
// 🌸 PrepPilot — Habits Page
// ============================================

import { store } from '../store.js';
import { createElement, calculatePercentage } from '../utils.js';
import { createProgressBar } from '../components/progressBar.js';
import { createHeatmap } from '../components/heatmap.js';

export function renderHabits() {
  const page = createElement('div', 'habits-page');

  // Header
  const header = createElement('div', 'page-header');
  header.innerHTML = `
    <h1>🔥 Habits & Activity</h1>
    <p>Build consistency — track your daily habits and see your progress bloom</p>
  `;
  page.appendChild(header);

  // Habit cards grid
  const habitsGrid = createElement('div', 'grid grid-auto gap-md section stagger-children');
  const habits = store.get('habits', []);

  habits.forEach(habit => {
    const card = createHabitCard(habit, habitsGrid);
    habitsGrid.appendChild(card);
  });
  page.appendChild(habitsGrid);

  // Heatmap section
  const heatmapSection = createElement('div', 'section');
  heatmapSection.innerHTML = `<h3 class="section-title">🟩 Activity Heatmap</h3>`;
  heatmapSection.appendChild(createHeatmap({ weeks: 26 }));
  page.appendChild(heatmapSection);

  return page;
}

function createHabitCard(habit, grid) {
  const pct = calculatePercentage(habit.monthlyDays, habit.totalDays);

  const card = createElement('div', 'habit-card glass-primary animate-in');
  card.innerHTML = `
    <div class="habit-card-header">
      <div class="habit-card-info">
        <span class="habit-card-icon">${habit.icon}</span>
        <span class="habit-card-name">${habit.name}</span>
      </div>
      <div class="habit-streak">
        <span class="streak-fire">🔥</span>
        <span>${habit.streak}</span>
      </div>
    </div>
  `;

  // Progress bar
  const bar = createProgressBar({
    label: `${pct}% this month`,
    value: pct,
    color: habit.color || '',
    showValue: false,
  });
  card.appendChild(bar);

  // Toggle
  const footer = createElement('div', 'flex items-center justify-between');
  footer.style.marginTop = 'var(--space-sm)';

  const statusText = createElement('span', 'text-sm text-secondary',
    habit.completedToday ? '✓ Done today' : 'Not yet today'
  );

  const toggle = createElement('button',
    `habit-toggle ${habit.completedToday ? 'completed' : ''}`
  );
  toggle.addEventListener('click', () => {
    const isCompleted = toggle.classList.toggle('completed');
    store.updateItem('habits', habit.id, h => ({
      ...h,
      completedToday: isCompleted,
      streak: isCompleted ? h.streak + 1 : Math.max(0, h.streak - 1),
      monthlyDays: isCompleted ? h.monthlyDays + 1 : Math.max(0, h.monthlyDays - 1),
    }));
    statusText.innerHTML = isCompleted ? '✓ Done today' : 'Not yet today';

    // Update streak display
    const streakEl = card.querySelector('.habit-streak span:last-child');
    const updatedHabit = store.find('habits', h => h.id === habit.id);
    if (streakEl && updatedHabit) {
      streakEl.textContent = updatedHabit.streak;
      streakEl.classList.add('number-pop');
      setTimeout(() => streakEl.classList.remove('number-pop'), 300);
    }
  });

  footer.appendChild(statusText);
  footer.appendChild(toggle);
  card.appendChild(footer);

  return card;
}
