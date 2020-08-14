export const state = () => ({
  isLogin: false,
  isPlaying: false,
  currentId: "",
  userName: null,
  pic: null,
  user: null,
  playlist: []
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
  setUser(state, user) {
    state.user = user;
  },
  setUserName(state, username) {
    state.userName = username;
  },
  setUserPic(state, pic) {
    state.pic = pic;
  },
  reset(state) {
    state.isLogin = false;
    state.userName = null;
    state.pic = null;
    state.user = null;
  },
  addToPlaylist(state, id) {
    state.playlist.push(id);
  },
  removeFromPlaylist(state, id) {
    let index = state.playlist.indexOf(id);
    state.playlist.splice(index, 1);
  },
  setPlaylist(state, playlist) {
    state.playlist = playlist;
  }
};
