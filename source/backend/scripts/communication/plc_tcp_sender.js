var tcp_socket;
tcp_socket.ready = false;

function initiate_tcp_socket_sender(client){
  tcp_socket = client;
  tcp_socket.ready = true;
}

function tcp_socket_forward(obj){
  tcp_socket.write(JSON.stringify(obj));
}

module.exports = {
  initiate_tcp_socket_sender, 
  tcp_socket_forward
};