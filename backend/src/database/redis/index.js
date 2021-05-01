import redis from "redis"
import { sysLog, sysErrorLog } from "@utils/logger"
import { DatabaseError } from "@utils/errors"


class RedisManager {
  constructor() {
    this.client = null
  }

  connect(config) {
    this.client = redis.createClient(config)

    // Authenticate redis connection
    this.client.on("error", (error) => {
      // TODO: add sys error handler
      sysErrorLog(__filename, `RedisConnectionError: ${error}`)

      // throw new DatabaseError(error)
    })

    sysLog(__filename, "Redis connection has been established successfully")
  }
}

const redisManager = new RedisManager()

export default redisManager