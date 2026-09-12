// ============================================
// 🌸 PrepPilot — Modal Component
// ============================================

/**
 * Show a glass modal with custom content.
 * @param {Object} options
 * @param {string} options.title - Modal title
 * @param {string|HTMLElement} options.content - Modal body content
 * @param {Function} [options.onSubmit] - Submit callback
 * @param {string} [options.submitLabel] - Submit button label
 * @param {Function} [options.onClose] - Close callback
 * @returns {{ close: Function }}
 */
export function showModal({ title, content, onSubmit, submitLabel = 'Save', onClose } = {}) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'modal-overlay';

  const modal = document.createElement('div');
  modal.className = 'modal-content glass-floating';

  const header = document.createElement('div');
  header.className = 'modal-header';
  header.innerHTML = `
    <h3>${title}</h3>
    <button class="modal-close" id="modal-close-btn">✕</button>
  `;

  const body = document.createElement('div');
  body.className = 'modal-body';
  if (typeof content === 'string') {
    body.innerHTML = content;
  } else if (content instanceof HTMLElement) {
    body.appendChild(content);
  }

  modal.appendChild(header);
  modal.appendChild(body);

  if (onSubmit) {
    const footer = document.createElement('div');
    footer.className = 'modal-footer';
    footer.innerHTML = `
      <button class="btn btn-secondary" id="modal-cancel-btn">Cancel</button>
      <button class="btn btn-primary" id="modal-submit-btn">${submitLabel}</button>
    `;
    modal.appendChild(footer);

    footer.querySelector('#modal-submit-btn').addEventListener('click', () => {
      onSubmit();
      close();
    });

    footer.querySelector('#modal-cancel-btn').addEventListener('click', close);
  }

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Close handlers
  function close() {
    overlay.style.opacity = '0';
    modal.style.transform = 'scale(0.95) translateY(10px)';
    setTimeout(() => {
      overlay.remove();
      onClose?.();
    }, 200);
  }

  header.querySelector('#modal-close-btn').addEventListener('click', close);

  // Light dismiss
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  // Escape key
  const escHandler = (e) => {
    if (e.key === 'Escape') {
      close();
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);

  return { close };
}
