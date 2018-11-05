import Vue from 'vue'
import Vuex from 'vuex'
import article from './modules/article'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules: {
    article
  },
  actions: {
    async nuxtServerInit ({ commit }, { req, app }) {
      // // 查询当前位置
      // const { status, data: { province, city } } = await app.$axios.get('/geo/getPosition')
      // commit('geo/setPosition', status === 200 ? { city, province } : { city: '', province: '' })
    }
  }
})
export default store
