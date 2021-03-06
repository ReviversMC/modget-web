export default {
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    htmlAttrs: {
      lang: 'en',
    },
    title: 'Modget Web Portal',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Modget is a mod package manager for Minecraft. Here in our web portal you can view metadata and add/update packages!',
      },

      { hid: 'publisher', name: 'publisher', content: 'ReviversMC' },
      {
        hid: 'apple-mobile-web-app-title',
        name: 'apple-mobile-web-app-title',
        content: 'Modget Web Portal',
      },
      { hid: 'theme-color', name: 'theme-color', content: '#4d9227' },
      { hid: 'color-scheme', name: 'color-scheme', content: 'light dark' },

      {
        hid: 'og:site_name',
        name: 'og:site_name',
        content: 'Modget Web Portal',
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content: 'The mod package manager for Minecraft',
      },
      {
        hid: 'og:title',
        name: 'og:title',
        content: 'Modget Web Portal',
      },
      { hid: 'og:type', name: 'og:type', content: 'website' },
      {
        hid: 'og:url',
        name: 'og:url',
        content: 'https://modget.nebelnidas.net',
      },
      {
        hid: 'og:image',
        name: 'og:image',
        content: 'https://cdn.modrinth.com/data/2NpFE0R3/icon.png',
      },
      // { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
      // { hid: 'twitter:site', name: 'twitter:site', content: '@modrinth' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap',
      },
    ],
    script: [],
  },

  vue: {
    config: {
      productionTip: false,
      devtools: true,
    },
  },
  router: {
    middleware: ['auth', 'analytics'],
  },
  /*
   ** Global CSS
   */
  css: ['~assets/styles/global.scss'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '~/plugins/vue-tooltip.js',
    '~/plugins/vue-notification.js',
    '~/plugins/compiled-markdown-directive.js',
    '~/plugins/vue-syntax.js',
    '~/plugins/auth.js',
    '~/plugins/user.js',
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/svg',
    '@nuxtjs/color-mode',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/dayjs',
    '@nuxtjs/axios',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@nuxtjs/style-resources',
    'cookie-universal-nuxt',
    '~/modules/gpt-ads',
    // The analytics module is disabled, as we are using our own solution embedded in the middleware.
    // '~/modules/analytics',
  ],
  ads: {
    // Module options
    ghostMode: true,
    geoEdgeId: '',
  },
  // robots: {
  //   Sitemap: 'https://modrinth.com/sitemap.xml',
  // },
  sitemap: {
    exclude: ['/dashboard/**', '/dashboard', '/mod/create'],
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    // baseURL: 'https://api.modrinth.com/api/v1/',
    baseURL: 'http://localhost:8080/v1/',
    headers: {
      common: {
        Accept: 'application/json',
      },
    },
  },
  dayjs: {
    locales: ['en'],
    defaultLocale: 'en',
    plugins: ['relativeTime'],
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    transpile: ['vue-tooltip', 'vue-notification'],
    html: {
      minify: {
        collapseWhitespace: true, // as @dario30186 mentioned
        removeComments: true, // ???? add this line
      },
    },
    babel: {
      plugins: [['@babel/plugin-proposal-private-methods', { loose: true }]],
    },
  },
  styleResources: {
    scss: './assets/styles/injected.scss',
  },
  loading: {
    color: 'green',
    height: '2px',
  },
  env: {
    version: process.env.VERSION_ID || 'unknown',
  },
  publicRuntimeConfig: {
    axios: {
      baseURL: process.env.API_URL,
    },
    ads: {
      ghostMode: process.env.ENABLE_ADS == null,
      GeoEdgeId: process.env.GEOEDGE_ID,
      networkCode: process.env.GAM_ID,
      ethicalAds: process.env.ETHICAL_ADS,
    },
    analytics: {
      base_url: process.env.ARIADNE_URL,
    },
    utils: {
      domain: getDomain(),
    },
  },
}

function getDomain() {
  if (process.env.NODE_ENV === 'production') {
    if (process.env.HOST_URL) {
      return process.env.HOST_URL
    } else if (process.env.HEROKU_APP_NAME) {
      return `https://${process.env.HEROKU_APP_NAME}.herokuapp.com`
    } else if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`
    } else {
      return 'https://modget.nebelnidas.net'
    }
  } else {
    return 'http://localhost:3000'
  }
}
