const result = localStorage.getItem("answer");
const myAnswer = localStorage.getItem("myAnswer");
let paused = false;
let time = 3;
if (myAnswer == result) {
  console.log(true);
  spinner.classList.remove("spinner_");
  remark_icon.innerHTML = correct.innerHTML;
  remark_title.innerText = "Correct";
  remark.innerText = "Way to go!";
} else {
  console.log(false);
  spinner.classList.remove("spinner_");
  remark_icon.innerHTML = incorrect.innerHTML;
  remark_title.innerText = "Incorrect";
  remark.innerText = "We believe in you!";
}

// setInterval(() => {
//   if (time != -1 && !paused) {
//     redirect_status.innerText = `You'll be redirected in ${time} seconds`;
//     time--;
//   }
//   if (time == -1) {
//     history.back();
//   }
// }, 1000);
