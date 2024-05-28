const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

module.exports = {
  pluginOptions: {
    vite: {
      vue: {
        compilerOptions: {
          // Inject the feature flags
          isCustomElement: (tag) => tag.startsWith('app-'),
          delimiters: ['{{', '}}'],
          __VUE_PROD_DEVTOOLS__: true,
          __VUE_PROD_ERROR_HANDLING__: true,
          __VUE_PROD_WARN_HANDLING__: true,
          __VUE_OPTIONS_API__: true,
          __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true,
          __VUE_PROD_DEVTOOLS__: true,
        },
      },
    },
  },
};
