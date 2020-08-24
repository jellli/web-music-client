<template>
  <div class="song-detail restrainer">
    <div class="song-header">
      <div class="album-pic">
        <img :src="album_pic" />
      </div>
      <div class="song-data">
        <div class="song-name">{{ name }}</div>
        <div class="song-artists">
          <nuxt-link
            :to="`/artist/${artist.id}`"
            v-for="artist in artists"
            :key="artist.id"
          >
            {{ artist.name }}
          </nuxt-link>
        </div>
        <div class="music-ctrl">
          <likedSong :m_id="parseInt(this.$route.params.id)" />
          <playBtn :m_id="this.$route.params.id">
            <template v-slot:pause>
              <button class="play-btn">暂停</button>
            </template>
            <template v-slot:play>
              <button class="play-btn">播放</button>
            </template>
          </playBtn>
          <cMbtn :music_id="parseInt(this.$route.params.id)">
            <el-button round size="mini" type="primary">
              收藏到歌单
            </el-button>
          </cMbtn>
        </div>
        <lyric :m_id="this.$route.params.id" />
      </div>
    </div>
    <comment
      :comments="comments"
      :m_id="m_id"
      @reload="reloadComments"
      v-if="hackReset"
    />
  </div>
</template>

<script>
import comment from "@/components/comment";
import playBtn from "@/components/playBtn";
import lyric from "@/components/lyric";
import likedSong from "@/components/likeSong";
import cMbtn from "@/components/cMbtn";
export default {
  head() {
    return {
      title: `${this.name} - ${this.artists.map(a => a.name).join(" ")}`
    };
  },
  data() {
    return {
      hackReset: true,
      comments: null
    };
  },
  components: {
    comment,
    playBtn,
    lyric,
    likedSong,
    cMbtn
  },
  methods: {
    async reloadComments() {
      // 获取评论
      const c = await this.$axios.post(
        `${process.env.BACKEND_URL}/get/comment`,
        {
          m_id: parseInt(this.m_id)
        }
      );
      const comments = c.data;
      comments.reverse();
      this.comments = comments;
    }
  },

  async asyncData({ $axios, params }) {
    const detial = await $axios.get(
      `${process.env.MUSIC_API_URL}/song/detail?ids=${params.id}`
    );
    const data = detial.data.songs[0];
    const name = data.name;
    const album_pic = data.al.picUrl + "?param=300y300";
    const artists = data.ar;
    // 获取评论
    const c = await $axios.post(`${process.env.BACKEND_URL}/get/comment`, {
      m_id: parseInt(params.id)
    });
    const comments = c.data;
    // 获取用户头像
    if (comments.length > 0) {
      for (const i in comments) {
        const res = await $axios.post(
          `${process.env.BACKEND_URL}/get/user_pic`,
          {
            user_name: comments[i].author
          }
        );
        comments[i]["pic"] = res.data.user_pic;
      }
    }
    comments.reverse();
    return {
      name,
      m_id: params.id,
      album_pic,
      artists,
      comments
    };
  }
};
</script>

<style lang="scss" scoped>
.song-detail {
  min-height: 80%;
}
.song-header {
  display: grid;
  grid-template-columns: 1fr 4fr;
  margin-bottom: 40px;
}
.song-data {
  padding: 0 40px;
}
.song-name {
  font-size: 2.5rem;
}
.song-artists {
  a {
    font-size: 1.4rem;
    color: #939393;
  }
}
.album-pic {
  // margin: 0 auto;
  width: 200px;
  height: 200px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 2px;
  }
}
.music-ctrl {
  display: flex;
  align-items: center;
  & > * {
    margin-right: 15px;
  }
  .like-song {
    font-size: 1.4rem;
  }
  .play-btn {
    margin: 20px 0;
    outline: none;
    border: none;
    background-color: #1db954;
    padding: 5px 10px;
    border-radius: 13px;
    cursor: pointer;
  }
}
</style>
