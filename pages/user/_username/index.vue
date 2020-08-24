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
        <div class="username">
          <h2>
            {{ profile.user_name }}
          </h2>
          <followBtn
            :followers="profile.follower"
            :currentUsername="params"
            v-if="!isUser"
            size="medium"
          />
        </div>
        <div class="user-follow">
          <div>
            <span
              >关注:
              <nuxt-link :to="`${params}/following`">
                {{ profile.following.length }}
              </nuxt-link>
            </span>
            <span
              >粉丝:
              <nuxt-link :to="`${params}/followers`">
                {{ profile.follower.length }}
              </nuxt-link>
            </span>
          </div>
        </div>
        <ul class="user-data">
          <li>
            个人描述:
            {{
              profile.user_desc.length === 0
                ? "TA还没填写个人描述"
                : profile.user_desc
            }}
          </li>
        </ul>
      </div>
    </div>
    <vue-lazy-component>
      <Musiclist
        :title="isUser ? '你喜欢的音乐' : `${params}喜欢的音乐`"
        subtitle="重复聆听你的挚爱"
        :content="liked_music"
        type="song"
      />
    </vue-lazy-component>
    <vue-lazy-component>
      <Musiclist
        :title="isUser ? '你创建的歌单' : `${params}创建的歌单`"
        subtitle="重复聆听你的挚爱"
        :content="created_musiclist"
        type="playlist"
      />
    </vue-lazy-component>
    <vue-lazy-component>
      <Musiclist
        :title="isUser ? '你收藏的歌单' : `${params}收藏的歌单`"
        subtitle="重复聆听你的挚爱"
        :content="collected_musiclist"
        type="playlist"
      />
    </vue-lazy-component>
  </div>
</template>

<script>
import Musiclist from "@/components/Musiclist";
import followBtn from "@/components/followBtn";
export default {
  data() {
    return {
      file: null
    };
  },
  components: {
    Musiclist,
    followBtn
  },
  head() {
    return {
      title: `${this.params}的个人主页`
    };
  },
  computed: {
    isUser() {
      return this.$store.state.userName === this.$route.params.username;
    },
    params() {
      return this.$route.params.username;
    }
  },
  async asyncData({ $axios, params }) {
    // 获取用户数据
    const pro = await $axios.$post(`${process.env.BACKEND_URL}/get/user`, {
      user_name: params.username
    });
    // 获取用户创建的歌单
    const created_musiclist_res = await $axios.$post(
      `${process.env.BACKEND_URL}/get/created_musiclist`,
      {
        user_name: params.username
      }
    );
    const created_musiclist_temp = [];
    if (created_musiclist_res) {
      created_musiclist_res.forEach(list => {
        const item = {
          id: list.l_id,
          title: list.list_name,
          subtitle: list.list_desc === null ? "" : list.list_desc,
          picUrl: list.list_cover,
          baseUrl: "playlist",
          playlist: list.music_ids
        };
        created_musiclist_temp.push(item);
      });
    }
    // 获取用户收藏的歌单
    const collected_musiclist_res = await $axios.$post(
      `${process.env.BACKEND_URL}/get/collected_musiclist`,
      {
        user_name: params.username
      }
    );
    const collected_musiclist_temp = [];
    if (collected_musiclist_res) {
      collected_musiclist_res.forEach(list => {
        const item = {
          id: list.l_id,
          title: list.list_name,
          subtitle: list.list_desc === null ? "" : list.list_desc,
          picUrl: list.list_cover,
          baseUrl: "playlist",
          playlist: list.music_ids
        };
        collected_musiclist_temp.push(item);
      });
    }
    // 获取用户喜欢的音乐
    const liked_music_res = await $axios.$post(
      `${process.env.BACKEND_URL}/get/liked_music`,
      {
        user_name: params.username
      }
    );
    const query = [];
    const liked_music_temp = [];
    // console.log(liked_music_res);
    if (
      liked_music_res &&
      liked_music_res[0] &&
      liked_music_res[0].liked_music.length !== 0
    ) {
      liked_music_res[0].liked_music.forEach(id => {
        query.push(id.toString());
      });
      const songs_res = await $axios.get(
        `${process.env.MUSIC_API_URL}/song/detail?ids=${query.join(",")}`
      );
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
          picUrl: al.data.songs[0].al.picUrl + "?param=150y150",
          baseUrl: "song"
        };
        liked_music_temp.push(item);
        liked_music_temp.reverse();
      });
    }
    return {
      profile: pro[0],
      liked_music: liked_music_temp,
      created_musiclist: created_musiclist_temp,
      collected_musiclist: collected_musiclist_temp
    };
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
    flex-shrink: 0;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: #fff 8px solid;
      object-fit: cover;
    }
  }
  .user-info {
    width: 100%;
    padding: 10px 35px;
    .username {
      width: 100%;
      display: flex;
      align-items: center;
      font-size: 2rem;
      & > * {
        margin-right: 2rem;
      }
    }
  }
  .user-follow {
    // width: 50%;
    // display: flex;
    // justify-content: space-between;
    // align-items: center;
    margin: 10px 0;
  }
  .user-data {
    list-style: none;
  }
}
</style>
