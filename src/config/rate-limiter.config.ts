import { RateLimiterModule  } from 'nestjs-rate-limiter';

export const rateLimiterConfig: RateLimiterModule  = {
  // Configure your rate limiter options here 
  points: 20, // Number of points
  duration: 60, // Duration in seconds
};
