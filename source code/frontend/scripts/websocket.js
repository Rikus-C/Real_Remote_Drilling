const socket = new WebSocket('ws://example.com/socket-server');

socket.addEventListener('open', (event) => {
  console.log('WebSocket connection established.');
  
  // You can send data to the server once the connection is open.
  socket.send('Hello, server!');
});

socket.addEventListener('message', (event) => {
  console.log('Message from server:', event.data);
});

socket.addEventListener('close', (event) => {
  if (event.wasClean) {
    console.log('WebSocket connection closed cleanly.');
  } else {
    console.error('WebSocket connection closed unexpectedly.');
  }
  console.log('Close code:', event.code, 'Reason:', event.reason);
});

socket.addEventListener('error', (event) => {
  console.error('WebSocket error:', event);
});
