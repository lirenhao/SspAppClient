<template>
  <div>
    <x-header :title="$t(title)" :left-options="{showBack}"></x-header>
    <group class="traninfo-page">
      <div class="TI-money">
        {{ccyType.ccySymbol}} {{formatAmt((info.debcreFlag === "1" ? "+" : "-") + info.tranAmt)}}
        <p>{{info.merName}}</p>
      </div>
      <cell-form-preview :list="parserItem(info)"></cell-form-preview>
      <div class="state" v-if="info.respCode === '00'">
        <x-icon style="margin-bottom: -7px; fill: #0BB20C; " type="android-checkmark-circle"/>
        {{$t('Transaction successful')}}
      </div>
      <div class="state" v-else>
        <x-icon style="margin: 0 4px -7px 0; fill: red; " type="close-circled"/>
        {{$t('Transaction failed')}}
      </div>
      <div class="state" v-if="'125'.indexOf(info.tranFlag) < 0">
        <x-button class="refund-btn" @click.native="showRefundPwd = true">Refund</x-button>
      </div>
      <div class="state" v-if="'1' === info.tranFlag">
        {{$t('已撤销')}}
      </div>
      <div class="state" v-if="'2' === info.tranFlag">
        {{$t('已退货')}}
      </div>
      <div class="state" v-if="'5' === info.tranFlag">
        {{$t('退货中')}}
      </div>
    </group>
    <div v-transfer-dom>
      <confirm
        v-model="showRefundPwd"
        show-input
        :title="$t('Refund')"
        :placeholder="$t('Refund password')"
        :input-attrs="{type: 'password'}"
        @on-confirm="goRefund"
      ></confirm>
    </div>
  </div>
</template>
<script>
import {
  XHeader,
  Group,
  Cell,
  CellFormPreview,
  XButton,
  Confirm,
  TransferDomDirective as TransferDom
} from "vux";
import { dateFormat, numberComma } from "vux";
import moment from "moment";
import api from "../api";

export default {
  name: "tranInfo",
  directives: {
    TransferDom
  },
  components: {
    XHeader,
    Group,
    Cell,
    CellFormPreview,
    XButton,
    Confirm
  },
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  created: function() {
    if (!window.localStorage.token) {
      this.$router.push({ name: "login", params: { isClear: false } });
    } else {
      api.userInfo().then(data => (this.ccyType = data.ccyType));
    }
  },
  data: function() {
    return {
      isShowNav: this.$route.meta.isShowNav,
      title: this.$route.meta.title,
      showBack: this.$route.meta.showBack,
      ccyType: {},
      showRefundPwd: false
    };
  },
  methods: {
    formatAmt(amt) {
      return numberComma(parseFloat(amt).toFixed(2));
    },
    parserItem(item) {
      const body = [];
      body.push({ label: this.$t("Merchant number"), value: item.merNo });
      body.push({ label: this.$t("Terminal number"), value: item.termNo });
      body.push({ label: this.$t("Transaction type"), value: item.tranType });
      body.push({ label: this.$t("Merchant order"), value: item.traceNo });
      body.push({ label: this.$t("Payment channel"), value: item.channel });
      body.push({
        label: this.$t("Transaction date"),
        value: this.getDateFormat(item.tranDate + item.tranTime)
      });
      return body;
    },
    getDateFormat(date) {
      if (date && date.length === 14)
        return dateFormat(
          new Date(moment(date, "YYYYMMDDHHmmss")),
          "YYYY-MM-DD HH:mm:ss"
        );
      else return dateFormat(new Date(), "YYYY-MM-DD HH:mm:ss");
    },
    goRefund(pwd) {
      const regu = /^.{6,32}$/
      if (regu.test(pwd)) {
        api
          .refund(this.info.tranAmt, this.info.lsId, pwd)
          .then(data => {
            if (data.respCode === "00") {
              this.$vux.alert.show({
                title: this.$t("Refund success"),
                content: this.$t("Return has been accepted"),
                onHide: () => this.$router.back()
              });
            } else {
              this.$vux.alert.show({
                title: this.$t("Refund faild"),
                content: data.respMsg,
                onHide: () => this.$router.back()
              });
            }
          })
          .catch(e => {
            console.log("Refund faild", e);
            switch (err.status) {
              case 500:
                this.$vux.alert.show({
                  title: this.$t("Refund faild"),
                  content: this.$t("Refund password error")
                });
                break;
              default:
                this.$vux.alert.show({
                  title: this.$t("Refund faild"),
                  content: this.$t("Please check the network status"),
                  onHide: () => this.$router.back()
                });
            }
          });
      } else {
        this.$vux.alert.show({
          title: this.$t("Refund warning"),
          content: this.$t("Refund password error")
        });
      }
    }
  }
};
</script>

<style>
/*交易详情内容块设置*/
.traninfo-page {
  width: 92%;
  margin-left: 4%;
}

/*圆角设置*/
.traninfo-page .weui-cells {
  border-radius: 4px;
  font-size: 12px;
}

/*删除边框*/
.traninfo-page .weui-cells:before {
  border-top: none !important;
}

.traninfo-page .weui-cells:after {
  border-bottom: none !important;
}

.traninfo-page:before,
.traninfo-page:after {
  content: " ";
  position: absolute;
  z-index: 999;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  top: 142px;
  background: #f9f9f9;
}

.traninfo-page:before {
  left: 6px;
}

.traninfo-page:after {
  right: 6px;
}

/*价格*/
.traninfo-page .TI-money {
  text-align: center;
  font-size: 18px;
  color: #b6002a;
  padding: 30px 0 20px 0;
  min-height: 42px !important;
}

/*商户*/
.TI-money p {
  font-size: 12px;
  color: #333;
}

/*上边框设置*/
.traninfo-page .weui-cell:before {
  border-top: 1px dotted #d9d9d9;
}

/*字体颜色设置*/
.traninfo-page .weui-form-preview__value {
  color: #333;
}

/*交易结果状态展示*/
.traninfo-page .state {
  padding: 12px;
  font-size: 18px;
  text-align: center;
  border-top: 1px dotted #d9d9d9;
}
.refund-btn {
  margin-top: 80px;

}

</style>
