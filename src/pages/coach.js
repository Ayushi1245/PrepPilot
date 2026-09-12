// ============================================
// 🌸 PrepPilot — AI Coach Page
// ============================================

import { store } from '../store.js';
import { createElement, getGreeting, calculatePercentage } from '../utils.js';

export function renderCoach() {
  const page = createElement('div', 'coach-page');

  // Header
  const header = createElement('div', 'page-header');
  header.innerHTML = `
    <h1>🤖 AI Coach</h1>
    <p>Your personal mentor — daily focus, encouragement, and study tips</p>
  `;
  page.appendChild(header);

  const mainGrid = createElement('div', 'grid gap-lg');
  mainGrid.style.gridTemplateColumns = '1fr 1fr';

  // --- Mentor Card ---
  const mentorCard = createElement('div', 'coach-card glass-primary animate-in');

  const dsa = store.get('dsa', {});
  const totalSolved = (dsa.problems?.easy?.solved || 0) + (dsa.problems?.medium?.solved || 0) + (dsa.problems?.hard?.solved || 0);
  const habits = store.get('habits', []);
  const completedHabits = habits.filter(h => h.completedToday).length;

  mentorCard.innerHTML = `
    <div class="coach-greeting">
      ${getGreeting()}, Ayushi! 🌟<br>
      <span class="text-secondary" style="font-size:0.95rem;font-weight:400">
        You've solved <span class="text-pink font-bold">${totalSolved}</span> DSA problems and completed
        <span class="text-pink font-bold">${completedHabits}/${habits.length}</span> habits today. ${getEncouragement(totalSolved, completedHabits, habits.length)}
      </span>
    </div>
  `;
  mainGrid.appendChild(mentorCard);

  // --- Daily Focus Card ---
  const focusCard = createElement('div', 'glass-primary animate-in');
  focusCard.style.padding = 'var(--space-xl)';

  const tasks = store.get('tasks', []).filter(t => !t.completed);
  const focusItems = generateDailyFocus(tasks, dsa, habits);

  focusCard.innerHTML = `
    <h3 style="margin-bottom:var(--space-lg)">🎯 Today's Focus</h3>
    <ul class="coach-focus-list">
      ${focusItems.map(item => `
        <li class="coach-focus-item">
          <span class="coach-focus-icon">${item.icon}</span>
          <span>${item.text}</span>
        </li>
      `).join('')}
    </ul>
  `;
  mainGrid.appendChild(focusCard);
  page.appendChild(mainGrid);

  // --- Motivational Quote ---
  const quoteCard = createElement('div', 'glass-secondary animate-in');
  quoteCard.style.padding = 'var(--space-xl)';
  quoteCard.style.marginTop = 'var(--space-lg)';
  quoteCard.style.textAlign = 'center';

  const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "It's not about perfect. It's about effort.", author: "Jillian Michaels" },
    { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
    { text: "Your limitation — it's only your imagination.", author: "Unknown" },
    { text: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
  ];

  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteCard.innerHTML = `
    <div style="font-size:1.8rem;margin-bottom:var(--space-md)">💭</div>
    <blockquote style="font-size:1.1rem;font-style:italic;line-height:1.6;color:var(--text-primary);margin-bottom:var(--space-sm)">
      "${quote.text}"
    </blockquote>
    <cite style="font-size:0.85rem;color:var(--text-tertiary)">— ${quote.author}</cite>
  `;
  page.appendChild(quoteCard);

  // --- Study Tip ---
  const tipCard = createElement('div', 'glass-primary animate-in');
  tipCard.style.padding = 'var(--space-xl)';
  tipCard.style.marginTop = 'var(--space-lg)';

  const tips = store.get('coachTips', []);
  const todayTip = tips[new Date().getDate() % tips.length] || tips[0] || "Keep going!";

  tipCard.innerHTML = `
    <h3 style="margin-bottom:var(--space-md)">💡 Study Tip of the Day</h3>
    <p style="font-size:1rem;line-height:1.6">${todayTip}</p>
  `;
  page.appendChild(tipCard);

  // --- Weekly Summary ---
  const summaryCard = createElement('div', 'glass-primary animate-in');
  summaryCard.style.padding = 'var(--space-xl)';
  summaryCard.style.marginTop = 'var(--space-lg)';

  const subjects = store.get('subjects', []);
  const totalTopics = subjects.reduce((s, sub) => s + sub.topics.length, 0);
  const completedTopics = subjects.reduce((s, sub) => s + sub.topics.filter(t => t.completed).length, 0);
  const apps = store.get('applications', []);

  summaryCard.innerHTML = `
    <h3 style="margin-bottom:var(--space-lg)">📈 Your Progress Summary</h3>
    <div class="grid grid-3 gap-md">
      <div class="stat-card glass-secondary">
        <span class="stat-icon">💻</span>
        <span class="stat-value">${totalSolved}</span>
        <span class="stat-label">DSA Problems</span>
      </div>
      <div class="stat-card glass-secondary">
        <span class="stat-icon">📚</span>
        <span class="stat-value">${calculatePercentage(completedTopics, totalTopics)}%</span>
        <span class="stat-label">CS Topics</span>
      </div>
      <div class="stat-card glass-secondary">
        <span class="stat-icon">💼</span>
        <span class="stat-value">${apps.length}</span>
        <span class="stat-label">Applications</span>
      </div>
    </div>
  `;
  page.appendChild(summaryCard);

  return page;
}

function getEncouragement(solved, completedHabits, totalHabits) {
  if (completedHabits === totalHabits) return "All habits done — you're on fire! 🔥";
  if (completedHabits > totalHabits / 2) return "Great progress today! Keep it up! 💪";
  if (solved > 300) return "You're getting closer to your DSA goal every day! 🚀";
  return "Let's make today count! 🌸";
}

function generateDailyFocus(tasks, dsa, habits) {
  const items = [];

  // DSA focus
  const weeklyLeft = (dsa.weeklyTarget || 15) - (dsa.weeklyDone || 0);
  if (weeklyLeft > 0) {
    items.push({ icon: '💻', text: `Solve ${Math.min(weeklyLeft, 3)} DSA problems (${weeklyLeft} left this week)` });
  }

  // Study focus
  const subjects = store.get('subjects', []);
  const incomplete = subjects.filter(s => {
    const done = s.topics.filter(t => t.completed).length;
    return done < s.topics.length;
  });
  if (incomplete.length > 0) {
    const sub = incomplete[Math.floor(Math.random() * incomplete.length)];
    items.push({ icon: '📚', text: `Continue studying ${sub.name}` });
  }

  // Habit focus
  const unfinished = habits.filter(h => !h.completedToday);
  if (unfinished.length > 0) {
    items.push({ icon: '🔥', text: `Complete ${unfinished.length} remaining habits` });
  }

  // Application focus
  const apps = store.get('applications', []);
  const preparing = apps.filter(a => a.status === 'preparing');
  if (preparing.length > 0) {
    items.push({ icon: '💼', text: `Work on ${preparing[0].company} application` });
  }

  // Revision
  if (dsa.revisionDue && dsa.revisionDue.length > 0) {
    items.push({ icon: '🔄', text: `Revise: ${dsa.revisionDue[0].name}` });
  }

  // Task focus
  if (tasks.length > 0) {
    items.push({ icon: '✅', text: `${tasks.length} pending tasks to complete` });
  }

  return items.slice(0, 6);
}
