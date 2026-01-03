// Simple in-memory KV store for local development
// Works with both Vercel KV and Redis

class LocalKV {
  private store: Map<string, any> = new Map();

  async get(key: string) {
    console.log(`[KV] Getting key: ${key}, exists: ${this.store.has(key)}`);
    return this.store.get(key) || null;
  }

  async set(key: string, value: any) {
    console.log(`[KV] Setting key: ${key}`);
    this.store.set(key, value);
    return "OK";
  }

  async del(key: string) {
    return this.store.delete(key) ? 1 : 0;
  }
}

// Redis adapter to match KV interface
class RedisKV {
  private client: any;
  
  constructor() {
    const { createClient } = require('redis');
    this.client = createClient({
      url: process.env.REDIS_URL
    });
    this.client.connect().catch(console.error);
  }

  async get(key: string) {
    try {
      const value = await this.client.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Redis get error:', error);
      return null;
    }
  }

  async set(key: string, value: any) {
    try {
      await this.client.set(key, JSON.stringify(value));
      return "OK";
    } catch (error) {
      console.error('Redis set error:', error);
      throw error;
    }
  }

  async del(key: string) {
    try {
      return await this.client.del(key);
    } catch (error) {
      console.error('Redis del error:', error);
      return 0;
    }
  }
}

// Create a global singleton to persist across hot reloads
const globalForKV = global as typeof globalThis & {
  kvStore?: LocalKV;
  redisStore?: RedisKV;
};

if (!globalForKV.kvStore) {
  globalForKV.kvStore = new LocalKV();
}

// Initialize store based on available environment variables
let store;
if (process.env.KV_REST_API_URL) {
  // Use Vercel KV
  const { kv: vercelKV } = require('@vercel/kv');
  store = vercelKV;
} else if (process.env.REDIS_URL) {
  // Use standard Redis
  if (!globalForKV.redisStore) {
    globalForKV.redisStore = new RedisKV();
  }
  store = globalForKV.redisStore;
} else {
  // Use local in-memory store for development
  store = globalForKV.kvStore;
}

export const kv = store;
