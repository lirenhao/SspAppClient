import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/login'
import Home from '../views/home'
import UserInfo from '../views/userInfo'
import UpdatePwd from '../views/updatePwd'
import TranSearch from '../views/tranSearch'
import TranList from '../views/tranList'
import TranInfo from '../views/tranInfo'

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
      path: '/',
      name: 'home',
      component: Home,
      props: true,
      meta: {
        isShowNav: true,
        title: '首页',
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
        title: '个人中心',
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
        title: '修改密码',
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
        title: '交易查询',
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
        title: '交易查询',
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
        title: '交易详情',
        showBack: true
      }
    }
  ]
})
