function configureBabel(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'transform-inline-environment-variables',
      'react-native-reanimated/plugin',
    ],
    env: {
      production: {
        plugins: ['react-native-paper/babel', 'transform-remove-console'],
      },
    },
  };
}

module.exports = configureBabel;
