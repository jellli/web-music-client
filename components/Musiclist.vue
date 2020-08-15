<template>
  <div class="music-list">
    <div class="list-title">
      {{ title }}
    </div>
    <div class="list-subtitle">
      {{ subtitle }}
    </div>
    <div class="list-content">
      <div v-if="content.length !== 0" class="items">
        <MusiclistItem
          v-for="item in content"
          :key="item.id"
          :title="item.title"
          :subtitle="item.subtitle"
          :picUrl="item.picUrl"
          :id="item.id"
          :baseUrl="item.baseUrl"
          :type="type"
          :playlist="item.playlist"
        />
      </div>
      <div v-else>
        <div class="none">
          <h3>这里空无一物...</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MusiclistItem from "@/components/MusiclistItem.vue";
export default {
  components: {
    MusiclistItem
  },
  props: ["title", "subtitle", "content", "type"]
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
    .none {
      height: 100px;
      display: flex;
      // justify-content: center;
      align-items: center;
    }
    .items {
      overflow: auto;
      width: 100%;
      display: flex;
      // grid-template-columns: repeat(auto-fill, minmax(164px, 1fr));
      // grid-auto-rows: 0;
      // grid-template-rows: auto 1fr;
      gap: 16px 0;
      padding: 16px 0;
      & > * {
        margin-right: 15px;
      }
    }
  }
}
</style>
