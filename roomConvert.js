const path = require("path");
const fs = require("fs");
const jsonc = require("jsonc").jsonc;
const getDirName = require("path").dirname;

function writeFile(path, contents, cb) {
  fs.mkdir(getDirName(path), { recursive: true }, function (err) {
    if (err) return cb(err);

    fs.writeFileSync(path, contents, "utf8");
    console.log("Saved to: " + path)
  });
}

writeFile(
  path.join(__dirname, "system/rooms/web/out.json"),
  JSON.stringify(
    jsonc.parse(
      fs.readFileSync(
        path.join(__dirname, "/system/rooms/rooms.data.global.jsonc"),
        "utf8"
      )
    ),
    null,
    3
  )
);
