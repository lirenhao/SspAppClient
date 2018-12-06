<template>
  <div>
    <x-header :title="$t(title)" :left-options="{showBack}">
    </x-header>
    <div class="pay-result" v-if="result">
      <img slot="icon" src="../assets/success.png" >
      <p>{{$t('Payment is successful')}}</p>
      <x-button @click.native="goBack">{{$t('Done')}}</x-button>
    </div>
    <div class="pay-result" v-else>
      <img slot="icon" src="../assets/failure.png" >
      <p>{{$t('Payment is failed')}}</p>
      <x-button @click.native="goBack">{{$t('Done')}}</x-button>
    </div>
  </div>
</template>
<script>
import {XHeader, XButton} from 'vux';

export default {
  name: 'payResult',
  components: {
    XHeader,
    XButton,
  },
  props: {
    result: Boolean,
  },
  data: function() {
    return {
      isShowNav: this.$route.meta.isShowNav,
      title: this.$route.meta.title,
      showBack: this.$route.meta.showBack,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
  /*交易结果图片*/
  .pay-result img {
    width: 60%;
    margin-left: 18%;
    margin-top: 30px;
  }

  /*交易结果文字*/
  .pay-result p {
   text-align: center;
    margin-bottom: 30px;
  }

  /*交易结果按钮*/
  .pay-result button {
    width: 66%;
    height: 38px;
    margin-left: 17%;
    color: #fff;
    border: none;
    font-size: 15px;
    margin-top: 96px;
    border-radius: 4px;
    text-align: center;
  }

  .pay-result .weui-btn:after {
    border: none !important;
  }
</style>
