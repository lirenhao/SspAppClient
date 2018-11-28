<template>
  <div id="app" style="position:absolute;width:100%;height:100%;">
    <loading :show="isLoading"></loading>
    <router-view></router-view>
  </div>
</template>

<script>
  import {XHeader, Loading} from 'vux'
  import {mapState} from 'vuex'

  export default {
    name: 'app',
    components: {
      XHeader,
      Loading
    },
    computed: {
      ...mapState({
        isLoading: state => state.isLoading
      }),
      isShowNav() {
        return this.$route.meta.isShowNav
      },
      title() {
        return this.$route.meta.title
      },
      leftOptions: function () {
        return {
          showBack: this.$route.meta.showBack
        }
      }
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';

  body {
    background-color: #f9f9f9;
  }
  .vux-header .vux-header-title {
    font-size: 16px !important;
  }
</style>
