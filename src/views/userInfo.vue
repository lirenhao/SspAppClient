<template>
  <div>
    <x-header :title="$t(title)" :left-options="{showBack}"></x-header>
    <div>
      <div class="vux-demo">
        <img slot="icon" src="../assets/mine.png" class="mine" />
        <img slot="icon" src="../assets/merchants.png" class="merchants" />
        <h4>{{userName}}</h4>
      </div>
      <div>
        <div class="mine-list marginT">
          <cell :title="$t('Merchant number')">
            <x-icon
              style="fill: #8ed8fa; margin-right: 8px; margin-left: -16px"
              slot="icon"
              type="ios-home"
            />
            <span>{{merNo}}</span>
          </cell>
        </div>
        <div class="mine-list">
          <cell :title="$t('Terminal number')">
            <x-icon
              style="fill: #ca9ac6; margin-right: 9px; margin-left: -14px; width: 22px;"
              slot="icon"
              type="android-desktop"
            />
            <span>{{termNo}}</span>
          </cell>
        </div>
        <div class="mine-list">
          <cell :title="$t('Tran currency')">
            <x-icon
              style="fill: #8dd531; margin-right: 8px; margin-left: -16px;"
              slot="icon"
              type="social-usd"
            />
            <span>{{ccyType.ccyEname}}</span>
          </cell>
        </div>
        <div class="mine-list" @click="setRefund" v-if="isAdmin">
          <cell :title="$t('Refund settings')" is-link>
            <x-icon
              style="fill: #f06074; margin-right: 8px; margin-left: -16px;"
              slot="icon"
              type="settings"
            />
          </cell>
        </div>
        <div class="mine-list" @click="updatePwd">
          <cell :title="$t('Change password')" is-link>
            <x-icon
              style="fill: #f06474; margin-right: 8px; margin-left: -16px;"
              slot="icon"
              type="android-lock"
            />
          </cell>
        </div>
        <div class="mine-list" @click="goHelp">
          <cell :title="$t('Help Center')" is-link>
            <x-icon
              style="fill: #f8d743; margin-right: 8px; margin-left: -16px;"
              slot="icon"
              type="help-circled"
            />
          </cell>
        </div>
        <div class="mine-list" @click="logout">
          <cell :title="$t('Login out')" is-link>
            <x-icon
              style="fill: #B6002A; margin-right: 8px; margin-left: -16px;"
              slot="icon"
              type="log-out"
            />
          </cell>
        </div>
      </div>
    </div>
    <div v-transfer-dom>
      <confirm
        v-model="showOpenRefund"
        show-input
        :title="$t('Refund settings')"
        :placeholder="$t('Settings refund password')"
        :input-attrs="{type: 'password', placeholder: '设置退货密码'}"
        @on-confirm="openRefund"
      ></confirm>
    </div>
    <div v-transfer-dom>
      <confirm v-model="showCloseRefund" :title="$t('Refund settings')" @on-confirm="closeRefund">
        <p style="text-align:center;">Refund has been opened.</p>
        <p style="text-align:center;">Are you sure to close?</p>
      </confirm>
    </div>
  </div>
</template>
<script>
import {
  XHeader,
  Group,
  Cell,
  Confirm,
  TransferDomDirective as TransferDom
} from "vux";
import api from "../api";

export default {
  name: "userInfo",
  directives: {
    TransferDom
  },
  components: {
    XHeader,
    Group,
    Cell,
    Confirm
  },
  created: function() {
    if (!window.localStorage.token) {
      this.$router.push({ name: "login", params: { isClear: false } });
    } else {
      api.userInfo().then(data => {
        this.isAdmin = data.roles.indexOf("admin") > -1;
        this.merNo = data.merNo;
        this.userName = data.userName;
        this.termNo = data.termNo;
        this.ccyType = data.ccyType;
      });
    }
  },
  data: function() {
    return {
      isShowNav: this.$route.meta.isShowNav,
      title: this.$route.meta.title,
      showBack: this.$route.meta.showBack,
      isAdmin: false,
      merNo: "",
      userName: "",
      termNo: "",
      ccyType: {},
      showOpenRefund: false,
      showCloseRefund: false
    };
  },
  methods: {
    logout() {
      // 解除设备绑定
      api
        .unBindPush()
        .then(data => {
          if (data) {
            window.localStorage.removeItem("token");
            this.$router.replace({ name: "login", params: { isClear: false } });
          } else {
            this.$vux.alert.show({
              title: this.$t("Login out faild"),
              content: this.$t("Please try again later")
            });
          }
        })
        .catch(e => {
          console.log("Login out", e);
          if (!e.response || e.response.status !== 401) {
            this.$vux.alert.show({
              title: this.$t("Login out faild"),
              content: this.$t("Please check the network status")
            });
          }
        });
    },
    setRefund() {
      api
        .setRefund()
        .then(data =>
          data ? (this.showCloseRefund = true) : (this.showOpenRefund = true)
        )
        .catch(e => {
          if (!e.response || e.response.status !== 401) {
            this.$vux.alert.show({
              title: this.$t("Refund settings faild"),
              content: this.$t("Please check the network status")
            });
          }
        });
    },
    openRefund(value) {
      api
        .openRefund(value)
        .then(data => {
          if (data) {
            this.$vux.alert.show({
              title: this.$t("Refund settings success"),
              content: this.$t("Refund has been opened")
            });
          } else {
            this.$vux.alert.show({
              title: this.$t("Refund settings faild"),
              content: this.$t("Please check the network status")
            });
          }
        })
        .catch(e => {
          console.log("Open refund", e);
          if (!e.response || e.response.status !== 401) {
            this.$vux.alert.show({
              title: this.$t("Refund settings faild"),
              content: this.$t("Please check the network status")
            });
          }
        });
    },
    closeRefund() {
      api
        .closeRefund()
        .then(data => {
          if (data) {
            this.$vux.alert.show({
              title: this.$t("Refund settings success"),
              content: this.$t("Refund has been closed")
            });
          } else {
            this.$vux.alert.show({
              title: this.$t("Refund settings faild"),
              content: this.$t("Please check the network status")
            });
          }
        })
        .catch(e => {
          console.log("Close refund", e);
          if (!e.response || e.response.status !== 401) {
            this.$vux.alert.show({
              title: this.$t("Refund settings faild"),
              content: e.message
            });
          }
        });
    },
    updatePwd() {
      this.$router.push({ name: "updatePwd" });
    },
    goHelp() {
      this.$vux.alert.show({
        title: this.$t("Help Center"),
        content: this.$t("Help Alert")
      });
    }
  }
};
</script>

<style scoped>
/*修改头部白色边框*/
.vux-header {
  padding: 4px 0 !important;
}

/*个人中心 背景*/
.mine {
  width: 100%;
  margin-top: -2px;
}

/*个人用户默认头像*/
.merchants {
  position: absolute;
  width: 50px;
  left: 18%;
  top: 96px;
}

/*个人中心 昵称*/
.vux-demo h4 {
  position: absolute;
  left: 35%;
  top: 100px;
  font-size: 26px;
  color: #fff;
  font-weight: 500;
}

/*间距设置*/
.marginT {
  margin-top: 14px;
}

/*个人中心 功能列表*/
.mine-list {
  font-size: 14px;
  margin-left: 16px;
  border-bottom: 1px solid #eee;
}

/*列表 右侧文字设置*/
.mine-list span {
  font-size: 12px;
  color: #999;
}
</style>
