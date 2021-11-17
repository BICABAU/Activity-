require("dotenv").config

const app = require('./app');

app.listen(process.env.APP_PORT, () =>{
    console.log(`listened at http://localhost:${process.env.APP_PORT}`)
})