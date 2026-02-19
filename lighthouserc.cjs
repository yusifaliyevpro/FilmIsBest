module.exports = {
  ci: {
    collect: {
      url: ["http://localhost:3000"],
      startServerCommand: "npm run start",
      startServerReadyPattern: "Ready in",
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
