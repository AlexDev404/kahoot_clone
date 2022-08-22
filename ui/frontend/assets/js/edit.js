const roomData = JSON.parse(localStorage.getItem("rData"));
const room = localStorage.getItem("room");

setTimeout(() => {
  putQuestions();
  loadquestion(0);
  roomTopic.value = roomData[room][3];
  roomCode.value = "#" + room;
}, 550);

function putQuestions() {
  editor.innerHTML = "";

  //   Object.keys(roomData).forEach((room, index) => {
  // If the player's room is in the room we want

  editor.insertAdjacentHTML("beforeend", questionBundle.innerHTML);
  // sID("room", Object.entries(roomData)[index][0]);
  // sID("roomId", `r__${index}`).innerHTML =
  // "#" + Object.entries(roomData)[index][0];
  sID("ROOM_ID", room).innerHTML = roomData[room][3];
  sID("ACCORDION", `accordion__${room}`);
  sID("qID", `qid__${room}`);

  Object.keys(roomData[room][4]["Q"]).forEach((question, index) => {
    document
      .getElementById(`qid__${room}`)
      .insertAdjacentHTML("beforeend", qid_template.innerHTML);
    console.log(question, room, index);
    sID("QUESTION_INDEX", index).innerText =
      roomData[room][4]["Q"][question][0];
  });
  //   });
}

function loadquestion(id) {
  cC.innerHTML = "";
  roomTitle.value = roomData[room][4]["Q"][id][0];
  roomTimeout.value = roomData[room][4]["Q"][id][1];
  Object.entries(roomData[room][4]["_metadata"][id]).forEach((answer) => {
    cC.insertAdjacentHTML("beforeend", choiceTemplate.innerHTML);
    console.log(answer[1]);
    console.log(answer[0], roomData[room][4]["A"][id]);
    if (answer[0] == parseInt(roomData[room][4]["A"][id])) {
      sID("choiceTick", `ct__${answer[0]}`).value = "✅";
    } else {
      sID("choiceTick", `ct__${answer[0]}`);
    }
    sID("choiceContent", `ctx__${answer[0]}`).value = answer[1];
    // sID("choiceContent", `accordion__${room}`);

    //   sID("QUESTION_INDEX", index).innerText = roomData[room][4]["Q"][question][0];
  });
}
