<template>
  <div>
    <x-header style="width:100%;position:absolute;left:0;top:0;z-index:100;"
              :title="$t(title)" :left-options="{showBack}">
    </x-header>
    <group>
      <div>{{info.tranAmt}}</div>
      <cell-form-preview :list="parserItem(info)"></cell-form-preview>
      <div>
        <x-icon type="android-notifications"/>
        交易成功
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

<style scoped>
</style>
