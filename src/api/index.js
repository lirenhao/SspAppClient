import Vue from 'vue'
import 'es6-promise/auto'
import axios from 'axios'
import {
  base64, dateFormat
} from 'vux'
import store from '../vuex/store'
import router from '../router'
import urls from './urls'
import localforage from '../localforage'

axios.interceptors.request.use(
  config => {
    store.commit('UPDATE_LOADING', true)
    if (window.localStorage.token && config.url !== urls.token) config.headers.common['Authorization'] = 'bearer ' + window.localStorage.token
    return config
  },
  err => {
    console.log('request', err)
    store.commit('UPDATE_LOADING', false)
    return Promise.reject(err)
  })

axios.interceptors.response.use(
  response => {
    store.commit('UPDATE_LOADING', false)
    return response
  },
  err => {
    store.commit('UPDATE_LOADING', false)
    if (err.response) {
      switch (err.response.status) {
        case 401:
          router.push({
            name: 'login',
            params: {isClear: false}
          })
          break
        case 403:
          Vue.$vux.toast.show({
            type: 'warn',
            position: 'default',
            text: Vue.i18n.translate('Access is denied')
          })
          break
        default:
          console.log(err.response.status, err.response.data)
      }
    } else {
      Vue.$vux.toast.show({
        type: 'warn',
        position: 'default',
        text: Vue.i18n.translate('Network anomaly')
      })
    }
    return Promise.reject(err)
  })

const login = (userName, passWord) => {
  store.commit('UPDATE_LOADING', true)
  return axios.post(urls.token, {}, {
    headers: {
      authorization: 'Basic ' + base64.encode(userName + ':' + passWord)
    },
    params: {
      grant_type: 'client_credentials'
    }
  })
    .then(resp => {
      if (resp.status === 200) {
        window.localStorage.setItem('token', resp.data.access_token)
        window.localStorage.setItem('merNo', userName.split('@')[0])
        window.localStorage.setItem('isResetPwd', true)
        // TODO 如何保证登录成功
        return bindPush()
      } else {
        store.commit('UPDATE_LOADING', false)
        Vue.$vux.toast.show({
          type: 'warn',
          position: 'default',
          text: resp.status
        })
      }
    })
    .then(resp => {
      if (resp.status === 200 && resp.data) {
        if (passWord !== '111111') {
          window.localStorage.removeItem('isResetPwd')
        }
        return localforage(userName.split('@')[0])
            .setItem('userInfo', resp.data)
            .then(() => router.go(-1))
            .then(() => pushList(resp.data.merNo, resp.data.roles.indexOf('admin') > -1 ? '' : resp.data.termNo, dateFormat(new Date(), 'YYYYMMDD')))
            .then(resp => {
              if (resp.status === 200 && resp.data) {
                store.commit('UPDATE_PUSH_LIST', resp.data)
              }
            })
      } else {
        store.commit('UPDATE_LOADING', false)
        Vue.$vux.toast.show({
          type: 'warn',
          position: 'default',
          text: resp.status
        })
      }
    })
    .catch(err => {
      store.commit('UPDATE_LOADING', false)
      if (err.response && err.response.status === 401) {
        Vue.$vux.toast.show({
          type: 'warn',
          position: 'default',
          text: Vue.i18n.translate('Login validation failed')
        })
      } else {
        Vue.$vux.toast.show({
          type: 'warn',
          position: 'default',
          text: Vue.i18n.translate('Login exception')
        })
      }
    })
}

const userInfo = () => localforage(window.localStorage.merNo).getItem('userInfo')

const bindPush = () => {
  const params = new URLSearchParams()
  params.append('pushType', window.localStorage.pushType)
  params.append('deviceNo', window.localStorage.deviceNo)
  params.append('platform', window.localStorage.platform)
  return axios.post(urls.bindPush, params)
}

const unBindPush = () => axios.delete(urls.unBindPush)

const userUpdatePwd = (oldPwd, newPwd) => {
  store.commit('UPDATE_LOADING', true)
  const params = new URLSearchParams()
  params.append('oldPwd', oldPwd)
  params.append('newPwd', newPwd)
  return axios.put(urls.userUpdatePwd, params)
    .then(resp => {
      if (resp.status === 200) {
        return resp.data
      } else {
        store.commit('UPDATE_LOADING', false)
        Vue.$vux.toast.show({
          type: 'warn',
          position: 'default',
          text: Vue.i18n.translate('Password change failed')
        })
      }
    })
}

