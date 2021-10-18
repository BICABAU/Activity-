const session = require("express-session")
const pool = require("./db")
const pgSession = require("connect-pg-simple")(session)

let sessionOptions = session({
    store: new pgSession({
        pool: pool,
        tableName: 'session'
    }),
    secret: "daedaedd",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60,
        httpOnly: true
    }
})

module.exports = sessionOptions