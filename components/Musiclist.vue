<template>
  <div class="music-list">
    <div class="list-title">
      {{ title }}
    </div>
    <div class="list-subtitle">
      {{ subtitle }}
    </div>
    <div class="list-content">
      <MusiclistItem
        v-for="item in content"
        :key="item.id"
        :title="item.title"
        :subtitle="item.subtitle"
        :picUrl="item.picUrl"
      />
    </div>
  </div>
</template>

<script>
import MusiclistItem from "@/components/MusiclistItem.vue";
export default {
  components: {
    MusiclistItem
  },
  props: ["title", "subtitle", "content"]
  // 传入的content必须要有title,picUrl,可选subtitle
};
</script>

<style lang="scss" scoped>
.music-list {
  .list-title {
    color: #fff;
    font-size: 27px;
    font-weight: bold;
  }
  .list-subtitle {
    color: #939393;
    font-size: 20px;
  }
  .list-content {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(6, 180px);
    gap: 20px 0;
    padding: 16px 0;
  }
}
</style>
