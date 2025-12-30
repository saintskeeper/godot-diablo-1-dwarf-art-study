// State
let posts = [];
let currentIndex = -1;
let doneSet = new Set();
const STORAGE_KEY = 'engage-electron-done';

// DOM Elements - Views
const dashboard = document.getElementById('dashboard');
const emptyState = document.getElementById('empty-state');
const mainLayout = document.getElementById('main-layout');
const myContentView = document.getElementById('my-content');
const dropZone = document.getElementById('drop-zone');
const pasteBtn = document.getElementById('paste-btn');
const cardList = document.getElementById('card-list');
const iframeContainer = document.getElementById('iframe-container');
const currentPostEl = document.getElementById('current-post');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const reloadBtn = document.getElementById('reload-btn');
const doneNextBtn = document.getElementById('done-next-btn');
const focusBtn = document.getElementById('focus-btn');
const clearQueueBtn = document.getElementById('clear-queue-btn');
const resetBtn = document.getElementById('reset-btn');
const doneCountEl = document.getElementById('done-count');
const totalCountEl = document.getElementById('total-count');
const hideDoneCheckbox = document.getElementById('hide-done-checkbox');
const toast = document.getElementById('toast');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');

// Initialize
async function init() {
  await loadDoneState();
  setupDragDrop();
  setupPaste();
  setupKeyboard();
  setupButtons();
  setupLogin();
  setupMenuCommands();
  setupDashboard();
  setupMyContent();
  await loadDashboardData();
}

// Setup menu command handlers (Cmd+K/J/F/D/R from main process)
function setupMenuCommands() {
  window.electronAPI.onNavCommand((command) => {
    switch (command) {
      case 'prev':
        prevCard();
        break;
      case 'next':
        nextCard();
        break;
      case 'focus':
        focusWebview();
        break;
      case 'done':
        markCurrentDoneAndNext();
        break;
      case 'reload':
        reloadIframe();
        break;
      case 'clear-queue':
        clearQueueAndPaste();
        break;
    }
  });
}

// Load done state from SQLite (with localStorage migration)
async function loadDoneState() {
  try {
    // Check for localStorage migration (one-time)
    const localStored = localStorage.getItem(STORAGE_KEY);
    if (localStored) {
      const localUrls = JSON.parse(localStored);
      if (localUrls.length > 0) {
        console.log(`Migrating ${localUrls.length} done URLs from localStorage to SQLite...`);
        const result = await window.electronAPI.db.migrateLocalStorage(localUrls);
        console.log(`Migration complete: ${result.migratedCount} URLs migrated`);
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    // Load from SQLite
    const doneUrls = await window.electronAPI.db.getDoneUrls();
    doneSet = new Set(doneUrls);
  } catch (e) {
    console.error('Failed to load done state:', e);
    // Fallback to localStorage if SQLite fails
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        doneSet = new Set(JSON.parse(stored));
      }
    } catch (fallbackError) {
      console.error('Fallback to localStorage also failed:', fallbackError);
    }
  }
}

// Setup drag and drop
function setupDragDrop() {
  // Prevent default drag behaviors on window
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    document.body.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
  });

  // Highlight drop zone
  ['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, () => {
      dropZone.classList.add('drag-over');
    });
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, () => {
      dropZone.classList.remove('drag-over');
    });
  });

  // Handle drop
  dropZone.addEventListener('drop', handleFileDrop);
}

// Setup paste functionality
function setupPaste() {
  pasteBtn.addEventListener('click', handlePaste);

  document.addEventListener('paste', (e) => {
    // Handle paste from empty state OR main view (to load new queue)
    const webview = document.getElementById('post-webview');
    const isWebviewFocused = webview && document.activeElement === webview;

    // Don't intercept paste if webview is focused (user typing in X.com)
    if (isWebviewFocused) return;

    handlePaste(e);
  });
}

async function handlePaste(e) {
  let text;

  if (e && e.clipboardData) {
    text = e.clipboardData.getData('text');
  } else {
    try {
      text = await navigator.clipboard.readText();
    } catch (err) {
      showToast('Failed to read clipboard', 'error');
      return;
    }
  }

  if (!text) {
    showToast('Clipboard is empty', 'error');
    return;
  }

  parseAndLoadJSON(text);
}

// Field mapping configuration for flexible intake
const FIELD_MAPPINGS = {
  url: ['url', 'link', 'href', 'post_url', 'tweet_url', 'permalink'],
  author: ['author', 'username', 'user', 'screen_name', 'handle', 'name', 'user_name', 'from', 'poster'],
  summary: ['summary', 'text', 'content', 'body', 'title', 'tweet', 'message', 'post_text'],
  description: ['description', 'desc', 'details', 'body', 'extended_text'],
  likes: ['likes', 'like_count', 'favorites', 'favorite_count', 'hearts', 'love_count'],
  retweets: ['retweets', 'retweet_count', 'shares', 'share_count', 'reposts', 'repost_count'],
  comments: ['comments', 'comment_count', 'replies', 'reply_count', 'responses'],
  followers: ['followers', 'follower_count', 'followers_count', 'audience'],
  suggested_comment: ['suggested_comment', 'suggested_reply', 'reply', 'comment', 'response', 'suggested_response']
};

// Common array wrapper keys to unwrap
const ARRAY_WRAPPER_KEYS = ['posts', 'items', 'data', 'results', 'tweets', 'entries', 'records', 'list'];

