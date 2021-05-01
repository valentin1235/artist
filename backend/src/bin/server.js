import app from "app"
import env from "@config/env"
import mysqlConfig from "@config/mysql"
import redisConfig from "@config/redis"
import mysqlManager from "@database/mysql"
import redisManager from "@database/redis"
import gracefulShutdown from "http-graceful-shutdown"
import { sysLog, sysErrorLog } from "@utils/logger"

console.log("* Trying to start server...")

// Connect mysql
mysqlManager.connect(mysqlConfig)

// Connect redis
redisManager.connect(redisConfig)

// Create http server 
const httpServer = app.listen(env.httpPort, () => {
  sysLog(__filename, `Http server created on ${env.httpPort} port`)
})

app.on("error", (error) => {
  sysErrorLog(__filename, `server is not created: ${error}`)
})

// Terminate server
function terminate() {
  return new Promise((resolve) => {
    sysLog(__filename, "Terminate start")
    setTimeout(function () {
      sysLog(__filename, "Terminate Complete")
      resolve()
    }, 1000)
  })
}

// Graceful shutdown
gracefulShutdown(
  httpServer,
  {
    signals: "SIGINT SIGTERM",
    timeout: 30000,
    development: false,
    onShutdown: terminate,
    finally: function () {
      sysLog(__filename, "Server Gracefully Shutdown")
    }
  }
)