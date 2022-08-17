const express = require("express");
const app = express();
const WebSocketServer = require("ws").Server;
const path = require("path");
const port = process.env.PORT || 8010;
let playerList = [];
let roomList = ["123456"];

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
  if(roomList.includes(room)){
    res.sendStatus(200);
  }
  else{
    res.sendStatus(400)
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
    } catch (error) {
      console.warn("[SUBSYSTEM] Format Unsupported");
      return;
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
