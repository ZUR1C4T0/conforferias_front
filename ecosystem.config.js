module.exports = {
  apps: [
    {
      name: "conforferias_front",
      script: "pnpm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 3002
      }
    },
  ],
};
