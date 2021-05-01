import { promisify } from "util"
import httpStatus from 'http-status'
import redisManager from "@database/redis"
import { httpLog, httpErrorLog } from "@utils/logger"



async function sessionValidator(ctx, next) {
  // Get session_id from request cookie
  const sessionId = ctx.cookies.get("session_id")

  // CHECK IF redis session
  if (typeof sessionId === "undefined") {
    ctx.status = httpStatus.UNAUTHORIZED
    ctx.body = "session id required"
    httpLog(ctx.request.url, "sessionValidator", "session id required")

    return
  }
  httpLog(ctx.request.url, "sessionValidator", "succeeded to get session id from request cookie")

  // Change client "get" mothod to asynchronous function as redis library does not support "promise"
  const getSession = promisify(redisManager.client.get).bind(redisManager.client)

  // Get session from redis
  const session = await getSession(sessionId)

  // CHECK IF redis session
  if (session === null) {
    ctx.status = httpStatus.UNAUTHORIZED
    ctx.body = "session not found"

    httpLog(ctx.request.url, "sessionValidator", "session not found")

    return
  }

  // Add user info to the "ctx" object
  Object.assign(ctx.request, JSON.parse(session))
  httpLog(ctx.request.url, "sessionValidator", `${ctx.request.user_id} user authorized`)

  // Successfully validated
  await next()
}

export {
  sessionValidator
}