/**
 * Module dependencies
 */

import { songsDao } from "@dao"
import httpStatus from 'http-status'
import { httpLog, httpErrorLog } from "@utils/logger"
import net from "net"
import env from "@config/env"


class SongController {
  /**
   * Get songs
   * /songs
   */
  async getSongs(ctx, _next) {
    try {
      const { keyword } = ctx.request.query
      const result = await songsDao.getSongs(keyword)
      httpLog(ctx.request.url, "getSongs", "success")

      switch (result.msg) {
        case "NotFound":
          ctx.status = httpStatus.NOT_FOUND
        
        default:
          ctx.status = httpStatus.OK
          ctx.body = result.data
      }
    } catch (e) {
      // TODO: handle error
      ctx.status = httpStatus.INTERNAL_SERVER_ERROR
      httpErrorLog(ctx.request.url, "getSongs", e)
    }
  }

  /**
   * Create songs
   * /songs
   */
  async createSong(ctx, _next) {
    try {
      await songsDao.createSong(ctx.request.body)
      httpLog(ctx.request.url, "createSong", "Succeeded to create a song")
      ctx.status = httpStatus.OK

      return
    } catch (e) {
      // TODO: handle error
      ctx.status = httpStatus.INTERNAL_SERVER_ERROR
      httpErrorLog(ctx.request.url, "getSongs", e)
    }
  }

  /**
   * Update songs
   * /songs
   */
  async updateSong(ctx, _next) {
    try {
      await songsDao.updateSong(ctx.request.body, ctx.params.id)
      httpLog(ctx.request.url, "updateSong", "Succeeded to update a song")
      ctx.status = httpStatus.OK

      return
    } catch (e) {
      // TODO: handle error
      ctx.status = httpStatus.INTERNAL_SERVER_ERROR
      httpErrorLog(ctx.request.url, "getSongs", e)
    }
  }
}

const songController = new SongController()

export default songController