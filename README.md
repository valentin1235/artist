## Build redis
1. pull the redis image from docker hub(make sure that the docker daemon is running on your background!) \
`docker pull redis`
2. create the container by pulled docker image \
`docker run -d -p 6379:6379 --name redisC redis`

## Build backend application
1. go to backend directory \
`cd backend`
2. create `env.js` file at `backend/src` directory with the following fill
```
module.exports = {
    // etc
    HTTP_PORT: "3000",
    NODE_ENV: "production",
    SECRETKEY: "secret",
    // Redis info
    REDIS_HOST: "localhost",
    REDIS_PORT: "6379",
    REDIS_RETRY_TIME: "12000",
    REDIS_RETRY_ATTEMPT: "10",
    REDIS_RETRY_BACKOFF_MS: "10000",
    // Mysql info
    MYSQL_HOST: "toy.c5n11lms5uan.ap-northeast-2.rds.amazonaws.com",
    MYSQL_PORT: "3306",
    MYSQL_DBNAME: "music",
    MYSQL_USERNAME: "root",
    MYSQL_PASSWORD: "1q2w3e4r1q2w",
    MYSQL_POOL_MAX: "5",
    MYSQL_POOL_IDLE: "6000",
    MYSQL_POOL_ACQUIRE: "30000"
}
```
3. back to the `backend` directory
`cd ..`

3. build application image \
`docker build -t app .`
4. run created image as docker container \
`docker run -d -p 3000:3000 --name appC app`
