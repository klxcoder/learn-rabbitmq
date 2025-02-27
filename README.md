# Start services
```
docker compose up -d
```

# Queue

## 1. "Hello World!"

### Run `receive.js`
```
docker exec my-rabbitmq-app node queue/1-hello-world/receive.js
```

### Run `send.js`
```
docker exec my-rabbitmq-app node queue/1-hello-world/send.js
```

# 2. Work Queues

### Run `worker.js`
```
docker exec my-rabbitmq-app node queue/2-work-queues/worker.js
```

### Run `new_task.js`
```
docker exec my-rabbitmq-app node queue/2-work-queues/new_task.js
```

# 3. Publish/Subscribe

### Run `receive_logs.js`
```
docker exec my-rabbitmq-app node queue/3-publish-subscribe/receive_logs.js
```

### Run `emit_log.js`
```
docker exec my-rabbitmq-app node queue/3-publish-subscribe/emit_log.js
```

# 4. Routing
### Run `receive_logs_direct.js`
```
docker exec my-rabbitmq-app node queue/4-routing/receive_logs_direct.js warning error
```

### Run `emit_log.js`
```
docker exec my-rabbitmq-app node queue/4-routing/emit_log_direct.js error "Run. Run. Or it will explode."
```

# 5. Topics
### Run `receive_logs_topic.js`
```
docker exec my-rabbitmq-app node queue/5-topics/receive_logs_topic.js "*.critical"
```

### Run `emit_log.js`
```
docker exec my-rabbitmq-app node queue/5-topics/emit_log_topic.js "kern.critical" "A critical kernel error"
```

# 6. RPC
### Run `rpc_server.js`
```
docker exec my-rabbitmq-app node queue/6-rpc/rpc_server.js
```

### Run `rpc_client.js`
```
docker exec my-rabbitmq-app node queue/6-rpc/rpc_client.js 30
```

# 7. Publisher Confirms

# Stream

## Enable plugin `rabbitmq_stream`
```
docker exec my-rabbit-server rabbitmq-plugins enable rabbitmq_stream
```

## Make sure plugin `rabbitmq_stream` is enabled
```
docker exec my-rabbit-server rabbitmq-plugins list
```

## 1. "Hello World!"

### Run `receive.js`
```
docker exec my-rabbitmq-app node stream/1-hello-world/receive.js
```

### Run `send.js`
```
docker exec my-rabbitmq-app node stream/1-hello-world/send.js
```

## 2. "Offset Tracking"

### Run ``
```
```

### Run ``
```
```