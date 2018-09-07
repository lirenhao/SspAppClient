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
      <div class="date-today">
        <span class="blue"></span> 今天
      </div>
      <div class="date-selected">
        <span class="yellow"></span> 选中
      </div>
    </div>
    <group :title="$t('Sub merchant')">
      <popup-picker title="选择商户" :data="[merList]" v-model="merNos"></popup-picker>
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
      showMerSelect: false,
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
</style>
