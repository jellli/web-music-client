<template>
  <div
    class="music-list-item"
    @mouseover="visible = true"
    @mouseleave="visible = false"
  >
    <div class="music-pic">
      <nuxt-link :to="`/${baseUrl}/${id}`" v-if="baseUrl">
        <el-image :src="picUrl" style="width:100%;height:100%;" fit="cover">
          <div
            slot="placeholder"
            v-loading="true"
            style="width:100%;height:100%;"
          ></div>
        </el-image>
      </nuxt-link>
      <el-image
        :src="picUrl"
        style="width:100%;height:100%;"
        fit="cover"
        v-else
      >
        <div
          slot="placeholder"
          v-loading="true"
          style="width:100%;height:100%;"
        ></div>
      </el-image>
    </div>
    <div class="music-title">
      <nuxt-link :to="`/${baseUrl}/${id}`" v-if="baseUrl">{{
        title
      }}</nuxt-link>
      <span v-else>
        {{ title }}
      </span>
    </div>
    <div class="music-subtitle">
      <nuxt-link :to="`/${subtitle.baseUrl}/${subtitle.id}`" v-if="subtitle.id">
        {{ subtitle.name }}
      </nuxt-link>
      <span v-else>
        {{ subtitle }}
      </span>
    </div>
    <!-- !TODOs: 歌曲播放 -->
    <playBtn v-if="visible && type === 'song'" :m_id="id">
      <template v-slot:pause>
        <div class="play-btn">
          <i class="fas fa-pause"></i>
        </div>
      </template>
      <template v-slot:play>
        <div class="play-btn">
          <i class="fas fa-play"></i>
        </div>
      </template>
    </playBtn>
    <!-- !TODOs :歌单播放 -->
    <playBtn v-if="visible && type === 'playlist'" :list="playlist">
      <template v-slot:pause>
        <div class="play-btn">
          <i class="fas fa-pause"></i>
        </div>
      </template>
      <template v-slot:play>
        <div class="play-btn">
          <i class="fas fa-play"></i>
        </div>
      </template>
    </playBtn>
  </div>
</template>

<script>
import playBtn from "@/components/playBtn";
export default {
  // baseUrl作用为链接到详情页添加链接前缀
  // 传入内容为字符串形式，无需左右两端"/"
  // 如 baseUrl:"song"
  props: ["picUrl", "title", "subtitle", "baseUrl", "id", "type", "playlist"],
  components: {
    playBtn
  },
  data() {
    return {
      visible: false,
      loading: true
    };
  }
};
</script>

<style lang="scss" scoped>
.play-btn {
  width: 35px;
  height: 35px;
  position: absolute;
  bottom: 16px;
  right: 16px;
  border-radius: 50%;
  background: #1db954;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all ease 0.2s;
  &:hover {
    transform: scale(1.2);
  }
  &:active {
    transform: scale(1.1);
  }
  i {
    font-size: 0.8rem;
  }
}
.music-list-item {
  position: relative;
  width: 166.4px;
  // height: 228px;
  padding: 16px;
  background: #282828;
  border-radius: 8px;

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
