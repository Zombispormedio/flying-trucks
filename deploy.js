const fs = require('fs')
const request = require('request-promise')
const { dependencies } = require('./package.json')

const code = fs.readFileSync('build/omnibus.bundle.js').toString()

request({
  uri: process.env.DEPLOY_ORIGIN,
  method: 'PUT',
  headers: {
    Authorization: `Bearer ${process.env.WT_TOKEN}`
  },
  json: true,
  body: {
    code,
    secrets: {
      OMNIBUS_URL: process.env.OMNIBUS_URL,
      MONGODB_URL: process.env.MONGODB_URL,
      DEFAULT_PATHNAME: process.env.DEFAULT_PATHNAME,
      SENDGRID_API_KEY: process.env.SENDGRID_API_KEY
    },
    meta: {
      'wt-node-dependencies': JSON.stringify(dependencies)
    }
  }
}).then(body => console.log('Deployed Successfully'))
