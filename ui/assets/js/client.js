pin.addEventListener("submit", (e) => {
  boarding(pin_content.value);
});

function boarding(code) {
  fetch("http://" + server.value + `/reserve/session/${code}/${client_id}`)
    .then((response) => response.status)
    .then((status) => {
      console.log(status);
      switch (status) {
        case 200:
          break;
        case 400:
          pin_content.classList.add("border-red-200");
          break;
        default:
          pin_content.classList.add("border-yellow-200");
          break;
      }
    });
}
