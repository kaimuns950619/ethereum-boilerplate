module.exports = {
  apps: [
    {
      name: "charity",
      script: "yarn",
      args: "start",
      interpreter: "bash",
      env: {
        PORT: 8080,
      },
    },
  ],
};
