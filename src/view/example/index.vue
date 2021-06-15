<template>
  <div class="container">
    <van-search v-model="searchWord" placeholder="请输入搜索关键词" />
    <PullRefreshList :get-url="getListFn">
      <template v-slot:item="{item}">
        <div class="item-box">
          <span>{{ item.name }}</span>
          <span>{{ item.title }}</span>
        </div>
      </template>
    </PullRefreshList>
  </div>
</template>

<script>
import PullRefreshList from '@/component/PullRefreshList'
import { getList } from '@/api/index'
export default {
  components: { PullRefreshList },
  data() {
    return {
      searchWord: ''
    }
  },
  methods: {
    search() {
      console.log('hello')
    },
    // 列表加载示例
    getListFn() {
      return getList()
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    width: 690px;
    margin: 0 auto;
  }
</style>
