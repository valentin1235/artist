import Songs from "@database/mysql/schemas/songs"
import { promisify } from "util"
import bcrypt from "bcrypt"
import { stdReturn } from "@utils/forms"
import { log, errorLog } from "@utils/logger"
import { Sequelize } from "sequelize"
import _ from "lodash"

class SongsDao {
  async getUsers() {
    try {
      const result = await Users.findAll({
        where: condition,
      })
      return result
    } catch (err) {
    }
  }

  /**
   * getSongs
   * @brief get songs
   * @param {String} keywords
   */
  async getSongs(keywords) {
    try {
      const conditions = {}

      // If keyword input, assign searching condition
      if (typeof keywords !== "undefined") {
        Object.assign(conditions, {
          name: {
            [Sequelize.Op.like]: `%${keywords}%`
          },
        })
      }

      // Get songs searched by keywords
      const result = await Songs.findAll({
        where: conditions,
        raw: true
      })

      log(__filename, this.getSongs.name, "succeeded to get songs")

      return stdReturn("Success", result)
    } catch (err) {
      errorLog(__filename, this.getSongs.name, "uncaught error")
      throw new Error(err)
    }
  }

  /**
   * createSong
   * @brief create songs
   * @param {Object} raw
   * @param {String} raw.name
   * @param {String} raw.album_name
   * @param {String} raw.file_path
   * @param {String} raw.artists_name
   */
  async createSong(raw) {
    try {
      // Set values to create
      const values = {
        name: raw.name,
        album_name: raw.album_name,
        file_path: raw.file_path,
        artists_name: raw.artists_name
      }

      // Create song
      await Songs.create(
        values
      )
      log(__filename, this.createSong.name, "succeeded to create a song")

      return
    } catch (err) {
      errorLog(__filename, this.getSongs.name, "uncaught error")
      throw new Error(err)
    }
  }

  /**
   * updateSong
   * @brief create songs
   * @param {Number} songId
   * @param {Object} raw
   * @param {String} raw.name
   * @param {String} raw.album_name
   * @param {String} raw.file_path
   * @param {String} raw.artists_name
   */
  async updateSong(raw, songId) {
    try {
      // Set values to update, exclude "undefined" value by "lodash"
      const values = _.omitBy({
        name: raw.name,
        album_name: raw.album_name,
        file_path: raw.file_path,
        artists_name: raw.artists_namem,
        updated_at: new Date()
      }, _.isNil)

      // Update song
      const result = await Songs.update(
        values, {
          where: {
            id: songId
          }
        }
      )
      log(__filename, this.updateSong.name, `succeeded to update a song: ${result}`)

      return
    } catch (err) {
      errorLog(__filename, this.updateSong.name, "uncaught error")
      throw new Error(err)
    }
  }
}

const songsDao = new SongsDao()

export default songsDao
