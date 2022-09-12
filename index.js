// required packages
require('dotenv').config()
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')

// config express app/middlewares
const app = express()
const PORT = process.env.PORT || 3000
app.set('view engine', 'ejs')
app.use(ejsLayouts)

// route definitions
app.get('/', (req, res) => {
    // res.send('hello, user auth')
    res.render('home.ejs')
})
//listen on a port
app.listen(PORT, () => console.log(`you or your loved ones may be entited to compensation on port: ${PORT}`))