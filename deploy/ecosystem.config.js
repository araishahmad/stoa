const path = require("node:path");

// Template for an operator-controlled Linux VPS. No secrets belong here.
module.exports = {
  apps: [
    {
      name: "stoa",
      cwd: path.resolve(__dirname, ".."),
      script: "./frontend/.next/standalone/frontend/server.js",
      instances: 1,
      exec_mode: "fork",
      watch: false,
      autorestart: true,
      restart_delay: 1000,
      kill_timeout: 5000,
      env: {
        NODE_ENV: "production",
        HOSTNAME: "127.0.0.1",
        PORT: "3000",
      },
    },
  ],
};
