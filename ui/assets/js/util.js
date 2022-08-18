/**
 * Util.js - Utility functions and functions that remain constant throughout
 * the application's lifetime
 */

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

function uuid() {
  return ([1e7] + 1e3).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

// Start boarding the server after document has loaded

function init() {
  if ("WebSocket" in window) {
    // Let us open a web socket
    ws = new WebSocket(address);

    ws.onopen = function () {
      // Web Socket is connected, send data using send()
      wsOpen = true;
      boarding(client, room);

      // Add the announcement
      try {
        if (blocker.classList.contains("hidden")) {
          blocker.classList.toggle("hidden");
        }
      } catch (error) {
        // Do nothing
      }
      console.log("[READY] Websocket connected successfully.");
    };
  }
}

/**
 *
 * @param {uuid} client The unique client UUID used to represent them in the server
 * @param {Number} room The room ID used to connect to the quiz
 * @brief Board the server and return an object
 */

function boarding(client, room) {
  console.log("BOARD");
  if (wsOpen) {
    // Sign in
    try {
     
        ws.send(JSON.stringify({ identity: [client, username.value, room] }));
 
    } catch (error) {
      // We are in a game
      ws.send(JSON.stringify({ identity: [client, username, room] }));
    }
  }
  listen();
}
