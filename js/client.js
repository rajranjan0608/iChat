const socket = io('http://localhost:8000');
const form = document.getElementsByClassName('new-message')[0];
const messageInput = document.getElementsByClassName('new-message-text')[0];
const messageContainer = document.getElementsByClassName('container')[0];

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'left');
    socket.emit('send', message);
    messageInput.value = '';
})

const name =  prompt('Enter Your name to join');
socket.emit('new-user-joined', name);
socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right');
})
socket.on('user-left', name => {
    append(`${name} left the chat`, 'right');
})
socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'right')
})