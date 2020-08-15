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
        <div class="add-to-playlist" @click="addToPlaylist(item.id)">
          <i class="fas fa-plus"></i>
        </div>
        <likeSong :m_id="bestMatch.id" />
        <cMbtn :music_id="bestMatch.id">
          <i class="fas fa-folder-plus"></i>
        </cMbtn>
        <playBtn :m_id="bestMatch.id">
          <template v-slot:pause><i class="fas fa-pause"></i></template>
          <template v-slot:play><i class="fas fa-play"></i></template>
        </playBtn>
      </div>
    </div>
  </div>
</template>

<script>
import cMbtn from "@/components/cMbtn";
import likeSong from "@/components/likeSong";
import playBtn from "@/components/playBtn";
export default {
  components: {
    cMbtn,
    playBtn,
    likeSong
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
    addToPlaylist(id, showMsg = true) {
      if (this.$store.state.playlist.includes(id)) {
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
        this.$store.commit("addToPlaylist", id);
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
