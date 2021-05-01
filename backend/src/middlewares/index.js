/**
 * Import required modules
 */

// Middleware composition library
import compose from "koa-compose"

// Error-handling middlewares
import errorHandler from "@middlewares/errorHandler"

// Security-related middlewares
import cors from "@koa/cors"
import helmet from "koa-helmet"

// Data-manipulation middlewares
import json from "koa-json"
import bodyparser from "koa-bodyparser"

// Access request id
import rTracer from "cls-rtracer"
import router from "@router"


/**
 * List of middlewares we use.
 * To add a new middleware, simply put the middleware
 * in the array below in the right execution order.
 */

const middlewares = [
  rTracer.koaMiddleware(),
  json(),
  cors(),
  helmet(),
  bodyparser(),
  router.routes(),
  router.allowedMethods(),
  errorHandler
]


/**
 * Export composed middleware
 */

export default compose(middlewares)