// Find array in data - handles both direct arrays and wrapped objects
function findPostsArray(data) {
  // Direct array
  if (Array.isArray(data)) {
    return { array: data, wrapper: null };
  }

  // Check for common wrapper keys
  if (typeof data === 'object' && data !== null) {
    for (const key of ARRAY_WRAPPER_KEYS) {
      if (Array.isArray(data[key])) {
        return { array: data[key], wrapper: key };
      }
    }

    // Fallback: find first array property
    for (const key of Object.keys(data)) {
      if (Array.isArray(data[key]) && data[key].length > 0) {
        return { array: data[key], wrapper: key };
      }
    }
  }

  return { array: null, wrapper: null };
}

// Find a field value using mapping - returns first match
function findMappedField(obj, targetField) {
  const candidates = FIELD_MAPPINGS[targetField] || [targetField];

  for (const candidate of candidates) {
    // Direct match
    if (obj[candidate] !== undefined) {
      return obj[candidate];
    }

    // Case-insensitive match
    const lowerCandidate = candidate.toLowerCase();
    for (const key of Object.keys(obj)) {
      if (key.toLowerCase() === lowerCandidate) {
        return obj[key];
      }
    }

    // Partial match (e.g., 'user_name' matches 'username')
    const normalized = candidate.replace(/[_-]/g, '');
    for (const key of Object.keys(obj)) {
      if (key.replace(/[_-]/g, '').toLowerCase() === normalized.toLowerCase()) {
        return obj[key];
      }
    }
  }

  return undefined;
}

// Normalize a single post object to our expected format
function normalizePost(obj) {
  return {
    url: findMappedField(obj, 'url'),
    author: findMappedField(obj, 'author'),
    summary: findMappedField(obj, 'summary'),
    description: findMappedField(obj, 'description'),
    likes: findMappedField(obj, 'likes'),
    retweets: findMappedField(obj, 'retweets'),
    comments: findMappedField(obj, 'comments'),
    followers: findMappedField(obj, 'followers'),
    suggested_comment: findMappedField(obj, 'suggested_comment'),
    // Preserve any extra fields from original
    ...obj
  };
}

// Parse and load JSON content with flexible intake
async function parseAndLoadJSON(content) {
  try {
    const data = JSON.parse(content);
    const { array, wrapper } = findPostsArray(data);

    if (!array) {
      showToast('Could not find posts array in JSON', 'error');
      return;
    }

    if (array.length === 0) {
      showToast('No posts found in JSON', 'error');
      return;
    }

    // Normalize all posts
    const normalized = array.map(normalizePost);

    // Validate that we found required fields
    const missingUrl = normalized.findIndex(p => !p.url);
    if (missingUrl !== -1) {
      showToast(`Post ${missingUrl + 1} missing URL field`, 'error');
      return;
    }

    // Author is nice-to-have, use fallback if missing
    normalized.forEach((p, i) => {
      if (!p.author) {
        p.author = `Post ${i + 1}`;
      }
    });

    // Save to SQLite (returns posts with UUIDs, handles de-duplication)
    const result = await window.electronAPI.db.savePosts(normalized);

    if (!result.success) {
      showToast(`Database error: ${result.error}`, 'error');
      return;
    }

    // Use returned posts (now have UUIDs and de-duplicated)
    posts = result.posts;
    currentIndex = -1;
    renderCards();
    showMainLayout();

    const wrapperNote = wrapper ? ` (from "${wrapper}")` : '';
    const dupeNote = result.duplicateCount > 0 ? `, ${result.duplicateCount} duplicates updated` : '';
    showToast(`Loaded ${result.savedCount} new posts${dupeNote}${wrapperNote}`, 'success');

  } catch (e) {
    showToast(`Invalid JSON: ${e.message}`, 'error');
  }
}

// Show main layout, hide empty state and dashboard
function showMainLayout() {
  dashboard.classList.add('hidden');
  emptyState.classList.add('hidden');
  mainLayout.classList.remove('hidden');
  totalCountEl.textContent = posts.length;
  updateDoneCount();
}

// Show empty state, hide main layout and dashboard
function showEmptyState() {
  dashboard.classList.add('hidden');
  mainLayout.classList.add('hidden');
  emptyState.classList.remove('hidden');
  posts = [];
  currentIndex = -1;
}

// Render cards
function renderCards() {
  cardList.innerHTML = '';
  const hideDone = hideDoneCheckbox.checked;

  posts.forEach((post, index) => {
    const isDone = doneSet.has(post.url);

    if (hideDone && isDone) return;

    const card = document.createElement('div');
    card.className = `card${index === currentIndex ? ' active' : ''}${isDone ? ' done' : ''}`;
    card.dataset.index = index;

    card.innerHTML = `
      <div class="card-header">
        <div class="card-info">
          <span class="author">${escapeHtml(post.author)}</span>
          <span class="followers">${escapeHtml(post.followers || '')}</span>
        </div>
        <div class="card-stats">
          <span>❤️ ${escapeHtml(post.likes || '0')}</span>
          <span>🔄 ${escapeHtml(post.retweets || '0')}</span>
          <span>💬 ${escapeHtml(post.comments || '0')}</span>
        </div>
      </div>
      <div class="card-summary">${escapeHtml(post.summary || '')}</div>
      ${post.suggested_comment ? `
        <div class="suggested">
          <span class="suggested-text">${escapeHtml(post.suggested_comment)}</span>
          <button class="copy-btn" data-copy="${escapeAttr(post.suggested_comment)}">Copy</button>
        </div>
      ` : ''}
      <div class="card-actions">
        <label class="done-label">
          <input type="checkbox" ${isDone ? 'checked' : ''} data-done-index="${index}">
          Done
        </label>
        <button class="open-tab-btn" data-url="${escapeAttr(post.url)}">New Tab</button>
      </div>
    `;

    // Card click handler
    card.addEventListener('click', (e) => {
      if (e.target.matches('button, input, label')) return;
      selectCard(index);
    });

    cardList.appendChild(card);
  });

  // Add event listeners for buttons inside cards
  cardList.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      copyToClipboard(btn.dataset.copy);
      btn.textContent = 'Copied!';
      setTimeout(() => btn.textContent = 'Copy', 1500);
    });
  });

  cardList.querySelectorAll('.open-tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      window.open(btn.dataset.url, '_blank');
    });
  });

  cardList.querySelectorAll('[data-done-index]').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      e.stopPropagation();
      const idx = parseInt(checkbox.dataset.doneIndex);
      markDone(idx, checkbox.checked);
    });
  });
}

