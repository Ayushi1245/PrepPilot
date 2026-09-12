// ============================================
// 🌸 PrepPilot — Kanban Board Component
// ============================================

import { store } from '../store.js';
import { createElement, formatDate } from '../utils.js';

const COLUMNS = [
  { id: 'saved', title: '💾 Saved', icon: '💾' },
  { id: 'preparing', title: '📚 Preparing', icon: '📚' },
  { id: 'applied', title: '📨 Applied', icon: '📨' },
  { id: 'oa', title: '📝 OA', icon: '📝' },
  { id: 'interview', title: '🎤 Interview', icon: '🎤' },
  { id: 'offer', title: '🎉 Offer', icon: '🎉' },
  { id: 'rejected', title: '❌ Rejected', icon: '❌' },
];

export function createKanban() {
  const board = createElement('div', 'kanban-board');
  const applications = store.get('applications', []);

  COLUMNS.forEach(col => {
    const colApps = applications.filter(a => a.status === col.id);

    const column = createElement('div', 'kanban-column');
    column.innerHTML = `
      <div class="kanban-column-header">
        <span class="kanban-column-title">${col.title}</span>
        <span class="kanban-column-count">${colApps.length}</span>
      </div>
    `;

    const cardsContainer = createElement('div', 'kanban-cards glass-secondary');
    cardsContainer.dataset.status = col.id;

    colApps.forEach(app => {
      const card = createKanbanCard(app);
      cardsContainer.appendChild(card);
    });

    column.appendChild(cardsContainer);
    board.appendChild(column);

    // Drop zone events
    cardsContainer.addEventListener('dragover', (e) => {
      e.preventDefault();
      cardsContainer.classList.add('drag-over');
    });

    cardsContainer.addEventListener('dragleave', () => {
      cardsContainer.classList.remove('drag-over');
    });

    cardsContainer.addEventListener('drop', (e) => {
      e.preventDefault();
      cardsContainer.classList.remove('drag-over');

      const appId = e.dataTransfer.getData('text/plain');
      if (!appId) return;

      // Update status in store
      store.updateItem('applications', appId, (app) => ({
        ...app,
        status: col.id,
      }));

      // Move card visually
      const draggedCard = document.querySelector(`[data-app-id="${appId}"]`);
      if (draggedCard) {
        cardsContainer.appendChild(draggedCard);
        draggedCard.classList.remove('dragging');
      }

      // Update counts
      updateColumnCounts();
    });
  });

  return board;
}

function createKanbanCard(app) {
  const card = createElement('div', 'kanban-card glass-primary');
  card.draggable = true;
  card.dataset.appId = app.id;

  card.innerHTML = `
    <div class="kanban-card-title">${app.company}</div>
    <div class="kanban-card-subtitle">${app.role}</div>
    <div class="kanban-card-footer">
      <span class="text-xs text-tertiary">${formatDate(app.date)}</span>
      ${app.notes ? `<span class="text-xs text-secondary truncate" style="max-width:120px">${app.notes}</span>` : ''}
    </div>
  `;

  card.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', app.id);
    card.classList.add('dragging');
    setTimeout(() => card.style.opacity = '0.5', 0);
  });

  card.addEventListener('dragend', () => {
    card.classList.remove('dragging');
    card.style.opacity = '1';
  });

  return card;
}

function updateColumnCounts() {
  const applications = store.get('applications', []);
  document.querySelectorAll('.kanban-cards').forEach(container => {
    const status = container.dataset.status;
    const count = applications.filter(a => a.status === status).length;
    const countEl = container.previousElementSibling?.querySelector('.kanban-column-count');
    if (countEl) countEl.textContent = count;
  });
}
