<template>
  <div class="result-list">
    <h2>歌曲</h2>
    <table>
      <tr v-for="item in list" :key="item.id">
        <td><img :src="item.album_pic" /></td>
        <td>
          <nuxt-link :to="`/song/${item.id}`">
            {{ item.name }}
          </nuxt-link>
          <nuxt-link
            v-for="artist in item.artists"
            :to="`/artist/${artist.id}`"
            :key="artist.id"
          >
            {{ artist.name }}
          </nuxt-link>
        </td>
        <td>
          <div class="music-ctrl">
            <i
              class="fas fa-pause"
              v-if="currentId === item.id && isPlaying"
              @click="play(item.id)"
            ></i>
            <i class="fas fa-play" @click="play(item.id)" v-else></i>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["list"],
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
      this.$store.commit("setCurrentId", id);
      if (id === this.$store.state.currentId) {
        this.$store.commit("togglePlayingState");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
table {
  margin-top: 20px;
  width: 100%;
}
td {
  // padding: 11px 0;
  &:nth-child(1) {
    width: 70px;
    height: 70px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &:nth-child(2) {
    padding: 0 10px;
    a:first-child {
      display: block;
    }
    a:not(:first-child) {
      color: #939393;
      &:not(:last-child)::after {
        content: "·";
      }
    }
  }
  .music-ctrl {
    height: 100%;
    display: flex;
    align-items: center;
    i {
      cursor: pointer;
    }
  }
}
</style>
