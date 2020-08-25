const CompressionPlugin = require("compression-webpack-plugin");
export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    link: [
      {
        rel: "stylesheet",
        href: "https://cdn.bootcss.com/font-awesome/5.13.0/css/all.css"
      },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Noto+Sans+SC&display=swap"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  server: {
    port: 8000 // default: 3000
  },
  loading: { color: "#1db954" },
  /*
   ** Global CSS
   */
  css: ["assets/main.css", "element-ui/lib/theme-chalk/index.css"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "@/plugins/helpers.js",
    "@/plugins/element-ui/element-ui",
    "@/plugins/lazy-load-component/lazy-load-component.js"
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    // Doc: https://github.com/nuxt-community/dotenv-module
    "@nuxtjs/dotenv"
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    plugins: [
      new CompressionPlugin({
        test: /\.js$|\.html$|\.css/, // 匹配文件名

        threshold: 10240, // 对超过10kb的数据进行压缩

        deleteOriginalAssets: false // 是否删除原文件
      })
    ],
    // analyze: true,
    // assetFilter: function(assetFilename) {
    //   return assetFilename.endsWith(".js");
    // },
    optimization: {
      splitChunks: {
        minSize: 10000,

        maxSize: 250000
      }
    },
    extend(config, ctx) {}
  }
};
