// sanitizerMiddleware.js
const mongoSanitize = require('express-mongo-sanitize');

// Custom deep-sanitizer for XSS/Script characters (<, >, &, etc.)
const sanitizeXss = (target) => {
    if (typeof target === 'string') {
        // Encodes dangerous characters into harmless HTML entities
        return target
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;');
    } else if (typeof target === 'object' && target !== null) {
        // Recursively clean arrays and nested objects
        for (const key in target) {
            target[key] = sanitizeXss(target[key]);
        }
    }
    return target;
};

const sanitizerHandler = (req, res, next) => {
    // 1. Strip NoSQL Injection vectors (removes keys starting with $ or containing .)
    mongoSanitize.sanitize(req.body);
    mongoSanitize.sanitize(req.query);
    mongoSanitize.sanitize(req.params);

    // 2. Neutralize XSS/Script tags across all input vectors
    if (req.body) req.body = sanitizeXss(req.body);
    if (req.query) req.query = sanitizeXss(req.query);
    if (req.params) req.params = sanitizeXss(req.params);

    next();
};

module.exports = sanitizerHandler;