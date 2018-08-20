import Vue from 'vue'
import Vuex from 'vuex'
import {dateFormat} from 'vux'

Vue.use(Vuex)

const state = {
  isLoading: true,
  tranQuery: {
    merNo: window.localStorage.merNo,
    tranDate: dateFormat(new Date(), 'YYYY-MM-DD')
  },
  tranList: []
}

export default new Vuex.Store({
  state,
  mutations: {
    UPDATE_LOADING (state, status) {
      state.isLoading = status
    },
    UPDATE_TRAN_QUERY (state, status) {
      state.tranQuery = {...state.tranQuery, ...status}
    },
    UPDATE_TRAN_LIST (state, status) {
      state.tranList = [...status]
    }
  }
})
