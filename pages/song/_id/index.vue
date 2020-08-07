<template>
  <div class="song-detail restrainer">
    <div class="song-header">
      <div class="album-pic">
        <img :src="album_pic" />
      </div>
      <div class="song-data">
        <div class="song-name">{{ name }}</div>
        <div class="song-artists">
          <nuxt-link
            :to="`/artist/${artist.id}`"
            v-for="artist in artists"
            :key="artist.id"
          >
            {{ artist.name }}
          </nuxt-link>
        </div>
        <div class="music-ctrl">
          <button @click="play" class="play-btn">播放</button>
        </div>
      </div>
    </div>
    <!-- todo 传入props -->
    <comment :comments="comments" :m_id="m_id" />
  </div>
</template>

<script>
import comment from "@/components/comment";
export default {
  components: {
    comment
  },
  methods: {
    play() {
      this.$store.commit("setCurrentId", this.$route.params.id);
      if (this.$route.params.id === this.$store.state.currentId) {
        this.$store.commit("togglePlayingState");
      }
    }
  },
  async asyncData({ $axios, params }) {
    const detial = await $axios.get(
      `${process.env.MUSIC_API_URL}/song/detail?ids=${params.id}`
    );
    const data = detial.data.songs[0];
    const name = data.name;
    const album_pic = data.al.picUrl + "?param=300y300";
    const artists = data.ar;
    const comments = await $axios.post(
      `${process.env.BACKEND_URL}/get/comment`,
      {
        m_id: parseInt(params.id)
      }
    );

    return {
      name,
      m_id: params.id,
      album_pic,
      artists,
      comments: comments.data
    };
  }
};
</script>

<style lang="scss" scoped>
.song-header {
  display: grid;
  grid-template-columns: 1fr 2fr;
  margin-bottom: 40px;
}
.song-data {
  padding: 0 40px;
}
.song-name {
  font-size: 2.5rem;
}
.song-artists {
  a {
    font-size: 1.4rem;
    color: #939393;
  }
}
.album-pic {
  margin: 0 auto;
  width: 200px;
  height: 200px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
.music-ctrl {
  .play-btn {
    margin: 20px 0;
    outline: none;
    border: none;
    background-color: #1db954;
    padding: 5px 10px;
    border-radius: 13px;
    cursor: pointer;
  }
}
</style>
