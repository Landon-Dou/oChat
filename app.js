const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const PORT = process.env.PORT || 3000

var history = []

/**
 * Express routing
 */
app.use(express.static(`${__dirname}/public`))

app.get('/', function (req, res) {
    res.sendFile(`${__dirname}/chat.html`)
})

/**
 * Socket.IO application
 */
io.on('connection', function (socket) {
    let userid = Math.random().toString(36).substring(2, 8)
    if (history.length) {
        for (let item of history) {
            socket.emit('history-msg', item)
        }
        socket.emit('sys-msg', '[ SYS ] These are the latest messages in this room')
    }

    socket.emit('sys-msg', `[ SYS ] Welcome to oChat. You are assigned to an anonymous id - ${userid}`)
    io.emit('sys-msg', `[ SYS ] ${userid} joined the room`)
    socket.on('chat-msg', function (msg) {
        msg = `[ ${userid} ] ${msg}`
        io.emit('chat-msg', msg)
        history.push(msg)
    })
})

/**
 * Start the server
 */
http.listen(PORT, function () {
    console.log(`Sever started on localhost:${PORT}`)
})