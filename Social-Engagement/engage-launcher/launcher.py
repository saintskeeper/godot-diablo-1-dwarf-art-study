#!/usr/bin/env python3
"""
Social Engagement Launcher
Generates an HTML dashboard with embedded X posts for quick engagement.
Includes a proxy server to bypass X-Frame-Options restrictions.
"""

import json
import re
import subprocess
import sys
import threading
import time
from http.server import HTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from urllib.parse import urlparse, urljoin
from urllib.request import urlopen, Request
from urllib.error import HTTPError, URLError


def parse_markdown_table(md_content: str) -> list[dict]:
    """Extract posts from markdown table format."""
    posts = []
    lines = md_content.strip().split('\n')

    in_table = False
    for line in lines:
        if '|' not in line:
            in_table = False
            continue

        if 'Post (summary)' in line or '---' in line:
            in_table = True
            continue

        if not in_table:
            continue

        cells = [c.strip() for c in line.split('|')[1:-1]]
        if len(cells) >= 8:
            link_match = re.search(r'\[([^\]]+)\]\(([^)]+)\)', cells[6])
            url = link_match.group(2) if link_match else cells[6]

            posts.append({
                'summary': cells[0],
                'author': cells[1],
                'followers': cells[2],
                'likes': cells[3].replace(',', ''),
                'retweets': cells[4].replace(',', ''),
                'comments': cells[5],
                'url': url,
                'suggested_comment': cells[7].strip('"')
            })

    return posts


