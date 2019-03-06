<template>
  <div class="blue-bg">
    <x-header :title="$t(title)" :left-options="{showBack}"></x-header>
    <div class="code-show">
      <div class="show-title">
        <p>{{$t('Collecting money from customers')}}</p>
      </div>
      <p class="code-price">{{ccyType.ccySymbol}} {{formatAmt(tranAmt)}}</p>
      <qrcode :value="qrCode" type="img" :size="qrCodeSize" class="code-img"></qrcode>
    </div>
    <div class="Payment-type">
      {{$t('Payment channel')}}:
      <span>{{channelName}}</span>
    </div>
    <div class="code-time">
      <span>
        <em>{{$t('Countdown')}}</em>
        {{timecunt}}
        <em>S</em>
      </span>
    </div>
    <div class="show-titme" v-if="showTimeout">
      <img src="../assets/clock.png" class="clock">
      <div class="timeout">{{$t('The payment code has expired')}}...</div>
      <x-button @click.native="goSetAmt">{{$t('New generation again')}}</x-button>
    </div>
  </div>
</template>
<script>
import {
  XHeader,
  Qrcode,
  XInput,
  XButton,
  XDialog,
  TransferDomDirective as TransferDom
} from "vux";
import { numberComma, dateFormat } from "vux";
import api from "../api";
import urls from "../api/urls";

export default {
  name: "createCode",
  directives: {
    TransferDom
  },
  components: {
    XHeader,
    Qrcode,
    XInput,
    XButton,
    XDialog
  },
  props: {
    qrCode: String,
    queryNo: String,
    tranAmt: String,
    tranCry: String,
    timeout: Number,
    channel: String
  },
  created: function() {
    if (!window.localStorage.token) {
      this.$router.push({ name: "login", params: { isClear: false } });
    } else {
      api.userInfo().then(data => {
        this.ccyType = data.ccyType;
      });
      switch (this.channel) {
        case "01":
          this.channelName = "UnionPay";
          break;
        case "02":
          this.channelName = "WeChat";
          break;
        case "03":
          this.channelName = "Alipay";
          break;
        default:
      }
      this.timer = setInterval(() => {
        if (this.timecunt > 0) {
          this.timecunt--;
        } else {
          clearInterval(this.timer);
        }
      }, 1000);
    }
  },
  data: function() {
    return {
      isShowNav: this.$route.meta.isShowNav,
      title: this.$route.meta.title,
      showBack: this.$route.meta.showBack,
      ccyType: {},
      timecunt: this.timeout,
      showTimeout: false,
      request: true,
      qrCodeSize: document.documentElement.clientWidth * 0.75,
      channelName: ""
    };
  },
  methods: {
    goSetAmt() {
      this.$router.replace({
        name: "setAmt",
        params: { tranAmt: this.tranAmt }
      });
    },
    formatAmt(amt) {
      return numberComma(parseFloat(amt).toFixed(2));
    }
  },
  watch: {
    timecunt: function(newValue, oldValue) {
      if (newValue === 0) {
        clearInterval(this.timer);
        this.showTimeout = true;
      } else {
        if ((this.timeout - newValue) % 5 === 0 && this.request) {
          this.request = false;
          this.$http
            .get(`${urls.qrCodeQuery}/${this.queryNo}`, {
              headers: { Authorization: `bearer ${window.localStorage.token}` }
            })
            .then(resp => {
              if (resp.status === 200 && resp.data && resp.data.respCode) {
                if (resp.data.respCode === "success") {
                  this.$store.commit("ADD_PUSH_LIST", {
                    lsId: resp.data.lsId,
                    merNo: window.localStorage.merNo,
                    tranAmt: resp.data.tranAmt,
                    tranCry: resp.data.tranCry,
                    tranDate: dateFormat(new Date(), "YYYYMMDD"),
                    tranTime: dateFormat(new Date(), "HHmmss"),
                    debcreFlag: "1",
                    channel: this.channelName
                  });
                  return this.$router.replace({
                    name: "payResult",
                    params: { result: true }
                  });
                } else if (resp.data.respCode === "failed") {
                  return this.$router.replace({
                    name: "payResult",
                    params: { result: false, failMsg: resp.data.respMsg }
                  });
                }
              }
              return Promise.reject();
            })
            .catch(() => (this.request = true));
        }
      }
    }
  },
  destroyed: function() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped>
/*二维码展示区域*/
.code-show {
  width: 80%;
  margin-left: 10%;
  margin-top: 60px;
  text-align: center;
  background: #fff;
  border-radius: 8px;
}

/*二维码标题*/
.show-title {
  width: 100%;
  height: 40px;
  background: rgba(182, 0, 42, 0.2);
  border-radius: 8px 8px 0 0;
  text-align: left;
  font-size: 14px;
}

.show-title p {
  padding: 10px 0 0 16px;
}

/*二维码*/
.code-img {
  margin: 20px 0;
  padding-bottom: 20px;
}

/*订单提示语*/
.code-prompt {
  display: block;
  font-size: 12px;
  color: #999;
  height: 30px;
}

/*支付类型*/
.Payment-type {
  float: left;
  font-size: 12px;
  color: #999;
  margin: 6px 0 0 38px;
}

.Payment-type span {
  color: #010101;
}

/*倒计时*/
.code-time {
  float: right;
  font-size: 16px;
  color: #b6002a;
  margin-right: 38px;
}

/*倒计时*/
.code-time em {
  font-style: normal;
  font-size: 12px;
  color: #999;
}

/*收款价格*/
.code-price {
  font-size: 18px;
  font-weight: 500;
  margin: 20px 0 -8px 0;
}

/*超时提示*/
.show-titme {
  position: absolute;
  z-index: 999;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.88);
}

/*超时图片*/
.clock {
  width: 40%;
  margin-left: 30%;
  margin-top: 160px;
}

/*超时文字提醒*/
.timeout {
  text-align: center;
  color: #fff;
  font-size: 14px;
  margin: 18px 0;
}

/*重新生成按钮*/
.show-titme button {
  width: 50%;
  color: #fff;
  font-size: 14px;
  background: none;
  border: 1px solid #fff;
  margin-top: 50px;
}
</style>
