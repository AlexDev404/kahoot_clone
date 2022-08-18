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

    if (
      data[0] == "NOT_FOUND" ||
      data[0] == "FULL" ||
      data[0] == "IN_PROGRESS"
    ) {
      console.log("LOL what are YOU doing here???! LMAO");
      localStorage.clear();
      window.location.href = "index.html";
    }

    q_index.innerHTML = `Question ${parseInt(data[2]) + 1} out of ${
      parseInt(data[3]) + 1
    }`;
    user.innerHTML = `Signed in as <b>${username}</b>`;
    // Set question title
    question_title.innerText = data[0][0];
    // Set possible answers
    data[1].forEach((answer, index) => {
      question_pane.insertAdjacentHTML("beforeend", tf_template.innerHTML);
      tf_a.innerHTML = answer;
      sID("tf_a", index);
    });
  });
  ws.addEventListener("close", () => {
    // if (!blocker.hasAttribute("disabled")) {
    //   blocker.toggleAttribute("disabled");
    // }
    console.warn("You have been kicked by the server.");
    localStorage.clear();
    window.location.href = "./errors/kick.html";
  });
}

/**
 * @brief Posts the answer to the server
 * @param {String} answer The Answer ID
 */
function postAnswer(answer){
  if(wsOpen){
    ws.send(JSON.stringify([client, room, answer]))
  }
}