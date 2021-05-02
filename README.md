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

3. back to the `backend` directory \
   `cd ..`

4. build application image \
   `docker build -t app .`
5. run created image as docker container \
   `docker run -d -p 3000:3000 --name appC app`


## API document
> https://documenter.getpostman.com/view/10893095/TzRLmWfs
1. you can import requests from the document by click `run in postman` as following image.
<img width="583" alt="스크린샷 2021-05-02 오후 11 04 09" src="https://user-images.githubusercontent.com/57642813/116815907-bbdbf580-ab9a-11eb-8bd4-63d45f4bf0e1.png">

2. send requests to the EC2 server with the following `host` and `port` \
- `http://ec2-3-34-0-45.ap-northeast-2.compute.amazonaws.com:3000`


