/**
 * Module dependencies
 */

import { usersDao } from "@dao"
import httpStatus from 'http-status'
import { httpLog, httpErrorLog } from "@utils/logger"
import { log, errorLog } from "@utils/logger"


class UsersController {
  /**
   * Simple prototype mothod
   * /users
   */
  async getUsers(ctx) {
    try {
      // Get request data
      const { owner_id: ownerId } = ctx.request
      const { account_number, name: accountName } = ctx.request.body
      const users = await usersDao.getUsers(ownerId, account_number, accountName)

      // Http response
      ctx.body = users
      ctx.status = httpStatus.OK
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * sign up for user
   * /users/user/signup
   */
  async signUp(ctx, _next) {
    try {
      const result = await usersDao.signUp(ctx.request.body)

      switch (result.msg) {
        case "DuplicateUser":
          ctx.body = result.msg
          ctx.status = httpStatus.BAD_REQUEST
          httpLog(ctx.request.url, "signUp", result.msg)

          return

        default:
          ctx.cookies.set("session_id", result.data)
          ctx.status = httpStatus.CREATED
          httpLog(ctx.request.url, "signUp", result.msg)

          return
      }
    } catch (e) {
      // TODO: handle error
      httpErrorLog(ctx.request.url, "signUp", e)
    }
  }

  /**
   * sign in for user
   * /users/user/signin
   */
  async signIn(ctx, _next) {
    try {
      const result = await usersDao.signIn(ctx.request.body)

      switch(result.msg) {
        case "Unauthorized":
          ctx.body = result.msg
          ctx.status = httpStatus.UNAUTHORIZED
          httpLog(ctx.request.url, "signIn", result.msg)

          return
        
        case "NotFound":
          ctx.body = result.msg
          ctx.status = httpStatus.NOT_FOUND
          httpLog(ctx.request.url, "signIn", result.msg)

          return

        default:
          ctx.cookies.set("session_id", result.data)
          ctx.status = httpStatus.OK
          httpLog(ctx.request.url, "signIn", result.msg)

          return
      }
    } catch (e) {
      // TODO: handle error
      httpErrorLog(ctx.request.url, "signIn", e)
    }
  }

  /**
   * refresh login session to the user
   * /users/user/refresh
   */
  async refresh(ctx, _next) {
    try {
      // Get session id from request cookies
      const sessionId = ctx.cookies.get("session_id")
      const result = await usersDao.refresh(sessionId)
      switch(result.msg) {
        case "NotFound":
          ctx.status = httpStatus.NOT_FOUND
          ctx.body = result.msg
          httpLog(ctx.request.url, "refresh", result.msg)

          return

        default:
          ctx.status = httpStatus.OK
          ctx.body = result.msg
          httpLog(ctx.request.url, "refresh", result.msg)

          return
      }
    } catch (e) {
      // TODO: handle error
      httpErrorLog(ctx.request.url, "refresh", e)
    }
  }
}

const usersController = new UsersController()

export default usersController