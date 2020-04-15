<template>
  <div class="home">
    <div class="restrainer">
      <Musiclist
        title="艺人精选"
        subtitle="一口气畅听艺人所有歌曲"
        :content="artistsList.slice(3, 9)"
      />
      <Musiclist
        title="推荐歌单"
        subtitle="欣赏我们精心挑选的歌单"
        :content="hotList"
      />
      <Musiclist
        title="热门音乐"
        subtitle="收听最近的热门单曲"
        :content="hotMusic.slice(0, 6)"
      />
    </div>
  </div>
</template>

<script>
import Musiclist from "@/components/Musiclist.vue";
export default {
  name: "Home",
  components: {
    Musiclist
  },
  head() {
    return {
      title: "首页"
    };
  },
  async asyncData({ $axios }) {
    const BASE_URL = process.env.MUSIC_API_URL;
    const artists_list = await $axios.$get(`${BASE_URL}/artist/list?area=96`);
    const hot_list = await $axios.$get(
      `${BASE_URL}/top/playlist?limit=6&cat=%e6%ac%a7%e7%be%8e`
    );
    const hot_music = await $axios.$get(`${BASE_URL}/top/list?idx=8`);

    let artistsList = [];
    let hotList = [];
    let hotMusic = [];

    artists_list.artists.map(item => {
      const title = item.name;
      const subtitle = item.trans;
      const picUrl = item.picUrl + "?param=150y150";
      artistsList.push({
        title,
        subtitle,
        picUrl
      });
    });

    hot_list.playlists.map(item => {
      const title = item.name;
      const subtitle = item.description;
      const picUrl = item.coverImgUrl;
      hotList.push({
        title,
        subtitle,
        picUrl
      });
    });

    hot_music.playlist.tracks.map(item => {
      const title = item.name;
      const subtitle = item.ar[0].name;
      const picUrl = item.al.picUrl;
      hotMusic.push({
        title,
        subtitle,
        picUrl
      });
    });

    return { artistsList, hotList, hotMusic };
  }
};
</script>
<style lang="scss" scoped>
.restrainer {
  padding: 20px 0;
}
</style>
