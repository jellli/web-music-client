<template>
  <div v-if="detial" class="restrainer">
    <sList :detial="detial" />
    <songsList :songs="songs" v-if="songs" />
    <h2 v-else>该歌单里还没添加任何歌曲</h2>
  </div>
</template>

<script>
import sList from "@/components/sList";
import songsList from "@/components/songsList";
export default {
  components: {
    sList,
    songsList
  },
  // data() {
  //   return {
  //     detial: null,
  //     songs: null
  //   };
  // },
  async asyncData({ params, $axios }) {
    // console.log(params.id);
    const detial = await $axios.post(
      `${process.env.BACKEND_URL}/get/musiclist_detail`,
      {
        l_id: parseInt(params.id)
      }
    );
    // console.log(detial.data);
    if (detial.data[0].music_ids.length !== 0) {
      // 获取歌单中所有歌曲详情
      const query = [];
      detial.data[0].music_ids.forEach(id => {
        query.push(id.toString());
      });
      const res = await $axios.get(
        `${process.env.MUSIC_API_URL}/song/detail?ids=${query.join(",")}`
      );
      // console.log(res.data);
      const temp = [];
      // 处理数据
      res.data.songs.forEach(async song => {
        const al = await $axios.get(
          `${process.env.MUSIC_API_URL}/album?id=${song.al.id}`
        );
        const item = {
          id: song.id,
          name: song.name,
          artists: song.ar,
          album_pic: al.data.songs[0].al.picUrl
        };
        temp.push(item);
      });
      return {
        detial: detial.data[0],
        songs: temp
      };
    }
  }
};
</script>

<style></style>
