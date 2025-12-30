// Strip X-Frame-Options and CSP frame-ancestors from X.com responses
browser.webRequest.onHeadersReceived.addListener(
  (details) => {
    const dominated = [
      'x-frame-options',
      'content-security-policy',
      'content-security-policy-report-only'
    ];

    const newHeaders = details.responseHeaders.filter(header => {
      const name = header.name.toLowerCase();
      if (dominated.includes(name)) {
        console.log(`[X Frame Unblocker] Stripped ${header.name} from ${details.url}`);
        return false;
      }
      return true;
    });

    return { responseHeaders: newHeaders };
  },
  {
    urls: ['*://*.x.com/*', '*://*.twitter.com/*']
  },
  ['blocking', 'responseHeaders']
);

console.log('[X Frame Unblocker] Extension loaded - X.com iframe blocking disabled');
