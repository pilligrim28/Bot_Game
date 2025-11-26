Release & Deploy Guide

This file describes how to build the full project (backend + frontend), produce a release bundle and deploy to a Linux server. Commands below assume you run them from the project root on your dev machine (Windows PowerShell examples provided). Adjust paths and hostnames for your environment.

1) Prep: set production environment variables

- Ensure you have production values for BOT_TOKEN, database connection info, and PORT.

2) Build locally

PowerShell (project root):

npm install
cd frontend
npm install
cd ..

npm run build:all

3) Verify locally (optional): npm run start:prod

4) Package files for upload: include dist/, frontend/dist/, package.json and optionally uploads/

5) Upload to server using scp, rsync or CI.

6) Deploy on the server (example):
- install node
- unzip release
- npm ci --only=production
- create .env with production vars
- run with pm2 or systemd

7) Reverse proxy: configure nginx to proxy to the app at 127.0.0.1:3000 and enable HTTPS with certbot.

If you want automated CI/CD, Dockerfile, or a pm2 ecosystem file I can prepare those artifacts for your target.
