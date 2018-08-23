import Vue from 'vue'

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
    // {"available":true,"platform":"Android","version":"7.0","uuid":"7605eaf2ebd482c7","cordova":"7.0.0","model":"Meizu S6","manufacturer":"Meizu","isVirtual":false,"serial":"712QKDS228JP2"}
    console.log('device', device)
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
      // data.registrationId
      console.log('registration', data)
      Vue.$vux.alert.show({
        title: 'registration',
        content: data.registrationId
      })
    })

    push.on('notification', (data) => {
      // data.message,
      // data.title,
      // data.count,
      // data.sound,
      // data.image,
      // data.additionalData
      console.log('notification', data)
      Vue.$vux.alert.show({
        title: 'notification',
        content: JSON.stringify(data)
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
