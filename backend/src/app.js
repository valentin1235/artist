import Koa from "koa"
import middlewares from "@middlewares"

// Create koa app
const app = new Koa()

// Add middlewares
app.use(middlewares)

export default app