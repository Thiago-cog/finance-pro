const { Redis } = require("ioredis");
const config = require("../config");

const redis = new Redis(config.redis.url);

async function get(key) {
    const value = await redis.get(key);
    if (!value) return;

    return JSON.parse(value);
}

async function set(key, value) {
    await redis.set(key, JSON.stringify(value));
}

module.exports = { get, set };