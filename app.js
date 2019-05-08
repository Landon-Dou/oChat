const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const PORT = process.env.PORT || 3000

var history = []

/**
 * Express routing
 */
app.get('/', function (req, res) {
    res.sendFile('./chat.html')
})

/**
 * Socket.IO application
 */
io.on('connection', function (socket) {
    if (history.length) {
        socket.emit('sys-msg', ' -- History Start -- ')
        for (let item of history) {
            socket.emit('history-msg', item)
        }
        socket.emit('sys-msg', ' -- History End -- ')
    }

    socket.emit('sys-msg', 'Welcome to oChat')
    io.emit('sys-msg', ' -- A user joined the room -- ')
    socket.on('chat-msg', function (msg) {
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