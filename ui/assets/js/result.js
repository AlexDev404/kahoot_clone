const client = localStorage.getItem("client");
const server = localStorage.getItem("server");
const username = localStorage.getItem("username");
const room = localStorage.getItem("room");
const address = `ws://${server}`;
const result = localStorage.getItem("answer");
const myAnswer = localStorage.getItem("myAnswer");
let ws;
let paused = false;
let wsOpen = false;
let time = 3;

/**
 * @brief Setup the websocket and connect to the leaderboard service
 */
function getPublicLeaderboard() {
  if ("WebSocket" in window) {
    // Let us open a web socket

    ws = new WebSocket(address);
    ws.onopen = function () {
      // Web Socket is connected, send data using send()
      wsOpen = true;
      leaderboard();
      console.log("[READY] Websocket connected successfully.");
    };
  }
}

/**
 * @brief Get and display the public leaderboard
 */
function leaderboard() {
  if (wsOpen) {
    ws.send(JSON.stringify(["GET_LEADERBOARD", room]));
    ws.addEventListener("message", (event) => {
      let data = JSON.parse(event.data);
      console.log(data);
    });
    ws.addEventListener("close", () => {
      console.warn("WebSocket Server has disconnected abruptly.");
    });
  }
}

if (myAnswer == result) {
  console.log(true);
  spinner.classList.remove("spinner_");
  remark_icon.innerHTML = correct.innerHTML;
  remark_title.innerText = "Correct";
  remark.innerText = "Way to go!";
} else {
  console.log(false);
  spinner.classList.remove("spinner_");
  remark_icon.innerHTML = incorrect.innerHTML;
  remark_title.innerText = "Incorrect";
  remark.innerText = "We believe in you!";
}

// setInterval(() => {
//   if (time != -1 && !paused) {
//     redirect_status.innerText = `You'll be redirected in ${time} seconds`;
//     time--;
//   }
//   if (time == -1) {
//     history.back();
//   }
// }, 1000);
