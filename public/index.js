const socket = io()
const inputNome = document.getElementById('inputNome')
const btnLogar = document.getElementById('btnLogar')

btnLogar.addEventListener('click', () => {
    const nomeUsuario = inputNome.value.trim()
    if (nomeUsuario !== '') {
        socket.emit('login', nomeUsuario)
        sessionStorage.setItem('nomeUsuario', nomeUsuario)
        window.location.href = '/chat'
    }
})
