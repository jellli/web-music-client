<template>
  <div class="home">
    <div class="restrainer">
      <Musiclist
        title="艺人精选"
        subtitle="一口气畅听艺人所有歌曲"
        :content="artistsList.slice(0, 6)"
      />
      <Musiclist
        title="推荐歌单"
        subtitle="欣赏我们精心挑选的歌单"
        :content="hotList"
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
    const hot_list = await $axios.$get(`${BASE_URL}/top/playlist?limit=6`);

    let artistsList = [];
    let hotList = [];

    artists_list.artists.map(item => {
      const title = item.name;
      const subtitle = item.id;
      const picUrl = item.picUrl;
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

    return { artistsList, hotList };
  }
};
</script>
<style lang="scss" scoped>
.restrainer {
  padding: 20px 0;
}
</style>
