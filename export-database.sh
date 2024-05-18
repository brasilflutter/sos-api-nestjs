#!/bin/bash

# Define the service name
SERVICE_NAME="db"

# Execute pg_dump inside the PostgreSQL container with specified encoding
docker-compose exec $SERVICE_NAME pg_dump -h localhost -p 5432 -d postgres -U postgres -s -F p -E UTF-8 -f /var/lib/postgresql/data/database.backup.sql

# Check if the pg_dump command was successful
if [ $? -ne 0 ]; then
  echo "Error: pg_dump failed."
  exit 1
fi

# Get the container ID of the PostgreSQL service
CONTAINER_ID=$(docker-compose ps -q $SERVICE_NAME)

# Check if the container ID was retrieved successfully
if [ -z "$CONTAINER_ID" ]; then
  echo "Error: Could not find a running container for the '$SERVICE_NAME' service."
  exit 1
fi

# Copy the backup file from the container to the host machine
docker cp "${CONTAINER_ID}":/var/lib/postgresql/data/database.backup.sql .

# Check if the docker cp command was successful
if [ $? -ne 0 ]; then
  echo "Error: Failed to copy the backup file from the container."
  exit 1
fi

# Print a message indicating the backup is complete
echo "Backup complete and copied to the host machine."
