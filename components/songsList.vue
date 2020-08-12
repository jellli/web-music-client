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
        <likeSong :m_id="song.id" />
        <cMbtn :music_id="song.id" @reload="emitReload">
          <i class="fas fa-folder-plus"></i>
          <!-- <svg
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
          </svg> -->
        </cMbtn>
        <removeSong
          :m_id="song.id"
          :l_id="list_id"
          v-if="list_id && list_id !== 'liked'"
          @reload="emitReload"
        />
        <i
          class="fas fa-pause"
          v-if="currentId === song.id && isPlaying"
          @click="play(song.id)"
        ></i>
        <i class="fas fa-play" @click="play(song.id)" v-else></i>
      </div>
    </div>
  </div>
</template>

<script>
import cMbtn from "@/components/cMbtn";
import likeSong from "@/components/likeSong";
import removeSong from "@/components/removeSong";
export default {
  components: {
    cMbtn,
    likeSong,
    removeSong
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
    currentId() {
      return this.$store.state.currentId;
    },
    isPlaying() {
      return this.$store.state.isPlaying;
    }
  },
  methods: {
    play(id) {
      // 先获取url 如果不为null再切换状态
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
    },
    emitReload() {
      this.$emit("reload");
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
