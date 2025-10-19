const express = require('express')
const { Server } = require('socket.io')
const http = require('http')
const path = require('path')

const app = express()
const PORT = 8001

const server = http.createServer(app)
const serverIO = new Server(server)

app.use(express.static('public'))

app.get('/chat', (request, response) => {
    response.sendFile(path.join(__dirname, 'public', 'chat.html'))
})

const usuarios = {}

serverIO.on('connection', (socket) => {
    console.log(`Usuário ${socket.id} conectado!`)

    socket.on('login', (nomeUsuario) => {
        usuarios[socket.id] = nomeUsuario
    })

    socket.on('mensagemEnviada', ({ nomeUsuario, msg }) => {
        serverIO.emit('mensagemEnviada', { nomeUsuario, msg })
        console.log(`${nomeUsuario}: ${msg}`)
    })

    socket.on('disconnect', () => {
        console.log(`Usuário ${socket.id} desconectado!`)
    })
})

server.listen(PORT, () => {
    console.log(`Servidor online na porta: ${PORT}`)
})