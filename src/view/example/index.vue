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
import API from '@/api/index'
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
    // 这里示例下较为复杂的场景：头像字段是从另外接口中获取
    async getListFn(page) {
      const ajaxData = {
        word: this.searchWord,
        ...page
      }
      const res = await API.getList(ajaxData)
      res.data.data = res.data.data.map(item => {
        item.avatar = ''
        API.getUser(q).then(r => {
          item.avatar = r.data.avatar
        })
        return item
      })
      return res
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
