import env from "../env"

export default {
  host: env.MYSQL_HOST,
  port: Number(env.MYSQL_PORT),
  dbname: env.MYSQL_DBNAME,
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  pool: {
    max: Number(env.MYSQL_POOL_MAX),
    idle: Number(env.MYSQL_POOL_IDLE),
    acquire: Number(env.MYSQL_POOL_ACQUIRE)
  }
}