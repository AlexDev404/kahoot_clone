pin.addEventListener("submit", (e) => {
  boarding(pin_content.value);
});

function boarding(code) {
  blocker.classList.toggle("hidden");
  fetch("http://" + server.value + `/reserve/session/${code}/${client_id}`)
    .then((response) => response.status)
    .then((status) => {
      console.log(status);
      switch (status) {
        case 200:
          pin_content.classList.add("border-green-200");
          blocker_sub.classList.remove("text-red-200");
          blocker_sub.classList.add("text-white");
          blocker_sub.innerText = "Success."
          setTimeout(()=>{
            blocker.classList.toggle("hidden");
          }, 1500)
          break;
        case 400:
          pin_content.classList.remove("border-green-200");
          pin_content.classList.add("border-red-200");
          blocker_sub.classList.add("text-red-200");
          blocker_sub.innerText = "This room does not exist."
          setTimeout(()=>{
            blocker.classList.toggle("hidden");
          }, 1500)
          break;
        default:
          pin_content.classList.add("border-yellow-200");
          break;
      }
    });
}
