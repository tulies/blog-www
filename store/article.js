const state = () => ({
  hotrec: [],
  plrec: [],
  newrec: [],
})
const mutations = {
  setHotrec(state, val) {
    state.hotrec = val
  },
  setPlrec(state, val) {
    state.plrec = val
  },
  setNewrec(state, val) {
    state.newrec = val
  },
}
const actions = {
  setHotrec: ({ commit }, hotrec) => {
    commit('setHotrec', hotrec)
  },
  setPlrec: ({ commit }, plrec) => {
    commit('setPlrec', plrec)
  },
  setNewrec: ({ commit }, newrec) => {
    commit('setNewrec', newrec)
  },
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
