<template>
  <div>
    <x-header style="width:100%;position:absolute;left:0;top:0;z-index:100;"
              :title="title" :left-options="{showBack}">
      <div slot="right" @click="goTranList">确认</div>
    </x-header>
    <group-title>Transaction data</group-title>
    <inline-calendar v-model="tranDate" disable-future>
    </inline-calendar>
    <group-title>Sub merchant</group-title>
    <picker :data="[merList]" v-model="merNos"></picker>
  </div>
</template>
<script>
import {XHeader, InlineCalendar, GroupTitle, Picker, Group, Radio, XButton} from 'vux';
import api from '../api';

export default {
  name: 'tranSearch',
  components: {
    XHeader,
    InlineCalendar,
    GroupTitle,
    Picker,
    Group,
    Radio,
    XButton
  },
  computed: {
    merNos: {
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
    } else {
      api.subMer().then(data => { 
        this.merList = Object.keys(data).map(key => ({value: key, name: data[key]}))
      }).catch(() => {this.merList = this.merNos});
    }
  },
  data: function() {
    return {
      isShowNav: this.$route.meta.isShowNav,
      title: this.$route.meta.title,
      showBack: this.$route.meta.showBack,
      merList: [],
    };
  },
  methods: {
    goTranList() {
      api.tranList(this.merNos[0], this.tranDate.replace(/-/g, ''))
        .then(data => this.$store.commit('UPDATE_TRAN_LIST', data))
        .then(() => this.$router.replace('/tranList'))
        .catch(console.log)
    },
  },
};
</script>

<style scoped>
</style>
