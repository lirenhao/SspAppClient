<template>
  <div>
    <x-header style="width:100%;position:absolute;left:0;top:0;z-index:100;"
              :title="$t(title)" :left-options="{showBack}">
    </x-header>
    <div>
      <div v-if="pushList.length === 0">
        <divider>{{$t('Tran push no data')}}</divider>
      </div>
      <div v-else>
        <div v-for="(item, index) in pushList" :key="index">
          {{item.tranDate}} {{item.tranAmt}} {{item.channel}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {XHeader, Group, Cell, Grid, GridItem, Divider, CellFormPreview} from 'vux'
import {mapState} from 'vuex'
import {dateFormat} from 'vux'

export default {
  name: 'pushList',
  components: {
    XHeader,
    Group,
    Cell,
    Grid,
    GridItem,
    Divider,
    CellFormPreview
  },
   computed: {
    ...mapState({
      pushList: state => state.pushList
    }),
  },
  data: function() {
    return {
      isShowNav: this.$route.meta.isShowNav,
      title: this.$route.meta.title,
      showBack: this.$route.meta.showBack,
    };
  },
  methods: {
    goPushInfo() {
      
    },
  },
};
</script>

<style scoped>
</style>
