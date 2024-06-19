const { defineConfig } = require('@vue/cli-service');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: /\.(js|css)$/,
        threshold: 10240,
        minRatio: 0.8,
      }),
      new BundleAnalyzerPlugin() 
    ],
  },
  pluginOptions: {
    vite: {
      vue: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('app-'),
          delimiters: ['{{', '}}'],
          __VUE_PROD_DEVTOOLS__: true,
          __VUE_PROD_ERROR_HANDLING__: true,
          __VUE_PROD_WARN_HANDLING__: true,
          __VUE_OPTIONS_API__: true,
          __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true,
        },
      },
    },
  },
});