const subMer = () => {
  store.commit('UPDATE_LOADING', true)
  return axios.get(urls.subMer)
    .then(resp => {
      if (resp.status === 200) {
        return resp.data
      } else {
        store.commit('UPDATE_LOADING', false)
        Vue.$vux.toast.show({
          type: 'warn',
          position: 'default',
          text: Vue.i18n.translate('Sub merchant get failed')
        })
      }
    })
}

const pushList = (merNo, termNo, tranDate) => axios.get(termNo === '' ? `${urls.tranList}/${merNo}` : `${urls.termTranList}/${termNo}`, {params: {tranDate}})

const tranList = (merNo, tranDate) => {
  store.commit('UPDATE_LOADING', true)
  return axios.get(`${urls.tranList}/${merNo}`, {params: {tranDate}})
    .then(resp => {
      if (resp.status === 200) {
        return resp.data
      } else {
        store.commit('UPDATE_LOADING', false)
        Vue.$vux.toast.show({
          type: 'warn',
          position: 'default',
          text: Vue.i18n.translate('Transaction query failed')
        })
      }
    })
}

const termTranList = (termNo, tranDate) => {
  store.commit('UPDATE_LOADING', true)
  return axios.get(`${urls.termTranList}/${termNo}`, {params: {tranDate}})
    .then(resp => {
      if (resp.status === 200) {
        return resp.data
      } else {
        store.commit('UPDATE_LOADING', false)
        Vue.$vux.toast.show({
          type: 'warn',
          position: 'default',
          text: Vue.i18n.translate('Transaction query failed')
        })
      }
    })
}

const tranInfo = (merNo, traceNo) => {
  store.commit('UPDATE_LOADING', true)
  return axios.get(`${urls.tranList}/${merNo}/${traceNo}`)
    .then(resp => {
      if (resp.status === 200) {
        return resp.data
      } else {
        store.commit('UPDATE_LOADING', false)
        Vue.$vux.toast.show({
          type: 'warn',
          position: 'default',
          text: Vue.i18n.translate('Transaction query failed')
        })
      }
    })
}

const qrCodeCreate = (amt, channel) => {
  store.commit('UPDATE_LOADING', true)
  const params = new URLSearchParams()
  params.append('amt', amt)
  params.append('channel', channel)
  return axios.post(`${urls.qrCodeCreate}`, params)
    .then(resp => {
      if (resp.status === 200) {
        return resp.data
      } else {
        store.commit('UPDATE_LOADING', false)
        Vue.$vux.toast.show({
          type: 'warn',
          position: 'default',
          text: Vue.i18n.translate('QrCode create failed')
        })
      }
    })
}

const qrCodeQuery = (queryNo) => {
  return axios.get(`${urls.qrCodeQuery}/${queryNo}`)
    .then(resp => {
      if (resp.status === 200) {
        return resp.data
      }
    })
}

const setRefund = () => axios.get(urls.setRefund)
  .then(resp => resp.status === 200 ? Promise.resolve(resp.data) : Promise.reject(resp))

const openRefund = (pwd) => {
  const params = new URLSearchParams()
  params.append('pwd', pwd)
  return axios.post(urls.setRefund, params)
    .then(resp => resp.status === 200 ? Promise.resolve(resp.data) : Promise.reject(resp))
}

const closeRefund = () => axios.delete(urls.setRefund)
  .then(resp => resp.status === 200 ? Promise.resolve(resp.data) : Promise.reject(resp))

const refund = (amt, lsId, pwd) => {
  const params = new URLSearchParams()
  params.append('amt', amt)
  params.append('bankLsNo', lsId)
  params.append('pwd', pwd)
  return axios.post(urls.refund, params)
    .then(resp => resp.status === 200 ? Promise.resolve(resp.data) : Promise.reject(resp))
}

export default {
  login,
  userInfo,
  bindPush,
  unBindPush,
  userUpdatePwd,
  subMer,
  pushList,
  tranList,
  termTranList,
  tranInfo,
  qrCodeCreate,
  qrCodeQuery,
  setRefund,
  openRefund,
  closeRefund,
  refund
}
