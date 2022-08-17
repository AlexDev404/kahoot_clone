pin.addEventListener("submit", (e) => {
  boarding(pin_content.value);
});

function boarding(code) {
  fetch("http://" + server.value + `/reserve/session/${code}/${client_id}`);
}
