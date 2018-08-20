<template>
  <div>
    <x-header style="width:100%;position:absolute;left:0;top:0;z-index:100;"
              :title="title" :left-options="{showBack}">
      <div slot="right" @click="goTranSearch">筛选</div>
    </x-header>
    <group-title>{{tranDate + ';' + merNo}}</group-title>
    <div v-if="tranList.length === 0">
      <divider>No query to data</divider>
    </div>
    <div v-else>
      <group v-for="(item, index) in tranList" @click.native="showInfo(item)"
             :title="item.termNo" :key="index">
        <cell-form-preview :list="getView(item)"></cell-form-preview>
      </group>
    </div>
  </div>
</template>
<script>
import {XHeader, GroupTitle, Divider, Group, CellFormPreview} from 'vux';
import {mapState} from 'vuex'
import api from '../api';

export default {
  name: 'tranList',
  components: {
    XHeader,
    GroupTitle,
    Divider,
    Group,
    CellFormPreview,
  },
  computed: {
    ...mapState({
      tranList: state => state.tranList,
      tranDate: state => state.tranQuery.tranDate,
      merNo: state => state.tranQuery.merNo
    }),
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
    getView (value) {
      return [
        {label: '商户号', value: value.merNo},
        {label: '终端号', value: value.termNo},
        {label: '金  额', value: value.tranAmt},
      ]
    },
    showInfo(value) {
      this.$router.push({name: 'tranInfo', params: {info: value}});
    },
    goTranSearch() {
      this.$router.replace({name: 'tranSearch', params: {merNo: this.merNo, tranDate: this.tranDate}});
    },
  },
};
</script>

<style scoped>
</style>
