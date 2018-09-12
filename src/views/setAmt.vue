<template>
  <div>
    <x-header style="width:100%;position:absolute;left:0;top:0;z-index:100;"
              :title="$t(title)" :left-options="{showBack}">
    </x-header>
    <group class="money-title" :title="$t('Please enter the payment amount')"></group>
    <div class="money-box">
      <label class="money" >{{ccyType.ccySymbol}}</label>
      <input class="money-input" v-model="amt" type="number" step="0.01" />
    </div>
    <x-button class="general-btn" type="primary" @click.native="goCreateCode">{{$t('Generate QR code')}}</x-button>
  </div>
</template>
<script>
import {XHeader, Group, XInput, XButton} from 'vux';
import api from '../api';

export default {
  name: 'setAmt',
  components: {
    XHeader,
    Group,
    XInput,
    XButton,
  },
  created: function() {
    if (!window.localStorage.token) {
      this.$router.push({name: 'login', params: {isClear: false}});
    } else {
      api.userInfo().then(data => this.ccyType = data.ccyType)
    }
  },
  props: {
    tranAmt: String
  },
  data: function() {
    return {
      isShowNav: this.$route.meta.isShowNav,
      title: this.$route.meta.title,
      showBack: this.$route.meta.showBack,
      amt: this.tranAmt ? this.tranAmt : '',
      ccyType: {},
    };
  },
  methods: {
    validAmount(amt) {
      const regex = /^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/;
      if (regex.test(amt)) {
        return {valid: true}
      }
      return {valid: false, msg: this.$t('Amount input error')}
    },
    goCreateCode() {
      if (this.amt !== '' && this.validAmount(this.amt).valid) {
        api.qrCodeCreate(this.amt).then(data => {
          if (data) {
            if (data.respCode && data.respCode === '00') {
              this.$router.replace({
                name: 'createCode',
                params: {...data, timeout: parseInt(data.timeout)},
              });
            } else {
              this.$vux.toast.show({
                type: 'warn',
                position: 'default',
                text:  this.$t('QrCode create failed')
              })
            }
          } else {
            this.$vux.toast.show({
                type: 'warn',
                position: 'default',
                text:  this.$t('QrCode create failed')
              })
          }
        })
      } else {
        this.$vux.toast.show({
          type: 'warn',
          position: 'default',
          text:  this.$t('Amount input error')
        })
      }
    },
  },
};
</script>

<style scoped>
  /*标题*/
  .money-title {
    margin-left: 30px;
    margin-top: 50px;
    }

  /*金额图标*/
  .money {
    font-size: 38px;
    margin-bottom: 12px;
  }

  /*输入金额框*/
  .money-box {
    width: 80%;
    height: 60px;
    margin-left: 10%;
    border-bottom: 1px solid #d9d9d9;
  }

  /*输入框*/
  .money-input {
    width: 84%;
    height: 38px;
    background: none;
    border: none;
    outline:medium;
    font-size: 38px;
  }

  /*间距调整*/
  .weui-cell {
    padding-left: 0 !important;
    padding-bottom: 0 !important;
  }

  /*按钮*/
  .general-btn {
    width: 66%;
    height: 38px;
    margin-left: 17%;
    background: #67a2f9;
    color: #fff;
    border: none;
    font-size: 15px;
    margin-top: 96px;
    border-radius: 4px;
    text-align: center;
  }

  /*删除按钮边框*/
  .weui-btn:after {
    border: none !important;
  }


</style>
