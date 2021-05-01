import Users from "@database/mysql/schemas/users"
import { promisify } from "util"
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from 'uuid'
import { SALT_ROUND, EX_TIMEOUT } from "@application/constants"
import redisManager from "@database/redis"
import { stdReturn } from "@utils/forms"
import { log, errorLog } from "@utils/logger"
import { Sequelize } from "sequelize"

class UsersDao {
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
   * signUp
   * @brief sign up process
   * @param {Object} raw
   * @param {String} raw.email
   * @param {String} raw.password
   */
  async signUp(raw) {
    try {
      const formedData = {
        email: raw.email,
        password: await bcrypt.hash(raw.password, SALT_ROUND)
      }

      // Get user count with condition
      const userCount = await Users.count({
        where: {
          email: raw.email,
          is_deleted: 0
        }
      })

      // CHECK IF user exist on requested email
      if (userCount !== 0) {
        log(__filename, this.signUp.name, "Duplicate user")
        return stdReturn("DuplicateUser")
      }

      // Create user
      const user = await Users.create(formedData)
      log(__filename, this.signUp.name, "User created")

      // Create session id
      const sessionId = uuidv4()

      // Set session with session_id
      redisManager.client.set(sessionId, JSON.stringify({id: user.dataValues.id}), "EX", EX_TIMEOUT)
      log(__filename, this.signUp.name, "Session saved")

      return stdReturn("Created", sessionId)
    } catch (err) {
      errorLog(__filename, this.signUp.name, "uncaught error")
      throw new Error(err)
    }
  }

  /**
   * signIn
   * @brief sign in process
   * @param {Object} raw
   * @param {String} raw.email
   * @param {String} raw.password
   */
  async signIn(raw) {
    try {
      // Get user
      const user = await Users.findOne({
        where: {
          email: raw.email,
          is_deleted: 0
        },
        attributes: ["id", "password"],
        raw: true
      })

      if (user === null) {
        log(__filename, this.signUp.name, "user not found")
        return stdReturn("NotFound")
      }

      // Check password
      const isPassed =  await bcrypt.compare(raw.password, user.password)

      if (isPassed === false) {
        log(__filename, this.signUp.name, "unauthorized")
        return stdReturn("Unauthorized")
      }
      log(__filename, this.signUp.name, "user authorized")

      // Create session id
      const sessionId = uuidv4()

      // Set session with session_id
      redisManager.client.set(sessionId, JSON.stringify({user_id: user.id}), "EX", EX_TIMEOUT)
      log(__filename, this.signUp.name, "session data created")

      return stdReturn("Success", sessionId)

    } catch (err) {
      errorLog(__filename, this.signIn.name, "uncaught error")
      throw new Error(err)
    }
  }

  /**
   * refresh
   * @brief refresh session to the user
   * @param {String} sessionId
   */
  async refresh(sessionId) {
    try {
      // Change client "get" mothod to asynchronous function as redis library does not support "promise"
      const getSession = promisify(redisManager.client.get).bind(redisManager.client)

      // Get session from redis
      const session = await getSession(sessionId)

      // CHECK IF redis session
      if (session === null) {
        return stdReturn("NotFound")
      }

      // Reset expiration time
      redisManager.client.expire(sessionId, EX_TIMEOUT)
      return stdReturn("Success")
    } catch (err) {
      errorLog(__filename, this.signIn.name, "uncaught error")
      throw new Error(err)
    }
  }
}

const usersDao = new UsersDao()

export default usersDao