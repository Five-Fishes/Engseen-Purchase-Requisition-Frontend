const CracoLessPlugin = require("craco-less");
const CracoAlias = require("craco-alias");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#721959",
              "@secondary-color": "#C4C4C4",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        baseUrl: "./src",
        tsConfigPath: "./tsconfig.extend.json",
      },
    },
  ],
};
