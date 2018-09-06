<template>
  <div>
    <x-header style="width:100%;position:absolute;left:0;top:0;z-index:100;"
              :title="$t(title)" :left-options="{showBack}">
    </x-header>
    <group class="traninfo-page">
      <div class="TI-money">
        {{info.tranAmt}}
      <p>COCO奶茶店</p>
      </div>
      <cell-form-preview :list="parserItem(info)"></cell-form-preview>
      <div class="state">
        <!--<x-icon style="margin-bottom: -7px; fill: #0BB20C; " type="android-checkmark-circle"/>-->
        <!--交易成功-->
        <x-icon style="margin: 0 4px -7px 0; fill: red; " type="close-circled"/>
        交易失败
      </div>
    </group>
  </div>
</template>
<script>
import {XHeader, Group, Cell, CellFormPreview,} from 'vux';
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
    parserItem(item) {
      const body = []
      body.push({label: '商户号', value: item.merNo})
      body.push({label: '终端号', value: item.termNo})
      body.push({label: '交易类型', value: item.tranType})
      body.push({label: '参考号', value: item.rrn})
      body.push({label: '商户单号', value: item.tranNo})
      body.push({label: '支付方式', value: item.channel})
      body.push({label: '交易时间', value: item.tranDate})
      body.push({label: '交易金额', value: item.tranAmt})
      return body
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
    color: #5799F9;
    padding: 30px 0 20px 0;
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
    font-size: 14px;
    text-align: center;
    border-top: 1px dotted #d9d9d9;
  }

</style>
