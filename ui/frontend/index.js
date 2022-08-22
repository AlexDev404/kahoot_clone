let roomData = {};
let roomGen = rID();

function rID() {
  var buf = new Uint32Array(1);
  window.crypto.getRandomValues(buf);
  return parseInt(buf[0].toString().substring(0, 6));
}

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

function dropQuestion(index, roomID) {
  roomData[roomID][4]["Q"].splice(index, 1);
  roomData[roomID][4]["_metadata"].splice(index, 1);
  roomData[roomID][4]["A"].splice(index, 1);
}

initQuestion("init", roomGen, 5, 0, "TOPIC");
addQuestion(roomGen, ["What do dogs eat", 30], 0, ["Food", "Drinks"]);
dropQuestion(roomData.length - 1, roomGen);

room.style.background = random_rgba();

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
      console.log(text);
    });
    reader.readAsText(file);
  };
  input.click();
});
