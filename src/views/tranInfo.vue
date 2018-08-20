<template>
  <div>
    <x-header style="width:100%;position:absolute;left:0;top:0;z-index:100;"
              :title="title" :left-options="{showBack}">
    </x-header>
    <form-preview header-label="商户号" :header-value="info.merNo" :body-items="parserItem(info)"/>
  </div>
</template>
<script>
import {XHeader, FormPreview} from 'vux';
import api from '../api';

export default {
  name: 'tranInfo',
  components: {
    XHeader,
    FormPreview,
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
      body.push({label: '工单号', value: item.workId})
      body.push({label: '商户号', value: item.merNo})
      body.push({label: '派工人', value: item.jobOffer})
      body.push({label: '执行人', value: item.executor})
      body.push({label: '回执状态', value: item.receiptStatus})
      body.push({label: '复核状态', value: item.reviewStatus})
      body.push({label: '派工时间', value: item.dispatchingDate})
      body.push({label: '终端联系人', value: item.businessContacts})
      body.push({label: '终端联系电话', value: item.businessContactsPhone})
      body.push({label: '终端地址', value: item.addr})
      return body
    },
  },
};
</script>

<style scoped>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
</style>
