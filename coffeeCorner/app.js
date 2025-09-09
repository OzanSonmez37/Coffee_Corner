const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000
const hostname = '127.0.0.1'
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const expressSession = require('express-session')
const mongoStore = require('connect-mongo')
const methodOverride = require('method-override')

mongoose.connect('mongodb://127.0.0.1/coffeeCorner_db')

const hbs = exphbs.create();

app.use(expressSession({
    secret: 'testotesto',
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({
        mongoUrl: 'mongodb://127.0.0.1/coffeeCorner_db'
    })
})) 

app.use(fileUpload())
app.use(express.static('public'))
app.use(methodOverride('_method'))

app.engine('handlebars', hbs.engine)
app.set('view engine','handlebars')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use((req, res, next) => {
    const {userId} = req.session
    if(userId) {
        res.locals = {
            displayLink: true,
        }
    } else {
        res.locals = {
            displayLink: false,
        }
    }
    next()
})

app.use((req, res, next) => {
    res.locals.sessionFlash = req.session.sessionFlash
    delete req.session.sessionFlash
    next()
})

const main = require('./routes/main')
const posts = require('./routes/posts')
const users = require('./routes/users')
const admin = require('./routes/admin/index')
const contact = require('./routes/contact')
app.use('/', main)
app.use('/posts', posts)
app.use('/users', users)
app.use('/admin', admin)
app.use('/contact', contact)

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})
