<template>
  <view-box body-padding-top="46px">
    <x-header
      slot="header"
      style="width:100%;position:absolute;left:0;top:0;z-index:100;"
      :title="$t(title)"
      :left-options="{showBack}"
    ></x-header>
    <group
      class="pushlist-content"
      v-for="(item, index) in pushList"
      :key="index"
      @click.native="goTranInfo(item.merNo, item.tranNo)"
    >
      <div class="PL-title">{{$t('Transaction reminder')}}</div>
      <div class="PL-titme">{{getDateFormat(item.tranDate)}}</div>
      <div class="PL-money">
        {{$t('Transaction amount')}}
        <p>{{item.tranCry + ' ' + item.tranAmt}}</p>
      </div>
      <cell-form-preview
        :list="[
        {
          label: $t('Payment channel'),
          value: item.channel
        },
        {
          label: $t('Transaction date'),
          value: getDateFormat(item.tranDate)
        }
      ]"
      ></cell-form-preview>
    </group>
  </view-box>
</template>
<script>
import {
  XHeader,
  Group,
  Cell,
  Grid,
  GridItem,
  Divider,
  CellFormPreview
} from "vux";
import { mapState } from "vuex";
import { dateFormat } from "vux";
import moment from "moment";
import api from "../api";

export default {
  name: "pushList",
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
    })
  },
  data: function() {
    return {
      isShowNav: this.$route.meta.isShowNav,
      title: this.$route.meta.title,
      showBack: this.$route.meta.showBack
    };
  },
  methods: {
    getDateFormat(date) {
      if (date && date.length === 14)
        return dateFormat(
          new Date(moment(date, "YYYYMMDDHHmmss")),
          "YYYY-MM-DD HH:mm:ss"
        );
      else return dateFormat(new Date(), "YYYY-MM-DD HH:mm:ss");
    },
    goTranInfo(merNo, tranNo) {
      api.tranInfo(merNo, tranNo).then(info => {
        if (info) {
          this.$router.push({
            name: "tranInfo",
            params: { info }
          });
        } else {
          this.$vux.toast.show({
            type: "warn",
            position: "default",
            text: this.$t("Transaction query failed")
          });
        }
      });
    }
  }
};
</script>

<style>
/*列表框内容块大小设置*/
.pushlist-content {
  width: 90%;
  margin-left: 4%;
}
.pushlist-content .weui-cells {
  border-radius: 12px;
}
/*去掉边框*/
.pushlist-content .weui-cells:before {
  border-top: none !important;
}

.pushlist-content .weui-cells:after {
  border-bottom: none !important;
}

.pushlist-content .weui-cell:before {
  border-top: 1px dotted #d9d9d9;
}

/*字体颜色设置*/
.pushlist-content .weui-form-preview__bd {
  color: #333;
}

/*交易提醒*/
.PL-title {
  font-size: 16px;
  margin: 12px 0 0 14px;
}

/*日期*/
.PL-titme {
  font-size: 12px;
  color: #999;
  margin: 4px 0 0 14px;
}

/*交易金额*/
.PL-money {
  text-align: center;
  font-size: 12px;
  color: #999;
  margin-top: 20px;
}

.PL-money p {
  font-size: 18px;
  color: #b6002a;
  margin-bottom: 14px;
}

/*列表样式设置*/
.weui-cell {
  margin-right: 14px;
  padding-right: 0 !important;
  font-size: 12px;
}
</style>
