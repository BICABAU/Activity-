const express = require("express")
const Sentry = require("@sentry/node")
const router = require("./router")
const cors = require("cors")

const sessionOptions = require("./config/sessionOptions")
const sentryConfig = require("./config/sentry");
const expressEjsLayouts = require('express-ejs-layouts')

const app = express();
Sentry.init(sentryConfig);

app.use(Sentry.Handlers.requestHandler())

app.use(sessionOptions)
app.use(function (req, res, next) {
    res.locals.user = req.session.user
    next()
})

app.use(cors())
app.use(express.static("public"))
app.set("views", "views")
app.set("view engine", "ejs")

app.use(expressEjsLayouts)

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', router);
app.use(Sentry.Handlers.errorHandler())

module.exports = app