// Select a card and load its post
function selectCard(index) {
  if (index < 0 || index >= posts.length) return;

  currentIndex = index;
  const post = posts[index];

  // Update active state
  cardList.querySelectorAll('.card').forEach(c => c.classList.remove('active'));
  const activeCard = cardList.querySelector(`[data-index="${index}"]`);
  if (activeCard) {
    activeCard.classList.add('active');
    activeCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Update header
  currentPostEl.textContent = `${post.author} - ${post.summary || 'Post'}`;

  // Load post in webview (better Electron integration than iframe)
  iframeContainer.innerHTML = `<webview
    src="${escapeAttr(post.url)}"
    allowpopups
    id="post-webview"
    style="width:100%;height:100%;display:inline-flex;"
  ></webview>`;

  // Focus webview for scrolling and input
  const webview = document.getElementById('post-webview');
  webview.addEventListener('dom-ready', () => {
    webview.focus();
    // Inject focus to the webview content
    webview.executeJavaScript('document.body.focus();');
  });

  // Update nav buttons
  updateNavButtons();
}

// Update navigation buttons state
function updateNavButtons() {
  prevBtn.disabled = currentIndex <= 0;
  nextBtn.disabled = currentIndex >= posts.length - 1;
}

// Navigate to previous card
function prevCard() {
  if (currentIndex > 0) {
    // If hiding done, find previous visible card
    if (hideDoneCheckbox.checked) {
      for (let i = currentIndex - 1; i >= 0; i--) {
        if (!doneSet.has(posts[i].url)) {
          selectCard(i);
          return;
        }
      }
    } else {
      selectCard(currentIndex - 1);
    }
  }
}

// Navigate to next card
function nextCard() {
  if (currentIndex < posts.length - 1) {
    // If hiding done, find next visible card
    if (hideDoneCheckbox.checked) {
      for (let i = currentIndex + 1; i < posts.length; i++) {
        if (!doneSet.has(posts[i].url)) {
          selectCard(i);
          return;
        }
      }
    } else {
      selectCard(currentIndex + 1);
    }
  }
}

// Mark a post as done/undone
async function markDone(index, done) {
  const post = posts[index];
  if (!post) return;

  // Save to SQLite
  try {
    const result = await window.electronAPI.db.markDone(post.id, done);
    if (!result.success) {
      showToast(`Failed to save: ${result.error}`, 'error');
      return;
    }
  } catch (e) {
    console.error('Failed to mark done:', e);
    showToast('Failed to save done state', 'error');
    return;
  }

  // Update local state
  if (done) {
    doneSet.add(post.url);
  } else {
    doneSet.delete(post.url);
  }

  updateDoneCount();
  renderCards();

  // Re-select current card to update active state
  if (currentIndex >= 0) {
    const activeCard = cardList.querySelector(`[data-index="${currentIndex}"]`);
    if (activeCard) {
      activeCard.classList.add('active');
    }
  }
}

// Mark current and go to next
async function markCurrentDoneAndNext() {
  if (currentIndex >= 0) {
    await markDone(currentIndex, true);
    nextCard();
  }
}

// Update done count display
function updateDoneCount() {
  const count = posts.filter(p => doneSet.has(p.url)).length;
  doneCountEl.textContent = count;
}

// Reset progress for current queue
async function resetProgress() {
  if (confirm('Reset progress for current queue? This cannot be undone.')) {
    // Reset each post in the current queue
    for (const post of posts) {
      if (doneSet.has(post.url)) {
        try {
          await window.electronAPI.db.markDone(post.id, false);
        } catch (e) {
          console.error('Failed to reset post:', e);
        }
      }
    }
    doneSet.clear();
    updateDoneCount();
    renderCards();
    showToast('Progress reset', 'success');
  }
}

// Setup keyboard shortcuts
function setupKeyboard() {
  document.addEventListener('keydown', (e) => {
    // Ignore if typing in an input or webview has focus
    if (e.target.matches('input, textarea, webview')) return;

    // Check if webview is focused
    const webview = document.getElementById('post-webview');
    if (webview && document.activeElement === webview) {
      // Only handle Escape to exit webview focus
      if (e.key === 'Escape') {
        cardList.focus();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowUp':
      case 'k':
        e.preventDefault();
        prevCard();
        break;
      case 'ArrowDown':
      case 'j':
        e.preventDefault();
        nextCard();
        break;
      case 'd':
        if (!e.metaKey && !e.ctrlKey) {
          e.preventDefault();
          markCurrentDoneAndNext();
        }
        break;
      case 'r':
        if (!e.metaKey && !e.ctrlKey) {
          e.preventDefault();
          reloadIframe();
        }
        break;
      case 'Escape':
        // Focus sidebar
        cardList.focus();
        break;
      case 'Enter':
      case 'f':
        // Focus webview
        focusWebview();
        break;
    }
  });
}

// Setup button handlers
function setupButtons() {
  prevBtn.addEventListener('click', prevCard);
  nextBtn.addEventListener('click', nextCard);
  reloadBtn.addEventListener('click', reloadIframe);
  doneNextBtn.addEventListener('click', markCurrentDoneAndNext);
  focusBtn.addEventListener('click', focusWebview);
  if (clearQueueBtn) {
    clearQueueBtn.addEventListener('click', clearQueueAndPaste);
  }
  resetBtn.addEventListener('click', resetProgress);
  hideDoneCheckbox.addEventListener('change', renderCards);
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logoutAndRelogin);
  }
}

