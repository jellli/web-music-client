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
        :content="hot_musiclist"
        type="playlist"
      />
      <Musiclist
        title="热门音乐"
        subtitle="收听最近的热门单曲"
        :content="hotMusic.slice(0, 6)"
        type="song"
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
    const artists_list = await $axios.$get(
      `${BASE_URL}/artist/list?type=2&area=96&limit=9`
    );
    const hot_music = await $axios.$get(
      `${BASE_URL}/playlist/detail?id=2809513713`
    );

    let artistsList = [];
    let hotMusic = [];

    artists_list.artists.map(item => {
      const id = item.id;
      const title = item.name;
      const subtitle = item.trans;
      const picUrl = item.picUrl + "?param=150y150";
      artistsList.push({
        id,
        baseUrl: "artist",
        title,
        subtitle,
        picUrl
      });
    });

    hot_music.playlist.tracks.map(item => {
      const id = item.id;
      const title = item.name;
      const subtitle_name = item.ar[0].name;
      const subtitle_id = item.ar[0].id;
      const picUrl = item.al.picUrl + "?param=150y150";
      hotMusic.push({
        id,
        baseUrl: "song",
        title,
        subtitle: {
          id: subtitle_id,
          name: subtitle_name,
          baseUrl: "artist"
        },
        picUrl
      });
    });

    // 获取热门歌单
    const hot_musiclist_res = await $axios.get(
      `${process.env.BACKEND_URL}/get/hot_musiclist`
    );
    const hot_musiclist_temp = [];
    hot_musiclist_res.data.slice(0, 6).forEach(list => {
      const item = {
        id: list.l_id,
        title: list.list_name,
        subtitle: list.list_desc === null ? "" : list.list_desc,
        picUrl: list.list_cover,
        baseUrl: "playlist",
        playlist: list.music_ids
      };
      hot_musiclist_temp.push(item);
    });

    return { artistsList, hotMusic, hot_musiclist: hot_musiclist_temp };
  }
};
</script>
<style lang="scss" scoped>
.restrainer {
  padding: 20px 0;
}
</style>
