import httpStatus from "http-status"

const HTTP_INTERNAL_SERVER_ERROR = 500

/**
 * Error handling middleware
 * @param {Object} ctx
 * @param {Function} next
 */

const errorHandler = async (ctx, next) => {
  try {
    // Wait for its following middlewares to be done
    await next()

    // Check status code and send appropriate response back to client
    // eslint-disable-next-line padded-blocks
    switch (ctx.status) {

      // TODO Add error handling logic for more status codes here
      case httpStatus.NOT_FOUND:
        console.log(`User requested invalid resource "${ctx.req.url}"`)

        // Send response back to client
        ctx.throw(httpStatus.NOT_FOUND)

        return
      case httpStatus.INTERNAL_SERVER_ERROR:

        // 500 will be handled by default
        return
      default:
        console.log(`Unexpected server error occurred at "${ctx.req.url}"`)

        // Send response back to client
        ctx.status = httpStatus.INTERNAL_SERVER_ERROR
        ctx.body = {
          message: "Unexpected server error has occurred"
        }

        return
    }
  } catch (error) {
    /*
     * We can catch downstream errors here. Program may falls into this block when ctx.throw,
     * ctx.asset, or throw new Error(...) occurred in the code.
     * TODO Below is an example. Change this part according to the error handling rules
     */
    ctx.status = error.statusCode || error.status || HTTP_INTERNAL_SERVER_ERROR
    ctx.body = error.message
  }
}


/**
 * Export defined error handling middleware
 */

export default errorHandler