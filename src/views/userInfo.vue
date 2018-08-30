<template>
  <div>
    <x-header style="width:100%;position:absolute;left:0;top:0;z-index:100;"
              :title="$t(title)" :left-options="{showBack}">
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
          <cell :title="$t('Merchant name')" >
            <x-icon style="fill: #8ed8fa; margin-right: 8px; margin-left: -16px" slot="icon" type="ios-home" />
            <span>summer</span>
          </cell>
        </div>
        <div class="mine-list">
          <cell :title="$t('Terminal number')" >
            <x-icon style="fill: #ca9ac6; margin-right: 9px; margin-left: -14px; width: 22px;" slot="icon" type="android-desktop" />
            <span>10439849</span>
          </cell>
        </div>
        <div class="mine-list">
          <cell :title="$t('Currency')" >
            <x-icon style="fill: #8dd531; margin-right: 8px; margin-left: -16px;" slot="icon" type="social-usd" />
            <span>SGD</span>
          </cell>
        </div>
        <div class="mine-list" @click="updatePwd">
          <cell :title="$t('Change password')" is-link>
            <x-icon style="fill: #f8d743; margin-right: 8px; margin-left: -16px;" slot="icon" type="android-lock" />
          </cell>
        </div>
        <div class="mine-list" @click="logout">
          <cell :title="$t('Login out')" is-link>
            <x-icon style="fill: #f06474; margin-right: 8px; margin-left: -16px;" slot="icon" type="person" />
          </cell>
        </div>
      </div>
    </div>
  </div>
</template>
<i18n>
  Merchant name:
    en: Merchant name
    zh-CN: 商户名称
  Terminal number:
    en: Terminal number
    zh-CN: 终端号
  Currency:
    en: Currency
    zh-CN: 币种
  Change password:
    en: Change password
    zh-CN: 修改密码
  Login out: 
    en: Login out
    zh-CN: 退出登录
</i18n>
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
      isShowNav: this.$route.meta.isShowNav,
      title: this.$route.meta.title,
      showBack: this.$route.meta.showBack,
    };
  },
  methods: {
    logout() {
      // TODO 解除设备绑定
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
