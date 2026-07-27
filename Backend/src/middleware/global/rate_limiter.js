import express from 'express';
import { createClient } from 'redis';
import { SlidingWindowRateLimiter } from 'sliding-window-rate-limiter'; // do extra reserach on

//Establishing the centralized Redis connection layer
const redisClient = createClient({url: 'redis://localhost:6369'});
await redisClient.connect().catch(console.error);

//Sliding windows intiaziation redis
const safeLimiter = SlidingWindowRateLimiter.createWithRedisStore({
    redis: redisClient,
})

//Rate Limiter Middleware functions

async function rateLimiterMiddleware(req, res, next) {
    const userIP = req.ip || req.headers['x-forwarded-for'] || 'unknown';
    const ONE_MINUTE = 60000;
    const MAX_ALLOWED = 100;

    try{
        //execute the sliding window check against the user IPs
        // The library checks if this IP has exceeded MAX_ALLOWED hits within the time window
        await safeLimiter.check(userIP, ONE_MINUTE, MAX_ALLOWED);

        //pass
        next();

    }catch(throttled){
        return res.status(429).json({
            status: 429,
            error: "Too Many Request",
            message: "Rate limit exceeded"
        })
    }
}

export default rateLimiterMiddleware;