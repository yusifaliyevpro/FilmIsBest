module.exports = {
  ci: {
    collect: {
      url: ["http://localhost:3000/en", "http://localhost:3000/en/movies", "http://localhost:3000/en/about"],
      startServerCommand: "pnpm start",
      startServerReadyPattern: "Ready in",
      numberOfRuns: 1,
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
