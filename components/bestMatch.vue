<template>
  <div class="best-match">
    <h2>最佳匹配结果</h2>
    <div class="best-match-subtitle">这是我们找到的最佳结果</div>
    <div class="best-match-content">
      <div class="cover-img">
        <img :src="bestMatch.album_pic" />
      </div>
      <div class="song-name">
        <nuxt-link :to="`/song/${bestMatch.id}`">
          {{ bestMatch.name }}
        </nuxt-link>
      </div>
      <div class="song-artist">
        <nuxt-link
          v-for="artist in bestMatch.artists"
          :to="`/artist/${artist.id}`"
          :key="artist.id"
        >
          {{ artist.name }}
        </nuxt-link>
      </div>
      <div class="music-ctrl">
        <i
          class="fas fa-pause"
          v-if="currentId === bestMatch.id && isPlaying"
          @click="play(bestMatch.id)"
        ></i>
        <i class="fas fa-play" @click="play(bestMatch.id)" v-else></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["bestMatch"],
  computed: {
    currentId() {
      return this.$store.state.currentId;
    },
    isPlaying() {
      return this.$store.state.isPlaying;
    }
  },
  methods: {
    play(id) {
      if (id === this.$store.state.currentId) {
        this.$store.commit("togglePlayingState");
      } else {
        this.$store.commit("togglePlayingState");
        this.$store.commit("setCurrentId", id);
        this.$store.commit("togglePlayingState");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.best-match-subtitle {
  color: #939393;
}
.best-match-content {
  padding: 20px 0;
}
.cover-img {
  width: 150px;
  height: 150px;
  img {
    width: 100%;
    height: 100%;
  }
}
.song-name {
  margin-top: 10px;
  font-size: 1.2rem;
}
.song-artist {
  a {
    color: #939393;
    &:not(:last-child)::after {
      content: "·";
    }
  }
}
</style>
