require("dotenv").config

const app = require('./app');

app.listen(process.env.APP_PORT || 3000, () => {
  console.log(`Example app listening at http://localhost:${process.env.APP_PORT}`)
})