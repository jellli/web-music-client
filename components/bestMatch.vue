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
        <cMbtn :music_id="bestMatch.id">
          <svg
            t="1597145871986"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="5691"
            width="20"
            height="20"
          >
            <path
              d="M819.8 196.9C647.9 25 369.1 25 197.2 196.9s-171.9 450.7 0 622.7c171.9 171.9 450.7 171.9 622.7 0s171.9-450.8-0.1-622.7zM508.5 820.6c-33.6 0-61.1-27.5-61.1-61.1V569.3H257.3c-33.6 0-61.1-27.5-61.1-61.1s27.5-61.1 61.1-61.1h190.1V257c0-33.6 27.5-61.1 61.1-61.1s61.1 27.5 61.1 61.1v190.1h190.1c33.6 0 61.1 27.5 61.1 61.1s-27.5 61.1-61.1 61.1H569.6v190.1c0 33.7-27.5 61.2-61.1 61.2z"
              p-id="5692"
              fill="#ffffff"
            ></path>
          </svg>
        </cMbtn>
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
import cMbtn from "@/components/cMbtn";
export default {
  components: {
    cMbtn
  },
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
      if (this.$store.state.currentId == id) {
        this.$store.commit("togglePlayingState");
      } else if (this.$store.state.isPlaying) {
        this.$store.commit("togglePlayingState");
        this.$store.commit("setCurrentId", id);
        this.$store.commit("togglePlayingState");
      } else {
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
.music-ctrl {
  margin-top: 10px;
  display: flex;
  align-items: center;
  & > * {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>
