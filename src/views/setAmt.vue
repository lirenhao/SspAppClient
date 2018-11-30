<template>
  <div>
    <x-header :title="$t(title)" :left-options="{showBack}"></x-header>
    <div class="Payment-options">
      <group class="money-title" :title="$t('Please choose the payment channel')"></group>
      <br>
      <grid>
        <checker v-model="channel" :radio-required="true"
          default-item-class="channel-item" selected-item-class="channel-item-selected">
          <checker-item value="01" class="weui-grid">
            <img class="weui-grid__icon" src="../assets/UnionPay.png">
            <span class="weui-grid__label">{{$t('UnionPay')}}</span>
          </checker-item>
          <checker-item value="02" class="weui-grid">
            <img class="weui-grid__icon" src="../assets/WeChat.png">
            <span class="weui-grid__label">{{$t('WeChat')}}</span>
          </checker-item>
          <checker-item value="03" class="weui-grid">
            <img class="weui-grid__icon" src="../assets/Alipay.png">
            <span class="weui-grid__label">{{$t('Alipay')}}</span>
          </checker-item>
        </checker>
      </grid>
    </div>
    <div class="BG">
      <group class="money-title" :title="$t('Please enter the payment amount')"></group>
      <div class="money-box">
        <label class="money">{{ccyType.ccySymbol}}</label>
        <input
          class="money-input"
          v-model="amt"
          type="number"
          step="0.01"
          :placeholder="ccyType.ccyEname"
        >
      </div>
    </div>
    <x-button
      class="general-btn"
      type="primary"
      @click.native="goCreateCode"
    >{{$t('Generate QR code')}}</x-button>
  </div>
</template>
<script>
import {
  XHeader,
  Group,
  Grid,
  GridItem,
  XInput,
  XButton,
  Radio,
  Checker,
  CheckerItem
} from "vux";
import api from "../api";

export default {
  name: "setAmt",
  components: {
    XHeader,
    Group,
    Grid,
    GridItem,
    XInput,
    XButton,
    Radio,
    Checker,
    CheckerItem
  },
  created: function() {
    if (!window.localStorage.token) {
      this.$router.push({ name: "login", params: { isClear: false } });
    } else {
      api.userInfo().then(data => (this.ccyType = data.ccyType));
    }
  },
  props: {
    tranAmt: String
  },
  data: function() {
    return {
      isShowNav: this.$route.meta.isShowNav,
      title: this.$route.meta.title,
      showBack: this.$route.meta.showBack,
      amt: this.tranAmt ? this.tranAmt : "",
      ccyType: {},
      channel: "01",
      options: [
        {
          key: "01",
          value: this.$t("UnionPay")
        },
        {
          key: "02",
          value: this.$t("WeChat")
        },
        {
          key: "03",
          value: this.$t("Alipay")
        }
      ]
    };
  },
  methods: {
    validAmount(amt) {
      const regex = /^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/;
      if (regex.test(amt)) {
        return { valid: true };
      }
      return { valid: false, msg: this.$t("Amount input error") };
    },
    goCreateCode() {
      if (this.amt !== "" && this.validAmount(this.amt).valid) {
        api.qrCodeCreate(this.amt, this.channel).then(data => {
          if (data) {
            if (data.respCode && data.respCode === "00") {
              this.$router.replace({
                name: "createCode",
                params: { ...data, timeout: parseInt(data.timeout) }
              });
            } else {
              this.$vux.toast.show({
                type: "warn",
                position: "default",
                text: this.$t("QrCode create failed")
              });
            }
          } else {
            this.$vux.toast.show({
              type: "warn",
              position: "default",
              text: this.$t("QrCode create failed")
            });
          }
        });
      } else {
        this.$vux.toast.show({
          type: "warn",
          position: "default",
          text: this.$t("Amount input error")
        });
      }
    }
  }
};
</script>

<style scoped>
/*输入金额修改为白色背景*/
.BG {
  background: #fff;
  margin-top: -0.77em;
  padding: 30px 0;
}

/*支付选择*/
.Payment-options {
  background: #fff;
  margin-top: 16px;
  padding-top: 12px;
}

.Payment-options .money-title {
  margin-bottom: -10px;
}

/*标题*/
.money-title {
  margin-left: 10px;
}

/*金额图标*/
.money {
  font-size: 38px;
  margin-bottom: 12px;
}

/*输入金额框*/
.money-box {
  width: 84%;
  height: 60px;
  margin-left: 8%;
  border-bottom: 1px solid #d9d9d9;
}

/*输入框*/
.money-input {
  width: 84%;
  height: 38px;
  background: none;
  border: none;
  outline: medium;
  font-size: 38px;
}

/*间距调整*/
.weui-cell {
  padding-left: 0 !important;
  padding-bottom: 0 !important;
}

/*按钮*/
.general-btn {
  width: 66%;
  height: 38px;
  margin-left: 17%;
  color: #fff;
  border: none;
  font-size: 15px;
  margin-top: 96px;
  border-radius: 4px;
  text-align: center;
}

/*删除按钮边框*/
.weui-btn:after {
  border: none !important;
}

.channel-item {
  text-align: center;
  background-color: #fff;
}
.channel-item-selected {
  background: #b81c22;
  border-color: #ff4a00;
}
</style>
