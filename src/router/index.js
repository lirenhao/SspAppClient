import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/login'
import ResetPwd from '../views/resetPwd'
import Home from '../views/home'
import UserInfo from '../views/userInfo'
import UpdatePwd from '../views/updatePwd'
import TranSearch from '../views/tranSearch'
import TranList from '../views/tranList'
import TranInfo from '../views/tranInfo'
import SetAmt from '../views/setAmt'
import CreateCode from '../views/createCode'
import PayResult from '../views/payResult'
import PushList from '../views/pushList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      props: true,
      meta: {
        isShowNav: false
      }
    },
    {
      path: '/resetPwd',
      name: 'resetPwd',
      component: ResetPwd,
      props: true,
      meta: {
        isShowNav: true,
        title: 'updatePwd',
        showBack: false
      }
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      props: true,
      meta: {
        isShowNav: true,
        title: 'home',
        showBack: false
      }
    },
    {
      path: '/userInfo',
      name: 'userInfo',
      component: UserInfo,
      props: true,
      meta: {
        isShowNav: true,
        title: 'userInfo',
        showBack: true
      }
    },
    {
      path: '/updatePwd',
      name: 'updatePwd',
      component: UpdatePwd,
      props: true,
      meta: {
        isShowNav: true,
        title: 'updatePwd',
        showBack: true
      }
    },
    {
      path: '/tranSearch',
      name: 'tranSearch',
      component: TranSearch,
      props: true,
      meta: {
        isShowNav: true,
        title: 'tranSearch',
        showBack: true
      }
    },
    {
      path: '/tranList',
      name: 'tranList',
      component: TranList,
      props: true,
      meta: {
        isShowNav: true,
        title: 'tranList',
        showBack: true
      }
    },
    {
      path: '/tranInfo',
      name: 'tranInfo',
      component: TranInfo,
      props: true,
      meta: {
        isShowNav: true,
        title: 'tranInfo',
        showBack: true
      }
    },
    {
      path: '/setAmt',
      name: 'setAmt',
      component: SetAmt,
      props: true,
      meta: {
        isShowNav: true,
        title: 'setAmt',
        showBack: true
      }
    },
    {
      path: '/createCode',
      name: 'createCode',
      component: CreateCode,
      props: true,
      meta: {
        isShowNav: true,
        title: 'createCode',
        showBack: true
      }
    },
    {
      path: '/payResult',
      name: 'payResult',
      component: PayResult,
      props: true,
      meta: {
        isShowNav: true,
        title: 'payResult',
        showBack: false
      }
    },
    {
      path: '/pushList',
      name: 'pushList',
      component: PushList,
      props: true,
      meta: {
        isShowNav: true,
        title: 'pushList',
        showBack: true
      }
    }
  ]
})
