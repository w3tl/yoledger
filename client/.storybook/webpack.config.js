module.exports = (baseConfig, env, config) => {
  // ...
  config.module.rules.push({
    test: /\.mjs$/,
    include: /node_modules/,
    type: "javascript/auto",
  });
  config.resolve.extensions.push(".mjs");
  // ... Rest params
  return config;
};
