// sizeLimiterMiddleware.js
const express = require('express');

// 1. Configure the strict JSON body size limit (Production standard: 10kb-100kb)
const jsonLimiter = express.json({ limit: '10kb' });

// 2. Configure the strict URL-encoded form size limit
const urlEncodedLimiter = express.urlencoded({ extended: true, limit: '10kb' });

const sizeLimiterHandler = (req, res, next) => {
    // Run the JSON payload size inspector
    jsonLimiter(req, res, (jsonErr) => {
        if (jsonErr) {
            // Catch Payload Too Large errors (HTTP 413)
            if (jsonErr.type === 'entity.too.large') {
                return res.status(413).json({ error: 'Payload exceeds maximum limit of 10kb' });
            }
            return next(jsonErr);
        }

        // Run the URL-encoded payload size inspector
        urlEncodedLimiter(req, res, (urlErr) => {
            if (urlErr) {
                if (urlErr.type === 'entity.too.large') {
                    return res.status(413).json({ error: 'Payload exceeds maximum limit of 10kb' });
                }
                return next(urlErr);
            }
            next();
        });
    });
};

module.exports = sizeLimiterHandler;