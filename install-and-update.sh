#!/bin/bash

set -e

# === 1. Install dependencies ===
echo "Installing Node.js, npm and git..."
sudo apt update
sudo apt install -y nodejs npm git

# === 2. Clone repo ===
echo "Cloning GitHub repo..."
cd /root
git clone https://github.com/sonn3r/your-repo-name.git nexus-updater
cd nexus-updater

# === 3. Install Node packages ===
echo "Installing TypeScript and ts-node..."
npm install --save-dev typescript ts-node @types/node

# === 4. Run updater script ===
echo "Running update script..."
npx ts-node update-nexus.ts
