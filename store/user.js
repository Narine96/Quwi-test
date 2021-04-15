    // namespaced: true,
    export const state = {
      user: null,
      project:[],
      token: '',
      editingProject:null
    }
    export const getters = {
      getUser(state) {
        return state.user
      },
      getToken(state) {
        return state.token
      },
      getEditingProject(state) {
        return state.editingProject
      }
    }
    export const mutations = {
      SET_USER(state, payload) {
        state.user = payload
        console.log(state)
      },
      SET_TOKEN(state, token) {
        console.log(token)
        state.token = token
        console.log(state)
      },
      SET_PROJECT(state, payload) {
        state.project = payload
        console.log(state)
      },
      SET_EDITINGPROJECT(state, payload) {
        state.editingProject = payload
        console.log(state)
      },
    }
    export const actions = {
      setUser({ commit }, payload) {
        commit('SET_USER', payload)
      },
      setToken({ commit }, payload) {
        commit('SET_TOKEN', payload)
      },
      setProject({ commit }, payload) {
        commit('SET_PROJECT', payload)
      },
      setEditingProject({ commit }, payload) {
        commit('SET_EDITINGPROJECT', payload)
      },
    }
 