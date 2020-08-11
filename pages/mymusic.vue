<template>
  <div class="mymusic">
    <div class="restrainer">
      <div class="box" v-if="this.$store.state.isLogin">
        <div class="left-side">
          <showMusicList
            :list_data="user_created_list"
            :owned="true"
            title="创建的歌单"
            @getDetial="getListDetial"
            @enterEdit="enterEdit"
          />
          <showMusicList
            :list_data="user_collected_list"
            title="收藏的歌单"
            @getDetial="getListDetial"
          />
        </div>
        <div class="right-side">
          <div v-if="detial">
            <sList :detial="detial" />
            <songsList :songs="songs" v-if="songs" />
            <h2 v-else>该歌单里还没添加任何歌曲</h2>
          </div>
          <div v-if="edit">
            <editList
              :pic_url="pic_url"
              :l_id="edit"
              @reload="reloadCreatedMusicLists"
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
    return {
      user_created_list: user_created_list_res.data,
      user_collected_list: user_collected_list_res.data
    };
  },
  data() {
    return {
      isOpen: true,
      src: null,
      detial: null,
      edit: null,
      songs: null,
      pic_url: null
    };
  },
  methods: {
    async reloadCreatedMusicLists() {
      this.isOpen = false;
      this.$nextTick(() => {
        this.isOpen = true;
      });
    },
    async enterEdit(l_id) {
      this.detial = null;
      this.edit = l_id;
      const res = await this.$axios.post(
        `${process.env.BACKEND_URL}/get/list_cover`,
        {
          l_id
        }
      );
      // console.log(res);
      this.pic_url = res.data.list_cover;
    },

    async getListDetial(listId) {
      this.edit = null;
      // 获取用户创建的歌单详情
      const detial = await this.$axios.post(
        `${process.env.BACKEND_URL}/get/musiclist_detail`,
        {
          l_id: listId
        }
      );
      this.detial = detial.data[0];
      if (detial.data[0].music_ids.length !== 0) {
        // 获取歌单中所有歌曲详情
        const query = [];
        detial.data[0].music_ids.forEach(id => {
          query.push(id.toString());
        });
        const res = await this.$axios.get(
          `${process.env.MUSIC_API_URL}/song/detail?ids=${query.join(",")}`
        );
        // console.log(res.data);
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
      }
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