// Clear queue and prompt for new JSON
async function clearQueueAndPaste() {
  posts = [];
  currentIndex = -1;
  cardList.innerHTML = '';
  iframeContainer.innerHTML = '<div class="placeholder">Queue cleared - paste new JSON</div>';
  totalCountEl.textContent = '0';
  updateDoneCount();
  showToast('Queue cleared - Cmd+V to paste new JSON', 'success');

  // Try to read clipboard and load immediately
  try {
    const text = await navigator.clipboard.readText();
    if (text && text.trim().startsWith('[')) {
      parseAndLoadJSON(text);
    }
  } catch (e) {
    // Clipboard access denied, user will paste manually
  }
}

// Logout from X.com and show login view
async function logoutAndRelogin() {
  showToast('Clearing X.com session...', 'success');
  const result = await window.electronAPI.clearXSession();
  if (result.success) {
    showToast('Session cleared - please login again', 'success');
    showLoginViewInMain();
  } else {
    showToast(`Logout failed: ${result.error}`, 'error');
  }
}

// Show login view while keeping main layout (for re-login)
function showLoginViewInMain() {
  iframeContainer.innerHTML = `
    <div class="login-view-inline">
      <div class="login-header-inline">
        <h2>Login to X.com</h2>
      </div>
      <webview src="https://x.com/login" id="login-webview-inline" allowpopups style="width:100%;height:calc(100% - 80px);"></webview>
      <div class="login-footer-inline">
        <button class="primary" id="login-done-inline-btn">Done - I'm logged in</button>
      </div>
    </div>
  `;

  document.getElementById('login-done-inline-btn').addEventListener('click', () => {
    showToast('Logged in! Reload a post to test.', 'success');
    iframeContainer.innerHTML = '<div class="placeholder">← Click a card to reload post</div>';
    if (currentIndex >= 0) {
      selectCard(currentIndex);
    }
  });
}

// Reload iframe
function reloadIframe() {
  const webview = document.getElementById('post-webview');
  if (webview) {
    webview.reload();
  }
}

// Focus webview
function focusWebview() {
  const webview = document.getElementById('post-webview');
  if (webview) {
    webview.focus();
    // Try multiple focus methods
    try {
      webview.executeJavaScript(`
        document.body.click();
        document.body.focus();
        window.focus();
      `);
    } catch (e) {
      console.log('Focus inject failed:', e);
    }
    showToast('Webview focused - try scrolling/clicking', 'success');
  }
}

// Copy text to clipboard
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
}

// Show toast notification
function showToast(message, type = '') {
  toast.textContent = message;
  toast.className = `toast ${type}`;

  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3000);
}

// Escape HTML
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Escape for HTML attributes
function escapeAttr(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;');
}

// Setup login flow
function setupLogin() {
  loginBtn.addEventListener('click', showLoginView);
}

// Show login view with X.com iframe
function showLoginView() {
  emptyState.innerHTML = `
    <div class="login-view">
      <div class="login-header">
        <h2>Login to X.com</h2>
        <button class="back-btn" id="back-to-drop">← Back</button>
      </div>
      <div class="login-iframe-container">
        <webview src="https://x.com/login" id="login-webview" allowpopups></webview>
      </div>
      <div class="login-footer">
        <p>After logging in, click "Done" to return</p>
        <button class="paste-btn" id="login-done-btn">Done - I'm logged in</button>
      </div>
    </div>
  `;

  document.getElementById('back-to-drop').addEventListener('click', restoreEmptyState);
  document.getElementById('login-done-btn').addEventListener('click', () => {
    restoreEmptyState();
    showToast('Logged in! Session will persist.', 'success');
  });
}

