# Use the official RabbitMQ 4.0 image as the base
FROM rabbitmq:4.0

# Copy the enabled plugins file into the image
# Ensure that the file "rabbitmq_enabled_plugins" is in the same directory as this Dockerfile
COPY rabbitmq_enabled_plugins /etc/rabbitmq/enabled_plugins

# (Optional) Expose the AMQP and management UI ports
EXPOSE 5672 15672

# Start RabbitMQ
CMD ["rabbitmq-server"]