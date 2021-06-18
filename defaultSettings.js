// const path = require('path');
const personalSettings = require('./personalSettings.js' || '');

module.exports = {
  title: '女神联盟',

  favicon: 'favicon.png',
  description: 'desc',
  keywords: ['BBGAME', '女神联盟'],
  shareOptions: [
    {
      property: 'og:title',
      content: '女神联盟',
    },

    {
      property: 'og:site_name',
      content: 'BBGAME 女神联盟',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:title',
      content: 'BBGAME 女神联盟',
    },
    {
      property: 'og:description',
      content: 'BBGAME 女神联盟',
    },
    {
      property: 'og:image',
      content: '',
    },
    {
      property: 'twitter:card',
      content: 'summary',
    },
    {
      property: 'twitter:site',
      content: '@bbgame',
    },
    {
      property: 'twitter:creator',
      content: '@bbgame',
    },
    {
      property: 'twitter:domain',
      content: 'https://h5sdktest.bb.game',
    },
  ],

  defines: {
    appName: 'angle',
  },

  // pwa: true,

  externals: {
    lodash: ['https://cdn.jsdelivr.net/npm/lodash@4.17.19/lodash.min.js', '_'],
    moment: [
      'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js',
      'moment',
    ],
    // 'react-router-dom': [
    //   'https://cdnjs.cloudflare.com/ajax/libs/react-router-dom/5.2.0/react-router-dom.min.js',
    //   reactRouterDom
    // ],

    // react: ['https://unpkg.com/react@16/umd/react.production.min.js', 'React'],
    // 'react-dom': [
    //   'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js',
    //   'ReactDOM',
    // ],
  },

  devServer: {
    port: 8000,
    ...(personalSettings ? personalSettings.devServer : {}),
  },

  DEV_BASEURL: 'http://simulation-env.bb.game',
  TEST_BASEURL: 'https://simulation-env.bb.game',
  RELEASE_BASEURL: 'https://api-sgz-kr.bbgamekr.com',
};
