import Sequelize from "sequelize"
import modelManager from "@database/mysql/schemas"
import { sysLog, sysErrorLog } from "@utils/logger"
import { DatabaseError } from "@utils/errors"

class MysqlManager {
  constructor() {
    this.sequelize = null
  }

  async connect(config) {
    try {
      this.sequelize = new Sequelize(
        config.dbname,
        config.username,
        config.password, {
          dialect: "mysql",
          host: config.host,
          port: config.port,
          pool: config.pool,
          define: {
            timestamps: false
          },
          logging: false
        },
        
      )

      // Create sequelize connection with mysql
      await this.sequelize.authenticate()
      sysLog(__filename, "Mysql connection has been established successfully")

      // Initialize models
      modelManager.initialize(this.sequelize)

    } catch(e) {
      // TODO: add sys error handler
      sysErrorLog(__filename, `mysql connection failed: ${e}`)

      // throw new DatabaseError(e)
    } 
  }

  getTransaction() {
    return this.sequelize.transaction()
  }
}

const mysqlManager = new MysqlManager()

export default mysqlManager