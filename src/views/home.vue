<template>
  <view-box body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;"
     :title="$t(title)" :left-options="{showBack}">
    </x-header>
    <div class="home-page">
      <grid class="home-content">
        <div @click="goSetAmt">
          <grid-item :label="$t('Collection code')">
            <img slot="icon" src="../assets/code-icon.png">
          </grid-item>
        </div>
        <div @click="goTranSearch">
          <grid-item :label="$t('Transaction inquiry')">
            <img slot="icon" src="../assets/seach-icon.png">
          </grid-item>
        </div>
        <div @click="goUserInfo">
          <grid-item :label="$t('Personal center')">
            <img slot="icon" src="../assets/user-icon.png">
          </grid-item>
        </div>
      </grid>
      <div v-if="pushList.length === 0">
        <divider>{{$t('Tran push no data')}}</divider>
      </div>
      <div class="Notification-list" v-else>
        <group v-for="(item, index) in pushList" :key="index"
               @click.native="goTranInfo(item.merNo, item.tranNo)">
          <cell class="change-cell">
            <x-icon style="fill: #999; width: 20px; margin: 1px 2px 0 0" slot="icon" type="android-notifications"/>
            <div slot="title">{{$t('Transaction reminder')}}</div>
            <div>{{getDateFormat(item.tranDate)}}</div>
          </cell>
          <cell>
            <div class="price" slot="title">{{item.tranCry}}{{item.tranAmt}}</div>
            <div class="trade">{{item.channel}}</div>
          </cell>
        </group>
        <div class="load-more" v-if="pushList.length === 3" @click="goPushList">{{$t('Load more')}}</div>
      </div>
    </div>
    <tabbar slot="bottom">
      <tabbar-item selected>
        <img slot="icon" src="../assets/vux_logo.png">
        <span slot="label">{{$t('home')}}</span>
      </tabbar-item>
      <tabbar-item link="/setAmt">
        <img slot="icon" src="../assets/code-icon.png">
        <span slot="label">{{$t('Collection code')}}</span>
      </tabbar-item>
      <tabbar-item link="/tranSearch" :label="$t('Transaction inquiry')">
        <img slot="icon" src="../assets/seach-icon.png">
        <span slot="label">{{$t('Transaction inquiry')}}</span>
      </tabbar-item>
      <tabbar-item link="/userInfo">
        <img slot="icon" src="../assets/user-icon.png">
        <span slot="label">{{$t('Personal center')}}</span>
      </tabbar-item>
    </tabbar>
  </view-box>
</template>
<script>
import {ViewBox, XHeader, Group, Cell, Grid, GridItem, Divider, Tabbar, TabbarItem} from 'vux';
import {mapState} from 'vuex';
import {dateFormat} from 'vux';
import moment from 'moment';
import api from '../api';
import localforage from '../localforage';

export default {
  name: 'home',
  components: {
    ViewBox,
    XHeader,
    Group,
    Cell,
    Grid,
    GridItem,
    Divider,
    Tabbar,
    TabbarItem,
  },
  computed: {
    ...mapState({
      // 只显示3条
      pushList: state => state.pushList.filter((item, index) => index < 3),
    }),
  },
  created: function() {
    if (!window.localStorage.token) {
      this.$router.push({name: 'login', params: {isClear: false}});
    } else {
      // 存储的与store如何一致
      if (window.localStorage.isResetPwd) {
        this.$router.push('/resetPwd')
      } else {
        localforage(window.localStorage.merNo)
          .getItem('trans')
          .then(trans => {
            const currDate = dateFormat(new Date(), 'YYYYMMDD');
            this.$store.commit('UPDATE_PUSH_LIST', trans ? trans.filter(tran => tran.tranDate.slice(0, 8) === currDate): []);
          });
        this.$store.commit('UPDATE_TRAN_QUERY', {tranDate: dateFormat(new Date(), 'YYYY-MM-DD'),
      });
      }
    }
  },
  data: function() {
    return {
      isShowNav: this.$route.meta.isShowNav,
      title: this.$route.meta.title,
      showBack: this.$route.meta.showBack,
      trans: [],
    };
  },
  methods: {
    getDateFormat(date) {
      if (date && date.length === 14)
        return dateFormat(
          new Date(moment(date, 'YYYYMMDDHHmmss')),
          'YYYY-MM-DD HH:mm:ss'
        );
      else return dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss');
    },
    goSetAmt() {
      this.$router.push('/setAmt');
    },
    goTranSearch() {
      this.$router.push('/tranSearch');
    },
    goUserInfo() {
      this.$router.push('/userInfo');
    },
    goTranInfo(merNo, tranNo) {
      api.tranInfo(merNo, tranNo).then(info => {
        if (info) {
          this.$router.push({
            name: 'tranInfo',
            params: {info},
          });
        } else {
          this.$vux.toast.show({
            type: 'warn',
            position: 'default',
            text: this.$t('Transaction query failed'),
          });
        }
      });
    },
    goPushList() {
      this.$router.push('/pushList');
    },
  },
};
</script>

<style>
/*首页导航栏*/
.home-content {
  background: #fff;
  border: none;
  margin-bottom: 28px;
}

/*首页导航按钮边框删除*/
.home-page .weui-grids:before,
.home-page .weui-grids:after,
.home-content .weui-grid:before,
.home-content .weui-grid:after {
  border: none;
}

/*首页导航按文字大小设置*/
.home-content .weui-grid__icon + .weui-grid__label {
  font-size: 13px !important;
}

/*交易通知 宽度 圆角设置*/
.Notification-list .weui-cells {
  width: 92%;
  margin-left: 4%;
  border-radius: 12px;
}

/*交易通知字体 颜色设置*/
.Notification-list .weui-cell {
  font-size: 12px;
  color: #999;
  padding-top: 0;
}

/*边距调整*/
.change-cell {
  padding-top: 10px !important;
}

.trade {
  color: #333;
}

/*价格设置*/
.price {
  font-size: 20px;
  color: red;
}

/*交易通知边框删除*/
.Notification-list .weui-cells:before,
.Notification-list .weui-cell:before {
  border-top: none !important;
}

.Notification-list .weui-cells:after {
  border-bottom: none !important;
}

/*加载更多*/
.load-more {
  position: relative;
  width: 92%;
  margin-left: 4%;
  margin-top: -8px;
  padding: 10px 0;
  font-size: 12px;
  color: #5799f9;
  text-align: center;
  background: #fff;
  border-top: 1px solid #eee;
  border-radius: 0 0 12px 12px;
}

  /*无更多信息*/
  .vux-divider {
    width: 78%;
    margin-left: 11%;
    font-size: 13px !important;
    color: #bbb !important;
    margin-top: 90px;
  }
</style>