def generate_html(posts: list[dict], proxy_port: int) -> str:
    """Generate HTML dashboard with side-by-side layout - cards on left, X.com iframe on right."""
    cards_html = ""
    posts_json = json.dumps(posts)

    for i, post in enumerate(posts):
        cards_html += f'''
        <div class="card" data-index="{i}" data-url="{post['url']}" onclick="selectCard({i})">
            <div class="card-header">
                <div class="card-info">
                    <span class="author">{post['author']}</span>
                    <span class="followers">{post['followers']}</span>
                </div>
                <div class="card-stats">
                    <span>❤️ {post['likes']}</span>
                    <span>🔄 {post['retweets']}</span>
                    <span>💬 {post['comments']}</span>
                </div>
            </div>
            <div class="card-summary">{post['summary']}</div>
            <div class="suggested">
                <span class="suggested-text">{post['suggested_comment']}</span>
                <button class="copy-btn" onclick="event.stopPropagation(); copyText(this, `{post['suggested_comment'].replace('`', '\\`')}`)">Copy</button>
            </div>
            <div class="card-actions">
                <label class="done-label" onclick="event.stopPropagation()"><input type="checkbox" onchange="markDone({i}, this.checked)"> Done</label>
                <button class="open-tab-btn" onclick="event.stopPropagation(); window.open('{post['url']}', '_blank')">New Tab</button>
            </div>
        </div>
        '''

    return f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Engagement Dashboard</title>
    <style>
        * {{ box-sizing: border-box; }}
        body {{
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            margin: 0;
            padding: 0;
            background: #0a0a0a;
            color: #e7e9ea;
            height: 100vh;
            overflow: hidden;
        }}
        .layout {{
            display: flex;
            height: 100vh;
        }}
        .sidebar {{
            width: 400px;
            min-width: 350px;
            max-width: 500px;
            border-right: 1px solid #2f3336;
            display: flex;
            flex-direction: column;
            resize: horizontal;
            overflow: hidden;
        }}
        .sidebar-header {{
            padding: 15px;
            background: #16181c;
            border-bottom: 1px solid #2f3336;
            flex-shrink: 0;
        }}
        .sidebar-header h1 {{
            margin: 0 0 5px 0;
            font-size: 1.2rem;
        }}
        .stats {{
            color: #71767b;
            font-size: 0.85rem;
        }}
        .card-list {{
            flex: 1;
            overflow-y: auto;
            padding: 10px;
        }}
        .card {{
            background: #16181c;
            border-radius: 10px;
            padding: 12px;
            margin-bottom: 10px;
            border: 2px solid transparent;
            cursor: pointer;
            transition: border-color 0.15s, opacity 0.15s;
        }}
        .card:hover {{
            border-color: #2f3336;
        }}
        .card.active {{
            border-color: #1d9bf0;
        }}
        .card.done {{
            opacity: 0.4;
        }}
        .card-header {{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 6px;
        }}
        .card-info {{
            display: flex;
            gap: 8px;
            align-items: center;
        }}
        .author {{
            font-weight: bold;
            color: #1d9bf0;
            font-size: 0.9rem;
        }}
        .followers {{
            color: #71767b;
            font-size: 0.75rem;
        }}
        .card-stats {{
            display: flex;
            gap: 8px;
            font-size: 0.75rem;
            color: #71767b;
        }}
        .card-summary {{
            margin-bottom: 8px;
            font-size: 0.85rem;
            color: #e7e9ea;
            line-height: 1.3;
        }}
        .suggested {{
            background: #1a2634;
            padding: 8px 10px;
            border-radius: 6px;
            margin-bottom: 8px;
            font-size: 0.8rem;
            color: #8ecdf8;
            position: relative;
            border-left: 3px solid #1d9bf0;
        }}
        .suggested-text {{
            display: block;
            padding-right: 50px;
        }}
        .copy-btn {{
            position: absolute;
            right: 6px;
            top: 50%;
            transform: translateY(-50%);
            padding: 3px 8px;
            cursor: pointer;
            border: 1px solid #2f3336;
            border-radius: 4px;
            background: #16181c;
            color: #e7e9ea;
            font-size: 0.7rem;
        }}
        .copy-btn:hover {{ background: #2f3336; }}
        .card-actions {{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }}
        .done-label {{
            color: #71767b;
            cursor: pointer;
            font-size: 0.8rem;
        }}
        .done-label input {{ margin-right: 4px; }}
        .open-tab-btn {{
            padding: 4px 10px;
            background: #2f3336;
            color: #e7e9ea;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.75rem;
        }}
        .open-tab-btn:hover {{ background: #3a3d41; }}
        .main-view {{
            flex: 1;
            display: flex;
            flex-direction: column;
            background: #000;
        }}
        .iframe-header {{
            padding: 10px 15px;
            background: #16181c;
            border-bottom: 1px solid #2f3336;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-shrink: 0;
        }}
        .iframe-header .current-post {{
            color: #1d9bf0;
            font-weight: 500;
        }}
        .iframe-nav {{
            display: flex;
            gap: 10px;
        }}
        .iframe-nav button {{
            padding: 6px 12px;
            background: #2f3336;
            color: #e7e9ea;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.85rem;
        }}
        .iframe-nav button:hover {{ background: #3a3d41; }}
        .iframe-nav button:disabled {{ opacity: 0.5; cursor: not-allowed; }}
        .iframe-container {{
            flex: 1;
            background: #000;
        }}
        .iframe-container iframe {{
            width: 100%;
            height: 100%;
            border: none;
        }}
        .placeholder {{
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #71767b;
            font-size: 1.2rem;
        }}
        .popup-overlay {{
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 15px;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        }}
        .popup-status {{
            font-size: 1.3rem;
            color: #e7e9ea;
        }}
        .popup-hint {{
            color: #1d9bf0;
            font-size: 1.1rem;
        }}
        .popup-actions {{
            display: flex;
            gap: 10px;
            margin-top: 10px;
        }}
        .popup-actions button {{
            padding: 10px 20px;
            background: #1d9bf0;
            border: none;
            border-radius: 8px;
            color: white;
            cursor: pointer;
            font-size: 0.95rem;
        }}
        .popup-actions button:hover {{
            background: #1a8cd8;
        }}
    </style>
</head>
<body>
    <div class="layout">
        <div class="sidebar">
            <div class="sidebar-header">
                <h1>Engagement Dashboard</h1>
                <div class="stats">
                    <span id="done-count">0</span> / {len(posts)} done
                </div>
            </div>
            <div class="card-list">
                {cards_html}
            </div>
        </div>
        <div class="main-view">
            <div class="iframe-header">
                <span class="current-post" id="current-post">Select a post →</span>
                <div class="iframe-nav">
                    <button onclick="prevCard()" id="prev-btn" disabled>← Prev</button>
                    <button onclick="nextCard()" id="next-btn">Next →</button>
                    <button onclick="reloadFrame()">Reload</button>
                    <button onclick="markCurrentDone()">Mark Done & Next</button>
                </div>
            </div>
            <div class="iframe-container" id="iframe-container">
                <div class="placeholder">← Click a card to load post</div>
            </div>
        </div>
    </div>

    <script>
        const posts = {posts_json};
        let currentIndex = -1;
        const doneSet = new Set(JSON.parse(localStorage.getItem('engageDone') || '[]'));

        function initDone() {{
            doneSet.forEach(i => {{
                const card = document.querySelector(`[data-index="${{i}}"]`);
                if (card) {{
                    card.classList.add('done');
                    card.querySelector('input[type="checkbox"]').checked = true;
                }}
            }});
            updateCount();
        }}

        function selectCard(index) {{
            // Update active state
            document.querySelectorAll('.card').forEach(c => c.classList.remove('active'));
            const card = document.querySelector(`[data-index="${{index}}"]`);
            card.classList.add('active');
            card.scrollIntoView({{ behavior: 'smooth', block: 'nearest' }});

            currentIndex = index;
            const post = posts[index];

            // Update header
            document.getElementById('current-post').textContent = `${{post.author}} - ${{post.summary}}`;

            // Open X.com in popup window positioned to align with dashboard
            const container = document.getElementById('iframe-container');
            const rect = container.getBoundingClientRect();

            // Calculate popup position to align with the right panel
            const screenLeft = window.screenX + rect.left;
            const screenTop = window.screenY + rect.top + 80; // Account for browser chrome
            const width = rect.width;
            const height = rect.height;

            // Close previous popup if exists
            if (window.postPopup && !window.postPopup.closed) {{
                window.postPopup.close();
            }}

            window.postPopup = window.open(
                post.url,
                'XPost',
                `width=${{Math.floor(width)}},height=${{Math.floor(height)}},left=${{Math.floor(screenLeft)}},top=${{Math.floor(screenTop)}},menubar=no,toolbar=no,location=yes,status=no`
            );

            // Show overlay with controls
            container.innerHTML = `
                <div class="popup-overlay">
                    <div class="popup-status">Post open in popup window</div>
                    <div class="popup-hint">${{post.author}}</div>
                    <div class="popup-actions">
                        <button onclick="window.postPopup && window.postPopup.focus()">Focus Post</button>
                        <button onclick="selectCard(${{index}})">Reopen</button>
                    </div>
                </div>
            `;

            // Update nav buttons
            document.getElementById('prev-btn').disabled = index === 0;
            document.getElementById('next-btn').disabled = index === posts.length - 1;
        }}

        function prevCard() {{
            if (currentIndex > 0) selectCard(currentIndex - 1);
        }}

        function nextCard() {{
            if (currentIndex < posts.length - 1) selectCard(currentIndex + 1);
        }}

        function reloadFrame() {{
            if (currentIndex >= 0) {{
                const iframe = document.querySelector('#iframe-container iframe');
                if (iframe) iframe.src = iframe.src;
            }}
        }}

        function markCurrentDone() {{
            if (currentIndex >= 0) {{
                markDone(currentIndex, true);
                document.querySelector(`[data-index="${{currentIndex}}"] input[type="checkbox"]`).checked = true;
                nextCard();
            }}
        }}

        function markDone(index, done) {{
            const card = document.querySelector(`[data-index="${{index}}"]`);
            if (done) {{
                doneSet.add(index);
                card.classList.add('done');
            }} else {{
                doneSet.delete(index);
                card.classList.remove('done');
            }}
            localStorage.setItem('engageDone', JSON.stringify([...doneSet]));
            updateCount();
        }}

        function updateCount() {{
            document.getElementById('done-count').textContent = doneSet.size;
        }}

        function copyText(btn, text) {{
            navigator.clipboard.writeText(text);
            const orig = btn.textContent;
            btn.textContent = 'Copied!';
            setTimeout(() => btn.textContent = orig, 1500);
        }}

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {{
            if (e.key === 'ArrowUp' || e.key === 'k') {{ e.preventDefault(); prevCard(); }}
            if (e.key === 'ArrowDown' || e.key === 'j') {{ e.preventDefault(); nextCard(); }}
            if (e.key === 'd') {{ markCurrentDone(); }}
        }});

        initDone();
    </script>
</body>
</html>'''


class ProxyHandler(SimpleHTTPRequestHandler):
    """HTTP handler that proxies X.com requests and strips X-Frame-Options."""

    def __init__(self, *args, html_content=None, **kwargs):
        self.html_content = html_content
        super().__init__(*args, **kwargs)

    def do_GET(self):
        if self.path == '/' or self.path == '/index.html':
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            self.wfile.write(self.html_content.encode())
            return

        if self.path.startswith('/proxy?url='):
            target_url = self.path.split('/proxy?url=', 1)[1]
            self.proxy_request(target_url)
            return

        self.send_error(404)

    def proxy_request(self, url):
        """Proxy request to X.com, stripping X-Frame-Options."""
        try:
            req = Request(url, headers={
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
            })
            response = urlopen(req, timeout=10)
            content = response.read()

            self.send_response(200)

            # Forward headers except X-Frame-Options and CSP
            skip_headers = {'x-frame-options', 'content-security-policy', 'content-security-policy-report-only'}
            for header, value in response.headers.items():
                if header.lower() not in skip_headers:
                    self.send_header(header, value)

            self.end_headers()
            self.wfile.write(content)

        except (HTTPError, URLError) as e:
            self.send_error(502, f"Proxy error: {e}")

    def log_message(self, format, *args):
        pass  # Suppress request logging


def run_server(html_content: str, port: int):
    """Run the proxy server."""
    def handler(*args, **kwargs):
        ProxyHandler(*args, html_content=html_content, **kwargs)

    # Create handler factory with html_content bound
    class BoundHandler(ProxyHandler):
        def __init__(self, *args, **kwargs):
            super().__init__(*args, html_content=html_content, **kwargs)

    server = HTTPServer(('localhost', port), BoundHandler)
    print(f"Server running at http://localhost:{port}")
    server.serve_forever()


def main():
    if len(sys.argv) < 2:
        print("Usage: python launcher.py <input.json|input.md> [--port PORT]")
        sys.exit(1)

    input_path = Path(sys.argv[1])
    port = 8877

    # Parse optional port
    if '--port' in sys.argv:
        port_idx = sys.argv.index('--port')
        if port_idx + 1 < len(sys.argv):
            port = int(sys.argv[port_idx + 1])

    if not input_path.exists():
        print(f"Error: {input_path} not found")
        sys.exit(1)

    content = input_path.read_text()

    # Detect format and parse
    if input_path.suffix == '.json':
        try:
            posts = json.loads(content)
        except json.JSONDecodeError:
            posts = parse_markdown_table(content)
    else:
        posts = parse_markdown_table(content)

    if not posts:
        print("No posts found in input file")
        sys.exit(1)

    print(f"Found {len(posts)} posts")

    # Generate HTML
    html = generate_html(posts, port)

    # Start server in background thread
    server_thread = threading.Thread(target=run_server, args=(html, port), daemon=True)
    server_thread.start()

    # Give server time to start
    time.sleep(0.5)

    # Open in Firefox
    url = f"http://localhost:{port}"
    print(f"Opening {url} in Firefox...")
    subprocess.run(['open', '-a', 'Firefox', url])

    # Keep main thread alive
    print("Press Ctrl+C to stop the server")
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\nShutting down...")


if __name__ == '__main__':
    main()
