const cors = require("cors");
const express = require("express");
const app = express();
const WebSocketServer = require("ws").Server;
const path = require("path");
const port = process.env.PORT || 8011;

// Player Data

// PlayerList in each room
let playerList = {
  123456: [
    ["df5dc33af121", "Joe538"],
    ["af5dc33af122", "Joe537"],
  ],
  111111: [["df5dc33af121", "Joe538"]],
  999999: [],
};
class kPlayer {
  constructor(clientID, username, room) {
    this.room = room;
    this.identity = [clientID, username];
  }
}
let playerData = { df5dc33af121: { points: 999999 } };

// Room Data

let roomList = ["123456", "111111", "999999"];

// Room Data
let roomData = {
  // ROOM: [PROGRESSION, COUNTDOWN, CURRENT_QUESTION_INDEX, TOPIC, {Q:[QUESTIONS, ...], _metadata: [[POSSIBLECHOICES, ...]], A:[ANSWERS, ...]}]
  999999: [
    "init",
    10,
    0,
    "Cats",
    {
      Q: ["Some kind of cat question"],
      _metadata: [["True", "False"]],
      A: [0],
    },
  ],
  123456: [
    "inProgress",
    0,
    3,
    "animals",
    {
      // Questions and their timeout
      Q: [
        ["Dogs cannot smell", 10],
        ["Dogs are fat", 5],
        ["Doge is the best", 30],
      ],
      // Possible answers to questions above
      _metadata: [
        ["True", "False"],
        ["True", "False"],
        ["True", "False"],
      ],
      // Answers as indexed in _metadata
      A: [0, 0, 1],
    },
  ],
  111111: [
    "init",
    10,
    0,
    "animals",
    {
      // Questions and their timeout
      Q: [
        ["This is a question", 10],
        ["Dogs are fat", 5],
        ["Doge is the best", 30],
      ],
      // Possible answers to questions above
      _metadata: [
        ["True", "False"],
        ["True", "False"],
        ["True", "False"],
      ],
      // Answers as indexed in _metadata
      A: [0, 0, 1],
    },
  ],
};
// Limit the amount of people that can join these rooms
const roomLimit = 10;

app.use(cors());

// GET private IP (for development purposes)
require("dns").lookup(require("os").hostname(), function (err, add, fam) {
  console.log(add + ":" + port);
});

const server = app.listen(port, () => {
  if (process.send) {
    process.send(`Server running on port ${port}\n\n`);
  }
});

app.use("/ui", express.static(path.join(__dirname, "ui/")));

app.get("/reserve/session/:room/:UID", (req, res) => {
  let room = req.params.room;
  let UID = req.params.UID;
  if (roomList.includes(room)) {
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

// Kahoot server

// We then create a new variable which will store the actual server I'll be running
const ws = new WebSocketServer({
  // Then we set the parameter of httpServer to the server variable that we said that would be listening on the port specified
  //httpServer: server -- enable if using HTTP server
  noServer: true,
});

server.on("upgrade", (request, socket, head) => {
  ws.handleUpgrade(request, socket, head, (websocket) => {
    ws.emit("connection", websocket, request);
  });
});

ws.on("connection", (websocketConnection) => {
  console.log("[CONNECTION] Client is Attempting To Connect!");
  //   websocketConnection.send();
  websocketConnection.on("message", (message) => {
    let data;
    // Check is isJSON
    try {
      data = JSON.parse(message);
      console.log(data);
    } catch (error) {
      console.warn("[SUBSYSTEM] Format Unsupported");
      return;
    }

    // Check if this is an initialization message

    if ("identity" in data) {
      let userExists = false;
      // Check if this player already exists in the database
      // If so, we send him the current question
      // IDENTITY: [CID, USERNAME, ROOM]
      playerList[parseInt(data.identity[2])].forEach((player, index) => {
        // console.log(index);
        // console.log(player[0]);

        try {
          if (player[0].includes(data.identity[0])) {
            console.log(
              "[FLOW] User " +
                data.identity[1] +
                ` (${data.identity[0]})` +
                " has rejoined the game (ROOM ID: " +
                data.identity[2] +
                ")"
            );
            userExists = true;
            // Send current question along with possible choices through WebSocket to the client
            websocketConnection.send(
              JSON.stringify([
                roomData[parseInt(data.identity[2])][4]["Q"][
                  roomData[parseInt(data.identity[2])][2]
                ],
                roomData[parseInt(data.identity[2])][4]["_metadata"][
                  roomData[parseInt(data.identity[2])][2]
                ],
                roomData[parseInt(data.identity[2])][2],
                roomData[parseInt(data.identity[2])][4]["Q"].length,
              ])
            );
            return;
          }
        } catch (error) {
          console.log("[CONNECTION] MALFORMED REQUEST!!!");
          console.log(data);
          console.log("PL==========");
          console.log(playerList);
          console.log("PD==========");
          console.log(playerData);
          websocketConnection.close();
        }
      });

      // If the user doesn't exist append him to the roster
      if (!userExists) {
        appendUser();
      }
      function appendUser() {
        // If the room is inProgress don't let them in
        // ROOM: [PROGRESSION, COUNTDOWN, CURRENT_QUESTION_INDEX, TOPIC, {Q:[QUESTIONS, ...], A:[ANSWERS, ...]}]

        if (roomData[parseInt(data.identity[2])][0] == "inProgress") {
          websocketConnection.send(JSON.stringify(["IN_PROGRESS"]));
          websocketConnection.close();
          return;
        }
        // If the room is full we don't let them in
        if (playerList[parseInt(data.identity[2])].length > roomLimit) {
          websocketConnection.send(JSON.stringify(["FULL"]));
          websocketConnection.close();
          return;
        }
        // Otherwise we add them to the player list
        else {
          // Create a new player
          const player = new kPlayer(
            data.identity[0], // Client
            data.identity[1], // Username
            data.identity[2] // Room
          );
          // If the room is empty we start counting down
          // as soon as one person joins
          if (playerList[parseInt(player.room)].length == 0) {
            setInterval(() => {
              if (parseInt(roomData[parseInt(player.room)][1]) != 0) {
                roomData[player.room][1] =
                  parseInt(roomData[parseInt(player.room)][1]) - 1;
              }
            }, 1000);
          }
          // Assign the player his room
          playerList[parseInt(player.room)].push(player.identity);
          // console.log("PL==========");
          // console.log(playerList);
          // Create some new data
          playerData[player.identity[0]] = { points: 0 };
          // console.log("PD==========");
          // console.log(playerData);
          // Add one to the countdown
          roomData[parseInt(player.room)][1] =
            parseInt(roomData[parseInt(player.room)][1]) + 1;

          // Broadcast this to all users
          ws.broadcast(JSON.stringify([roomData[parseInt(player.room)][1]]));
        }
      }
    }
  });
});

ws.on("close", () => {
  console.log("[CONNECTION] Client has disconnected.");
});

ws.broadcast = (data) => {
  ws.clients.forEach((client) => client.send(data));
};

// Send a heartbeat to the client every 20s
// We do this to prevent the socket from commiting suicide.

// setInterval(() => {
//   ws.broadcast(JSON.stringify(chatlog));
// }, 20000);
