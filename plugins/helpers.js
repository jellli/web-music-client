import Vue from "vue";

Vue.prototype.$play = () => {
  const player = document.getElementById("player");
  player.play();
};
Vue.prototype.$pause = () => {
  const player = document.getElementById("player");
  player.pause();
};
Vue.prototype.$formatTime = time => {
  let minute = Math.floor(time / 60);
  let second = Math.floor(time % 60);
  if (minute < 10) {
    minute = `0${minute}`;
  }
  if (second < 10) {
    second = `0${second}`;
  }
  return `${minute}:${second}`;
};
