<template>
  <div>
    <x-header style="width:100%;position:absolute;left:0;top:0;z-index:100;"
              :title="$t(title)" :left-options="{showBack}">
      <div slot="right" @click="goTranList">{{$t('vux.calendar.confirm_text')}}</div>
    </x-header>
    <div class="search-page">
      <inline-calendar v-model="tranDate" disable-future>
        <div solt="each-day">afda</div>
      </inline-calendar>

      <group-title>{{$t('Sub merchant')}}</group-title>
      <picker :data="[merList]" v-model="merNos" ></picker>
    </div>
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

<style>
  /*时间选择年、月份宽度修改*/
  .search-page .calendar-header > div {
    width: 40%;
    margin-left: 7%;
  }

  /*字体修改*/
  .search-page .calendar-title {
    font-size: 16px;
  }

  /*选择箭头颜色修改*/
  .search-page .vux-prev-icon, .vux-next-icon {
    border-color: #5799F9 !important;
  }

  /*选择箭头大小修改*/
  .search-page .vux-prev-icon, .search-page .vux-next-icon {
    width: 9px;
    height: 9px;
  }

  /*星期颜色修改*/
  .search-page .inline-calendar th {
    color: #5799F9;
  }

  .search-page .inline-calendar td.is-today {
    /*width: 16px;*/
    /*height: 16px;*/
    /*border-radius: 50%;*/
    /*color: #fff;*/
    /*background: #5799F9;*/
  }

  /*商户标题*/
  .search-page .weui-cells__title {
    position: absolute;
    bottom: 240px;
    font-size: 12px;
  }

  /*商户选择*/
  .search-page .vux-picker {
    width: 100%;
    position: absolute !important;
    bottom: 0 !important;
  }
</style>
