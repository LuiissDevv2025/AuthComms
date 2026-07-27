// request-tracker.js
const { AsyncLocalStorage } = require('async_hooks');
const { v4: uuidv4 } = require('uuid'); // Assumes 'uuid' package is installed

// Initialize the storage engine for tracking synchronous/asynchronous context
const asyncLocalStorage = new AsyncLocalStorage();

/**
 * Isolated Middleware Component
 * Intercepts incoming requests to establish tracing context.
 */
function requestTrackerMiddleware(req, res, next) {
    // 1. Extract existing ID from headers, or generate a fresh UUID v4
    const requestId = req.headers['x-request-id'] || uuidv4();
    
    // 2. Inject the ID into the Outgoing Response Headers for client-side visibility
    res.setHeader('X-Request-ID', requestId);

    // 3. Run the remainder of the request execution chain inside the isolated context
    asyncLocalStorage.run(requestId, () => {
        next();
    });
}

/**
 * Utility Function
 * Allows any layer of the application (services, models, utilities) 
 * to fetch the current Request ID without needing access to the 'req' object.
 */
function getRequestId() {
    return asyncLocalStorage.getStore();
}

/**
 * Production-ready Log Formatter
 * Wraps standard console methods to enforce context injection.
 */
const trackerLogger = {
    info: (message) => {
        const id = getRequestId();
        // Format: [TIMESTAMP] [REQUEST-ID] MESSAGE
        console.log(`[${new Date().toISOString()}] [ID: ${id || 'SYSTEM'}] INFO: ${message}`);
    },
    error: (message, error) => {
        const id = getRequestId();
        console.error(`[${new Date().toISOString()}] [ID: ${id || 'SYSTEM'}] ERROR: ${message}`, error || '');
    }
};

module.exports = {
    requestTrackerMiddleware,
    getRequestId,
    trackerLogger
};