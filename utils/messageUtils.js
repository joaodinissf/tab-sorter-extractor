// Message utility functions for Tab Organizer extension

// Simple logging helper
function log(message, ...args) {
  console.log('[Tab Organizer]', message, ...args);
  chrome.runtime.sendMessage({ type: 'log', data: { message, args } }).catch(() => { });
}

/**
 * Error handler for Chrome runtime responses
 * @param {*} response - The response from the background script
 * @param {string} operation - Description of the operation for logging
 */
function handleResponse(response, operation) {
  if (chrome.runtime.lastError) {
    log(`Error from background during ${operation}:`, chrome.runtime.lastError.message);
  } else if (!response.success) {
    log(`Background failed during ${operation}:`, response.error);
  }
}

/**
 * Send message to background script with standardized error handling
 * @param {Object} message - The message to send
 * @param {string} operation - Description of the operation for logging
 * @param {Function} callback - Optional callback for successful responses
 */
function sendMessageWithErrorHandling(message, operation, callback) {
  chrome.runtime.sendMessage(message, function (response) {
    handleResponse(response, operation);
    if (callback && response && response.success) {
      callback(response);
    }
  });
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { log, handleResponse, sendMessageWithErrorHandling };
} else {
  // Browser environment - attach to window for global access
  window.TabOrganizerUtils = window.TabOrganizerUtils || {};
  window.TabOrganizerUtils.log = log;
  window.TabOrganizerUtils.handleResponse = handleResponse;
  window.TabOrganizerUtils.sendMessageWithErrorHandling = sendMessageWithErrorHandling;
}