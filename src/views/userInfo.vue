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
      <div>
        <div class="mine-list marginT">
          <cell title="商户名称" >
            <x-icon style="fill: #8ed8fa; margin-right: 8px; margin-left: -16px" slot="icon" type="ios-home" />
            <span>summer</span>
          </cell>
        </div>
        <div class="mine-list">
          <cell title="终端号" >
            <x-icon style="fill: #ca9ac6; margin-right: 9px; margin-left: -14px; width: 22px;" slot="icon" type="android-desktop" />
            <span>10439849</span>
          </cell>
        </div>
        <div class="mine-list">
          <cell title="币种" >
            <x-icon style="fill: #8dd531; margin-right: 8px; margin-left: -16px;" slot="icon" type="social-usd" />
            <span>SGD</span>
          </cell>
        </div>
        <div class="mine-list" @click="updatePwd">
          <cell title="修改密码">
            <x-icon style="fill: #f8d743; margin-right: 8px; margin-left: -16px;" slot="icon" type="android-lock" />
            <span> > </span>
          </cell>
        </div>
        <div class="mine-list" @click="logout">
          <cell title="切换用户">
            <x-icon style="fill: #f06474; margin-right: 8px; margin-left: -16px;" slot="icon" type="person" />
            <span> > </span>
          </cell>
        </div>
      </div>
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
  .marginT {
    margin-top: 30px;
  }
  .mine-list {
    font-size: 14px;
    margin-left: 16px;
    border-bottom: 1px solid #eee;
  }
  .mine-list span {
    font-size: 12px;
    color: #999;
  }
</style>
