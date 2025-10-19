const express = require('express')
const { Server } = require('socket.io')
const http = require('http')

const app = express()
const PORT = 8001

const server = http.createServer(app)
const serverIO = new Server(server)

app.use(express.static('public'))

serverIO.on('connection', (socket) => {
    console.log(`Usuário ${socket.id} conectado!`)

    socket.on('disconnect', () => {
        console.log(`Usuário ${socket.id} desconectado!`)
    })

    socket.on('mensagemEnviada', (msg) => {
        serverIO.emit('mensagemEnviada', msg)
        console.log(`Usuário: ${socket.id} Mensagem: ${msg}`)
    })
})

server.listen(PORT, () => {
    console.log(`Servidor online na porta: ${PORT}`)
})