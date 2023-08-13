const express = require('express')
const connectDB = require('./config/db')
require('dotenv').config()
const cors = require('cors');
const path = require('path')

const app = express()

// connect database

connectDB();


// init middleware
app.use(express.json({ extended: false }))
app.use(cors())
app.use(express.static(path.join(__dirname, "./client/build")))
// define routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))

app.use('*', function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"))
})


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`server start on port ${PORT}`)
})