// middleware/encryptedCookies.js
const crypto = require('crypto');

// Ensure you have a 32-byte (256-bit) master encryption key saved in your environment variables
const ENCRYPTION_KEY = process.env.COOKIE_ENCRYPTION_KEY || 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6'; 
const ENCRYPTION_ALGORITHM = 'aes-256-gcm';

/**
 * Encrypts a plaintext string into a combined format: iv:authTag:ciphertext
 */
function encrypt(text) {
    const iv = crypto.randomBytes(12); // GCM standard IV length is 12 bytes
    const cipher = crypto.createCipheriv(ENCRYPTION_ALGORITHM, Buffer.from(ENCRYPTION_KEY), iv);
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag().toString('hex');
    
    // Return all structural pieces separated by colons
    return `${iv.toString('hex')}:${authTag}:${encrypted}`;
}

/**
 * Decrypts the formatted string back to plaintext
 */
function decrypt(encryptedText) {
    try {
        const [ivHex, authTagHex, encryptedHex] = encryptedText.split(':');
        if (!ivHex || !authTagHex || !encryptedHex) return null;

        const iv = Buffer.from(ivHex, 'hex');
        const authTag = Buffer.from(authTagHex, 'hex');
        const decipher = crypto.createDecipheriv(ENCRYPTION_ALGORITHM, Buffer.from(ENCRYPTION_KEY), iv);
        
        decipher.setAuthTag(authTag);
        
        let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        
        return decrypted;
    } catch (error) {
        // If authentication tag validation fails or decoding breaks, treat cookie as invalid
        return null;
    }
}

/**
 * Global Express Middleware for handling encrypted cookies
 */
function encryptedCookieParser(req, res, next) {
    // 1. Intercept incoming cookies and decrypt them
    req.decryptedCookies = {};
    if (req.headers.cookie) {
        const rawCookies = req.headers.cookie.split(';').reduce((acc, cookie) => {
            const [key, val] = cookie.trim().split('=');
            if (key && val) acc[key] = decodeURIComponent(val);
            return acc;
        }, {});

        for (const [key, value] of Object.entries(rawCookies)) {
            const decryptedValue = decrypt(value);
            // Only expose the cookie if it successfully decrypted
            if (decryptedValue !== null) {
                req.decryptedCookies[key] = decryptedValue;
            }
        }
    }

    // 2. Decorate response object with an encryption helper
    res.encryptedCookie = function (name, value, options = {}) {
        const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
        const encryptedValue = encrypt(stringValue);
        
        // Merge with safe production defaults
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            ...options
        };

        return res.cookie(name, encryptedValue, cookieOptions);
    };

    next();
}

module.exports = encryptedCookieParser;