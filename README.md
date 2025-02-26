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

# Queue

## 1. "Hello World!"

### Run `receive.js`
```
docker run -it --rm --network rabbitmq-network -v $(pwd)/app:/app -v /app/node_modules -w /app my-rabbitmq-app node queue/1-hello-world/receive.js
```

### Run `send.js`
```
docker run -it --rm --network rabbitmq-network -v $(pwd)/app:/app -v /app/node_modules -w /app my-rabbitmq-app node queue/1-hello-world/send.js
```

# 2. Work Queues

### Run `worker.js`
```
docker run -it --rm --network rabbitmq-network -v $(pwd)/app:/app -v /app/node_modules -w /app my-rabbitmq-app node queue/2-work-queues/worker.js
```

### Run `new_task.js`
```
docker run -it --rm --network rabbitmq-network -v $(pwd)/app:/app -v /app/node_modules -w /app my-rabbitmq-app node queue/2-work-queues/new_task.js
```

# 3. Publish/Subscribe

### Run `receive_logs.js`
```
docker run -it --rm --network rabbitmq-network -v $(pwd)/app:/app -v /app/node_modules -w /app my-rabbitmq-app node queue/3-publish-subscribe/receive_logs.js
```

### Run `emit_log.js`
```
docker run -it --rm --network rabbitmq-network -v $(pwd)/app:/app -v /app/node_modules -w /app my-rabbitmq-app node queue/3-publish-subscribe/emit_log.js
```

# 4. Routing
### Run `receive_logs_direct.js`
```
docker run -it --rm --network rabbitmq-network -v $(pwd)/app:/app -v /app/node_modules -w /app my-rabbitmq-app node queue/4-routing/receive_logs_direct.js warning error
```

### Run `emit_log.js`
```
docker run -it --rm --network rabbitmq-network -v $(pwd)/app:/app -v /app/node_modules -w /app my-rabbitmq-app node queue/4-routing/emit_log_direct.js error "Run. Run. Or it will explode."
```

# 5. Topics
### Run `receive_logs_topic.js`
```
docker run -it --rm --network rabbitmq-network -v $(pwd)/app:/app -v /app/node_modules -w /app my-rabbitmq-app node queue/5-topics/receive_logs_topic.js "*.critical"
```

### Run `emit_log.js`
```
docker run -it --rm --network rabbitmq-network -v $(pwd)/app:/app -v /app/node_modules -w /app my-rabbitmq-app node queue/5-topics/emit_log_topic.js "kern.critical" "A critical kernel error"
```

# 6. RPC
### Run `rpc_server.js`
```
docker run -it --rm --network rabbitmq-network -v $(pwd)/app:/app -v /app/node_modules -w /app my-rabbitmq-app node queue/6-rpc/rpc_server.js
```

### Run `rpc_client.js`
```
docker run -it --rm --network rabbitmq-network -v $(pwd)/app:/app -v /app/node_modules -w /app my-rabbitmq-app node queue/6-rpc/rpc_client.js 30
```

# 7. Publisher Confirms