export const state = () => ({
  isLogin: false,
  isPlaying: false,
  currentId: "",
  userName: null,
  pic: null,
  user: {
    collected_music_list: [],
    created_musiclist: [],
    follower: [],
    following: [],
    liked_music: []
  },
  playlist: [],
  currentTime: 0
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
    localStorage.setItem("id", id);
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
    localStorage.setItem("playlist", state.playlist);
  },
  removeFromPlaylist(state, id) {
    let index = state.playlist.indexOf(id);
    state.playlist.splice(index, 1);
    localStorage.setItem("playlist", state.playlist);
  },
  setPlaylist(state, playlist) {
    state.playlist = playlist;
    localStorage.setItem("playlist", state.playlist);
  },
  setCurrentTime(state, currentTime) {
    state.currentTime = currentTime;
  }
};