// Restore original empty state
function restoreEmptyState() {
  emptyState.innerHTML = `
    <div class="drop-zone" id="drop-zone">
      <div class="drop-icon">📋</div>
      <div class="drop-text">Drop JSON file here</div>
      <div class="drop-divider">or</div>
      <div class="drop-hint">⌘V to paste JSON</div>
      <button class="paste-btn" id="paste-btn">Paste JSON</button>
      <div class="login-section">
        <div class="drop-divider">─────────</div>
        <button class="login-btn" id="login-btn">Login to X.com first</button>
        <div class="login-hint">One-time setup - session persists</div>
      </div>
    </div>
  `;

  // Re-attach event listeners
  const newDropZone = document.getElementById('drop-zone');
  const newPasteBtn = document.getElementById('paste-btn');
  const newLoginBtn = document.getElementById('login-btn');

  ['dragenter', 'dragover'].forEach(eventName => {
    newDropZone.addEventListener(eventName, () => newDropZone.classList.add('drag-over'));
  });
  ['dragleave', 'drop'].forEach(eventName => {
    newDropZone.addEventListener(eventName, () => newDropZone.classList.remove('drag-over'));
  });
  newDropZone.addEventListener('drop', handleFileDrop);
  newPasteBtn.addEventListener('click', handlePaste);
  newLoginBtn.addEventListener('click', showLoginView);
}

// Handle file drop (extracted for reuse)
async function handleFileDrop(e) {
  const files = e.dataTransfer.files;
  if (files.length === 0) return;

  const file = files[0];
  if (!file.name.endsWith('.json')) {
    showToast('Please drop a .json file', 'error');
    return;
  }

  const result = await window.electronAPI.readDroppedFile(file.path);
  if (result.success) {
    parseAndLoadJSON(result.content);
  } else {
    showToast(`Failed to read file: ${result.error}`, 'error');
  }
}

// ============================================
// Dashboard Functions
// ============================================

function setupDashboard() {
  // Start Engaging button
  const startEngageBtn = document.getElementById('start-engage-btn');
  if (startEngageBtn) {
    startEngageBtn.addEventListener('click', showEmptyStateFromDashboard);
  }

  // Dashboard login button
  const dashboardLoginBtn = document.getElementById('dashboard-login-btn');
  if (dashboardLoginBtn) {
    dashboardLoginBtn.addEventListener('click', () => {
      showEmptyStateFromDashboard();
      setTimeout(showLoginView, 100);
    });
  }

  // Back to dashboard buttons
  const backFromEmpty = document.getElementById('back-to-dashboard-empty');
  if (backFromEmpty) {
    backFromEmpty.addEventListener('click', showDashboard);
  }

  const backFromMain = document.getElementById('back-to-dashboard-main');
  if (backFromMain) {
    backFromMain.addEventListener('click', showDashboard);
  }

  // Set today's date
  const todayDateEl = document.getElementById('today-date');
  if (todayDateEl) {
    todayDateEl.textContent = new Date().toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  }
}

function showDashboard() {
  dashboard.classList.remove('hidden');
  emptyState.classList.add('hidden');
  mainLayout.classList.add('hidden');
  myContentView.classList.add('hidden');
  loadDashboardData();
}

function showEmptyStateFromDashboard() {
  dashboard.classList.add('hidden');
  emptyState.classList.remove('hidden');
  mainLayout.classList.add('hidden');
  myContentView.classList.add('hidden');
}

function showMyContent() {
  dashboard.classList.add('hidden');
  emptyState.classList.add('hidden');
  mainLayout.classList.add('hidden');
  myContentView.classList.remove('hidden');
  loadMyContentData();
}

async function loadDashboardData() {
  try {
    const analytics = await window.electronAPI.db.getAnalytics({ range: 30 });
    renderDashboardWidgets(analytics);
  } catch (e) {
    console.error('Failed to load dashboard data:', e);
  }
}

function renderDashboardWidgets(analytics) {
  renderTodayWidget(analytics);
  renderStreakWidget(analytics);
  renderVolumeWidget(analytics);
  renderAuthorsWidget(analytics);
  renderTimesWidget(analytics);
  renderBatchesWidget();
  renderFooterStats(analytics);
}

function renderTodayWidget(analytics) {
  const today = new Date().toISOString().split('T')[0];
  const efficiency = analytics.efficiency || {};
  const dailyStats = efficiency.dailyStats || [];

  const todayData = dailyStats.find(d => d.day === today) || { ingested: 0, completed: 0, completion_rate: 0 };

  document.getElementById('today-completed').textContent = todayData.completed || 0;
  document.getElementById('today-ingested').textContent = todayData.ingested || 0;
  document.getElementById('today-rate').textContent = `${todayData.completion_rate || 0}%`;
}

function renderStreakWidget(analytics) {
  const efficiency = analytics.efficiency || {};
  const dailyStats = efficiency.dailyStats || [];

  // Calculate streak (consecutive days with at least 1 completion)
  let streak = 0;
  const today = new Date();
  const sortedDays = dailyStats
    .filter(d => d.completed > 0)
    .map(d => d.day)
    .sort()
    .reverse();

  for (let i = 0; i < 30; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(checkDate.getDate() - i);
    const dateStr = checkDate.toISOString().split('T')[0];

    if (sortedDays.includes(dateStr)) {
      streak++;
    } else if (i > 0) {
      break;
    }
  }

  document.getElementById('streak-days').textContent = streak;

  const streakIcon = document.getElementById('streak-icon');
  if (streak === 0) {
    streakIcon.classList.add('inactive');
  } else {
    streakIcon.classList.remove('inactive');
  }

  // Render last 14 days calendar
  const calendarEl = document.getElementById('streak-calendar');
  calendarEl.innerHTML = '';

  for (let i = 13; i >= 0; i--) {
    const checkDate = new Date(today);
    checkDate.setDate(checkDate.getDate() - i);
    const dateStr = checkDate.toISOString().split('T')[0];

    const dayEl = document.createElement('div');
    dayEl.className = 'streak-day';
    if (sortedDays.includes(dateStr)) {
      dayEl.classList.add('active');
    }
    if (i === 0) {
      dayEl.classList.add('today');
    }
    dayEl.title = checkDate.toLocaleDateString();
    calendarEl.appendChild(dayEl);
  }
}

