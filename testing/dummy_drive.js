// <Buffer 00 01 00 00 00 09 01 03 06 70 00 00 00 00 00>

// this frame should be what the server responds with each time a request is made with transaction id

const net = require('net');

const hexValues = ["00", "01", "00", "00", "00", "09", "01", "03", "04", "ff", "ff", "ff", "ff"];

// Create a TCP server
const server = net.createServer((socket) => {
  console.log("Connected");

  socket.on('data', () => {
    socket.write(Buffer.from(hexValues.join(""), 'hex'));
  });

  // Handle client disconnection
  socket.on('end', () => {
    console.log("Disconnected");
  });

  // Handle errors
  socket.on('error', (err) => {});
});

// Listen on a specific port and host
const PORT = 8080;
const HOST = '127.0.0.1'; // Use '0.0.0.0' to accept connections from any IP address
server.listen(PORT, HOST, () => {
  console.log(`Server listening on ${HOST}:${PORT}`);
});
