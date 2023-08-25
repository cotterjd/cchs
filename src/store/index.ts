import { createStore } from 'vuex'

const packageJson = require(`../../package.json`)
export default createStore({
  state: {
    version: packageJson.version,
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
})
