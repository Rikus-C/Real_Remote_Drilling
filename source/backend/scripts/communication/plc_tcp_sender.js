var tcp_socket_sender;
var tcp_socket = {};
tcp_socket.ready = false;

tcp_socket.forward = function(obj){
  tcp_socket_sender.write(obj);
}

function initiate_tcp_socket_sender(client){
  tcp_socket_sender = client;
  tcp_socket.ready = true;
}

module.exports = {
  tcp_socket,
  initiate_tcp_socket_sender
};