const client = localStorage.getItem("client");
const server = localStorage.getItem("server");
const username = localStorage.getItem("username");
const room = localStorage.getItem("room");
const address = `ws://${server}`;
let countdown = 0;
let wsOpen = false;

// Start boarding the server after document has loaded
setTimeout(() => {
  init();
}, 500);

/**
 * @brief Listen for messages from the server continuously
 */
function listen() {
  // Listen for messages

  ws.addEventListener("message", (event) => {
    let data = JSON.parse(event.data);
    console.log(data);
  });
  ws.addEventListener("close", () => {
    // if (!blocker.hasAttribute("disabled")) {
    //   blocker.toggleAttribute("disabled");
    // }
    console.warn("You have been kicked by the server.")
    localStorage.clear();
  });
}

function sID(od, nd) {
  od = document.getElementById(od);
  od.id = nd;
  return document.getElementById(nd);
}
