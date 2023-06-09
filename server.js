const http = require('http')
const app = require('./app')
const mongoose = require('mongoose')
require('dotenv').config()

// Return valid port
const normalizePort = (val) => {
    const port = parseInt(val, 10)

    if (isNaN(port)) { return val }
    if (port >= 0) { return port }
    return false
}

// Mongo Connection
mongoose.connect(process.env.DB_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true})
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'))


const port = normalizePort(process.env.PORT || '4000')
app.set('port', port)

// Vérifie les erreurs
const errorHandler = (error) => {
    if (error.syscall !== 'listen') { throw error }
    const address = server.address()
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.')
            process.exit(1)
            break
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.')
            process.exit(1)
            break
        default:
            throw error
    }
}


// Création du serveur express
const server = http.createServer(app)
server.on('error', errorHandler)
server.on('listening', () => {
    const address = server.address()
    const bind =
        typeof address === 'string' ? 'pipe ' + address : 'port ' + port
    console.log('Listening on ' + bind)
})

server.listen(port)