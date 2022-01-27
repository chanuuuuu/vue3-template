export default {
  namespaced: true,
  state: () => ({
    isShow: false
  }),
  getters: {
  },
  mutations: {
    setState(state, options) {
      Object.keys(options).forEach((key)=> {
        state[key] = options[key]
      })
    }
  },
  // 해당 actions에서는 데이터를 수정하는 작업이 불가능하다. 이러한 작업은 mutation에서만 가능하다. 
  // 즉, actions에서는 event listen만 한다.
  actions: {
    // state, getters, dispatch와 같은 내부의 값들 또한 조회하여 사용할 수 있다.
    onNav({ commit }) {
      commit('setState', {
        isShow: true
      })
    },
    offNav({ commit }){
      commit('setState', {
        isShow: false
      })
    }
  }
}
