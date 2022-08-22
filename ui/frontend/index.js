let roomData = {};
let roomGen = rID();

/**
 *
 * @returns A randomly generated 6-digit room ID
 */
function rID() {
  var buf = new Uint32Array(1);
  window.crypto.getRandomValues(buf);
  return parseInt(buf[0].toString().substring(0, 6));
}

/**
 * @brief Initializes a room in the room database
 * @param {String} status The inital status of the room. These values include "init", "draft", "inProgress" or "end"
 * @param {Number} roomID The room ID. You can use rID() for this
 * @param {Number} lobbyTimeOut The lobby timeout (how long the server will wait for players to join)
 * @param {Number} defaultQuestion The default question index. This is usually set to zero (first question)
 * @param {String} roomTopic The room topic. This will be displayed on the top-header of the page when the user joins the room.
 */
function initQuestion(
  status,
  roomID,
  lobbyTimeOut,
  defaultQuestion,
  roomTopic
) {
  roomData[roomID] = [];
  roomData[roomID][0] = status;
  roomData[roomID][1] = lobbyTimeOut;
  roomData[roomID][2] = defaultQuestion;
  roomData[roomID][3] = roomTopic;
  roomData[roomID][4] = {
    Q: [],
    _metadata: [],
    A: [],
  };
}

/**
 * @brief Adds a question to the roomData
 * @param {Number} roomID The room ID. You can use rID() for this
 * @param {Array} question The question to be added. Must be of type Array and be of the format [question, timeout]
 * @param {Number} answer The question's answer as an index
 * @param {Array} choices The possible choices represented as an Array [choice, choice, ...]
 */
function addQuestion(
  roomID,
  question = [],
  answer = parseInt[answer],
  choices = []
) {
  roomData[roomID][4]["Q"].push(question);
  roomData[roomID][4]["_metadata"].push(choices);
  roomData[roomID][4]["A"].push(answer);
}

/**
 * @brief Drops a question from the roomData
 * @param {Number} index The question's index
 * @param {Number} roomID The roomID in question
 */
function dropQuestion(index, roomID) {
  roomData[roomID][4]["Q"].splice(index, 1);
  roomData[roomID][4]["_metadata"].splice(index, 1);
  roomData[roomID][4]["A"].splice(index, 1);
}

// initQuestion("init", roomGen, 5, 0, "TOPIC");
// addQuestion(roomGen, ["What do dogs eat", 30], 0, ["Food", "Drinks"]);
// dropQuestion(roomData.length - 1, roomGen);

styleDump.innerHTML = `.room {background: ${random_rgba()}}`;

document.getElementById("roomImport").addEventListener("click", function () {
  let file;
  let input = document.createElement("input");
  input.type = "file";
  input.onchange = (_this) => {
    file = input.files[0];
    console.log(file);
    // file = file.files[0];
    let reader = new FileReader();
    reader.addEventListener("load", function (e) {
      let text = e.target.result;
      // console.log(text);
      try {
        roomData = JSON.parse(text);
        populateRooms();
      } catch (error) {
        console.log("Invalid Format.");
      }
    });
    reader.readAsText(file);
  };
  input.click();
});

/**
 * @brief Populate the list of rooms
 */
function populateRooms() {
  roomList.innerHTML = "";
  Object.keys(roomData).forEach((room, index) => {
    // If the player's room is in the room we want

    roomList.insertAdjacentHTML("beforeend", roomTemplate.innerHTML);
    sID("room", Object.entries(roomData)[index][0]);
    sID("roomId", `r__${index}`).innerHTML =
      "#" + Object.entries(roomData)[index][0];
    sID("roomTopic", `t__${index}`).innerHTML = roomData[room][3];
  });
}

function editRoom(rID) {
  localStorage.setItem("rData", JSON.stringify(roomData));
  localStorage.setItem("room", rID);
  window.location.href = "edit.html";
}
