const socket = io()
const mensagens = document.getElementById('mensagens')
const msgInput = document.getElementById('msgInput')
const btnEnviar = document.getElementById('btnEnviar')

btnEnviar.addEventListener('click', () => {
    const msg = msgInput.value.trim()
    if(msg !== '') {
        const nomeUsuario = sessionStorage.getItem('nomeUsuario') || 'Usuário'
        socket.emit('mensagemEnviada', { nomeUsuario, msg })
        msgInput.value = ''
    }
})

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        btnEnviar.click()
    }
})

socket.on('mensagemEnviada', (data) => {
    const conteudo = document.createElement('p')
    conteudo.textContent = `${data.nomeUsuario}: ${data.msg}`
    mensagens.append(conteudo)
    mensagens.scrollTop = mensagens.scrollHeight
})
