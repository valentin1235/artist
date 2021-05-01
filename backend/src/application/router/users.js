import Router from "koa-router"
import { usersController } from "@controller"
import { sessionValidator } from "@middlewares/sessionValidator"

const usersRouter = new Router()


/**
 * Route to deefined resource
 */
usersRouter.get("/users", usersController.getUsers)
usersRouter.post("/users/user/signup", usersController.signUp)
usersRouter.post("/users/user/signin", usersController.signIn)
usersRouter.post("/users/user/refresh", sessionValidator, usersController.refresh)


export default usersRouter