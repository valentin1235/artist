import env from "../env"

export default {
  httpPort: env.HTTP_PORT,
  socketPort: env.SOCKET_PORT,
  env: env.NODE_ENV || "local",
  root: env.ROOT || ""
}