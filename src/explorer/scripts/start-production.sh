#!/bin/bash

# Production startup script for Sui Explorer
# This script builds and serves the application on port 3001

set -e

# Get the directory of the script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo "Starting Sui Explorer Production Build..."
echo "Project directory: $PROJECT_DIR"

# Change to project directory
cd "$PROJECT_DIR"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    pnpm install
fi

# Build the application for production
echo "Building application for production..."
NODE_ENV=production VITE_NETWORK=MAINNET pnpm typecheck && vite build

# Start the production server
echo "Starting production server on port 3001..."
serve dist -p 3001 -s
