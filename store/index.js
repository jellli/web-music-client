export const state = () => ({
  isLogin: false
});

export const mutations = {
  toggleLoginState(state) {
    state.isLogin = !state.isLogin;
  }
};
