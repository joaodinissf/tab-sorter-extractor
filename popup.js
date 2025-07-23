document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('sortAllWindows').addEventListener('click', sortAllWindows);
  document.getElementById('sortCurrentWindow').addEventListener('click', sortCurrentWindow);
  document.getElementById('removeDuplicatesWindow').addEventListener('click', removeDuplicatesWindow);
  document.getElementById('removeDuplicatesAllWindows').addEventListener('click', removeDuplicatesAllWindows);
  document.getElementById('removeDuplicatesGlobally').addEventListener('click', removeDuplicatesGlobally);
  document.getElementById('extractDomain').addEventListener('click', extractDomain);
  document.getElementById('extractAllDomains').addEventListener('click', extractAllDomains);
  document.getElementById('moveAllToSingleWindow').addEventListener('click', moveAllToSingleWindow);
});

// Use shared utilities
const { lexHost } = window.TabOrganizerUtils;
const { log, sendMessageWithErrorHandling } = window.TabOrganizerUtils;


// Sort tabs by URL across all windows
function sortAllWindows() {
  sendMessageWithErrorHandling({
    action: 'sortAllWindows'
  }, 'sortAllWindows');
}

// Sort tabs by URL in current window
function sortCurrentWindow() {
  sendMessageWithErrorHandling({
    action: 'sortCurrentWindow'
  }, 'sortCurrentWindow');
}


// Extract tabs from current domain into a new window
function extractDomain() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (activeTabs) {
    if (activeTabs.length === 0) {
      log('No active tab found');
      return;
    }

    var activeTab = activeTabs[0];

    sendMessageWithErrorHandling({
      action: 'extractDomain',
      tabId: activeTab.id,
      url: activeTab.url
    }, 'extractDomain');
  });
}

// Remove duplicates within current window only
function removeDuplicatesWindow() {
  sendMessageWithErrorHandling({
    action: 'removeDuplicatesWindow'
  }, 'removeDuplicatesWindow');
}

// Remove duplicates within each window separately
function removeDuplicatesAllWindows() {
  sendMessageWithErrorHandling({
    action: 'removeDuplicatesAllWindows'
  }, 'removeDuplicatesAllWindows');
}

// Remove duplicates across all windows globally
function removeDuplicatesGlobally() {
  sendMessageWithErrorHandling({
    action: 'removeDuplicatesGlobally'
  }, 'removeDuplicatesGlobally');
}

// Extract all domains into separate windows
function extractAllDomains() {
  sendMessageWithErrorHandling({
    action: 'extractAllDomains'
  }, 'extractAllDomains', function(response) {
    if (response.cancelled) {
      log('Extract all domains cancelled by user');
    }
  });
}

// Move all tabs to a single window
function moveAllToSingleWindow() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (activeTabs) {
    if (activeTabs.length === 0) {
      log('No active tab found');
      return;
    }

    var activeTab = activeTabs[0];

    sendMessageWithErrorHandling({
      action: 'moveAllToSingleWindow',
      activeTabId: activeTab.id
    }, 'moveAllToSingleWindow');
  });
}