const client = localStorage.getItem("client");
const server = localStorage.getItem("server");
const username = localStorage.getItem("username");
const room = localStorage.getItem("room");
const address = `ws://${server}`;
let answerNow;
let landing = true;
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

    // Set Room Topic
    room_topic.innerText = data[[4]];
    if (landing) {
      q_index.innerHTML = `Question ${parseInt(data[2]) + 1} out of ${
        parseInt(data[3]) + 1
      }`;
      user.innerHTML = `Signed in as <b>${username}</b>`;
      // Set question title
      question_title.innerText = data[0][0];
      // Set possible answers
      try {
        data[1].forEach((answer, index) => {
          question_pane.insertAdjacentHTML("beforeend", tf_template.innerHTML);
          tf_a.innerHTML = answer;
          sID("tf_a", index);
        });
      } catch (error) {
        window.location.reload();
      }
      landing = false;
    } else {
      // if (data[0] == true) {
      //   question_title.innerHTML = "";
      //   question_pane.innerHTML = "";
      //   q_index.innerHTML = `Question ${parseInt(data[1][2]) + 1} out of ${
      //     parseInt(data[1][3]) + 1
      //   }`;
      //   user.innerHTML = `Signed in as <b>${username}</b>`;
      //   // Set question title
      //   question_title.innerText = data[1][0][0];
      //   // Set possible answers
      //   try {
      //     data[1][1].forEach((answer, index) => {
      //       question_pane.insertAdjacentHTML(
      //         "beforeend",
      //         tf_template.innerHTML
      //       );
      //       tf_a.innerHTML = answer;
      //       sID("tf_a", index);
      //     });
      //   } catch (error) {
      //     window.location.reload();
      //   }
      // } else {
      //   setTimeout(() => {
      //     document
      //       .getElementById(answerNow)
      //       .classList.add("bg-red-600", "hover:bg-red-700", "text-white");
      //   }, 550);
      // }
      localStorage.setItem("answer", data[0]);
      localStorage.setItem("myAnswer", answerNow);
      window.location.href = "result.html";
    }
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
function postAnswer(answer) {
  if (wsOpen) {
    ws.send(JSON.stringify([client, room, answer]));
    answerNow = answer;
    _blocker.classList.toggle("hidden");
  }
}

function leave() {
  if (wsOpen) {
    ws.send(JSON.stringify({ remove: [client, room] }));
  }
}
