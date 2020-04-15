<template>
  <div class="music-list-item">
    <div class="music-pic">
      <img :src="picUrl" />
    </div>
    <div class="music-title">
      {{ title }}
    </div>
    <div class="music-subtitle">
      {{ subtitle }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["picUrl", "title", "subtitle"]
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
    color: #939393;
    font-size: 14px;
    // 限制行数
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
</style>
