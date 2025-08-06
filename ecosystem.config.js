module.exports = {
  apps: [
    {
      name: "conforferias_front",
      script: "node",
      args: "./node_modules/next/dist/bin/next start",
      env: {
        NODE_ENV: "production",
        PORT: 3002
      }
    },
  ],
};
