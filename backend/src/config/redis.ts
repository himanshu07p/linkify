import { createClient } from 'redis';

let redisClient: ReturnType<typeof createClient> | null = null;

export const getRedisClient = async () => {
  if (!redisClient) {
    redisClient = createClient({
      url: process.env['REDIS_URL'] || 'redis://localhost:6379'
    });

    redisClient.on('error', (err: Error) => {
      console.error('Redis Client Error:', err);
    });

    await redisClient.connect();
  }

  return redisClient;
};

export const closeRedisConnection = async () => {
  if (redisClient) {
    await redisClient.quit();
    redisClient = null;
  }
};
