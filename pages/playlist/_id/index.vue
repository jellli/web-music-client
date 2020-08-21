<template>
  <div v-if="detial" class="restrainer">
    <sList :detial="detial" :creator_pic="user_pic" />
    <div style="padding:0 20px">
      <songsList :songs="songs" v-if="songs.length > 0" />
      <h2 v-else>该歌单里还没添加任何歌曲</h2>
    </div>
  </div>
</template>

<script>
import sList from "@/components/sList";
import songsList from "@/components/songsList";
export default {
  head() {
    return {
      title: "歌单详情 - " + this.detial.list_name
    };
  },
  components: {
    sList,
    songsList
  },
  async asyncData({ params, $axios }) {
    // console.log(params.id);
    const detial = await $axios.post(
      `${process.env.BACKEND_URL}/get/musiclist_detail`,
      {
        l_id: parseInt(params.id)
      }
    );
    const user_pic = await $axios.post(
      `${process.env.BACKEND_URL}/get/user_pic`,
      {
        user_name: detial.data[0].created_by
      }
    );
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
        songs: temp,
        user_pic: user_pic.data.user_pic
      };
    } else {
      return {
        detial: detial.data[0],
        songs: [],
        user_pic: user_pic.data.user_pic
      };
    }
  }
};
</script>

<style></style>
