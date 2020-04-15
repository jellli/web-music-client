export const state = () => ({
  isLogin: false,
  isPlaying: false,
  currentId: ""
});

export const mutations = {
  toggleLoginState(state) {
    state.isLogin = !state.isLogin;
  },
  togglePlayingState(state) {
    state.isPlaying = !state.isPlaying;
  },
  setCurrentId(state, id) {
    state.currentId = id;
  }
};
