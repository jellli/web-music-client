<template>
  <div class="user-home-page restrainer">
    <div class="user-profile">
      <div class="user-avatar">
        <img
          src="https://hoon-cc.oss-cn-shenzhen.aliyuncs.com/wp-content/uploads/2019/02/65223547_p0_master1200-3.jpg"
        />
      </div>
      <div class="user-info">
        <div class="username">username</div>
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
  components: {
    Musiclist
  },
  head() {
    return {
      title: "个人主页"
    };
  },
  async asyncData({ $axios }) {
    const BASE_URL = process.env.MUSIC_API_URL;
    const hot_music = await $axios.$get(`${BASE_URL}/top/list?idx=8`);

    let hotMusic = [];

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

    return { hotMusic };
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
