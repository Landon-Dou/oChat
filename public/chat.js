$(document).ready(function () {
    var socket = io()
    $('#Btn-Send').click(function () {
        socket.emit('chat-msg', $('#Input-Message').val())
        $('#Input-Message').val('')
        return false
    })
    socket.on('chat-msg', function (msg) {
        $('#Chat-Messages').append($('<li class="list-group-item">').text(msg))
        window.scrollTo(0, document.body.scrollHeight)
    })
    socket.on('sys-msg', function (msg) {
        $('#Chat-Messages').append($('<li class="list-group-item list-group-item-primary">').text(msg))
        window.scrollTo(0, document.body.scrollHeight)
    })
    socket.on('history-msg', function (msg) {
        $('#Chat-Messages').append($('<li class="list-group-item list-group-item-light">').text(msg))
        window.scrollTo(0, document.body.scrollHeight)
    })
})