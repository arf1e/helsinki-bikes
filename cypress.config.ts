import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'qmvwo3',
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },

  e2e: {
    viewportHeight: 800,
    viewportWidth: 1280,
    baseUrl: 'http://localhost:3001/',
    setupNodeEvents(on, config) {},
  },
});
