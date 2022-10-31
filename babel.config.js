module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@components': './src/components',
          '@features': './src/features',
          '@hooks': './src/hooks',
          '@utils': './src/utils',
          '@assets': './src/assets',
          '@src': './src',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
