<template>
  <div>
    <x-header style="width:100%;position:absolute;left:0;top:0;z-index:100;"
              :title="$t(title)" :left-options="{showBack}">
    </x-header>
    <group v-for="(item, index) in pushList" :key="index">
      <div>交易提醒</div>
      <div>{{getDateFormat(item.tranDate)}}</div>
      <div>交易金额</div>
      <div>{{item.tranAmt}}</div>
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
    goPushInfo() {},
  },
};
</script>

<style scoped>
.weui-cell:before {
  border: none;
}
</style>
