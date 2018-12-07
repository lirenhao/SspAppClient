<template>
  <div>
    <x-header :title="$t(title)" :left-options="{showBack}">
    </x-header>
    <group class="traninfo-page">
      <div class="TI-money">
        {{ccyType.ccySymbol + ' ' + info.tranAmt}}
      <p>{{info.merName}}</p>
      </div>
      <cell-form-preview :list="parserItem(info)"></cell-form-preview>
      <div class="state" v-if="info.respCode === '00'">
        <x-icon style="margin-bottom: -7px; fill: #0BB20C; " type="android-checkmark-circle"/>
        {{$t('Transaction successful')}}
      </div>
      <div class="state" v-else>
        <x-icon style="margin: 0 4px -7px 0; fill: red; " type="close-circled"/>
        {{$t('Transaction failed')}}
      </div>
    </group>
  </div>
</template>
<script>
import {XHeader, Group, Cell, CellFormPreview,} from 'vux';
import {dateFormat, numberComma} from 'vux';
import moment from 'moment';
import api from '../api';

export default {
  name: 'tranInfo',
  components: {
    XHeader,
    Group,
    Cell,
    CellFormPreview,
  },
  props: {
    info: {
      type: Object,
      required: true
    },
  },
  created: function() {
    if (!window.localStorage.token) {
      this.$router.push({name: 'login', params: {isClear: false}});
    } else {
      api.userInfo().then(data => (this.ccyType = data.ccyType));
    }
  },
  data: function() {
    return {
      isShowNav: this.$route.meta.isShowNav,
      title: this.$route.meta.title,
      showBack: this.$route.meta.showBack,
      ccyType: {},
    };
  },
  methods: {
    parserItem(item) {
      const body = []
      body.push({label: this.$t('Merchant number'), value: item.merNo})
      body.push({label: this.$t('Terminal number'), value: item.termNo})
      body.push({label: this.$t('Transaction type'), value: item.tranType})
      body.push({label: this.$t('Merchant order'), value: item.traceNo})
      body.push({label: this.$t('Payment channel'), value: item.channel})
      body.push({label: this.$t('Transaction date'), value: this.getDateFormat(item.tranDate)})
      return body
    },
    getDateFormat(date) {
      if (date && date.length === 14)
        return dateFormat(
          new Date(moment(date, 'YYYYMMDDHHmmss')),
          'YYYY-MM-DD HH:mm:ss'
        );
      else return dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss');
    },
  },
};
</script>

<style>

  /*交易详情内容块设置*/
  .traninfo-page {
    width: 92%;
    margin-left: 4%;
  }

  /*圆角设置*/
  .traninfo-page .weui-cells {
    border-radius: 4px;
    font-size: 12px;
  }

  /*删除边框*/
  .traninfo-page .weui-cells:before{
    border-top: none !important;
  }

  .traninfo-page .weui-cells:after {
    border-bottom: none !important;
  }

  .traninfo-page:before,
  .traninfo-page:after {
    content: " ";
    position: absolute;
    z-index: 999;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    top: 142px;
    background: #f9f9f9;
  }

  .traninfo-page:before {
    left: 6px;
  }

  .traninfo-page:after {
    right: 6px;
  }

  /*价格*/
  .traninfo-page .TI-money {
    text-align: center;
    font-size: 18px;
    color: #B6002A;
    padding: 30px 0 20px 0;
    min-height: 42px !important;
  }

  /*商户*/
  .TI-money p {
    font-size: 12px;
    color: #333;
  }

  /*上边框设置*/
  .traninfo-page .weui-cell:before {
    border-top: 1px dotted #d9d9d9;
  }

  /*字体颜色设置*/
  .traninfo-page .weui-form-preview__value {
    color: #333;
  }

  /*交易结果状态展示*/
  .traninfo-page .state {
    padding: 12px;
    font-size: 18px;
    text-align: center;
    border-top: 1px dotted #d9d9d9;
  }

</style>
