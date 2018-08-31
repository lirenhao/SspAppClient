import Vue from 'vue'
import Vuex from 'vuex'
import {dateFormat} from 'vux'
import vuexI18n from 'vuex-i18n'
import vuxLocales from '../locales/all.yml'
import componentsLocales from '../locales/components.yml'

Vue.use(Vuex)

const state = {
  isLoading: true,
  tranQuery: {
    merNo: window.localStorage.merNo,
    tranDate: dateFormat(new Date(), 'YYYY-MM-DD')
  },
  tranList: [],
  pushList: [
    {
      merNo: window.localStorage.merNo,
      tranDate: '08-31 15:23',
      tranType: '扫码支付',
      channel: '刷卡交易',
      tranAmt: '$ 12.80',
      tranCry: '$',
      tranNo: '08-31 15:23',
      rrn: '00000001'
    },
    {
      merNo: window.localStorage.merNo,
      tranDate: '08-31 10:12',
      tranType: '扫码支付',
      channel: '刷卡交易',
      tranAmt: '$ 89.60',
      tranCry: '$',
      tranNo: '08-31 15:23',
      rrn: '00000002'
    },
    {
      merNo: window.localStorage.merNo,
      tranDate: '08-30 14:56',
      tranType: '扫码支付',
      channel: '刷卡交易',
      tranAmt: '$ 99.99',
      tranCry: '$',
      tranNo: '08-31 15:23',
      rrn: '00000003'
    },
    {
      merNo: window.localStorage.merNo,
      tranDate: '08-30 15:23',
      tranType: '扫码支付',
      channel: '刷卡交易',
      tranAmt: '$ 92.80',
      tranCry: '$',
      tranNo: '08-31 15:23',
      rrn: '00000004'
    }
  ]
}

const store = new Vuex.Store({
  modules: {
    i18n: vuexI18n.store
  },
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
    },
    UPDATE_PUSH_LIST (state, status) {
      state.pushList = status
    }
  }
})

Vue.use(vuexI18n.plugin, store)

const finalLocales = {
  'en': {...vuxLocales['en'], ...componentsLocales['en']},
  'zh-CN': {...vuxLocales['zh-CN'], ...componentsLocales['zh-CN']}
}

for (let i in finalLocales) {
  Vue.i18n.add(i, finalLocales[i])
}

export default store
