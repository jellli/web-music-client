<template>
  <div class="music-list-item">
    <div class="music-pic">
      <img :src="picUrl" />
    </div>
    <div class="music-title">
      <nuxt-link :to="`${baseUrl}/${id}`" v-if="baseUrl">{{ title }}</nuxt-link>
      <span v-else>
        {{ title }}
      </span>
    </div>
    <div class="music-subtitle">
      <nuxt-link :to="`${subtitle.baseUrl}/${subtitle.id}`" v-if="subtitle.id">
        {{ subtitle.name }}
      </nuxt-link>
      <span v-else>
        {{ subtitle }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  // baseUrl作用为链接到详情页添加链接前缀
  // 传入内容为字符串形式，无需左右两端"/"
  // 如 baseUrl:"song"
  props: ["picUrl", "title", "subtitle", "baseUrl", "id"]
};
</script>

<style lang="scss" scoped>
.music-list-item {
  width: 166.4px;
  // height: 228px;
  padding: 16px;
  background: #282828;
  border-radius: 15px;

  .music-pic {
    width: 133.6px;
    height: 133.6px;
    background: #313131;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
  .music-title {
    font-size: 14px;
    font-weight: bold;
    margin: 10px 0 2px;
  }
  .music-subtitle {
    a,
    span {
      color: #939393;
      font-size: 14px;
      // 限制行数
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
}
</style>
