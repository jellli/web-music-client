<template>
  <div class="artist-detail restrainer">
    <div class="wrapper">
      <div
        class="artist-img"
        @mouseover="visible = true"
        @mouseout="visible = false"
      >
        <img :src="picUrl" />
        <transition name="playBtn">
          <playBtn
            :list="hotSongs.map(a => a.id)"
            class="artist-play-btn"
            v-show="visible"
          >
            <template v-slot:pause><i class="fas fa-pause"></i></template>
            <template v-slot:play><i class="fas fa-play"></i></template>
          </playBtn>
        </transition>
      </div>
      <div class="artist-info">
        <span>{{ name }}</span>
      </div>
    </div>
    <songsList
      :songs="
        hotSongs.slice((currentPage - 1) * 10, (currentPage - 1) * 10 + 9)
      "
    />
    <el-pagination
      :hide-on-single-page="true"
      class="pagination"
      :total="hotSongs.length"
      :current-page.sync="currentPage"
      background
    ></el-pagination>
  </div>
</template>

<script>
import playBtn from "@/components/playBtn";
import songsList from "@/components/songsList";
export default {
  data() {
    return {
      currentPage: 1,
      visible: false
    };
  },
  components: {
    songsList,
    playBtn
  },
  async asyncData({ $axios, params }) {
    const detial = await $axios.get(
      `${process.env.MUSIC_API_URL}/artists?id=${params.id}`
    );
    const name = detial.data.artist.name;
    const picUrl = detial.data.artist.picUrl + "?param=300y300";
    const hot_songs = detial.data.hotSongs;
    const hotSongs = [];
    hot_songs.map(item => {
      const album_pic = item.al.picUrl + "?param=50y50";
      const id = item.id;
      const name = item.name;
      const artists = [];
      item.ar.forEach(el => {
        artists.push({
          id: el.id,
          name: el.name
        });
      });
      hotSongs.push({
        album_pic,
        id,
        name,
        artists
      });
    });
    return {
      name,
      picUrl,
      hotSongs
    };
  }
};
</script>

<style lang="scss" scoped>
.playBtn-enter,
.playBtn-leave-to {
  opacity: 0;
}
.playBtn-enter-active,
.playBtn-leave-active {
  transition: all 0.3s;
}

.artist-play-btn {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 2rem;
}
.pagination {
  grid-row: 2;
  grid-column: 2;
  margin-top: 20px;
  // display: flex;
  // align-items: center;
}
.artist-detail {
  display: grid;
  grid-template-columns: 1fr 2fr;
}
.wrapper {
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
}
.artist-img {
  width: 300px;
  height: 300px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.artist-info {
  margin: 20px 0;
  span {
    font-size: 1.5rem;
    font-weight: bolder;
  }
}
</style>
