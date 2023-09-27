var tcp_socket;

function initiate_tcp_socket_sender(client){
  tcp_socket = client;
}

function tcp_socket_forward(obj){
  tcp_socket.write(JSON.stringify(obj));
}

module.exports = {
  initiate_tcp_socket_sender, 
  tcp_socket_forward
};