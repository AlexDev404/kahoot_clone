const roomData = JSON.parse(localStorage.getItem("rData"));
const room = localStorage.getItem("room");

setTimeout(() => {
  putQuestions();
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
        document.getElementById(`qid__${room}`).insertAdjacentHTML(
        "beforeend",
        qid_template.innerHTML
      );
      console.log(question, room, index)
      sID("QUESTION_INDEX", index).innerText = roomData[room][4]["Q"][question][0];
    });
//   });
}
