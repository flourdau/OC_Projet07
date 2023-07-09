const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()

// Add body request
app.use(express.json())

// CORS Configuration
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})

// Check if images is created else create
fs.access(path.join(__dirname, 'images'), (error) => { if (error) { fs.mkdirSync(path.join(__dirname, 'images')) } })

// Add dynamic routes
const bookRoutes = require('./routes/book')
const userRoutes = require('./routes/user')
app.use('/api/books', bookRoutes)
app.use('/api/auth', userRoutes)

// Add static routes
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app