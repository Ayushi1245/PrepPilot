// ============================================
// 🌸 PrepPilot — Companies Page
// ============================================

import { store } from '../store.js';
import { createElement, generateId } from '../utils.js';
import { createProgressBar } from '../components/progressBar.js';
import { showModal } from '../components/modal.js';

export function renderCompanies() {
  const page = createElement('div', 'companies-page');

  // Header
  const header = createElement('div', 'page-header flex items-center justify-between');
  header.innerHTML = `
    <div>
      <h1>🏢 Target Companies</h1>
      <p>Track your preparation progress for each dream company</p>
    </div>
    <button class="btn btn-primary" id="add-company-btn">+ Add Company</button>
  `;
  page.appendChild(header);

  // Company cards
  const companiesGrid = createElement('div', 'grid grid-auto gap-lg stagger-children');
  renderCompanyCards(companiesGrid);
  page.appendChild(companiesGrid);

  // Add company handler
  page.querySelector('#add-company-btn').addEventListener('click', () => {
    showAddCompanyModal(() => renderCompanyCards(companiesGrid));
  });

  return page;
}

function renderCompanyCards(container) {
  const companies = store.get('companies', []);
  container.innerHTML = '';

  if (companies.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <div class="emoji">🏢</div>
        <p>No target companies yet. Add your first!</p>
      </div>
    `;
    return;
  }

  companies.forEach(company => {
    const card = createElement('div', 'company-card glass-primary animate-in');

    const headerRow = createElement('div', 'company-card-header');
    headerRow.innerHTML = `
      <div class="company-logo">${company.icon || company.name[0]}</div>
      <div class="company-card-info">
        <div class="company-card-name">${company.name}</div>
        <div class="company-card-role">${company.role}</div>
      </div>
    `;
    card.appendChild(headerRow);

    // Progress
    const bar = createProgressBar({
      label: `Preparation`,
      value: company.prepPercent,
    });
    card.appendChild(bar);

    // Stage badge
    const stage = createElement('div', '', `
      <span class="company-stage">${getStageIcon(company.stage)} ${company.stage}</span>
    `);
    card.appendChild(stage);

    container.appendChild(card);
  });
}

function getStageIcon(stage) {
  const icons = {
    'Saved': '💾',
    'Preparing': '📚',
    'Applied': '📨',
    'OA Scheduled': '📝',
    'Interview': '🎤',
    'Offer': '🎉',
    'Rejected': '❌',
  };
  return icons[stage] || '📋';
}

function showAddCompanyModal(onComplete) {
  const formHtml = `
    <div class="form-group">
      <label class="form-label">Company Name</label>
      <input type="text" class="input" id="company-name-input" placeholder="e.g., Google" />
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Role</label>
        <input type="text" class="input" id="company-role-input" placeholder="e.g., SWE Intern" />
      </div>
      <div class="form-group">
        <label class="form-label">Stage</label>
        <select class="select" id="company-stage-input">
          <option value="Saved">💾 Saved</option>
          <option value="Preparing" selected>📚 Preparing</option>
          <option value="Applied">📨 Applied</option>
          <option value="OA Scheduled">📝 OA Scheduled</option>
          <option value="Interview">🎤 Interview</option>
        </select>
      </div>
    </div>
  `;

  showModal({
    title: '🏢 Add Target Company',
    content: formHtml,
    submitLabel: 'Add Company',
    onSubmit: () => {
      const name = document.getElementById('company-name-input')?.value?.trim();
      if (!name) return;

      store.push('companies', {
        id: generateId(),
        name,
        icon: name[0]?.toUpperCase() || '🏢',
        role: document.getElementById('company-role-input')?.value?.trim() || 'SDE',
        prepPercent: 0,
        stage: document.getElementById('company-stage-input')?.value || 'Preparing',
      });

      onComplete?.();
    },
  });
}
