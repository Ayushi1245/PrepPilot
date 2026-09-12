// ============================================
// 🌸 PrepPilot — Tasks Page
// ============================================

import { store } from '../store.js';
import { createElement, generateId } from '../utils.js';
import { createCheckbox } from '../components/checkbox.js';
import { showModal } from '../components/modal.js';

const CATEGORIES = [
  { id: 'all', label: 'All', icon: '📋' },
  { id: 'dsa', label: 'DSA', icon: '💻' },
  { id: 'cs', label: 'CS Core', icon: '📚' },
  { id: 'project', label: 'Project', icon: '🚀' },
  { id: 'application', label: 'Application', icon: '💼' },
  { id: 'interview', label: 'Interview', icon: '🎤' },
];

const PRIORITY_MAP = {
  high: { label: 'High', class: 'badge-high' },
  medium: { label: 'Medium', class: 'badge-medium' },
  low: { label: 'Low', class: 'badge-low' },
};

const CATEGORY_ICONS = { dsa: '💻', cs: '📚', project: '🚀', application: '💼', interview: '🎤', habit: '🔥' };

let currentFilter = 'all';

export function renderTasks() {
  const page = createElement('div', 'tasks-page');

  // Header
  const header = createElement('div', 'page-header flex items-center justify-between');
  header.innerHTML = `
    <div>
      <h1>✅ Tasks</h1>
      <p>Manage your daily to-dos and track progress</p>
    </div>
    <button class="btn btn-primary" id="add-task-btn">+ Add Task</button>
  `;
  page.appendChild(header);

  // Filter bar
  const filterBar = createElement('div', 'filter-bar');
  CATEGORIES.forEach(cat => {
    const chip = createElement('button',
      `filter-chip ${cat.id === currentFilter ? 'active' : ''}`,
      `${cat.icon} ${cat.label}`
    );
    chip.dataset.filter = cat.id;
    chip.addEventListener('click', () => {
      currentFilter = cat.id;
      renderTaskList(taskListContainer);
      filterBar.querySelectorAll('.filter-chip').forEach(c =>
        c.classList.toggle('active', c.dataset.filter === currentFilter)
      );
    });
    filterBar.appendChild(chip);
  });
  page.appendChild(filterBar);

  // Task list
  const taskListContainer = createElement('div', 'task-list stagger-children');
  renderTaskList(taskListContainer);
  page.appendChild(taskListContainer);

  // Add task button handler
  page.querySelector('#add-task-btn').addEventListener('click', () => {
    showAddTaskModal(() => renderTaskList(taskListContainer));
  });

  return page;
}

function renderTaskList(container) {
  const tasks = store.get('tasks', []);
  const filtered = currentFilter === 'all' ? tasks : tasks.filter(t => t.category === currentFilter);
  const pending = filtered.filter(t => !t.completed);
  const completed = filtered.filter(t => t.completed);

  container.innerHTML = '';

  if (pending.length === 0 && completed.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="emoji">📝</div>
        <p>No tasks yet. Add your first task!</p>
      </div>
    `;
    return;
  }

  // Pending tasks
  pending.forEach(task => {
    container.appendChild(createTaskCard(task, container));
  });

  // Completed section
  if (completed.length > 0) {
    const completedHeader = createElement('div', 'section-title', `✓ Completed (${completed.length})`);
    completedHeader.style.marginTop = 'var(--space-lg)';
    completedHeader.style.opacity = '0.6';
    container.appendChild(completedHeader);

    completed.forEach(task => {
      container.appendChild(createTaskCard(task, container));
    });
  }
}

function createTaskCard(task, listContainer) {
  const card = createElement('div', `task-card glass-secondary animate-in ${task.completed ? 'completed' : ''}`);
  const pri = PRIORITY_MAP[task.priority] || PRIORITY_MAP.medium;

  const cb = createCheckbox({
    label: '',
    checked: task.completed,
    onChange: (checked) => {
      store.updateItem('tasks', task.id, t => ({ ...t, completed: checked }));
      setTimeout(() => renderTaskList(listContainer), 300);
    }
  });

  const content = createElement('div', 'task-card-content');
  content.innerHTML = `
    <div class="task-card-title">${task.title}</div>
    <div class="task-card-meta">
      <span class="badge badge-pink">${CATEGORY_ICONS[task.category] || '📋'} ${task.category?.toUpperCase() || 'GENERAL'}</span>
      <span class="badge ${pri.class}">${pri.label}</span>
    </div>
  `;

  const deleteBtn = createElement('button', 'btn btn-ghost btn-icon', '🗑️');
  deleteBtn.title = 'Delete task';
  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    store.remove('tasks', t => t.id === task.id);
    card.style.opacity = '0';
    card.style.transform = 'translateX(20px)';
    setTimeout(() => renderTaskList(listContainer), 250);
  });

  card.appendChild(cb);
  card.appendChild(content);
  card.appendChild(deleteBtn);

  return card;
}

function showAddTaskModal(onComplete) {
  const formHtml = `
    <div class="form-group">
      <label class="form-label">Task Title</label>
      <input type="text" class="input" id="task-title-input" placeholder="What do you need to do?" autofocus />
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Category</label>
        <select class="select" id="task-category-input">
          <option value="dsa">💻 DSA</option>
          <option value="cs">📚 CS Core</option>
          <option value="project">🚀 Project</option>
          <option value="application">💼 Application</option>
          <option value="interview">🎤 Interview</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Priority</label>
        <select class="select" id="task-priority-input">
          <option value="high">🔴 High</option>
          <option value="medium" selected>🟡 Medium</option>
          <option value="low">🟢 Low</option>
        </select>
      </div>
    </div>
  `;

  showModal({
    title: '✏️ Add New Task',
    content: formHtml,
    submitLabel: 'Add Task',
    onSubmit: () => {
      const title = document.getElementById('task-title-input')?.value?.trim();
      if (!title) return;

      store.push('tasks', {
        id: generateId(),
        title,
        category: document.getElementById('task-category-input').value,
        priority: document.getElementById('task-priority-input').value,
        completed: false,
        createdAt: new Date().toISOString(),
      });

      onComplete?.();
    },
  });
}
