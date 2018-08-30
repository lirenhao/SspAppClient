<template>
  <div>
    <x-header style="width:100%;position:absolute;left:0;top:0;z-index:100;"
              :title="title" :left-options="{showBack}">
    </x-header>
    <div>
      <div class="vux-demo">
        <img slot="icon" src="../assets/mine.png" class="mine">
        <img slot="icon" src="../assets/user.png" class="user">
        <h4>summer</h4>
        <p>104220948230412</p>
      </div>
      <group class="mine-list">
        <div @click="updatePwd">
          <cell title="商户名称" >
            <x-icon style="fill: red;" slot="icon" type="person" />
          </cell>
        </div>
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
.mine {
  width: 100%;
}
  .user {
    width: 28%;
    margin-top: -86px;
    border: 3px solid #fff;
    border-radius: 60px;
  }
  .vux-demo p {
    font-size: 12px;
    color: #999;
  }
</style>
