#!/bin/bash

# Stop all running containers
docker-compose down --volumes --remove-orphans

# Remove dangling images, volumes, and networks
docker system prune -a --volumes -f

echo "Cleanup complete."
