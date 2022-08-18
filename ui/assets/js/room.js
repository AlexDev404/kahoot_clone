const client = localStorage.getItem("client");
const server = localStorage.getItem("server");
const address = `ws://${server}`;
const room = localStorage.getItem("room");
let countdown = 0;
let wsOpen = false;

/**
 * @brief Listen for messages from the server continuously
 */
function listen() {
  // Listen for messages

  ws.addEventListener("message", (event) => {
    let data = JSON.parse(event.data);
    console.log(data);

    if (data[0] != "undefined") {
      switch (data[0]) {
        case "IN_PROGRESS":
          blocker_title.innerText = "CONNECTION FAILED WITH ERROR";
          blocker_sub.innerText = "GAME HAS ALREADY STARTED";
          break;
        case "FULL":
          blocker_title.innerText = "CONNECTION FAILED WITH ERROR";
          blocker_sub.innerText = "ROOM IS FULL";
          break;
        default:
          if (typeof data[0] == "number") {
            countdown = data[0];
            setInterval(() => {
              if (countdown != -1) {
                blocker_sub.innerHTML =
                  "GAME IS STARTING IN " + "<b>" + countdown + "</b>";
                countdown--;
              } else {
                window.location.href = "game.html";
              }
            }, 1000);
          } else {
            blocker_sub.innerText = "REJOINING GAME...";
            window.location.href = "game.html";
          }
          break;
      }
    }
  });
  ws.addEventListener("close", () => {
    // if (!blocker.hasAttribute("disabled")) {
    //   blocker.toggleAttribute("disabled");
    // }
    localStorage.clear();
    window.location.href = "./errors/kick.html"
  });
}

function sID(od, nd) {
  od = document.getElementById(od);
  od.id = nd;
  return document.getElementById(nd);
}
