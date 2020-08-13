<template>
  <div class="user-home-page restrainer">
    <div class="user-profile">
      <div class="user-avatar">
        <img :src="profile.user_pic" />
        <!-- <input
          ref="files"
          type="file"
          name="avatar"
          id="avatar"
          v-on:change="upload"
        /> -->
      </div>
      <div class="user-info">
        <div class="username">{{ profile.user_name }}</div>
        <div class="user-follow">
          <span>关注: 15</span>
          <span>粉丝: 8</span>
        </div>
        <ul class="user-data">
          <li>所在地区: Home</li>
          <li>社交网络: OOO</li>
        </ul>
      </div>
    </div>
    <Musiclist
      title="你喜欢的音乐"
      subtitle="重复聆听你的挚爱"
      :content="liked_music"
      type="song"
    />
  </div>
</template>

<script>
import Musiclist from "@/components/Musiclist";
export default {
  data() {
    return {
      file: null
    };
  },
  components: {
    Musiclist
  },
  head() {
    return {
      title: "个人主页"
    };
  },
  async asyncData({ $axios, params }) {
    // 获取用户数据
    const pro = await $axios.$post(`${process.env.BACKEND_URL}/get/user`, {
      user_name: params.username
    });
    // 获取用户喜欢的音乐
    const liked_music_res = await $axios.$post(
      `${process.env.BACKEND_URL}/get/liked_music`,
      {
        user_name: params.username
      }
    );
    const query = [];
    liked_music_res[0].liked_music.forEach(id => {
      query.push(id.toString());
    });
    const songs_res = await $axios.get(
      `${process.env.MUSIC_API_URL}/song/detail?ids=${query.join(",")}`
    );
    const temp = [];
    songs_res.data.songs.forEach(async song => {
      // console.log(song.ar);
      const al = await $axios.get(
        `${process.env.MUSIC_API_URL}/album?id=${song.al.id}`
      );
      const item = {
        id: song.id,
        title: song.name,
        subtitle: {
          id: song.ar[0].id,
          name: song.ar[0].name,
          baseUrl: "artist"
        },
        picUrl: al.data.songs[0].al.picUrl,
        baseUrl: "song"
      };
      temp.push(item);
    });
    return { profile: pro[0], liked_music: temp };
  },
  methods: {
    async upload(e) {
      e.preventDefault();
      //var files = this.$refs.files;
      var files = e.target.files;
      var data = new FormData();
      data.append("avatar", files[0]);
      data.append("user_name", this.$store.state.userName);
      await this.$axios.post(`${process.env.BACKEND_URL}/update/avatar`, data);
    }
  }
};
</script>

<style lang="scss" scoped>
.user-profile {
  display: flex;
  margin-bottom: 20px;
  .user-avatar {
    width: 200px;
    height: 200px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: #fff 8px solid;
      object-fit: cover;
    }
  }
  .user-info {
    padding: 10px 35px;
    .username {
      font-size: 2rem;
    }
  }
  .user-follow {
    margin: 10px 0;
  }
  .user-data {
    list-style: none;
  }
}
</style>
