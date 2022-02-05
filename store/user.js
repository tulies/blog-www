const state = () => ({
  userinfo: {},
  showLogin: false,
})
const mutations = {
  setUserinfo(state, userinfo) {
    state.userinfo = userinfo
  },
  setShowLogin(state, showLogin) {
    state.showLogin = showLogin
  },
}
const actions = {
  setUserinfo: ({ commit }, userinfo) => {
    commit('setUserinfo', userinfo)
  },
  setShowLogin: ({ commit }, showLogin) => {
    commit('setShowLogin', showLogin)
  },
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
