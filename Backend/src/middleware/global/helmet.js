const helmet = require('helmet');

//Content Security Policy
const cspPolicy = helmet.contentSecurityPolicy({
useDefaults: true, // Loads Helmet's baseline secure headers first
    directives: {
        // 1. By default, only trust assets coming from our own domain
        defaultSrc: ["'self'"],
        
        // 2. Strict script execution rules (Critical for preventing XSS)
        scriptSrc: ["'self'"],
        
        // 3. Style rules (Adjust if using external CSS frameworks like Google Fonts)
        styleSrc: ["'self'", "'unsafe-inline'"],
        
        // 4. Connect rules (Defines where your app can send AJAX/Fetch requests)
        connectSrc: ["'self'"],
        
        // 5. Upgrade all standard HTTP traffic to secure HTTPS automatically
        upgradeInsecureRequests: [],
    },
});

//Middleware Function
const helmetHandler = (req, res, next) => {
    /*Inside your function, you are calling third-party libraries (cspPolicy and helmet). 
    Those libraries also need access to the exact same req, res, and next objects so they can read the incoming headers 
    and inject the new security headers. */
    cspPolicy(req, res, (err) => {
        if (err) return next(err);

        //Run helmet global suite (Clickjacking, MIME-sniffing, etc.)
        helmet({
            hidePoweredBy:true,
            xFrameOptions: {acton: 'deny'},
        })(req, res, next);
    })
}

module.exports = helmetHandler;