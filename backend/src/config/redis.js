import env from "../env"

export default {
  host: env.REDIS_HOST,
  port: Number(env.REDIS_PORT),
  retryOption: {
    total_retry_time: Number(env.REDIS_RETRY_TIME),
    attempt: Number(env.REDIS_RETRY_ATTEMPT),
    retry_backoff_ms: Number(env.REDIS_RETRY_BACKOFF_MS)
  }
}