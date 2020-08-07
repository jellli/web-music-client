<template>
  <div class="user-home-page restrainer">
    <div class="user-profile">
      <div class="user-avatar">
        <img :src="profile.user_pic" />
        <input
          ref="files"
          type="file"
          name="avatar"
          id="avatar"
          v-on:change="upload"
        />
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
      :content="hotMusic.slice(0, 6)"
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
    const BASE_URL = process.env.MUSIC_API_URL;
    const hot_music = await $axios.$get(`${BASE_URL}/top/list?idx=8`);
    const pro = await $axios.$post(`${process.env.BACKEND_URL}/get/user`, {
      user_name: params.username
    });
    const profile = JSON.parse(pro.replace(/'/g, `"`));

    const hotMusic = [];

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

    return { hotMusic, profile: profile[0] };
  },
  methods: {
    async upload(e) {
      e.preventDefault();
      //var files = this.$refs.files;
      var files = e.target.files;
      var data = new FormData();
      data.append("avatar", files[0]);
      data.append("user_name", "bob");
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
