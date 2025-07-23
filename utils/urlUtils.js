// URL utility functions for Tab Organizer extension

/**
 * Extract domain from URL with better handling for sleeping tabs
 * Handles special protocols: chrome-extension, moz-extension, file, data, about, chrome
 * @param {string} url - The URL to extract the domain from
 * @returns {string} - The extracted domain/host
 */
function lexHost(url) {
  try {
    var u = new URL(url);

    if (u.protocol === 'chrome-extension:' || u.protocol === 'moz-extension:') {
      return u.host;
    }

    if (u.protocol === 'file:') {
      return 'file';
    }

    if (u.protocol === 'data:') {
      return 'data';
    }

    if (u.protocol === 'about:' || u.protocol === 'chrome:') {
      return u.host || u.pathname.split('/')[0];
    }

    return u.hostname;
  } catch (e) {
    return url || '';
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { lexHost };
} else {
  // Browser environment - attach to window for global access
  window.TabOrganizerUtils = window.TabOrganizerUtils || {};
  window.TabOrganizerUtils.lexHost = lexHost;
}