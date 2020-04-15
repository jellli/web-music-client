import Vue from "vue";

Vue.prototype.$play = () => {
  const player = document.getElementById("player");
  player.play();
};
Vue.prototype.$pause = () => {
  const player = document.getElementById("player");
  player.pause();
};
