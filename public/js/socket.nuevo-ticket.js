// Commando para establecer la comunicación con el servidor
const socket = io();
const label = $("#lblNuevoTicket");

socket.on("connect", () => {
  console.log("Conectado al servidor");
});

socket.on("disconnect", () => {
  console.log("Desconectado del servidor");
});

// Escuchar enviar mensaje
socket.on("estadoActual", mensaje => {
  label.text(mensaje.actual);
});

$("button").on("click", () => {
  socket.emit("siguienteTicket", null, siguienteTicket => {
    label.text(siguienteTicket);
  });
});
