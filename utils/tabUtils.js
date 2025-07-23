// Tab utility functions for Tab Organizer extension

/**
 * Sort tabs by URL, preserving pinned tabs at the beginning
 * @param {Array} tabs - Array of tab objects to sort
 * @returns {Object} - Object with sortedTabs array and counts
 */
function sortTabsByUrl(tabs) {
  // Separate pinned and unpinned tabs
  const pinnedTabs = tabs.filter(tab => tab.pinned);
  const unpinnedTabs = tabs.filter(tab => !tab.pinned);
  
  // Sort unpinned tabs by URL
  unpinnedTabs.sort((a, b) => {
    const urlA = a.pendingUrl || a.url;
    const urlB = b.pendingUrl || b.url;
    return urlA.localeCompare(urlB);
  });
  
  return {
    sortedTabs: [...pinnedTabs, ...unpinnedTabs],
    pinnedCount: pinnedTabs.length,
    unpinnedCount: unpinnedTabs.length
  };
}

/**
 * Move tabs to their sorted positions within a window
 * @param {number} windowId - The window ID
 * @param {Array} sortedTabs - Array of tabs in sorted order
 * @param {number} pinnedCount - Number of pinned tabs
 */
async function moveTabsToSortedPositions(windowId, sortedTabs, pinnedCount) {
  // Move unpinned tabs to their sorted positions (starting after pinned tabs)
  const unpinnedTabs = sortedTabs.slice(pinnedCount);
  
  for (let i = 0; i < unpinnedTabs.length; i++) {
    await chrome.tabs.move(unpinnedTabs[i].id, {
      windowId,
      index: pinnedCount + i
    });
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { sortTabsByUrl, moveTabsToSortedPositions };
} else {
  // Browser environment - attach to window for global access
  window.TabOrganizerUtils = window.TabOrganizerUtils || {};
  window.TabOrganizerUtils.sortTabsByUrl = sortTabsByUrl;
  window.TabOrganizerUtils.moveTabsToSortedPositions = moveTabsToSortedPositions;
}