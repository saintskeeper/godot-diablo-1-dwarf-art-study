// State
let posts = [];
let currentIndex = -1;
let doneSet = new Set();
const STORAGE_KEY = 'engage-electron-done';

// DOM Elements
const emptyState = document.getElementById('empty-state');
const mainLayout = document.getElementById('main-layout');
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
function init() {
  loadDoneState();
  setupDragDrop();
  setupPaste();
  setupKeyboard();
  setupButtons();
  setupLogin();
  setupMenuCommands();
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

// Load done state from localStorage
function loadDoneState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      doneSet = new Set(JSON.parse(stored));
    }
  } catch (e) {
    console.error('Failed to load done state:', e);
  }
}

// Save done state to localStorage
function saveDoneState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...doneSet]));
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
function parseAndLoadJSON(content) {
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

    posts = normalized;
    currentIndex = -1;
    renderCards();
    showMainLayout();

    const wrapperNote = wrapper ? ` (from "${wrapper}")` : '';
    showToast(`Loaded ${posts.length} posts${wrapperNote}`, 'success');

  } catch (e) {
    showToast(`Invalid JSON: ${e.message}`, 'error');
  }
}

// Show main layout, hide empty state
function showMainLayout() {
  emptyState.classList.add('hidden');
  mainLayout.classList.remove('hidden');
  totalCountEl.textContent = posts.length;
  updateDoneCount();
}

// Show empty state, hide main layout
function showEmptyState() {
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
function markDone(index, done) {
  const post = posts[index];
  if (!post) return;

  if (done) {
    doneSet.add(post.url);
  } else {
    doneSet.delete(post.url);
  }

  saveDoneState();
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
function markCurrentDoneAndNext() {
  if (currentIndex >= 0) {
    markDone(currentIndex, true);
    nextCard();
  }
}

// Update done count display
function updateDoneCount() {
  const count = posts.filter(p => doneSet.has(p.url)).length;
  doneCountEl.textContent = count;
}

// Reset progress
function resetProgress() {
  if (confirm('Reset all progress? This cannot be undone.')) {
    doneSet.clear();
    saveDoneState();
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

// Start the app
init();
