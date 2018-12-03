<template>
  <div>
    <x-header :title="$t(title)" :left-options="{showBack}">
    </x-header>
    <div>
      <div class="vux-demo">
        <img slot="icon" src="../assets/mine.png" class="mine">
        <!-- <img slot="icon" src="../assets/merchants.png" class="merchants"> -->
        <h4>{{userName}}</h4>
      </div>
      <div>
        <div class="mine-list marginT">
          <cell :title="$t('Merchant number')">
            <x-icon style="fill: #8ed8fa; margin-right: 8px; margin-left: -16px" slot="icon" type="ios-home"/>
            <span>{{merNo}}</span>
          </cell>
        </div>
        <div class="mine-list">
          <cell :title="$t('Terminal number')">
            <x-icon style="fill: #ca9ac6; margin-right: 9px; margin-left: -14px; width: 22px;" slot="icon"
                    type="android-desktop"/>
            <span>{{termNo}}</span>
          </cell>
        </div>
        <div class="mine-list">
          <cell :title="$t('Tran currency')">
            <x-icon style="fill: #8dd531; margin-right: 8px; margin-left: -16px;" slot="icon" type="social-usd"/>
            <span>{{ccyType.ccyEname}}</span>
          </cell>
        </div>
        <div class="mine-list" @click="updatePwd">
          <cell :title="$t('Change password')" is-link>
            <x-icon style="fill: #f8d743; margin-right: 8px; margin-left: -16px;" slot="icon" type="android-lock"/>
          </cell>
        </div>
        <div class="mine-list">
          <cell :title="$t('Help Center')" is-link>
            <x-icon style="fill: #f8d743; margin-right: 8px; margin-left: -16px;" slot="icon" type="android-lock"/>
          </cell>
        </div>
        <div class="mine-list" @click="logout">
          <cell :title="$t('Login out')" is-link>
            <x-icon style="fill: #f06474; margin-right: 8px; margin-left: -16px;" slot="icon" type="person"/>
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
    } else {
      api.userInfo().then(data => {
        this.merNo = data.merNo;
        this.userName = data.userName;
        this.termNo = data.termNo;
        this.ccyType = data.ccyType;
      });
    }
  },
  data: function() {
    return {
      isShowNav: this.$route.meta.isShowNav,
      title: this.$route.meta.title,
      showBack: this.$route.meta.showBack,
      merNo: '',
      userName: '',
      termNo: '',
      ccyType: {},
    };
  },
  methods: {
    logout() {
      // 解除设备绑定
      api
        .unBindPush()
        .then(data => {
          if (data) {
            window.localStorage.removeItem('token');
            this.$router.replace({name: 'login', params: {isClear: false}});
          } else {
            this.$vux.alert.show({
              title: this.$t('Login out faild'),
              content: this.$t('Please try again later')
            });
          }
        })
        .catch(e => {
          console.log('Login out', e)
          if(!e.response || e.response.status !== 401) {
            this.$vux.alert.show({
              title: this.$t('Login out faild'),
              content: this.$t('Please check the network status')
            });
          }
        });
    },
    updatePwd() {
      this.$router.push({name: 'updatePwd'});
    },
    goHelp() {
      this.$vux.alert.show({
        title: this.$t('Help Center'),
        content: this.$t('Please check the network status')
      });
    }
  },
};
</script>

<style scoped>
  /*修改头部白色边框*/
  .vux-header {
    padding: 4px 0 !important;
  }
/*个人中心 文字居中*/
.vux-demo {
  text-align: center;
}

/*个人中心 蓝色背景*/
.mine {
  width: 100%;
}

/*个人用户默认头像*/
.user {
  width: 28%;
  margin-top: -86px;
  border: 3px solid #fff;
  border-radius: 50%;
}

/*个人中心 昵称*/
.vux-demo p {
  font-size: 12px;
  color: #999;
}

/*间距设置*/
.marginT {
  margin-top: 30px;
}

/*个人中心 功能列表*/
.mine-list {
  font-size: 14px;
  margin-left: 16px;
  border-bottom: 1px solid #eee;
}

/*列表 右侧文字设置*/
.mine-list span {
  font-size: 12px;
  color: #999;
}
</style>
