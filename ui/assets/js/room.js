setTimeout(() => {
  if (
    localStorage.getItem("client") != null &&
    localStorage.getItem("server") != null &&
    localStorage.getItem("username") != null
  ) {
    document.body.classList.add("select-none");
    window.location.href = "game.html";
  }
}, 550);


const client = localStorage.getItem("client");
const server = localStorage.getItem("server");
const address = `ws://${server}`;
const room = localStorage.getItem("room");
let countdown = 0;
let countDownStarted = false;
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
          blocker_sub.innerText = "THE GAME HAS ALREADY STARTED";
          localStorage.clear();
          setTimeout(() => {
            window.location.href = "index.html";
          }, 5000);
          break;
        case "FULL":
          blocker_title.innerText = "CONNECTION FAILED WITH ERROR";
          blocker_sub.innerText = "ROOM IS FULL";
          localStorage.clear();
          setTimeout(() => {
            window.location.href = "index.html";
          }, 5000);
          break;
        case "NOT_FOUND":
          blocker_title.innerText = "CONNECTION FAILED WITH ERROR";
          blocker_sub.innerText = "THIS GAME HAS ENDED";
          localStorage.clear();
          setTimeout(() => {
            window.location.href = "index.html";
          }, 5000);
          break;
        default:
          countdown = data[0];
          if (typeof data[0] == "number") {
            if (!countDownStarted) {
              setInterval(() => {
                if (countdown != -1) {
                  blocker_sub.innerHTML =
                    "GAME IS STARTING IN " + "<b>" + countdown + "</b>";
                  countdown--;
                } else {
                  window.location.href = "game.html";
                }
              }, 1000);
              countDownStarted = true;
            }
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
    window.location.href = "./errors/kick.html";
  });
}
