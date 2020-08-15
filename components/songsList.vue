<template>
  <div class="songs-list">
    <div class="songs-list-item" v-for="song in songs" :key="song.id">
      <div class="songs-list-item-pic">
        <el-image
          style="width: 100%; height: 100%"
          :src="song.album_pic"
          fit="cover"
          :lazy="true"
        ></el-image>
        <!-- <img :src="song.album_pic" /> -->
      </div>
      <div>
        <div class="songs-list-item-title">
          <nuxt-link :to="`/song/${song.id}`">{{ song.name }}</nuxt-link>
        </div>
        <div class="songs-list-item-subtitle">
          <nuxt-link
            v-for="artist in song.artists"
            :key="artist.id"
            :to="`/artist/${artist.id}`"
          >
            {{ artist.name }}
          </nuxt-link>
        </div>
      </div>
      <div class="music-ctrl">
        <div class="add-to-playlist" @click="addToPlaylist(song.id)">
          <i class="fas fa-plus"></i>
        </div>
        <likeSong :m_id="song.id" />
        <cMbtn :music_id="song.id" @reload="emitReload">
          <i class="fas fa-folder-plus"></i>
        </cMbtn>
        <removeSong
          :m_id="song.id"
          :l_id="list_id"
          v-if="list_id && list_id !== 'liked'"
          @reload="emitReload"
        />
        <playBtn :m_id="song.id">
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
import removeSong from "@/components/removeSong";
import playBtn from "@/components/playBtn";
export default {
  components: {
    cMbtn,
    likeSong,
    removeSong,
    playBtn
  },
  props: ["songs", "list_id"],
  /* 
  键值对
  album_pic,
  id,
  name,
  artists
   */
  computed: {
    isPlaying() {
      return this.$store.state.isPlaying;
    }
  },
  methods: {
    emitReload() {
      this.$emit("reload");
    },

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
.songs-list {
  width: 100%;
  .songs-list-item {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    transition: all ease 0.3s;
    &:hover {
      background: rgba(#fff, 0.2);
    }
  }
  .songs-list-item-pic {
    width: 50px;
    height: 50px;
    margin-right: 20px;
    // img {
    //   width: 100%;
    //   height: 100%;
    //   object-fit: cover;
    // }
  }
  .songs-list-item-title {
    font-size: 1.1rem;
  }
  .songs-list-item-subtitle {
    a {
      color: #939393;
      &:not(:last-child)::after {
        content: "·";
      }
    }
  }
  .music-ctrl {
    margin-left: auto;
    display: flex;
    align-items: center;
    & > * {
      margin-left: 18px;
      cursor: pointer;
      transition: all ease 0.3s;
    }
  }
}
</style>
