<template>
  <div>
    <x-header style="width:100%;position:absolute;left:0;top:0;z-index:100;"
              :title="$t(title)" :left-options="{showBack}">
    </x-header>
    <group :title="$t('Payment amount')">
      <x-input :placeholder="$t('Please enter the payment amount')">
        <div slot="label">￥</div>
      </x-input>
      <x-button type="primary" @click.native="goCreateCode">{{$t('Generate QR code')}}</x-button>
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
    },
    tranDate: {
      get () {
        return this.$store.state.tranQuery.tranDate
      },
      set (value) {
        this.$store.commit('UPDATE_TRAN_QUERY', {tranDate: value})
      }
    }
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
    goCreateCode() {
      this.$router.push('/createCode');
    },
  },
};
</script>

<style scoped>
</style>
