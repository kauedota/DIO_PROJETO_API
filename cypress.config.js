const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'qq724v',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});