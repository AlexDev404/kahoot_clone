function random_rgba() {
  var o = Math.round,
    r = Math.random,
    s = 255;
  return (
    "rgba(" +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    r().toFixed(1) +
    ")"
  );
}

function importD() {
  let input = document.createElement("input");
  input.type = "file";
  input.onchange = (_this) => {
    let files = Array.from(input.files);
    console.log(files);
  };
  input.click();
}
