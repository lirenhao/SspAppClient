<template>
  <view-box body-padding-top="46px" ref="viewBox">
    <x-header
      slot="header"
      style="width:100%;position:absolute;left:0;top:0;z-index:100;"
      :title="$t(title)"
      :left-options="{showBack}"
    >
      <div slot="right" @click="goTranSearch">{{$t('Tran search select')}}</div>
    </x-header>
    <group-title class="Merchant">
      {{tranDate}}
      <span class="Merchants">{{termNo === "" ? merNo : termNo}}</span>
    </group-title>
    <div v-if="tranList.length > 0">
      <grid :show-lr-borders="false" :show-vertical-dividers="false">
        <grid-item :label="$t('Count')">
          <span class="grid-center">{{tranCount}}</span>
        </grid-item>
        <grid-item :label="$t('Total')">
          <span class="grid-center">{{tranTotal}}</span>
        </grid-item>
      </grid>
    </div>
    <div v-if="tranList.length === 0">
      <divider>{{$t('Tran no query to data')}}</divider>
    </div>
    <div v-else class="tranlist">
      <form-preview
        v-for="(item, index) in tranList"
        :key="index"
        @click.native="goTranInfo(item.merNo, item.lsId)"
        :class="item.respCode === '00' ? '' : 'list-failure'"
        :header-value="item.debcreFlag === '1' ? '+' + formatAmt(item.tranAmt) : '-' + formatAmt(item.tranAmt)"
        :header-label="item.channel"
        :body-items="getView(item)"
      ></form-preview>
    </div>
  </view-box>
</template>
<script>
import {
  ViewBox,
  XHeader,
  GroupTitle,
  Grid,
  GridItem,
  Divider,
  FormPreview
} from "vux";
import { mapState } from "vuex";
import { dateFormat, numberComma } from "vux";
import moment from "moment";
import api from "../api";

export default {
  name: "tranList",
  components: {
    ViewBox,
    XHeader,
    GroupTitle,
    Grid,
    GridItem,
    Divider,
    FormPreview
  },
  computed: {
    ...mapState({
      tranList: state => state.tranList,
      tranDate: state => state.tranQuery.tranDate,
      merNo: state => state.tranQuery.merNo,
      tranTotal: state =>
        numberComma(
          state.tranList
            .map(t =>
              parseFloat((t.debcreFlag === "1" ? "+" : "-") + t.tranAmt)
            )
            .reduce((a, b) => a + b, 0)
            .toFixed(2)
        ),
      tranCount: state => state.tranList.length
    })
  },
  created: function() {
    if (!window.localStorage.token) {
      this.$router.push({ name: "login", params: { isClear: false } });
    } else {
      api
        .userInfo()
        .then(data =>
          data.roles.indexOf("admin") > -1 ? "" : (this.termNo = data.termNo)
        );
    }
  },
  data: function() {
    return {
      isShowNav: this.$route.meta.isShowNav,
      title: this.$route.meta.title,
      showBack: this.$route.meta.showBack,
      termNo: ""
    };
  },
  methods: {
    formatAmt(amt) {
      return numberComma(parseFloat(amt).toFixed(2));
    },
    goViewTop() {
      this.$refs.viewBox.scrollTo(0)
    },
    getView(item) {
      return [
        {
          label: dateFormat(
            new Date(moment(item.tranDate + item.tranTime, "YYYYMMDDHHmmss")),
            "YYYY-MM-DD HH:mm:ss"
          ),
          value: item.respCode === "00" ? this.$t("Success") : this.$t("Failed")
        }
      ];
    },
    goTranInfo(merNo, lsId) {
      api.tranInfo(merNo, lsId).then(info => {
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
    },
    goTranSearch() {
      this.$router.replace({
        name: "tranSearch",
        params: { merNo: this.merNo, tranDate: this.tranDate }
      });
    }
  }
};
</script>

<style>
/*title*/
.Merchant {
  font-size: 12px;
  background: #e9e9e9;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  padding-top: 8px;
  padding-bottom: 8px;
}

/*title  右侧文字*/
.Merchants {
  float: right;
}

/*去掉上边框*/
.tranlist .weui-form-preview:before {
  border-top: none !important;
}

/*去掉下边框*/
.tranlist .weui-form-preview__hd:after {
  border-bottom: none !important;
}

/*上半边样式*/
.tranlist .weui-form-preview__hd {
  font-size: 14px;
  color: #101010;
  padding-bottom: 0 !important;
}

/*右半边样式*/
.tranlist .weui-form-preview__hd .weui-form-preview__label {
  color: #101010;
}

/*下半边样式*/
.tranlist .weui-form-preview__bd {
  font-size: 12px !important;
  padding-top: 0 !important;
  line-height: 1 !important;
}

/*收入资金*/
.tranlist .weui-form-preview__hd .weui-form-preview__value {
  font-size: 18px !important;
}

/*交易失败样式*/
.tranlist .list-failure .weui-form-preview__value {
  color: #f04c50;
}

.grid-center {
  display: block;
  text-align: center;
  color: #666;
}
</style>
