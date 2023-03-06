module.exports = {
  resolver: {
    /* resolver options */
   sourceExts: ["js", "json", "ts", "tsx", "jsx"] //add here 
  },
  transformer: {
    assetPlugins: ['expo-asset/tools/hashAssetFiles'],
  },
};
