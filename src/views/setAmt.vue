<template>
  <div>
    <x-header style="width:100%;position:absolute;left:0;top:0;z-index:100;"
              :title="$t(title)" :left-options="{showBack}">
    </x-header>
    <group :title="$t('Payment amount')">
      <x-input v-model="amt" :placeholder="$t('Please enter the payment amount')">
        <div slot="label">￥</div>
      </x-input>
      <x-button class="general-btn" type="primary" @click.native="goCreateCode">{{$t('Generate QR code')}}</x-button>
    </group>
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
    }
  },
  data: function() {
    return {
      isShowNav: this.$route.meta.isShowNav,
      title: this.$route.meta.title,
      showBack: this.$route.meta.showBack,
      amt: '',
    };
  },
  methods: {
    goCreateCode() {
      api.qrCodeCreate(this.amt).then(data => {
        if(data){
          if(data.respCode && data.respCode === '00'){
            this.$router.push({name: 'createCode', params: data});
          } else {

          }
        } else {

        }
      });
    },
  },
};
</script>

<style scoped>
  .general-btn {
      width: 66%;
      height: 38px;
      margin-left: 17%;
      background: #67A2F9;
      color: #fff;
      border: none;
      font-size: 15px;
      margin-top: 56px;
      border-radius: 4px;
      text-align: center;
  }
  .weui-btn:after {
    border: none;
  }

  .weui-cells__title + .weui-cells {
    background: none !important;
  }

</style>
