<template>
  <div>
    <x-header style="width:100%;position:absolute;left:0;top:0;z-index:100;"
              :title="$t(title)" :left-options="{showBack}">
    </x-header>
    <div>
      <grid class="home-content">
        <div @click="goSetAmt">
          <grid-item :label="$t('Collection code')">
            <img slot="icon" src="../assets/code-icon.png">
          </grid-item>
        </div>
        <div  @click="goTranSearch">
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
        <group class="Notification-list-item" v-for="(item, index) in pushList" :key="index"
          @click.native="goTranInfo(item.merNo, item.tranNo)">
          <cell class="change-cell">
            <x-icon style="fill: #999; width: 20px; margin: 1px 2px 0 0" slot="icon" type="android-notifications"/>
            <div slot="title">{{$t('Transaction reminder')}}</div>
            <div>{{getDateFormat(item.tranDate)}}</div>
          </cell>
          <cell class="changes-cell" >
            <div class="price" slot="title">{{item.tranAmt}}</div>
            <div>{{item.channel}}</div>
          </cell>
        </group>
        <div v-if="pushList.length === 3" @click="goPushList">{{$t('Load more')}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import {XHeader, Group, Cell, Grid, GridItem, Divider} from 'vux';
import {mapState} from 'vuex';
import {dateFormat} from 'vux';
import moment from 'moment';
import api from '../api';
import localforage from '../localforage';

export default {
  name: 'home',
  components: {
    XHeader,
    Group,
    Cell,
    Grid,
    GridItem,
    Divider,
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
      // TODO 存储的与store如何一致
      localforage(window.localStorage.merNo)
        .getItem('trans')
        .then(trans => (trans ? (this.trans = trans) : null));
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
      this.$store.commit('UPDATE_TRAN_QUERY', {
        tranDate: dateFormat(new Date(), 'YYYY-MM-DD'),
      });
      this.$router.push('/tranSearch');
    },
    goUserInfo() {
      api.userInfo().then(data => {
        this.$router.push({name: 'userInfo', params: data});
      });
    },
    goTranInfo(merNo, tranNo) {
      this.$router.push({
        name: 'tranInfo',
        params: {
          info: {
            merNo: '104000100010001',
            termNo: '12345678',
            tranType: '刷卡交易',
            rrn: '12345',
            tranNo: '201809031639580001',
            channel: '微信支付',
            tranDate: '20180903163958',
            tranAmt: '100',
          },
        },
      });
    },
    goPushList() {
      this.$router.push('/pushList');
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
  height: 100px;
}

.weui-grids:before,
.weui-grids:after,
.home-content .weui-grid:before,
.home-content .weui-grid:after {
  border: none;
}

.home-content {
  top: 14px;
  background: #fff;
  border: none;
}

.weui-grid__icon + .weui-grid__label {
  font-size: 12px !important;
  color: red;
}
.trading-box {
  width: 92%;
  margin-left: 4%;
  background: #fff;
}

.weui-cell:before {
  border: none;
}
.Notification-list {
  margin-top: 28px;
}

.Notification-list .weui-cell {
  font-size: 12px;
  color: #999;
}

.Notification-list-item .weui-cells {
  width: 92%;
  margin-left: 4%;
  border-radius: 6px;
}

.price {
  font-size: 24px;
  color: red;
}
.change-cell {
  padding-bottom: 0;
  border-top: 1px solid #fff;
}
.changes-cell {
  z-index: 99;
  border-bottom: 1px solid #fff;
}
</style>
