require("dotenv").config

const app = require('./app');

app.listen(process.env.PORT || 3000, () => {
  console.log(`The game is running at http://localhost:${process.env.APP_PORT}`)
})