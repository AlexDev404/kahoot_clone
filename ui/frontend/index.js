let roomData;
let roomName;

function initQuestion(
  status,
  roomName,
  lobbyTimeOut,
  defaultQuestion,
  roomTopic
) {
  roomData[roomName] = [];
  roomData[roomName][0] = status;
  roomData[roomName][1] = lobbyTimeOut;
  roomData[roomName][2] = defaultQuestion;
  roomData[roomName][3] = roomTopic;
  roomData[roomName][4] = {
    Q: [],
    _metadata: [],
    A: [],
  };
}

function addQuestion(question = [], answer = parseInt[answer], choices = []) {
  roomData[roomName][4]["Q"].push(question);
  roomData[roomName][4]["_metadata"].push(question);
  roomData[roomName][4]["A"].push(answer);
}

function dropQuestion(index) {
  roomData[roomName][4]["Q"].splice(index, 1);
  roomData[roomName][4]["_metadata"].splice(index, 1);
  roomData[roomName][4]["A"].splice(index, 1);
}
