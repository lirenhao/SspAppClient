<template>
  <div>
    <x-header style="width:100%;position:absolute;left:0;top:0;z-index:100;"
              :title="$t(title)" :left-options="{showBack}">
    </x-header>
    <group v-for="(item, index) in pushList" :key="index" @click.native="goTranInfo(item.merNo, item.tranNo)">
      <div class="PL-title">交易提醒</div>
      <div class="PL-titme">{{getDateFormat(item.tranDate)}}</div>
      <div class="PL-money" >
        交易金额
        <p>{{item.tranAmt}}</p>
      </div>
      <cell-form-preview :list="[
        {
          label: '支付方式',
          value: item.channel
        },
        {
          label: '交易时间',
          value: item.tranDate
        },
        {
          label: '所属分店',
          value: '分店'
        }
      ]"></cell-form-preview>
    </group>
  </div>
</template>
<script>
import {
  XHeader,
  Group,
  Cell,
  Grid,
  GridItem,
  Divider,
  CellFormPreview,
} from 'vux';
import {mapState} from 'vuex';
import {dateFormat} from 'vux';

export default {
  name: 'pushList',
  components: {
    XHeader,
    Group,
    Cell,
    Grid,
    GridItem,
    Divider,
    CellFormPreview,
  },
  computed: {
    ...mapState({
      pushList: state => state.pushList,
    }),
  },
  data: function() {
    return {
      isShowNav: this.$route.meta.isShowNav,
      title: this.$route.meta.title,
      showBack: this.$route.meta.showBack,
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
  },
};
</script>

<style scoped>
.weui-cell:before {
  border-top: 1px dotted #ccc;
 }
  .PL-title {
    font-size: 16px;
    margin: 12px 0 0 14px;
  }
  .PL-titme {
    font-size: 12px;
    color: #ccc;
    margin: 4px 0 0 14px;
  }
  .PL-money {
    text-align: center;
    font-size: 12px;
    color: #CCC;
    margin-top: 30px;
  }
.PL-money p {
  font-size: 18px;
  color: #5799F9;
  margin-bottom: 20px;
}

  .weui-cell {
    margin-right: 14px;
    padding-right: 0 !important;
    font-size: 12px;
  }
 .weui-form-preview__label {
  color: #ccc !important;
 }
</style>
