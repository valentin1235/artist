## Build redis
1. pull the redis image from docker hub(make sure that the docker daemon is running on your background!) \
`docker pull redis`
2. create the container by pulled docker image \
`docker run -d -p 6379:6379 --name redisC redis`

## Build application
1. 
