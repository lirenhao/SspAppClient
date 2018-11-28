<template>
  <div>
    <x-header :title="$t(title)" :left-options="{showBack}">
    </x-header>
    <div class="Change-password">
        <br/>
        <x-input v-model="oldPwd" type="password" :placeholder="$t('Fill in the old password')" required>
          <x-icon style="fill: #999; margin: 1px 4px 0 0" slot="label" type="android-lock" />
        </x-input>
        <x-input v-model="newPwd" type="password" :placeholder="$t('Fill in the new password')" required>
          <x-icon style="fill: #999; margin: 1px 4px 0 0" slot="label" type="android-lock" />
        </x-input>
        <x-input v-model="valiPwd" type="password" :placeholder="$t('Fill in again to confirm')" required>
          <x-icon style="fill: #999; margin: 1px 4px 0 0" slot="label" type="android-lock" />
        </x-input>
        <x-input> </x-input>
        <x-button class="general-btn" type="primary" @click.native="goUpdatePwd">{{$t('Confirm the changes')}}</x-button>
    </div>
  </div>
</template>
<script>
import {XHeader, Group, XInput, XButton} from 'vux';
import api from '../api';

export default {
  name: 'updatePwd',
  components: {
    XHeader,
    Group,
    XInput,
    XButton,
  },
  created: function() {
    if (!window.localStorage.token) {
      this.$router.push({name: 'login', params: {isClear: false}});
    }
  },
  data: function() {
    return {
      isManager: false,
      isShowNav: this.$route.meta.isShowNav,
      title: this.$route.meta.title,
      showBack: this.$route.meta.showBack,
      oldPwd: '',
      newPwd: '',
      valiPwd: '',
    };
  },
  methods: {
    goUpdatePwd() {
      if(this.oldPwd === '' || this.newPwd === '' || this.valiPwd === ''){
        this.$vux.toast.show({
          type: 'warn',
          position: 'default',
          text: this.$t('Input error')
        })
        return
      }
      if (this.newPwd === this.valiPwd)
        api.userUpdatePwd(this.oldPwd, this.newPwd)
          .then(data => {
            if(data) {
              this.$vux.toast.show({
                type: 'success',
                position: 'default',
                text: this.$t('Password modified successfully')
              })
              this.$router.go(-1)
            } else
              this.$vux.toast.show({
                type: 'warn',
                position: 'default',
                text: this.$t('Old password failed')
              })
          })
      else
        this.$vux.toast.show({
          type: 'warn',
          position: 'default',
          text: this.$t('New password two input mismatch')
        })
    },
  },
};
</script>

<style scoped>
  .general-btn {
    width: 66%;
    height: 38px;
    margin-left: 17%;
    background: #67A2F9;
    color: #fff;
    border: none;
    font-size: 15px;
    margin-top: 56px;
    border-radius: 4px;
    text-align: center;
  }
  .weui-btn:after {
    border: none !important;
  }
  .Change-password .weui-cell {
    font-size: 13px;
    padding: 6px 15px;
  }
  .weui-input {
    height: 2.411765em !important;
  }

</style>
