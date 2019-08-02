const socket = io();

socket.on("estadoActual", data => {
  data.ultimos4.forEach((ultimo, index) => {
    $(`#lblTicket${index + 1}`).text(`Ticket ${ultimo.numero}`);
    $(`#lblEscritorio${index + 1}`).text(`Escritorio ${ultimo.escritorio}`);
  });
});

socket.on("ultimos4", data => {
  const audio = new Audio("audio/new-ticket.mp3");
  audio.play();
  data.ultimos4.forEach((ultimo, index) => {
    $(`#lblTicket${index + 1}`).text(`Ticket ${ultimo.numero}`);
    $(`#lblEscritorio${index + 1}`).text(`Escritorio ${ultimo.escritorio}`);
  });
});
