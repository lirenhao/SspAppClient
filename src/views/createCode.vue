<template>
  <div class="blue-bg">
    <x-header style="width:100%;position:absolute;left:0;top:0;z-index:100;"
              :title="$t(title)" :left-options="{showBack}">
    </x-header>
    <div class="code-show">
      <div class="show-title">
        <p>向商户收款</p>
        <div class="code-time">
          <span>
            <em>倒计时</em> {{timecunt}} <em>S</em>
          </span>
        </div>
      </div>
      <qrcode :value="qrCode" type="img" class="code-img"></qrcode>
      <span class="code-prompt">{{$t('Pay the wait')}}...</span>
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
  Pay the wait:
    en: Order submitted successfully,waiting for user scan
    zh-CN: 订单提交成功,等待用户扫描
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
      this.$router.push({name: 'login', params: {isClear: false}});
    } else {
      this.timer = setInterval(() => {
        if (this.timecunt > 0) {
          this.timecunt--;
        } else {
          clearInterval(this.timer);
        }
      }, 1000);
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
    timecunt: function(newValue, oldValue) {
      console.log('timecunt', newValue, (this.timeout - newValue) % 5 === 0);
      if ((this.timeout - newValue) % 5 === 0) {
        api.qrCodeQuery(this.queryNo).then(data => {
          if (data && data.respCode === '00') {
            this.$router.replace({name: 'payResult', params: {result: true}});
          }
        })
      }
    },
  },
  destroyed: function() {
    clearInterval(this.timer);
  },
}
</script>

<style scoped>
  .blue-bg {
    margin-top: -46px;
    padding-top: 80px;
    padding-bottom: 20px;
    width: 100%;
    height: 100%;
    background: #67A2F9;
  }

  .code-show {
    width: 80%;
    margin-left: 10%;
    text-align: center;
    background: #fff;
    border-radius: 8px;
  }

  .show-title {
    width: 100%;
    height: 40px;
    background: #E3EAF4;
    border-radius: 8px 8px 0 0;
    text-align: left;
    font-size: 14px;
    color: #5799F9;
  }
  .show-title p {
    padding: 10px 0 0 16px;
  }
  .code-img {
    margin: 20px 0;
  }
  .code-prompt {
    display: block;
    font-size: 12px;
    color: #999;
    height: 30px;
  }
  .code-time {
    float: right;
    font-size: 16px;
    color: red;
    margin: -22px 12px 0 0;
  }

  .code-time em {
    font-style: normal;
    font-size: 12px;
    color: #999;
  }
</style>
