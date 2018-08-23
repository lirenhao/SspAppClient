import Vue from 'vue'
import store from './vuex/store'
import localforage from './localforage'

export default {
  // Application Constructor
  initialize: function () {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
  },

  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady: function () {
    this.receivedEvent('deviceready')
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
      window.localStorage.setItem('device', { ...device,
        id: data.registrationId,
        type: data.registrationType
      })
    })

    push.on('notification', (data) => {
      // data.message,
      // data.title,
      // data.count,
      // data.sound,
      // data.image,
      // data.additionalData
      localforage(window.localStorage.merNo).getItem('trans')
        .then(ld => {
          const trans = ld || []
          trans.filter(tran => tran.tranDate === data.additionalData.tranDate)
          return localforage(window.localStorage.id)
            .setItem('trans', [...trans, data.additionalData])
            .then(() => [...trans, data.additionalData])
        })
        .then(trans => {
          store.commit('UPDATE_PUSH_LIST', trans)
          window.localStorage.device.type === 'APNS' || push.finish()
        })
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
