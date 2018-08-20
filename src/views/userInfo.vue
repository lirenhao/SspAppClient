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
        <div @click="updatePwd">
          <cell title="修改密码" is-link></cell>
        </div>
        <div @click="logout">
          <cell title="切换用户" is-link></cell>
        </div>
      </group>
    </div>
  </div>
</template>
<script>
import {XHeader, Group, Cell} from 'vux';
import api from '../api';

export default {
  name: 'userInfo',
  components: {
    XHeader,
    Group,
    Cell,
  },
  created: function() {
    if (!window.localStorage.token) {
      this.$router.push({name: 'login', params: {isClear: false}});
    }
  },
  data: function() {
    return {
      isManager: false,
      isShowNav: this.$route.meta.isShowNav,
      title: this.$route.meta.title,
      showBack: this.$route.meta.showBack,
    };
  },
  methods: {
    logout() {
      this.$router.push({name: 'login'});
    },
    updatePwd() {
      this.$router.push({name: 'updatePwd'});
    },
  },
};
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