function renderVolumeWidget(analytics) {
  const volume = analytics.volume || {};
  const completions = volume.completionStats || [];

  const chartEl = document.getElementById('volume-chart');
  chartEl.innerHTML = '';

  // Get last 7 days
  const today = new Date();
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().split('T')[0]);
  }

  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const values = days.map(day => {
    const data = completions.find(c => c.period === day);
    return data ? data.completions : 0;
  });

  const maxVal = Math.max(...values, 1);
  let weekTotal = 0;

  days.forEach((day, i) => {
    const val = values[i];
    weekTotal += val;
    const height = Math.max((val / maxVal) * 100, 4);
    const isToday = i === days.length - 1;

    const bar = document.createElement('div');
    bar.className = `volume-bar${isToday ? ' today' : ''}`;
    bar.style.height = `${height}%`;
    bar.title = `${new Date(day).toLocaleDateString()}: ${val} completions`;

    const label = document.createElement('span');
    label.className = 'volume-bar-label';
    label.textContent = dayNames[new Date(day).getDay()];
    bar.appendChild(label);

    chartEl.appendChild(bar);
  });

  document.getElementById('week-total').textContent = weekTotal;
  document.getElementById('week-avg').textContent = Math.round(weekTotal / 7 * 10) / 10;
}

function renderAuthorsWidget(analytics) {
  const authors = analytics.authors || [];
  const listEl = document.getElementById('author-list');

  if (authors.length === 0) {
    listEl.innerHTML = '<div class="author-empty">No data yet</div>';
    return;
  }

  const maxPosts = Math.max(...authors.map(a => a.total_posts));

  listEl.innerHTML = authors.slice(0, 8).map((author, i) => `
    <div class="author-item">
      <span class="author-rank">#${i + 1}</span>
      <div class="author-info">
        <div class="author-name">${escapeHtml(author.author || author.author_handle || 'Unknown')}</div>
        <div class="author-stats">${author.completed_posts}/${author.total_posts} completed</div>
      </div>
      <div class="author-bar">
        <div class="author-bar-fill" style="width: ${(author.completed_posts / author.total_posts) * 100}%"></div>
      </div>
    </div>
  `).join('');
}

function renderTimesWidget(analytics) {
  const patterns = analytics.patterns || {};
  const hourly = patterns.hourlyPattern || [];

  const chartEl = document.getElementById('time-chart');
  chartEl.innerHTML = '';

  // Create 24 hour blocks
  const maxCount = Math.max(...hourly.map(h => h.completions), 1);

  for (let hour = 0; hour < 24; hour++) {
    const hourStr = hour.toString().padStart(2, '0');
    const data = hourly.find(h => h.hour_of_day === hourStr);
    const count = data ? data.completions : 0;

    let level = 0;
    if (count > 0) {
      const ratio = count / maxCount;
      if (ratio > 0.8) level = 5;
      else if (ratio > 0.6) level = 4;
      else if (ratio > 0.4) level = 3;
      else if (ratio > 0.2) level = 2;
      else level = 1;
    }

    const block = document.createElement('div');
    block.className = `time-block${level > 0 ? ` level-${level}` : ''}`;
    block.textContent = hour;
    block.title = `${hour}:00 - ${count} completions`;
    chartEl.appendChild(block);
  }
}

async function renderBatchesWidget() {
  const listEl = document.getElementById('batch-list');

  try {
    const analytics = await window.electronAPI.db.getAnalytics({ type: 'volume' });
    const batches = analytics.volume?.ingestionStats || [];

    if (batches.length === 0) {
      listEl.innerHTML = '<div class="batch-empty">No sessions yet</div>';
      return;
    }

    listEl.innerHTML = batches.slice(0, 5).map(batch => {
      const date = new Date(batch.period || batch.ingested_at);
      return `
        <div class="batch-item">
          <div class="batch-info">
            <span class="batch-date">${date.toLocaleDateString()}</span>
            <span class="batch-source">${batch.batch_count || 1} batch(es)</span>
          </div>
          <span class="batch-count">${batch.posts_ingested} posts</span>
        </div>
      `;
    }).join('');
  } catch (e) {
    console.error('Failed to load batches:', e);
    listEl.innerHTML = '<div class="batch-empty">Failed to load</div>';
  }
}

function renderFooterStats(analytics) {
  const efficiency = analytics.efficiency || {};
  const totals = efficiency.totals || {};
  const authors = analytics.authors || [];

  document.getElementById('all-time-posts').textContent = totals.total_posts || 0;
  document.getElementById('all-time-completed').textContent = totals.total_completed || 0;
  document.getElementById('all-time-rate').textContent = `${totals.completion_rate || 0}%`;
  document.getElementById('all-time-authors').textContent = authors.length;
}

// ==================== MY CONTENT ANALYTICS ====================

