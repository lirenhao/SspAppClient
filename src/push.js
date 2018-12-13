import Vue from 'vue'
import {
  dateFormat
} from 'vux'
import store from './vuex/store'
import api from './api'

export default {
  // Application Constructor
  initialize: function () {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
    document.addEventListener('resume', this.onResume.bind(this), false)
  },

  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady: function () {
    this.receivedEvent('deviceready')
    this.onResume()
  },

  onResume: function () {
    // 查询当天终端的交易
    const tranDate = dateFormat(new Date(), 'YYYYMMDD')
    console.log('Resume: Event' + tranDate)
    if (window.localStorage.token) {
      api.userInfo()
        .then(data => api.pushList(data.merNo, data.roles.indexOf('admin') > -1 ? '' : data.termNo, tranDate)
        .then(resp => {
          if (resp.status === 200 && resp.data) {
            store.commit('UPDATE_PUSH_LIST', resp.data)
          } else {
            window.localStorage.removeItem('token')
          }
        })
        .catch(e => {
          console.log('Resume init', e)
          if (e.response && e.response.status === 401) {
            window.localStorage.removeItem('token')
          } else {
            Vue.$vux.alert.show({
              content: Vue.i18n.translate('Please check the network status')
            })
          }
        })
    }
  },

  // Update DOM on a Received Event
  receivedEvent: function (id) {
    console.log('Received Event: ' + id)
    const push = PushNotification.init({
      android: {},
      ios: {
        alert: true,
        badge: true,
        sound: true,
        clearBadge: true
      }
    })

    push.on('registration', (data) => {
      // {"available":true,"platform":"Android","version":"7.0","uuid":"7605eaf2ebd482c7","cordova":"7.0.0","model":"Meizu S6","manufacturer":"Meizu","isVirtual":false,"serial":"712QKDS228JP2"}
      window.localStorage.setItem('deviceNo', data.registrationId)
      window.localStorage.setItem('pushType', data.registrationType)
      window.localStorage.setItem('platform', device.platform)
      // api.bindPush().then(resp => {
      //   if (resp.status === 200 && resp.data) {
      //     localforage(resp.data.merNo).setItem('userInfo', resp.data)
      //   } else {
      //     window.localStorage.removeItem('token')
      //   }
      // }).catch(e => {
      //   console.log('Push init', e)
      //   if (e.response && e.response.status === 401) {
      //     window.localStorage.removeItem('token')
      //   } else {
      //     Vue.$vux.alert.show({
      //       content: Vue.i18n.translate('Please check the network status')
      //     })
      //   }
      // })
    })

    push.on('notification', (data) => {
      // data.message,
      // data.title,
      // data.count,
      // data.sound,
      // data.image,
      // data.additionalData
      console.log('push', data)
      const push = window.localStorage.pushType === 'APNS' ? data.additionalData.data : data.additionalData
      store.commit('ADD_PUSH_LIST', push)
      if (window.localStorage.pushType === 'APNS') {
        push.finish()
      }
    })

    push.on('error', (e) => {
      // e.message
      console.log('error', e)
      Vue.$vux.alert.show({
        title: 'error',
        content: e.message
      })
    })
  }
}
