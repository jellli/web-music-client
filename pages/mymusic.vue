<template>
  <div class="mymusic">
    <div class="popup" v-if="popup">
      <div class="msg-box">
        <div class="box-title">
          <span>新建歌单</span>
          <svg
            t="1596874570746"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="6348"
            width="20"
            height="20"
            @click="popup = false"
          >
            <path
              d="M566.355825 512l90.479264 90.507708a38.398933 38.398933 0 0 1-54.298936 54.32738L512.028445 566.270492l-90.507708 90.507709a38.398933 38.398933 0 0 1-54.32738-54.298937L457.757952 512l-90.507708-90.507708a38.398933 38.398933 0 0 1 54.298936-54.32738L512.028445 457.729508l90.507708-90.507709a38.398933 38.398933 0 0 1 54.32738 54.298937L566.298937 512zM874.030834 149.969168c199.95889 199.95889 199.95889 524.102775 0 724.061664-199.95889 199.95889-524.102775 199.95889-724.061665 0-199.95889-199.95889-199.95889-524.102775 0-724.061664 199.95889-199.95889 524.102775-199.95889 724.061665 0z m-54.32738 54.327379c-169.922391-169.979278-445.484514-169.979278-615.435349 0-169.950835 169.922391-169.950835 445.484514 0 615.435349s445.512958 169.950835 615.463793 0c169.950835-169.950835 169.950835-445.512958 0-615.463792z"
              p-id="6349"
              fill="#ffffff"
            ></path>
          </svg>
        </div>
        <div class="box-content">
          <table>
            <tr>
              <td>歌单名:</td>
              <td><input type="text" v-model="list_name" /></td>
            </tr>
            <tr>
              <td></td>
              <td>
                <span>可通过"收藏"将音乐添加到新歌单中</span>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <button class="green" @click="submit">新建</button>
                <button class="black" @click="popup = false">取消</button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div class="restrainer">
      <div class="box" v-if="this.$store.state.isLogin">
        <div class="left-side">
          <div class="menu">
            <div class="menu-title" @click="isOpen = !isOpen">
              <span>创建的歌单</span>
              <svg
                t="1596872179387"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2246"
                width="16"
                height="16"
                @click="popup = true"
              >
                <path
                  d="M933.875 568.25h-365.625v365.625c0 15.525-12.6 28.125-28.125 28.125h-56.25c-15.525 0-28.125-12.6-28.125-28.125v-365.625h-365.625c-15.525 0-28.125-12.6-28.125-28.125v-56.25c0-15.525 12.6-28.125 28.125-28.125h365.625v-365.625c0-15.525 12.6-28.125 28.125-28.125h56.25c15.525 0 28.125 12.6 28.125 28.125v365.625h365.625c15.525 0 28.125 12.6 28.125 28.125v56.25c0 15.525-12.6 28.125-28.125 28.125z"
                  p-id="2247"
                  fill="#e6e6e6"
                ></path>
              </svg>
            </div>
            <transition name="fade">
              <ul v-if="isOpen">
                <li v-for="i in user_created_list" :key="i.l_id" class="m-i">
                  <div class="menu-item" @click="getListDetial(i.l_id)">
                    <div class="list-cover">
                      <img :src="i.list_cover" />
                    </div>
                    <div class="list-info">
                      <h3>{{ i.list_name }}</h3>
                      {{ i.music_ids.length }}首
                    </div>
                  </div>
                  <div class="list-ctrl">
                    <div class="edit-list" @click="enterEdit(i.l_id)">
                      <svg
                        t="1597040673974"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="8530"
                        width="20"
                        height="20"
                      >
                        <path
                          d="M768 896H256a128 128 0 0 1-128-128V256a128 128 0 0 1 128-128h256a42.666667 42.666667 0 0 1 0 85.333333H256a42.666667 42.666667 0 0 0-42.666667 42.666667v512a42.666667 42.666667 0 0 0 42.666667 42.666667h512a42.666667 42.666667 0 0 0 42.666667-42.666667v-256a42.666667 42.666667 0 0 1 85.333333 0v256a128 128 0 0 1-128 128z m-408.405333-232.917333a64 64 0 0 1 0-90.325334l45.141333-45.184 90.325333 90.325334-45.141333 45.184a64 64 0 0 1-90.325333 0z m165.589333-75.264l-90.325333-90.325334 351.232-351.232a64 64 0 1 1 90.325333 90.325334z"
                          p-id="8531"
                          fill="#ffffff"
                        ></path>
                      </svg>
                    </div>
                    <div class="delete-list">
                      <svg
                        t="1597041091003"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="9357"
                        width="20"
                        height="20"
                      >
                        <path
                          d="M704 960H320c-52.9 0-96-43.1-96-96V256h576v608c0 52.9-43.1 96-96 96zM288 320v544c0 17.6 14.4 32 32 32h384c17.6 0 32-14.4 32-32V320H288z"
                          fill="#ffffff"
                          p-id="9358"
                        ></path>
                        <path
                          d="M896 320H128c-17.7 0-32-14.3-32-32s14.3-32 32-32h768c17.7 0 32 14.3 32 32s-14.3 32-32 32zM384 756c-17.7 0-32-14.3-32-32V492c0-17.7 14.3-32 32-32s32 14.3 32 32v232c0 17.7-14.3 32-32 32zM512 756c-17.7 0-32-14.3-32-32V492c0-17.7 14.3-32 32-32s32 14.3 32 32v232c0 17.7-14.3 32-32 32zM640 756c-17.7 0-32-14.3-32-32V492c0-17.7 14.3-32 32-32s32 14.3 32 32v232c0 17.7-14.3 32-32 32z"
                          fill="#ffffff"
                          p-id="9359"
                        ></path>
                        <path
                          d="M720 320H304V160c0-52.9 43.1-96 96-96h224c52.9 0 96 43.1 96 96v160z m-352-64h288v-96c0-17.6-14.4-32-32-32H400c-17.6 0-32 14.4-32 32v96z"
                          fill="#ffffff"
                          p-id="9360"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </li>
              </ul>
            </transition>
          </div>
        </div>
        <div class="right-side">
          <div v-if="detial">
            <sList :detial="detial" />
            <songsList :songs="songs" />
          </div>
          <div v-if="edit">
            <editList :pic_url="pic_url" :l_id="edit" />
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
export default {
  components: {
    sList,
    songsList,
    editList
  },
  async asyncData({ $axios, store }) {
    const user_created_list_res = await $axios.post(
      `${process.env.BACKEND_URL}/get/created_musiclist`,
      {
        user_name: store.state.userName
      }
    );
    // console.log(user_created_list_res);
    return {
      user_created_list: user_created_list_res.data
    };
  },
  data() {
    return {
      isOpen: true,
      src: null,
      detial: null,
      edit: null,
      popup: false,
      list_name: "",
      songs: null,
      pic_url: null
    };
  },
  methods: {
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
    submit() {
      this.$axios.post(`${process.env.BACKEND_URL}/create/musiclist`, {
        user_name: this.$store.state.userName,
        list_name: this.list_name
      });
      this.popup = false;
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
};
</script>

<style lang="scss" scoped>
.popup {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(#000, 0.2);
  .msg-box {
    width: 480px;
    height: 210px;
    border-radius: 5px;
    // border: #fff solid 1px;
    background: #282828;
    .box-title {
      padding: 9px 14px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .icon {
        cursor: pointer;
      }
    }
    .box-content {
      td {
        padding-bottom: 15px;
        padding-right: 15px;
      }
      span {
        color: #aaa;
      }
      input {
        padding: 5px;
        border: none;
        background: rgba(#fff, 0.2);
        outline: none;
        height: 32px;
        width: 320px;
        border-radius: 5px;
      }
      button {
        cursor: pointer;
        margin-right: 20px;
        border: none;
        outline: none;
        padding: 10px 20px;
        border-radius: calc(1rem + 10px);
        transition: all ease 0.5s;
        &.black {
          background: black;
        }
        &.green {
          background: #1db954;
        }
        &:hover {
          filter: brightness(1.2);
        }
      }
      height: calc(100% - 38.8px);
      display: flex;
      justify-content: center;
      align-items: center;
      // background: rgba(#fff, 0.1);
    }
  }
}
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
  ul {
    list-style: none;
  }
  .menu {
    font-size: 1.2rem;
    padding: 10px;
    .menu-title {
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: all ease 0.3s;
      cursor: pointer;
      &:hover {
        background: rgba(#fff, 0.2);
      }
    }
    .m-i {
      position: relative;
    }
    .menu-item {
      display: flex;
      align-items: center;

      padding: 5px;
      font-size: 0.9rem;
      transition: all ease 0.3s;
      cursor: pointer;
      &:hover {
        background: rgba(#fff, 0.2);
      }
      // padding-left: 30px;
      .list-cover {
        width: 80px;
        height: 80px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .list-info {
        padding: 10px;
        h3 {
          margin-bottom: 7px;
        }
      }
    }
    .list-ctrl {
      z-index: 999;
      position: absolute;
      display: flex;
      top: calc(50% - 10px);
      right: 10px;
      margin-left: auto;
      margin-right: 10px;
      & > * {
        cursor: pointer;
        margin-left: 7px;
      }
    }
  }
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
