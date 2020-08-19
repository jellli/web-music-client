<template>
  <div class="mymusic">
    <div class="restrainer">
      <div class="box" v-if="this.$store.state.isLogin">
        <div class="left-side">
          <showMusicList
            :list_data="user_created_list"
            :owned="true"
            title="创建的歌单"
            @reload="reloadCreatedMusicLists"
            @getDetial="getListDetial"
            @enterEdit="enterEdit"
            @getLikedDetial="getLikedDetial"
          />
          <showMusicList
            :list_data="user_collected_list"
            title="收藏的歌单"
            :owned="false"
            @reload="reloadCollectedMusicLists"
            @getDetial="getListDetial"
          />
        </div>
        <div class="right-side">
          <div v-if="detial">
            <sList :detial="detial" :creator_pic="creator_pic" />
            <div style="padding:0 20px">
              <songsList
                :songs="songs"
                v-if="songs.length > 0"
                :list_id="current_list_id"
                @reload="reloadAll"
              />
              <h2 v-else>该歌单里还没添加任何歌曲</h2>
            </div>
          </div>
          <div v-if="edit">
            <editList
              :pic_url="pic_url"
              :l_id="edit"
              :detial="edit_detial"
              @reload="reloadCreatedMusicLists"
              @edited="getListDetial(edit)"
            />
          </div>
        </div>
      </div>
      <div v-else>
        请登录
      </div>
    </div>
  </div>
</template>

<script>
import sList from "@/components/sList";
import songsList from "@/components/songsList";
import editList from "@/components/editList";
import showMusicList from "@/components/showMusicList";
export default {
  components: {
    sList,
    songsList,
    editList,
    showMusicList
  },
  async asyncData({ $axios, store }) {
    if (store.state.isLogin) {
      const user_created_list_res = await $axios.post(
        `${process.env.BACKEND_URL}/get/created_musiclist`,
        {
          user_name: store.state.userName
        }
      );
      const user_collected_list_res = await $axios.post(
        `${process.env.BACKEND_URL}/get/collected_musiclist`,
        {
          user_name: store.state.userName
        }
      );
      // console.log(user_collected_list_res);
      return {
        user_created_list: user_created_list_res.data,
        user_collected_list: user_collected_list_res.data
      };
    }
  },
  data() {
    return {
      isOpen: true,
      src: null,
      detial: null,
      edit: null,
      songs: [],
      pic_url: null,
      creator_pic: null,
      user_created_list: null,
      user_collected_list: null,
      current_list_id: null,
      edit_detial: {}
    };
  },
  methods: {
    async reloadCreatedMusicLists() {
      const user_created_list_res = await this.$axios.post(
        `${process.env.BACKEND_URL}/get/created_musiclist`,
        {
          user_name: this.$store.state.userName
        }
      );
      this.user_created_list = user_created_list_res.data;
    },
    async reloadCollectedMusicLists() {
      const user_collected_list_res = await this.$axios.post(
        `${process.env.BACKEND_URL}/get/collected_musiclist`,
        {
          user_name: this.$store.state.userName
        }
      );
      this.user_collected_list = user_collected_list_res.data;
    },
    async enterEdit(l_id) {
      this.detial = null;
      this.current_list_id = null;
      this.edit = l_id;
      const detial = await this.$axios.post(
        `${process.env.BACKEND_URL}/get/musiclist_detail`,
        {
          l_id: l_id
        }
      );
      this.edit_detial = detial.data[0];
      const res = await this.$axios.post(
        `${process.env.BACKEND_URL}/get/list_cover`,
        {
          l_id
        }
      );
      this.pic_url = res.data.list_cover;
    },

    async getListDetial(listId, force = false) {
      if (listId !== this.current_list_id || force) {
        this.edit = null;
        this.songs = [];
        // 获取用户创建的歌单详情
        const detial = await this.$axios.post(
          `${process.env.BACKEND_URL}/get/musiclist_detail`,
          {
            l_id: listId
          }
        );
        this.detial = detial.data[0];
        // 获取创建者头像
        const user_pic_res = await this.$axios.post(
          `${process.env.BACKEND_URL}/get/user_pic`,
          {
            user_name: this.detial.created_by
          }
        );
        this.creator_pic = user_pic_res.data.user_pic;
        if (detial.data[0].music_ids.length !== 0) {
          // 获取歌单中所有歌曲详情
          const query = [];
          detial.data[0].music_ids.forEach(id => {
            query.push(id.toString());
          });
          const res = await this.$axios.get(
            `${process.env.MUSIC_API_URL}/song/detail?ids=${query.join(",")}`
          );
          const temp = [];
          // 处理数据
          res.data.songs.forEach(async song => {
            const al = await this.$axios.get(
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
          this.songs = temp;
          this.current_list_id = listId;
        }
      }
    },
    async getLikedDetial() {
      this.edit = null;
      this.detial = {
        liked: true,
        list_name: "我喜欢的音乐",
        creator_pic: this.$store.state.pic,
        created_by: this.$store.state.userName,
        list_cover:
          "https://web-music.oss-cn-shenzhen.aliyuncs.com/static/3099b3803ad9496896c43f22fe9be8c4.png",
        music_ids: this.$store.state.user.liked_music
      };
      const temp = [];
      if (this.$store.state.user.liked_music.length > 0) {
        const query = this.$store.state.user.liked_music
          .map(item => item.toString())
          .join(",");
        const res = await this.$axios.get(
          `${process.env.MUSIC_API_URL}/song/detail?ids=${query}`
        );
        // 处理数据
        res.data.songs.forEach(async song => {
          const al = await this.$axios.get(
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
      }
      this.songs = temp;
      this.current_list_id = "liked";
    },
    reloadAll(reloadDetial = true) {
      this.reloadCreatedMusicLists();
      this.reloadCollectedMusicLists();
      if (reloadDetial) {
        this.getListDetial(this.current_list_id, true);
      }
    }
  },
  mounted() {
    if (this.$store.state.isLogin) {
      this.getLikedDetial();
    }
  }
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.box {
  min-height: 80vh;
  // border: 1px #fff solid;
  // background: #141414;
  display: flex;
  // padding: 20px;
}
.left-side {
  width: 30%;
  // border: 1px #eee solid;
}
.right-side {
  width: 70%;
  // border: 1px #eee solid;
}
</style>
