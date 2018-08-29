<template>
  <div class="login-bg">
    <img slot="icon" src="../assets/logo.png" class="logo">
    <div class="login-box">
      <div class="login-input">
        <x-input class="text-box" title="商户号" v-model="merNo" placeholder="请输入商户号">
          <x-icon style="fill: #fff;" slot="label" type="compose" />
        </x-input>
      </div>
      <div class="login-input">
        <x-input class="text-box" title="用户" v-model="loginName" placeholder="请输入用户名">
          <x-icon style="fill: #fff;" slot="label" type="person" />
        </x-input>
      </div>
      <div class="login-input">
        <x-input class="text-box" title="密码" v-model="passWord" placeholder="请输入密码" type="password">
          <x-icon style="fill: #fff;" slot="label" type="android-lock" />
        </x-input>
      </div>
      <x-button class="login-btn" @click.native="click" text="登 录"/>
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
            text: '请输入用户名或密码'
          })
        }
      },
      clear() {
        this.$router.go(-1)
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
    width: 38%;
    margin-left: 31%;
    margin-top: 70px;
    margin-bottom: 30px;
  }

  .login-input {
    width: 74%;
    margin-left: 13%;
    background: none;
    border-bottom: 1px solid #fff;
    height: 42px;
    margin-top: 20px;
  }


  /*登录页输入框宽度调整*/
  .text-box {
    font-size: 13px;
    padding: 8px 0 !important;
    text-indent: .3em;
    color: #fff;
  }
  /*登录按钮*/
  .login-btn {
    width: 74%;
    height: 42px;
    margin-left: 13%;
    background: none;
    color: #fff;
    border: 1px solid #fff;
    font-size: 16px;
    margin-top: 56px;
    border-radius: 2px;
    text-align: center;
  }
  .weui-btn:after {
    border: none;
  }


</style>
