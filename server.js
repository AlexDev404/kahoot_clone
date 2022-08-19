const cors = require("cors");
const express = require("express");
const app = express();
const WebSocketServer = require("ws").Server;
const path = require("path");
const port = process.env.PORT || 8011;

// Players

// Player Data
let playerData = require("./system/players/players.data.global.json");
// PlayerList in each room
let playerList = require("./system/players/players.list.global.json");

class kPlayer {
  constructor(clientID, username, room) {
    this.room = room;
    this.identity = [clientID, username];
  }
}

// Rooms

// Room List
let roomList = require("./system/rooms/rooms.list.global.json");
// Room Data
let roomData = require("./system/rooms/rooms.data.global.js").default;
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
      try {
        playerList[parseInt(data.identity[2])].forEach((player) => {
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
                  roomData[parseInt(data.identity[2])][4]["Q"].length - 1,
                ])
              );
              return;
            }
          } catch (error) {
            console.log("[CONNECTION] MALFORMED REQUEST!!!");
            console.log(data, error);
            console.log("PL==========");
            console.log(playerList);
            console.log("PD==========");
            console.log(playerData);
            websocketConnection.close();
          }
        });
      } catch (error) {
        console.log("[CONNECTION] MALFORMED REQUEST!!!");
        console.log(data, error);
        console.log("PL==========");
        console.log(playerList);
        console.log("PD==========");
        console.log(playerData);
        websocketConnection.close();
      }

      // If the user doesn't exist append him to the roster
      if (!userExists) {
        appendUser();
      }
      function appendUser() {
        // If the room is inProgress don't let them in
        // ROOM: [PROGRESSION, COUNTDOWN, CURRENT_QUESTION_INDEX, TOPIC, {Q:[QUESTIONS, ...], A:[ANSWERS, ...]}]

        try {
          // console.log(roomData);
          // console.log(data.identity[2]);
          if (roomData[parseInt(data.identity[2])][0] == "end") {
            websocketConnection.send(JSON.stringify(["NOT_FOUND"]));
            // websocketConnection.close();
            return;
          }

          if (roomData[parseInt(data.identity[2])][0] == "inProgress") {
            websocketConnection.send(JSON.stringify(["IN_PROGRESS"]));
            // websocketConnection.close();
            return;
          }
        } catch (error) {
          websocketConnection.close();
        }

        // If the room is full we don't let them in
        if (playerList[parseInt(data.identity[2])].length > roomLimit) {
          websocketConnection.send(JSON.stringify(["FULL"]));
          // websocketConnection.close();
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
              } else {
                // Constantly sets to inProgress if there are players in the room
                if (playerList[parseInt(player.room)].length != 0) {
                  roomData[parseInt(data.identity[2])][0] = "inProgress";
                }
              }
            }, 1000);
          }

          // If the countdown is finished we switch the room status to "inProgress"

          // Assign the player his room
          playerList[parseInt(player.room)].push(player.identity);
          // console.log("PL==========");
          // console.log(playerList);
          // Create some new data
          playerData[player.identity[0]] = { points: 0 };
          // console.log("PD==========");
          // console.log(playerData);
          // Add 5s to the countdown
          roomData[parseInt(player.room)][1] =
            parseInt(roomData[parseInt(player.room)][1]) + 5;

          // Broadcast this to all users
          ws.broadcast(JSON.stringify([roomData[parseInt(player.room)][1]]));
        }
      }
    }

    // Check if this is a remove request
    if ("remove" in data) {
      // Search till we find user
      try {
        killPlayer(data.remove[0], data.remove[1]);
        return;
      } catch (error) {
        console.log("[CONNECTION] MALFORMED REQUEST!!!");
        console.log(data, error);
        console.log("PL==========");
        console.log(playerList);
        console.log("PD==========");
        console.log(playerData);
        websocketConnection.close();
      }
    }

    // WE ASSUME THIS IS AN ANSWER MESSAGE!
    else {
      /*
       * We use try and catch for this. If it's an invalid message
       * Then we just kick the user out of the room because we don't care
       * If the user is the president of the united states or not, we just
       * Don't want the server to crash since we have more clients that
       * Need the service. To start off,
       * 1. We look at the room ID
       * 2. And then we parse the message and verify the user is in the player list
       * by checking the client ID against the database
       * 3. We then delay the sending of the answer if there is more than one person
       * in the room. We wait for everybody to post their answers or wait for the
       * question's countdown to expire
       * 4. Afterward, we verify if the answer is correct
       * 5. If the answer is correct then we send true if the answer is correct or
       * False if it's incorrect along with an initialization message with the
       * next question constructed as so:
       *
       * Answer Schema:
       *
       * [True, [["This is the next question", 5], ["Answer One", "Answer 2"], Question_Now, Total_Questions]]
       */
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

/**
 * @brief Kills the player and cleanly removes him from the database
 * @param {String} client_ The clientID
 * @param {String} room The room for him to be removed from
 */
function killPlayer(client_, room) {
  playerList[parseInt(room)].forEach((player, index) => {
    // console.log(index);
    // console.log(player[0]);

    if (player[0].includes(client_)) {
      console.log(`[FLOW] ${client_} has left the game (ROOM ID: ${room})`);
      // Remove the user from the player list
      playerList[parseInt(room)].splice(index, 1);
      // Remove the user from the player data
      delete playerData[client_];

      // console.log(playerList);
      // console.log(playerData);
      // Check if the room is empty; if so we mark it as open
      if (playerList[parseInt(room)].length == 0) {
        roomData[parseInt(room)][0] = "init";
      }
      // Check if the room is empty; if so mark the game as ended after 15 seconds
      // If nobody joins
      setTimeout(() => {
        if (playerList[parseInt(room)].length == 0) {
          roomData[parseInt(room)][0] = "end";
          // console.log(roomData);
          console.log(`Room ${room} was marked as dead`);
        }
      }, 15000);

      return;
    }
  });
}
