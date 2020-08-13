<template>
  <div class="play-btn-component">
    <div class="play-btn" @click="handleClick">
      <slot
        name="pause"
        v-if="currentId === m_id && this.$store.state.isPlaying"
      ></slot>
      <slot name="play" v-else></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    m_id: {
      default: null
    },
    list: {
      default: null
    }
  },
  computed: {
    currentId() {
      return this.$store.state.currentId;
    }
  },
  methods: {
    handleClick() {
      if (this.m_id) {
        this.play(this.m_id);
      }
      if (this.list) {
        this.play_list();
      }
    },
    play_list() {
      this.$store.commit("setPlaylist", this.list);
      this.play(this.list[0]);
    },
    play(m_id) {
      // 先获取url 如果不为null再切换状态
      if (this.$store.state.currentId == m_id) {
        this.$store.commit("togglePlayingState");
      } else if (this.$store.state.isPlaying) {
        this.addToPlaylist(m_id, false);
        this.$store.commit("togglePlayingState");
        this.$store.commit("setCurrentId", m_id);
        this.$store.commit("togglePlayingState");
      } else {
        this.addToPlaylist(m_id, false);
        this.$store.commit("setCurrentId", m_id);
        this.$store.commit("togglePlayingState");
      }
    },
    addToPlaylist(m_id, showMsg = true) {
      if (this.$store.state.playlist.includes(m_id)) {
        if (showMsg) {
          this.$message({
            message: "该歌曲已存在",
            type: "info"
          });
        }
      } else {
        if (showMsg) {
          this.$message({
            message: "已添加到播放列表",
            type: "info"
          });
        }
        this.$store.commit("addToPlaylist", m_id);
      }
    }
  }
};
</script>

<style></style>
