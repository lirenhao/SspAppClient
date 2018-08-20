<template>
  <div>
    <x-header style="width:100%;position:absolute;left:0;top:0;z-index:100;"
              :title="title" :left-options="{showBack}">
      <div slot="right" @click="goUpdatePwd">确认</div>
    </x-header>
    <div>
      <group title="原密码">
        <x-input v-model="oldPwd" type="password" placeholder="填写原密码" required></x-input>
      </group>
      <group title="新密码">
        <x-input v-model="newPwd" type="password" placeholder="填写新密码" required></x-input>
      </group>
      <group title="确认密码">
        <x-input v-model="valiPwd" type="password" placeholder="再次填写确认" required></x-input>
      </group>
    </div>
  </div>
</template>
<script>
import {XHeader, Group, XInput} from 'vux';
import api from '../api';

export default {
  name: 'updatePwd',
  components: {
    XHeader,
    Group,
    XInput,
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
          text: '输入错误'
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
                text: '密码修改成功'
              })
              this.$router.go(-1)
            } else
              this.$vux.toast.show({
                type: 'warn',
                position: 'default',
                text: '原密码错误'
              })
          })
      else
        this.$vux.toast.show({
          type: 'warn',
          position: 'default',
          text: '密码不配'
        })
    },
  },
};
</script>

<style scoped>
</style>
