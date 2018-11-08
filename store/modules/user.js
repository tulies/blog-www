const state = () => ({
  userinfo: {}
})
const mutations = {
  setUserinfo (state, userinfo) {
    state.userinfo = userinfo
  }
}
const actions = {
  setUserinfo: ({ commit }, userinfo) => {
    commit('setUserinfo', userinfo)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
