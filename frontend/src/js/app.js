const chatWindow = document.getElementById('chat-window');
const form = document.getElementById('chat-form');
const input = document.getElementById('message-input');

// backend Render:
const socket = new WebSocket('wss://websockets-z18a.onrender.com/ws');

socket.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);
  if (data.type === 'message') {
    const message = document.createElement('div');
    message.textContent = `[${data.username}]: ${data.message}`;
    chatWindow.appendChild(message);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = input.value.trim();
  if (message !== '') {
    const payload = {
      type: 'message',
      username: 'Anonymous',
      message: message,
    };
    socket.send(JSON.stringify(payload));
    input.value = '';
  }
});
