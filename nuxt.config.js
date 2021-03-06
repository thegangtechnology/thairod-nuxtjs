export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ไทยรอด | Mall',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      },
      {
        name: 'format-detection',
        content: 'telephone=no'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/styles/antd.less',
    '@/assets/styles/order-overview/main.less',
    '@/assets/styles/print/main.less',
    '@/assets/styles/assign/main.less'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/antd-ui',
    '~plugins/order-components.ts',
    '~plugins/assign-components.ts',
    '~plugins/print-components.ts',
    '~plugins/shipment.plugin.ts',
    '~plugins/date.ts',
    '@/plugins/accessor.ts',
    '@/plugins/axios.ts'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  auth: {
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'access'
        },
        refreshToken: {
          property: 'refresh',
          data: 'refresh'
        },
        user: {
          property: false
        },
        endpoints: {
          login: { url: '/api/token/', method: 'post', headers: { 'Content-Type': 'application/json' } },
          refresh: { url: '/api/token/refresh/', method: 'post', headers: { 'Content-Type': 'application/json' } },
          user: { url: '/api/current_user/', method: 'get' },
          logout: false
        }
      }
    },
    redirect: {
      logout: '/',
      home: '/procurement',
      login: '/'
    }
  },

  router: {
    middleware: ['admin']
  },

  // proxy: {
  //   '/api/': {
  //     target: ,
  //     changeOrigin: true
  //   }
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        },
        additionalData: '@import "@/assets/styles/antd.less";'
      }
    }
  },
  publicRuntimeConfig: {
    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
      // proxy: true
      baseURL:
        process.env.SERVER_URL || 'https://thairod.charity.dev.thegang.tech/'
    },
  }
}
