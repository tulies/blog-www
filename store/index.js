// import Vue from 'vue'
// import Vuex from 'vuex'
// import article from './modules/article'
// import user from './modules/user'

// Vue.use(Vuex)

// const store = () => new Vuex.Store({
//   modules: {
//     article,
//     user
//   },
//   actions: {
//     async nuxtServerInit ({ commit }, { req, app }) {
//       // // 查询当前位置
//       // const { status, data: { province, city } } = await app.$axios.get('/geo/getPosition')
//       // commit('geo/setPosition', status === 200 ? { city, province } : { city: '', province: '' })

//       const { status: status2, data: data2 } = await app.$axios.get(`/api/user/queryUserInfo`)
//       commit('user/setUserinfo', status2 === 200 && data2.code === 0 ? data2.data : {})
//     }
//   }
// })
// export default store

export const actions = {
  async nuxtServerInit ({ commit }, { req, app }) {
    // // 查询当前位置
    // const { status, data: { province, city } } = await app.$axios.get('/geo/getPosition')
    // commit('geo/setPosition', status === 200 ? { city, province } : { city: '', province: '' })
    const { status: status2, data: data2 } = await app.$axios.get('/api/user/queryUserInfo')
    commit('user/setUserinfo', status2 === 200 && data2.code === 0 ? data2.data : {})
  }
}
