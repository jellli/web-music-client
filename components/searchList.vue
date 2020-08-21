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
            <div class="add-to-playlist" @click="addToPlaylist(item.id)">
              <i class="fas fa-plus"></i>
            </div>
            <likeSong :m_id="item.id" />
            <cMbtn :music_id="item.id">
              <i class="fas fa-folder-plus"></i>
            </cMbtn>
            <playBtn :m_id="item.id" :list="list.map(a => a.id)">
              <template v-slot:pause><i class="fas fa-pause"></i></template>
              <template v-slot:play><i class="fas fa-play"></i></template>
            </playBtn>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import cMbtn from "@/components/cMbtn";
import likeSong from "@/components/likeSong";
import playBtn from "@/components/playBtn";
export default {
  props: ["list"],
  components: {
    cMbtn,
    playBtn,
    likeSong
  },
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
