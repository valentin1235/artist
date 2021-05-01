import usersRouter from "@router/users"
import songsRouter from "@router/songs"
import Router from "koa-router"

const router = new Router()


/**
 * Router Setting
 */

router.use("", usersRouter.routes())
router.use("", songsRouter.routes())

export default router