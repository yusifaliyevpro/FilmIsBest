module.exports = {
  ci: {
    collect: {
      url: [
        "http://localhost:3000/en",
        "http://localhost:3000/en/movies",
        "http://localhost:3000/en/about",
        "http://localhost:3000/en/movies/first-signal",
      ],
      startServerCommand: "npm run start",
      startServerReadyPattern: "Ready in",
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
