const fs = require("fs");
const request = require("request-promise");

const code = fs.readFileSync("build/min/omnibus.bundle.min.js").toString();

request({
  uri: `https://webtask.it.auth0.com/api/webtask/${
    process.env.WT_CONTAINER
  }/flying-trucks`,
  method: "PUT",
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
      SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
      DB_TYPE: process.env.DB_TYPE
    }
  }
}).then(body => console.log(body));
