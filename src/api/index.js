import Vue from 'vue'
import 'es6-promise/auto'
import axios from 'axios'
import {
  base64
} from 'vux'
import store from '../vuex/store'
import router from '../router'
import urls from './urls'

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
    .then((resp) => {
      if (resp.status === 200) {
        window.localStorage.setItem('token', resp.data.access_token)
        window.localStorage.setItem('merNo', userName.split('@')[0])
        router.go(-1)
        // TODO 登录后绑定设备
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

const userInfo = () => {
  store.commit('UPDATE_LOADING', true)
  return axios.get(urls.userInfo)
    .then(resp => {
      if (resp.status === 200) {
        return resp.data
      } else {
        store.commit('UPDATE_LOADING', false)
        Vue.$vux.toast.show({
          type: 'warn',
          position: 'default',
          text: resp.status
        })
      }
    })
}

const bindPush = (pushType, deviceNo, platform) => {
  const params = new URLSearchParams()
  params.append('pushType', pushType)
  params.append('deviceNo', deviceNo)
  params.append('platform', platform)
  return axios.post(urls.bindPush, params)
}

const unBindPush = () => {
  return axios.delete(urls.unBindPush)
}

const userUpdatePwd = (oldPwd, newPwd) => {
  store.commit('UPDATE_LOADING', true)
  // TODO 密码加密
  return axios.put(urls.userUpdatePwd, {oldPwd, newPwd})
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

const qrCodeCreate = (amt) => {
  store.commit('UPDATE_LOADING', true)
  const params = new URLSearchParams()
  params.append('amt', amt)
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

export default {
  login,
  userInfo,
  bindPush,
  unBindPush,
  userUpdatePwd,
  subMer,
  tranList,
  qrCodeCreate,
  qrCodeQuery
}
