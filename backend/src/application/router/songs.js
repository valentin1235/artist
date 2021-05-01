import Router from "koa-router"
import { songController } from "@controller"
import { sessionValidator } from "@middlewares/sessionValidator"


const songsRouter = new Router()


/**
 * Route to deefined resource
 * TODO: session validator to be added
 */
songsRouter.get("/songs", songController.getSongs)
songsRouter.post("/songs/song", songController.createSong)
songsRouter.put("/songs/:id", songController.updateSong)



export default songsRouter