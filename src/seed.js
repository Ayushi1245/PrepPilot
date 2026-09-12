// ============================================
// 🌸 PrepPilot — Demo Seed Data
// ============================================

import { store } from './store.js';
import { generateId, getDateKey } from './utils.js';

// Bump this when seed data changes to force a reseed
const SEED_VERSION = 2;

export function seedData() {
  const currentVersion = store.get('_seedVersion', 0);
  if (store.isSeeded() && currentVersion >= SEED_VERSION) return;

  // Clear old data if version mismatch
  if (currentVersion < SEED_VERSION) {
    const keys = Object.keys(localStorage).filter(k => k.startsWith('prepilot_'));
    keys.forEach(k => localStorage.removeItem(k));
  }

  // --- Tasks ---
  store.set('tasks', [
    { id: generateId(), title: 'Solve 2 Medium Graph Problems', category: 'dsa', priority: 'high', completed: false, createdAt: new Date().toISOString() },
    { id: generateId(), title: 'Revise DBMS Indexing & B+ Trees', category: 'cs', priority: 'medium', completed: false, createdAt: new Date().toISOString() },
    { id: generateId(), title: 'Complete RAG pipeline implementation', category: 'project', priority: 'high', completed: true, createdAt: new Date(Date.now() - 86400000).toISOString() },
    { id: generateId(), title: 'Practice OS scheduling algorithms', category: 'cs', priority: 'medium', completed: false, createdAt: new Date().toISOString() },
    { id: generateId(), title: 'Apply to Amazon SDE Internship', category: 'application', priority: 'high', completed: false, createdAt: new Date().toISOString() },
    { id: generateId(), title: 'Solve 1 Hard DP problem', category: 'dsa', priority: 'medium', completed: false, createdAt: new Date().toISOString() },
    { id: generateId(), title: 'Review CN — TCP/IP handshake', category: 'cs', priority: 'low', completed: true, createdAt: new Date(Date.now() - 172800000).toISOString() },
    { id: generateId(), title: 'Update resume with latest project', category: 'application', priority: 'high', completed: false, createdAt: new Date().toISOString() },
    { id: generateId(), title: 'Mock interview practice — System Design', category: 'interview', priority: 'medium', completed: false, createdAt: new Date().toISOString() },
    { id: generateId(), title: 'Complete Binary Tree traversal set', category: 'dsa', priority: 'low', completed: true, createdAt: new Date(Date.now() - 86400000).toISOString() },
  ]);

  // --- Habits ---
  store.set('habits', [
    { id: generateId(), name: 'DSA Practice', icon: '💻', streak: 18, monthlyDays: 24, totalDays: 30, completedToday: true, color: 'pink' },
    { id: generateId(), name: 'Exercise', icon: '🏃', streak: 12, monthlyDays: 20, totalDays: 30, completedToday: false, color: 'mint' },
    { id: generateId(), name: 'Meditation', icon: '🧘', streak: 7, monthlyDays: 15, totalDays: 30, completedToday: true, color: 'lavender' },
    { id: generateId(), name: 'Reading', icon: '📖', streak: 5, monthlyDays: 18, totalDays: 30, completedToday: false, color: 'peach' },
    { id: generateId(), name: 'Journaling', icon: '📝', streak: 22, monthlyDays: 26, totalDays: 30, completedToday: true, color: 'blue' },
    { id: generateId(), name: 'Project Work', icon: '🚀', streak: 9, monthlyDays: 16, totalDays: 30, completedToday: false, color: 'rose' },
    { id: generateId(), name: 'Applications', icon: '💼', streak: 3, monthlyDays: 10, totalDays: 30, completedToday: false, color: 'mint' },
  ]);

  // --- Study Subjects ---
  store.set('subjects', [
    {
      id: generateId(), name: 'Operating Systems', icon: '⚙️', color: 'lavender',
      topics: [
        { id: generateId(), name: 'Process Management', completed: true },
        { id: generateId(), name: 'Threads & Concurrency', completed: true },
        { id: generateId(), name: 'CPU Scheduling', completed: true },
        { id: generateId(), name: 'Process Synchronization', completed: false },
        { id: generateId(), name: 'Deadlocks', completed: true },
        { id: generateId(), name: 'Memory Management', completed: false },
        { id: generateId(), name: 'Virtual Memory', completed: false },
        { id: generateId(), name: 'File Systems', completed: true },
        { id: generateId(), name: 'I/O Systems', completed: false },
        { id: generateId(), name: 'Protection & Security', completed: false },
      ]
    },
    {
      id: generateId(), name: 'DBMS', icon: '🗄️', color: 'pink',
      topics: [
        { id: generateId(), name: 'ER Model & Design', completed: true },
        { id: generateId(), name: 'Relational Algebra', completed: true },
        { id: generateId(), name: 'SQL Fundamentals', completed: true },
        { id: generateId(), name: 'Normalization', completed: true },
        { id: generateId(), name: 'Transactions & ACID', completed: true },
        { id: generateId(), name: 'Concurrency Control', completed: false },
        { id: generateId(), name: 'Indexing & B+ Trees', completed: false },
        { id: generateId(), name: 'Query Optimization', completed: false },
        { id: generateId(), name: 'NoSQL Concepts', completed: false },
      ]
    },
    {
      id: generateId(), name: 'Computer Networks', icon: '🌐', color: 'blue',
      topics: [
        { id: generateId(), name: 'OSI & TCP/IP Models', completed: true },
        { id: generateId(), name: 'Physical Layer', completed: true },
        { id: generateId(), name: 'Data Link Layer', completed: true },
        { id: generateId(), name: 'Network Layer & IP', completed: true },
        { id: generateId(), name: 'Routing Algorithms', completed: false },
        { id: generateId(), name: 'Transport Layer (TCP/UDP)', completed: true },
        { id: generateId(), name: 'Application Layer (HTTP, DNS)', completed: false },
        { id: generateId(), name: 'Network Security', completed: false },
      ]
    },
    {
      id: generateId(), name: 'OOPs', icon: '🧩', color: 'peach',
      topics: [
        { id: generateId(), name: 'Classes & Objects', completed: true },
        { id: generateId(), name: 'Inheritance', completed: true },
        { id: generateId(), name: 'Polymorphism', completed: true },
        { id: generateId(), name: 'Abstraction', completed: true },
        { id: generateId(), name: 'Encapsulation', completed: true },
        { id: generateId(), name: 'SOLID Principles', completed: false },
        { id: generateId(), name: 'Design Patterns', completed: false },
      ]
    },
    {
      id: generateId(), name: 'System Design', icon: '🏗️', color: 'rose',
      topics: [
        { id: generateId(), name: 'Scalability Basics', completed: true },
        { id: generateId(), name: 'Load Balancing', completed: true },
        { id: generateId(), name: 'Caching Strategies', completed: false },
        { id: generateId(), name: 'Database Sharding', completed: false },
        { id: generateId(), name: 'Message Queues', completed: false },
        { id: generateId(), name: 'Microservices', completed: false },
        { id: generateId(), name: 'CAP Theorem', completed: true },
        { id: generateId(), name: 'URL Shortener Design', completed: true },
        { id: generateId(), name: 'Chat System Design', completed: false },
      ]
    },
    {
      id: generateId(), name: 'AI/ML Fundamentals', icon: '🤖', color: 'mint',
      topics: [
        { id: generateId(), name: 'Linear Regression', completed: true },
        { id: generateId(), name: 'Logistic Regression', completed: true },
        { id: generateId(), name: 'Decision Trees', completed: true },
        { id: generateId(), name: 'Neural Networks Basics', completed: false },
        { id: generateId(), name: 'CNNs', completed: false },
        { id: generateId(), name: 'NLP Basics', completed: false },
        { id: generateId(), name: 'Transformers & Attention', completed: false },
      ]
    },
  ]);

  // --- DSA Progress (Real LeetCode Stats) ---
  store.set('dsa', {
    totalTarget: 500,
    problems: {
      easy: { solved: 221, total: 963 },
      medium: { solved: 116, total: 2111 },
      hard: { solved: 8, total: 973 },
    },
    streak: 18,
    weeklyTarget: 15,
    weeklyDone: 9,
    acceptance: 43.99,
    topics: [
      { name: 'Arrays & Hashing', solved: 52, total: 60, icon: '📊' },
      { name: 'Two Pointers', solved: 22, total: 25, icon: '👆' },
      { name: 'Sliding Window', solved: 15, total: 18, icon: '🪟' },
      { name: 'Stack & Queue', solved: 28, total: 32, icon: '📚' },
      { name: 'Binary Search', solved: 20, total: 24, icon: '🔍' },
      { name: 'Linked Lists', solved: 21, total: 24, icon: '🔗' },
      { name: 'Trees', solved: 38, total: 50, icon: '🌳' },
      { name: 'Graphs', solved: 25, total: 45, icon: '🕸️' },
      { name: 'Dynamic Programming', solved: 38, total: 70, icon: '🧠' },
      { name: 'Greedy', solved: 18, total: 24, icon: '💰' },
      { name: 'Backtracking', solved: 12, total: 18, icon: '🔙' },
      { name: 'Tries', solved: 7, total: 12, icon: '🌲' },
      { name: 'Heap / Priority Queue', solved: 16, total: 20, icon: '⛰️' },
      { name: 'Intervals', solved: 10, total: 14, icon: '📐' },
      { name: 'Bit Manipulation', solved: 12, total: 16, icon: '💡' },
      { name: 'Math & Geometry', solved: 11, total: 15, icon: '📐' },
    ],
    revisionDue: [
      { name: 'LRU Cache', topic: 'Design', difficulty: 'medium', dueDate: getDateKey() },
      { name: 'Merge K Sorted Lists', topic: 'Heap', difficulty: 'hard', dueDate: getDateKey() },
      { name: 'Course Schedule', topic: 'Graphs', difficulty: 'medium', dueDate: getDateKey(new Date(Date.now() + 86400000)) },
    ]
  });

  // --- Companies ---
  store.set('companies', [
    { id: generateId(), name: 'Google', icon: '🟢', role: 'SWE Intern', prepPercent: 72, stage: 'Preparing', color: '#4285f4' },
    { id: generateId(), name: 'Amazon', icon: '🟠', role: 'SDE Intern', prepPercent: 85, stage: 'OA Scheduled', color: '#ff9900' },
    { id: generateId(), name: 'Microsoft', icon: '🔵', role: 'SWE Intern', prepPercent: 68, stage: 'Preparing', color: '#00a4ef' },
    { id: generateId(), name: 'Goldman Sachs', icon: '🟡', role: 'Analyst', prepPercent: 55, stage: 'Applied', color: '#7ab648' },
    { id: generateId(), name: 'Atlassian', icon: '🔵', role: 'SWE Intern', prepPercent: 40, stage: 'Saved', color: '#0052cc' },
  ]);

  // --- Applications (Kanban) ---
  store.set('applications', [
    { id: generateId(), company: 'Amazon', role: 'SDE Intern', status: 'oa', date: '2026-09-15', notes: 'OA scheduled for Sept 15' },
    { id: generateId(), company: 'Goldman Sachs', role: 'Analyst', status: 'applied', date: '2026-09-01', notes: 'Applied via portal' },
    { id: generateId(), company: 'Google', role: 'SWE Intern', status: 'preparing', date: '2026-08-20', notes: 'Referral in progress' },
    { id: generateId(), company: 'Microsoft', role: 'SWE Intern', status: 'preparing', date: '2026-08-25', notes: 'Working on resume' },
    { id: generateId(), company: 'Atlassian', role: 'SWE Intern', status: 'saved', date: '2026-08-10', notes: 'Opens in October' },
    { id: generateId(), company: 'Stripe', role: 'SDE', status: 'interview', date: '2026-09-10', notes: 'Phone screen completed' },
    { id: generateId(), company: 'Meta', role: 'SWE Intern', status: 'saved', date: '2026-08-15', notes: 'Checking openings' },
    { id: generateId(), company: 'Flipkart', role: 'SDE-1', status: 'applied', date: '2026-09-05', notes: 'Campus placement' },
  ]);

  // --- Heatmap Activity Data (last 90 days) ---
  const heatmapData = {};
  const today = new Date();
  for (let i = 0; i < 180; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = getDateKey(d);

    // Simulate realistic activity with some patterns
    const dayOfWeek = d.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const baseActivity = isWeekend ? 1 : 3;
    const randomFactor = Math.random();

    let level;
    if (randomFactor < 0.1) level = 0; // 10% no activity
    else if (randomFactor < 0.3) level = 1;
    else if (randomFactor < 0.6) level = Math.min(baseActivity, 2);
    else if (randomFactor < 0.85) level = Math.min(baseActivity + 1, 3);
    else level = 4;

    const studyHours = [0, 1.5, 3, 4.5, 6][level];
    const dsaProblems = [0, 1, 2, 4, 6][level];
    const habitsCompleted = [0, 2, 4, 5, 7][level];
    const tasksCompleted = [0, 2, 4, 7, 10][level];

    heatmapData[key] = {
      level,
      studyHours,
      dsaProblems,
      habitsCompleted,
      habitsTotal: 7,
      tasksCompleted,
      tasksTotal: 10,
    };
  }
  store.set('heatmap', heatmapData);

  // --- Achievements ---
  store.set('achievements', [
    { id: 'first-step', name: 'First Step', icon: '🌸', desc: 'Complete your first task', unlocked: true },
    { id: 'streak-7', name: '7 Day Streak', icon: '🔥', desc: 'Maintain a 7-day streak', unlocked: true },
    { id: 'streak-30', name: '30 Day Streak', icon: '💎', desc: 'Maintain a 30-day streak', unlocked: false },
    { id: 'dsa-100', name: '100 Club', icon: '💻', desc: 'Solve 100 DSA problems', unlocked: true },
    { id: 'dsa-300', name: '300 Club', icon: '⚡', desc: 'Solve 300 DSA problems', unlocked: true },
    { id: 'dsa-500', name: '500 Club', icon: '🚀', desc: 'Solve 500 DSA problems', unlocked: false },
    { id: 'app-starter', name: 'Application Starter', icon: '💼', desc: 'Apply to 5 companies', unlocked: true },
    { id: 'interview-ready', name: 'Interview Ready', icon: '🎤', desc: 'Complete 10 mock interviews', unlocked: false },
    { id: 'study-master', name: 'Study Master', icon: '📚', desc: 'Complete all subjects to 80%', unlocked: false },
  ]);

  // --- Coach tips ---
  store.set('coachTips', [
    "Focus on one topic at a time — depth beats breadth in interviews.",
    "Practice explaining your thought process out loud while solving problems.",
    "Review your weakest DSA topic for 30 minutes today.",
    "Take breaks! The Pomodoro technique can boost your focus.",
    "Write clean, well-commented code — interviewers notice.",
    "Mock interviews are the best way to reduce interview anxiety.",
    "Consistency > Intensity. 2 problems daily beats 20 on weekends.",
    "Spend 30 minutes reading about system design patterns today.",
    "Update your resume after each major project milestone.",
    "Network! Reach out to one person in your target company today.",
  ]);

  store.markSeeded();
  store.set('_seedVersion', SEED_VERSION);
}
