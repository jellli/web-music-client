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
            <cMbtn :music_id="item.id">
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
import cMbtn from "@/components/cMbtn";
export default {
  props: ["list"],
  components: { cMbtn },
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
    & > * {
      margin-left: 15px;
      cursor: pointer;
    }
  }
}
</style>