function setupMyContent() {
  // My Content button on dashboard
  const myContentBtn = document.getElementById('my-content-btn');
  if (myContentBtn) {
    myContentBtn.addEventListener('click', showMyContent);
  }

  // Back button
  const backFromMyContent = document.getElementById('back-from-my-content');
  if (backFromMyContent) {
    backFromMyContent.addEventListener('click', showDashboard);
  }

  // Import feedback button
  const importFeedbackBtn = document.getElementById('import-feedback-btn');
  if (importFeedbackBtn) {
    importFeedbackBtn.addEventListener('click', handleFeedbackImport);
  }

  // Sort/filter dropdowns
  const postSort = document.getElementById('post-sort');
  if (postSort) {
    postSort.addEventListener('change', () => loadMyPostsTable());
  }

  const postFilterMedia = document.getElementById('post-filter-media');
  if (postFilterMedia) {
    postFilterMedia.addEventListener('change', () => loadMyPostsTable());
  }

  // Listen for auto-imported feedback
  window.electronAPI.onFeedbackImported((result) => {
    if (result.success && !myContentView.classList.contains('hidden')) {
      loadMyContentData();
      showToast(`Auto-imported ${result.postsProcessed} posts`);
    }
  });
}

async function handleFeedbackImport() {
  try {
    const text = await navigator.clipboard.readText();
    if (!text) {
      showToast('Clipboard is empty', 'error');
      return;
    }

    const data = JSON.parse(text);

    // Validate expected structure
    if (!data.walter_posts_reviewed && !data.walter_summary) {
      showToast('Invalid feedback format', 'error');
      return;
    }

    const result = await window.electronAPI.myContent.saveFeedbackReport(data);

    if (result.success) {
      showToast(`Imported ${result.postsProcessed} posts`);
      loadMyContentData();
    } else {
      showToast(`Import failed: ${result.error}`, 'error');
    }
  } catch (e) {
    showToast(`Invalid JSON: ${e.message}`, 'error');
  }
}

async function loadMyContentData() {
  try {
    const analytics = await window.electronAPI.myContent.getAnalytics({ range: 30 });
    const actionItems = await window.electronAPI.myContent.getActionItems({ limit: 10 });
    const benchmarks = await window.electronAPI.myContent.getBenchmarks({ limit: 5 });
    const trends = await window.electronAPI.myContent.getScoreTrends(30);

    renderMyContentWidgets({ analytics, actionItems, benchmarks, trends });
    loadMyPostsTable();
  } catch (e) {
    console.error('Failed to load my content data:', e);
    showToast('Failed to load analytics', 'error');
  }
}

function renderMyContentWidgets(data) {
  renderScoreOverview(data.analytics);
  renderScoreBreakdown(data.analytics);
  renderScoreTrendChart(data.trends);
  renderTopPosts(data.analytics.topPosts);
  renderActionItems(data.actionItems);
  renderBenchmarks(data.benchmarks);
  renderExperiment(data.analytics);
  renderFocusAreas(data.analytics);
}

function renderScoreOverview(analytics) {
  const scoreEl = document.getElementById('avg-overall-score');
  const trendEl = document.getElementById('score-trend');

  const avgScore = analytics.totals?.avg_overall;
  scoreEl.textContent = avgScore ? avgScore.toFixed(1) : '--';

  const trend = analytics.trend;
  if (trend !== null && trend !== undefined) {
    const isUp = parseFloat(trend) >= 0;
    trendEl.innerHTML = `
      <span class="trend-arrow ${isUp ? 'up' : 'down'}">${isUp ? '↑' : '↓'}</span>
      <span class="trend-value">${Math.abs(trend)}% vs last period</span>
    `;
  } else {
    trendEl.innerHTML = '<span class="trend-value">No comparison data</span>';
  }
}

function renderScoreBreakdown(analytics) {
  const container = document.getElementById('score-bars');
  const avgScores = analytics.avgScores || {};

  const categories = [
    { key: 'hook', label: 'Hook', color: '#1d9bf0' },
    { key: 'visual_impact', label: 'Visual', color: '#00ba7c' },
    { key: 'structure', label: 'Structure', color: '#ff9500' },
    { key: 'engagement_hook', label: 'Engagement', color: '#f4212e' },
    { key: 'discoverability', label: 'Discovery', color: '#7856ff' },
    { key: 'storytelling', label: 'Story', color: '#f91880' }
  ];

  container.innerHTML = categories.map(cat => {
    const score = avgScores[cat.key] || 0;
    const maxScore = 10;
    const pct = (score / maxScore) * 100;

    return `
      <div class="score-bar-row">
        <span class="score-bar-label">${cat.label}</span>
        <div class="score-bar-track">
          <div class="score-bar-fill" style="width: ${pct}%; background: ${cat.color}"></div>
        </div>
        <span class="score-bar-value">${score.toFixed(1)}</span>
      </div>
    `;
  }).join('');
}

