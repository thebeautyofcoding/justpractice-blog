const Dotenv = require("dotenv-webpack");


module.exports = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // Add the new plugin to the existing webpack plugins
        config.plugins.push(new Dotenv({ silent: true }));
        return config;
    },

    env: {
        PRODUCTION: false,
        APP_NAME: "justPractice",
        DOMAIN_PRODUCTION: process.env.DOMAIN_PRODUCTION,
        API_PRODUCTION: process.env.API_PRODUCTION,
        API_DEVELOPMENT: process.env.API_DEVELOPMENT,
        DOMAIN_DEVELOPMENT: process.env.DOMAIN_DEVELOPMENT,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID

    }
}




