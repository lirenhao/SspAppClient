<template>
  <div>
    <x-header style="width:100%;position:absolute;left:0;top:0;z-index:100;"
              :title="title" :left-options="{showBack}">
    </x-header>
    <div>
      <div class="vux-demo">
        <img class="logo" src="../assets/vux_logo.png">
        <h1>SSP</h1>
      </div>
      <group>
        <div @click="goTranSearch">
          <cell title="交易查询" is-link></cell>
        </div>
        <div @click="goUserInfo">
          <cell title="个人中心" is-link></cell>
        </div>
      </group>
    </div>
  </div>
</template>
<script>
import {XHeader, Group, Cell} from 'vux'
import {dateFormat} from 'vux'
import api from '../api'

export default {
  name: 'home',
  components: {
    XHeader,
    Group,
    Cell,
  },
  created: function() {
    if (!window.localStorage.token) {
      this.$router.push({name: 'login', params: {isClear: false}})
    }
  },
  data: function() {
    return {
      isShowNav: this.$route.meta.isShowNav,
      title: this.$route.meta.title,
      showBack: this.$route.meta.showBack,
    }
  },
  methods: {
    goTranSearch() {
      this.$store.commit('UPDATE_TRAN_QUERY', {tranDate: dateFormat(new Date(), 'YYYY-MM-DD')})
      this.$router.push('/tranSearch')
    },
    goUserInfo() {
      api.userInfo().then(data => {
        this.$router.push('/userInfo')
      })
    },
  },
}
</script>

<style scoped>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px;
}
</style>
