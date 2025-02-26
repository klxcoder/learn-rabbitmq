# Start RabbitMQ server

### Build the Docker image
```
docker build -t my-rabbitmq-app .
```

### Crete a user-defined network
```
docker network create rabbitmq-network
```

### Run RabbitMQ container on the created network
```
docker run -d --hostname my-rabbit-hostname --name my-rabbit-server --network rabbitmq-network rabbitmq:4.0
```

# 1. "Hello World!"

### Run `receive.js`
```
docker run -it --rm --network rabbitmq-network -v $(pwd)/app:/app -v /app/node_modules -w /app my-rabbitmq-app node 1-hello-world/receive.js
```

### Run `send.js`
```
docker run -it --rm --network rabbitmq-network -v $(pwd)/app:/app -v /app/node_modules -w /app my-rabbitmq-app node 1-hello-world/send.js
```