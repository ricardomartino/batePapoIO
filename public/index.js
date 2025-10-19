// Conecta Usuário ao Servidor
const socket = io()

const mensagens = document.getElementById('mensagens')
const msgInput = document.getElementById('msgInput')
const btnEnviar = document.getElementById('btnEnviar')

btnEnviar.addEventListener('click', () => {
    const msg = msgInput.value.trim()
    if(msg !== '') {
        socket.emit('mensagemEnviada', msg)
        msgInput.value = ''
    }
})

socket.on('mensagemEnviada', (msg) => {
    const conteudo = document.createElement('p')
    conteudo.textContent = msg
    mensagens.append(conteudo)
    setTimeout(() => {
        mensagens.scrollTop = mensagens.scrollHeight
    }, 0)
})
