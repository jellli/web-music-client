export const state = () => ({
  isLogin: false,
  isPlaying: false,
  currentId: "",
  userName: null,
  pic: null
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
  },
  setUserName(state, username) {
    state.userName = username;
  },
  setUserPic(state, pic) {
    state.pic = pic;
  }
};
