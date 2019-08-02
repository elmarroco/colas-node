const { io } = require("../server");
const { TicketControl } = require("../classes/ticket-control");

const ticketControl = new TicketControl();

io.on("connection", client => {
  console.log("Usuario conectado");

  client.emit("enviarMensaje", {
    usuario: "Administrador",
    mensaje: "Bienvenido a esta aplicación"
  });

  // Escuchar el cliente
  client.on("siguienteTicket", (data, callback) => {
    let siguiente = ticketControl.siguiente();
    console.log(siguiente);
    callback(siguiente);
  });

  // Emitir un evento estado actual
  client.emit("estadoActual", {
    actual: ticketControl.getUltimoTicket(),
    ultimos4: ticketControl.getUltimos4()
  });

  client.on("atenderTicket", (data, callback) => {
    if (!data.escritorio) {
      return callback({
        err: true,
        mensaje: "El escritorio es necesario"
      });
    }
    let atenderTicket = ticketControl.atenderTicket(data.escritorio);
    callback(atenderTicket);
    client.broadcast.emit("ultimos4", {
      actual: ticketControl.getUltimoTicket(),
      ultimos4: ticketControl.getUltimos4()
    });
  });
});
