// ============================================
// 🌸 PrepPilot — Reactive Store (localStorage-backed)
// ============================================

class Store {
  constructor() {
    this._listeners = new Map();
    this._prefix = 'prepilot_';
  }

  get(key, defaultValue = null) {
    try {
      const raw = localStorage.getItem(this._prefix + key);
      return raw ? JSON.parse(raw) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  set(key, value) {
    try {
      localStorage.setItem(this._prefix + key, JSON.stringify(value));
      this._notify(key, value);
    } catch (e) {
      console.warn('Store: failed to save', key, e);
    }
  }

  update(key, updater) {
    const current = this.get(key);
    const updated = updater(current);
    this.set(key, updated);
    return updated;
  }

  // Array helpers
  push(key, item) {
    return this.update(key, (arr) => [...(arr || []), item]);
  }

  remove(key, predicate) {
    return this.update(key, (arr) => (arr || []).filter((item) => !predicate(item)));
  }

  find(key, predicate) {
    return (this.get(key) || []).find(predicate);
  }

  updateItem(key, id, updater) {
    return this.update(key, (arr) =>
      (arr || []).map((item) => (item.id === id ? updater(item) : item))
    );
  }

  // Event system
  on(key, listener) {
    if (!this._listeners.has(key)) {
      this._listeners.set(key, new Set());
    }
    this._listeners.get(key).add(listener);
    return () => this._listeners.get(key)?.delete(listener);
  }

  _notify(key, value) {
    const listeners = this._listeners.get(key);
    if (listeners) {
      listeners.forEach((fn) => fn(value));
    }
    // Also notify wildcard listeners
    const wildcardListeners = this._listeners.get('*');
    if (wildcardListeners) {
      wildcardListeners.forEach((fn) => fn(key, value));
    }
  }

  // Check if data exists
  has(key) {
    return localStorage.getItem(this._prefix + key) !== null;
  }

  // Clear specific key
  delete(key) {
    localStorage.removeItem(this._prefix + key);
    this._notify(key, null);
  }

  // Check if initial data is seeded
  isSeeded() {
    return this.get('_seeded', false);
  }

  markSeeded() {
    this.set('_seeded', true);
  }
}

export const store = new Store();
