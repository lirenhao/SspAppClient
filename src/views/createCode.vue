<template>
  <div>
    <x-header style="width:100%;position:absolute;left:0;top:0;z-index:100;"
              :title="$t(title)" :left-options="{showBack}">
    </x-header>
    <div style="text-align:center;margin-top:15px;">
      <qrcode value="afdkajf;lakd;lkafd;lak;lf" type="img"></qrcode>
      <span>订单提交成功,等待用户扫描...</span>
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
    XButton
  },
  computed: {
    amt: {
      get () {
        return [this.$store.state.tranQuery.merNo]
      },
      set (value) {
        this.$store.commit('UPDATE_TRAN_QUERY', {merNo: value[0]})
      }
    }
  },
  created: function() {
    if (!window.localStorage.token) {
      this.$router.push({name: 'login', params: {isClear: false}});
    } else {
    
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
    goCreateCode() {
    
    },
  },
};
</script>

<style scoped>
</style>
