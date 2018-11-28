<template>
  <div>
    <x-header style="width:100%;position:absolute;left:0;top:0;z-index:100;"
              :title="$t(title)" :left-options="{showBack}">
      <div slot="right" @click="goTranList">{{$t('vux.calendar.confirm_text')}}</div>
    </x-header>
    <div class="search-page">
      <inline-calendar v-model="tranDate" @on-select-single-date="goTranList" disable-future></inline-calendar>
      <div class="date-today">
        <span class="blue"></span> {{$t('Today')}}
      </div>
      <div class="date-selected">
        <span class="yellow"></span> {{$t('Selected')}}
      </div>
    </div>
    <group class="date-box" :title="$t('Sub merchant')">
      <popup-picker :title="$t('Select Merchant')" :data="[merList]" v-model="merNos" :show="showMerSelect"></popup-picker>
    </group>
  </div>
</template>
<script>
import {XHeader, InlineCalendar, PopupPicker, Picker, Group, Radio, XButton} from 'vux';
import api from '../api';

export default {
  name: 'tranSearch',
  components: {
    XHeader,
    InlineCalendar,
    PopupPicker,
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
      showMerSelect: true,
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

  /*日历今日样式添加*/
  .search-page .inline-calendar td.is-today > span.vux-calendar-each-date {
    background-color: #5799F9;
    color: #fff;
  }


  /*今日 选中样式添加*/
  .date-bottom {
    width: 100%;
    height: 40px;
    background: #fff;
  }

  .date-today, .date-selected {
    width: 46%;
    height: 32px;
    float: left;
    font-size: 12px;
    color: #999;
    line-height: 32px;
    background: #fff;
    text-align: right;
    padding-right: 4%;
  }

  .date-selected {
    text-align: left !important;
    padding-left: 4% !important;
    padding-right: 0 !important;
  }

  .date-today span, .date-selected span {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #FF9900;
  }

  .blue {
    background: #5799F9 !important;
  }


  /*商户标题*/
  .date-box .weui-cells__title {
    font-size: 12px;
    margin-top: 50px;
  }

  /*去掉边框*/
  .date-box .weui-cells:before {
    border-top: none !important;
  }

  .date-box .weui-cells:after {
    border-bottom: none !important;
  }

  .date-box .vux-cell-box {
    font-size: 14px;
  }

  .date-box .vux-cell-value {
    font-size: 12px;
  }

  /*商户号选择*/
  .vux-popup-header-left, .vux-popup-header-right {
    font-size: 13px;
    color: #5799F9 !important;
  }
  .vux-1px-b:after {
    border-bottom: none !important;
  }
  .vux-popup-header {
    height: 40px !important;
    line-height: 40px !important;
    background-color: #ededed !important;
  }
  .scroller-indicator {
    background-image: none !important;
  }
</style>
