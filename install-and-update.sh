#!/bin/bash

set -e

echo "Installing Node.js, npm, and git..."
sudo apt update
sudo apt install -y nodejs npm git

echo "Cloning your repo..."
cd /root
rm -rf nexus-node-updates
git clone https://github.com/sonn3r/nexus-node-updates.git
cd nexus-node-updates

echo "Installing TypeScript and ts-node..."
npm install --save-dev typescript ts-node @types/node

echo "🛠 Creating tsconfig.json..."
cat <<EOF > tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
EOF

echo "Running update-nexus.ts..."
npx ts-node update-nexus.ts
