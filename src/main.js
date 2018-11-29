import Vue from 'vue'
import {AjaxPlugin, ToastPlugin, AlertPlugin, ViewBox} from 'vux'
import FastClick from 'fastclick'
import store from './vuex/store'
import router from './router'
import push from './push'
import App from './App'
import 'url-search-params-polyfill'

Vue.use(AjaxPlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.component('view-box', ViewBox)

FastClick.attach(document.body)

Vue.config.productionTip = false

router.beforeEach(function (to, from, next) {
  store.commit('UPDATE_LOADING', true)
  next()
})

router.afterEach(function () {
  store.commit('UPDATE_LOADING', false)
})

push.initialize()
Vue.i18n.set('en')

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')
