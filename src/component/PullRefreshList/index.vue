<template>
  <div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="listData.length ?'没有更多了' : ''"
        @load="onLoad"
      >
        <div v-if="listData.length" class="container">
          <div v-for="(item,index) in listData" :key="index">
            <slot name="item" :item="item">
              {{ item }}
            </slot>
          </div>
        </div>
        <van-empty v-else class="no-data" :image="require('@/assets/images/no-data.png')" description="暂无相关数据" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    getUrl: {
      type: Function, // 需要是个Promise
      required: true
    }
  },
  data() {
    return {
      loading: false,
      finished: false,
      refreshing: '',
      listData: [],
      pageNum: 1
    }
  },
  methods: {
    // vant默认进来就会触发加载请求，所以create里面不用手动请求
    // https://youzan.github.io/vant/#/zh-CN/list#chang-jian-wen-ti
    async onLoad() {
      this.finished = false
      this.loading = true
      const ajaxData = {
        pageNum: this.pageNum,
        pageSize: 10
      }
      this.getUrl(ajaxData).then(res => {
        if (this.refreshing) {
          this.listData = []
          this.refreshing = false
        }
        this.loading = false
        this.listData = this.listData.concat(res.data.list)
        if (this.listData.length < res.data.total) { // 还有数据
          this.finished = false
          this.pageNum += 1
        } else {
          this.finished = true
        }
      }).catch(() => {
        // 防止报错
        this.loading = false
        this.refreshing = false
        this.finished = true
      })
    },
    onRefresh() {
      // 清空列表数据
      this.pageNum = 1
      this.onLoad()
    }
  }

}
</script>
<style lang='scss' scoped>
.container{
  background-color: #F6F6F6;
}
.no-data ::v-deep .van-empty__image img{
  object-fit: contain;
}
</style>
