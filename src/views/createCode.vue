<template>
  <div class="blue-bg">
    <x-header style="width:100%;position:absolute;left:0;top:0;z-index:100;"
              :title="$t(title)" :left-options="{showBack}">
    </x-header>
    <div class="code-show">
      <div class="show-title">
        <p>{{$t('Collecting money from customers')}}</p>
        <div class="code-time">
          <span>
            <em>{{$t('Countdown')}}</em> {{timecunt}} <em>S</em>
          </span>
        </div>
      </div>
      <p class="code-price">￥{{tranAmt}}</p>
      <qrcode :value="qrCode" type="img" class="code-img"></qrcode>
      <span class="code-prompt">{{$t('Pay the wait')}}...</span>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="showTimeout">
        <img src=../assets/clock.png">
        <div>付款码超时了...</div>
        <x-button @click.native="goSetAmt">重新生成</x-button>
      </x-dialog>
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
  TransferDomDirective as TransferDom,
} from 'vux';
import api from '../api';
import urls from '../api/urls';

export default {
  name: 'createCode',
  directives: {
    TransferDom,
  },
  components: {
    XHeader,
    Qrcode,
    XInput,
    XButton,
    XDialog,
  },
  props: {
    qrCode: String,
    queryNo: String,
    tranAmt: String,
    tranCry: String,
    timeout: Number,
  },
  created: function() {
    if (!window.localStorage.token) {
      this.$router.push({name: 'login', params: {isClear: false}});
    } else {
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
      timecunt: this.timeout,
      showTimeout: true,
      request: true,
    };
  },
  methods: {
    goSetAmt() {
      this.$router.replace({name: 'setAmt', params: {tranAmt: this.tranAmt}});
    },
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
              headers: {Authorization: `bearer ${window.localStorage.token}`},
            })
            .then(resp => {
              if (resp.status === 200) {
                if (resp.data && resp.data.respCode === '00') {
                  this.$router.replace({
                    name: 'payResult',
                    params: {result: true},
                  });
                } else {
                  this.$router.replace({
                    name: 'payResult',
                    params: {result: false},
                  });
                }
              } else {
                this.request = true;
              }
            })
            .catch(() => (this.request = true));
        }
      }
    },
  },
  destroyed: function() {
    clearInterval(this.timer);
  },
};
</script>

<style scoped>
.blue-bg {
  margin-top: -46px;
  padding-top: 80px;
  padding-bottom: 20px;
  width: 100%;
  height: 100%;
  background: #67a2f9;
}

.code-show {
  width: 80%;
  margin-left: 10%;
  text-align: center;
  background: #fff;
  border-radius: 8px;
}

.show-title {
  width: 100%;
  height: 40px;
  background: #e3eaf4;
  border-radius: 8px 8px 0 0;
  text-align: left;
  font-size: 14px;
  color: #5799f9;
}
.show-title p {
  padding: 10px 0 0 16px;
}
.code-img {
  margin: 20px 0;
}
.code-prompt {
  display: block;
  font-size: 12px;
  color: #999;
  height: 30px;
}
.code-time {
  float: right;
  font-size: 16px;
  color: red;
  margin: -22px 12px 0 0;
}

.code-time em {
  font-style: normal;
  font-size: 12px;
  color: #999;
}

.code-price {
  font-size: 18px;
  font-weight: 500;
  margin: 20px 0 -8px 0;
}
</style>
