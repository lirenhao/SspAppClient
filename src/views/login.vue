<template>
  <div class="login-bg">
    <img slot="icon" src="../assets/BankOfChina.png" class="logo">
    <div class="login-box">
      <div class="login-input">
        <x-input class="text-box" v-model="merNo" :placeholder="$t('Please enter merchant number')">
          <x-icon style="fill: #101010;" slot="label" type="compose" />
        </x-input>
      </div>
      <div class="login-input">
        <x-input class="text-box" v-model="loginName" :placeholder="$t('Please enter login name')">
          <x-icon style="fill: #101010;" slot="label" type="person" />
        </x-input>
      </div>
      <div class="login-input">
        <x-input class="text-box" v-model="passWord" :placeholder="$t('Please enter password')" type="password">
          <x-icon style="fill: #101010;" slot="label" type="android-lock" />
        </x-input>
      </div>
      <a class="help" @click="goHelp">{{$t('Help')}}</a>
      <x-button class="login-btn" @click.native="click" :text="$t('Login')"/>
      <div class="close-btn" v-if="isClear">
        <x-icon style="fill: rgba(255,255,255,0.31); position: fixed; top: 20px; right: 20px; " @click.native="clear" type="android-close"></x-icon>
      </div>
    </div>
  </div>
</template>
<script>
  import {XButton, XInput} from 'vux'
  import api from '../api'

  export default {
    name: 'login',
    components: {
      XButton,
      XInput
    },
    props: {
      isClear: {
        type: Boolean,
        default: true
      }
    },
    data: function () {
      return {
        merNo: '',
        loginName: '',
        passWord: ''
      }
    },
    methods: {
      click() {
        const merNo = this.$data.merNo
        const loginName = this.$data.loginName
        const passWord = this.$data.passWord
        if (merNo !== '' && loginName !== '' && passWord !== '') {
          api.login(`${merNo}@${loginName}`, passWord)
        } else {
          this.$vux.toast.show({
            type: 'warn',
            position: 'default',
            text: this.$t('Login validation failed')
          })
        }
      },
      clear() {
        this.$router.go(-1)
      },
      goHelp() {
        this.$vux.alert.show({
          title: this.$t('Help Center'),
          content: this.$t('Help Alert')
        });
      }
    }
  }
</script>

<style scoped>
  /*登陆大背景*/
  .login-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-image: url("../assets/login-bg.jpg");
  }

  /*登陆页logo*/
  .logo {
    width: 46%;
    margin-left: 27%;
    margin-top: 70px;
    margin-bottom: 30px;
  }

  .login-input {
    width: 74%;
    margin-left: 13%;
    background: none;
    border-bottom: 1px solid #CCC;
    height: 42px;
    margin-top: 14px;
  }

  /*登录页输入框宽度调整*/
  .text-box {
    font-size: 13px;
    padding: 8px 0 !important;
    text-indent: .3em;
    color: #101010;
  }

  /*帮助中心*/
  .help {
    float: right;
    margin-right: 12%;
    margin-top: 8px;
    font-size: 12px;
    color: #666;
  }
  /*登录按钮*/
  .login-btn {
    width: 74%;
    height: 40px;
    margin-left: 13%;
    background: #B6002A;
    border-radius: 4px;
    color: #fff;
    font-size: 16px;
    margin-top: 56px;
    text-align: center;
  }
  .weui-btn:after {
    border: none;
  }

</style>
