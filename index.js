// required packages
require('dotenv').config()
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const cookieParser = require('cookie-parser')
const db = require('./models')

// config express app/middlewares
const app = express()
const PORT = process.env.PORT || 3000
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(express.urlencoded({ extended: false}))
app.use(cookieParser())
// our custom auth middleware
app.use(async (req, res, next) => {
    // console.log('hello from a middleware')
    res.locals.myData = 'hello, fellow route!'
    // if there is a cookie on the incoming request
    if (req.cookies.userId) {
        //look up the user in the db
        const user = await db.user.findByPk(req.cookies.userId)
        //mount the user on the res.locals
        res.locals.user = user
    // if there is no cookie -- set the user to be null in the res.locals
    } else {
        res.locals.user = null
    }
    // move on to the next route or middleware in the chain
    next()
})


// route definitions
app.get('/', (req, res) => {
    // console.log('incoming cookie', req.cookies)
    // console.log(res.locals.myData)
    console.log('the currently logged in user is:', res.locals.user)
    res.render('home.ejs')
})

// Controllers
app.use('/users', require('./controllers/users') )
//listen on a port
app.listen(PORT, () => console.log(`you or your loved ones may be entited to compensation on port: ${PORT}`))