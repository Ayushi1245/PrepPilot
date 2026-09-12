// ============================================
// 🌸 PrepPilot — Applications Page (Kanban)
// ============================================

import { store } from '../store.js';
import { createElement, generateId } from '../utils.js';
import { createKanban } from '../components/kanban.js';
import { showModal } from '../components/modal.js';

export function renderApplications() {
  const page = createElement('div', 'applications-page');

  // Header
  const header = createElement('div', 'page-header flex items-center justify-between');
  const apps = store.get('applications', []);
  header.innerHTML = `
    <div>
      <h1>💼 Applications</h1>
      <p>Track your job applications from saved to offer — drag cards between columns</p>
    </div>
    <button class="btn btn-primary" id="add-app-btn">+ Add Application</button>
  `;
  page.appendChild(header);

  // Stats row
  const statsRow = createElement('div', 'grid grid-4 gap-md section');
  const statusCounts = {
    saved: apps.filter(a => a.status === 'saved').length,
    active: apps.filter(a => ['preparing', 'applied', 'oa', 'interview'].includes(a.status)).length,
    offer: apps.filter(a => a.status === 'offer').length,
    total: apps.length,
  };

  const statsData = [
    { icon: '📋', value: statusCounts.total, label: 'Total' },
    { icon: '⚡', value: statusCounts.active, label: 'Active' },
    { icon: '💾', value: statusCounts.saved, label: 'Saved' },
    { icon: '🎉', value: statusCounts.offer, label: 'Offers' },
  ];

  statsData.forEach(stat => {
    const card = createElement('div', 'stat-card glass-secondary');
    card.innerHTML = `
      <span class="stat-icon">${stat.icon}</span>
      <span class="stat-value">${stat.value}</span>
      <span class="stat-label">${stat.label}</span>
    `;
    statsRow.appendChild(card);
  });
  page.appendChild(statsRow);

  // Kanban board
  const kanbanSection = createElement('div', 'section');
  kanbanSection.appendChild(createKanban());
  page.appendChild(kanbanSection);

  // Add application handler
  page.querySelector('#add-app-btn').addEventListener('click', () => {
    showAddAppModal();
  });

  return page;
}

function showAddAppModal() {
  const formHtml = `
    <div class="form-group">
      <label class="form-label">Company</label>
      <input type="text" class="input" id="app-company-input" placeholder="e.g., Google" />
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Role</label>
        <input type="text" class="input" id="app-role-input" placeholder="e.g., SWE Intern" />
      </div>
      <div class="form-group">
        <label class="form-label">Status</label>
        <select class="select" id="app-status-input">
          <option value="saved">💾 Saved</option>
          <option value="preparing">📚 Preparing</option>
          <option value="applied">📨 Applied</option>
          <option value="oa">📝 OA</option>
          <option value="interview">🎤 Interview</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Notes</label>
      <textarea class="textarea" id="app-notes-input" placeholder="Any notes about this application..."></textarea>
    </div>
  `;

  showModal({
    title: '💼 Add Application',
    content: formHtml,
    submitLabel: 'Add',
    onSubmit: () => {
      const company = document.getElementById('app-company-input')?.value?.trim();
      if (!company) return;

      store.push('applications', {
        id: generateId(),
        company,
        role: document.getElementById('app-role-input')?.value?.trim() || 'SDE',
        status: document.getElementById('app-status-input')?.value || 'saved',
        date: new Date().toISOString().split('T')[0],
        notes: document.getElementById('app-notes-input')?.value?.trim() || '',
      });

      // Refresh page
      const page = document.getElementById('page-content');
      if (page) {
        page.innerHTML = '';
        page.appendChild(renderApplications());
      }
    },
  });
}
