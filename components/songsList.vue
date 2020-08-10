<template>
  <div class="songs-list">
    <div class="songs-list-item" v-for="song in songs" :key="song.id">
      <div class="songs-list-item-pic">
        <img :src="song.album_pic" />
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
export default {
  props: ["songs"],
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
      this.$store.commit("setCurrentId", id);
      this.$store.commit("togglePlayingState");
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
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
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
  }
}
</style>
