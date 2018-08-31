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
      <div v-else>
        <div v-for="(item, index) in pushList" :key="index">
          {{item.tranDate}} {{item.tranAmt}} {{item.channel}}
        </div>
      </div>
    </div>
  </div>
</template>
<i18n>
  Collection code:
    en: Collection code
    zh-CN: 收款码
  Transaction inquiry:
    en: Transaction inquiry
    zh-CN: 交易查询
  Personal center:
    en: Personal center
    zh-CN: 个人中心
  Tran push no data:
    en: Tran push no data
    zh-CN: 没有交易通知
</i18n>
<script>
import {XHeader, Group, Cell, Grid, GridItem, Divider, CellFormPreview} from 'vux';
import {mapState} from 'vuex'
import {dateFormat} from 'vux';
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
    CellFormPreview
  },
   computed: {
    ...mapState({
      pushList: state => state.pushList
    }),
  },
  created: function() {
    if (!window.localStorage.token) {
      this.$router.push({name: 'login', params: {isClear: false}});
    } else {
      // TODO 存储的与store如何一致
      localforage(window.localStorage.merNo)
        .getItem('trans')
        .then(trans => trans ? this.trans = trans : null);
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

.weui-grids:before, .weui-grids:after,
.home-content .weui-grid:before,
.home-content .weui-grid:after {
  border: none;
}

.home-content {
  top: 20px;
  background: #fff;
  border: none;
}

.weui-grid__icon + .weui-grid__label {
  font-size: 12px !important;
  color: red;
}

</style>
