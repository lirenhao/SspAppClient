<template>
  <div>
    <x-header style="width:100%;position:absolute;left:0;top:0;z-index:100;"
              :title="$t(title)" :left-options="{showBack}">
    </x-header>
    {{result}}
    <x-button @click.native="goBack">确定</x-button>
  </div>
</template>
<script>
import {XHeader, XButton} from 'vux';

export default {
  name: 'payResult',
  components: {
    XHeader,
    XButton,
  },
  props: {
    result: Boolean,
  },
  data: function() {
    return {
      isShowNav: this.$route.meta.isShowNav,
      title: this.$route.meta.title,
      showBack: this.$route.meta.showBack,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
</style>