function renderScoreTrendChart(trends) {
  const container = document.getElementById('trend-chart');

  if (!trends || trends.length === 0) {
    container.innerHTML = '<div class="empty-chart">No trend data yet</div>';
    return;
  }

  const maxScore = 10;
  const height = 100;
  const width = container.clientWidth || 200;
  const pointSpacing = width / Math.max(trends.length - 1, 1);

  const points = trends.map((t, i) => {
    const x = i * pointSpacing;
    const score = t.avg_score || 0;
    const y = height - (score / maxScore) * height;
    return { x, y, score, date: t.report_date };
  });

  // Build SVG path
  const pathData = points.map((p, i) =>
    `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
  ).join(' ');

  container.innerHTML = `
    <svg width="${width}" height="${height}" class="trend-svg">
      <path d="${pathData}" fill="none" stroke="var(--accent)" stroke-width="2"/>
      ${points.map(p => `
        <circle cx="${p.x}" cy="${p.y}" r="4" fill="var(--accent)"
          class="trend-point" title="${p.date}: ${p.score.toFixed(1)}"/>
      `).join('')}
    </svg>
  `;
}

function renderTopPosts(topPosts) {
  const container = document.getElementById('top-posts-list');

  if (!topPosts || topPosts.length === 0) {
    container.innerHTML = '<div class="empty-list">No posts yet</div>';
    return;
  }

  container.innerHTML = topPosts.map(post => {
    const text = (post.post_text || '').slice(0, 60) + (post.post_text?.length > 60 ? '...' : '');
    return `
      <div class="top-post-item">
        <div class="top-post-text">${escapeHtml(text)}</div>
        <div class="top-post-meta">
          <span class="top-post-score">${post.overall_score?.toFixed(1) || '--'}</span>
          <span class="top-post-likes">${post.likes || 0} likes</span>
        </div>
      </div>
    `;
  }).join('');
}

function renderActionItems(items) {
  const container = document.getElementById('action-items-list');
  const badge = document.getElementById('action-items-pending');

  const pending = items.filter(i => i.status === 'pending');
  badge.textContent = `${pending.length} pending`;

  if (items.length === 0) {
    container.innerHTML = '<div class="empty-list">No action items</div>';
    return;
  }

  container.innerHTML = items.slice(0, 5).map(item => `
    <div class="action-item ${item.status}">
      <label class="action-checkbox">
        <input type="checkbox"
          ${item.status === 'completed' ? 'checked' : ''}
          data-action-id="${item.id}">
      </label>
      <div class="action-content">
        <span class="action-text">${escapeHtml(item.recommendation || '')}</span>
        ${item.example ? `<span class="action-example">${escapeHtml(item.example)}</span>` : ''}
      </div>
      <span class="action-priority priority-${item.priority || 99}">P${item.priority || '?'}</span>
    </div>
  `).join('');

  // Add event listeners for checkboxes
  container.querySelectorAll('[data-action-id]').forEach(checkbox => {
    checkbox.addEventListener('change', async () => {
      const id = checkbox.dataset.actionId;
      const status = checkbox.checked ? 'completed' : 'pending';
      await window.electronAPI.myContent.updateActionItem(id, status);
      loadMyContentData();
    });
  });
}

function renderBenchmarks(benchmarks) {
  const container = document.getElementById('benchmark-list');

  if (!benchmarks || benchmarks.length === 0) {
    container.innerHTML = '<div class="empty-list">No benchmarks yet</div>';
    return;
  }

  container.innerHTML = benchmarks.map(b => `
    <div class="benchmark-item">
      <div class="benchmark-header">
        <span class="benchmark-author">${escapeHtml(b.author || 'Unknown')}</span>
        <span class="benchmark-likes">${b.likes || 0} likes</span>
      </div>
      <div class="benchmark-why">${escapeHtml(b.why_it_worked || '')}</div>
      ${b.steal_this ? `<div class="benchmark-steal">${escapeHtml(b.steal_this)}</div>` : ''}
    </div>
  `).join('');
}

function renderExperiment(analytics) {
  const container = document.getElementById('experiment-suggestion');
  const experiment = analytics.latestExperiment;

  if (!experiment) {
    container.innerHTML = '<div class="empty-experiment">No experiment suggested</div>';
    return;
  }

  container.innerHTML = `<div class="experiment-text">${escapeHtml(experiment)}</div>`;
}

function renderFocusAreas(analytics) {
  const biggestGapEl = document.getElementById('biggest-gap');
  const doingWellEl = document.getElementById('doing-well');

  biggestGapEl.textContent = analytics.biggestGap || '--';
  doingWellEl.textContent = analytics.doingWell || '--';
}

async function loadMyPostsTable() {
  const container = document.getElementById('my-posts-table');
  const sortSelect = document.getElementById('post-sort');
  const mediaFilter = document.getElementById('post-filter-media');

  const sortValue = sortSelect?.value || 'posted_at-DESC';
  const [sortBy, sortOrder] = sortValue.split('-');
  const mediaType = mediaFilter?.value || '';

  try {
    const posts = await window.electronAPI.myContent.getMyPosts({
      limit: 50,
      sortBy,
      sortOrder,
      mediaType: mediaType || undefined
    });

    if (!posts || posts.length === 0) {
      container.innerHTML = '<div class="empty-table">No posts yet. Import some feedback to get started.</div>';
      return;
    }

    container.innerHTML = posts.map(post => {
      const text = (post.post_text || '').slice(0, 80) + (post.post_text?.length > 80 ? '...' : '');
      return `
        <div class="post-row" data-url="${escapeHtml(post.post_url)}">
          <span class="post-text">${escapeHtml(text)}</span>
          <span class="post-score">${post.overall_score?.toFixed(1) || '--'}</span>
          <span class="post-likes">${post.likes || 0}</span>
          <span class="post-retweets">${post.retweets || 0}</span>
          <span class="post-type">${post.media_type || 'text'}</span>
        </div>
      `;
    }).join('');

    // Click handler to open post URL
    container.querySelectorAll('.post-row').forEach(row => {
      row.addEventListener('click', () => {
        const url = row.dataset.url;
        if (url) {
          window.open(url, '_blank');
        }
      });
    });
  } catch (e) {
    console.error('Failed to load posts table:', e);
    container.innerHTML = '<div class="empty-table">Failed to load posts</div>';
  }
}

// Start the app
init();
