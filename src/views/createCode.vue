<template>
  <div>
    <x-header style="width:100%;position:absolute;left:0;top:0;z-index:100;"
              :title="$t(title)" :left-options="{showBack}">
    </x-header>
    <div style="text-align:center;margin-top:15px;">
      <qrcode :value="qrCode" type="img"></qrcode>
      <span>{{timecunt}}订单提交成功,等待用户扫描...</span>
    </div>
  </div>
</template>
<i18n>
  Payment amount:
    en: Payment amount
    zh-CN: 付款金额
  Please enter the payment amount:
    en: Please enter the payment amount
    zh-CN: 请输入付款金额
  Generate QR code:
    en: Generate QR code
    zh-CN: 生成二维码
</i18n>
<script>
import {XHeader, Qrcode, XInput, XButton} from 'vux';
import api from '../api';

export default {
  name: 'createCode',
  components: {
    XHeader,
    Qrcode,
    XInput,
    XButton,
  },
  props: {
    qrCode: String,
    queryNo: String,
    tranAmt: String,
    tranCry: String,
    timeout: Number,
  },
  created: function() {
    if (!window.localStorage.token) {
      this.$router.push({name: 'login', params: {isClear: false}})
    } else {
      this.timer = setInterval(() => {
        if(this.timecunt > 0) {
          this.timecunt --
        } else {
          clearInterval(this.timer)
        }
      }, 1000)
    }
  },
  data: function() {
    return {
      isShowNav: this.$route.meta.isShowNav,
      title: this.$route.meta.title,
      showBack: this.$route.meta.showBack,
      timecunt: this.timeout,
    };
  },
  methods: {
    goCreateCode() {},
  },
  watch: {
    timecunt: function(newValue, oldValue){
      console.log('timecunt', newValue, (this.timeout - newValue)%5 === 0)
      if((this.timeout - newValue)%5 === 0){
        api.qrCodeQuery(this.queryNo)
        .then(data => {
          if(data && data.respCode === '00'){
            this.$router.replace({name: 'payResult', params: {result: true}})
          }
        })
      }
    }
  },
  destroyed: function () {
    clearInterval(this.timer)
  }
};
</script>

<style scoped>
</style>
