<template>
  <div class="menu">
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
    <div class="menu-title" @click="isOpen = !isOpen">
      <span>{{ title }}</span>
      <svg
        v-if="owned"
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
        <li v-if="owned">
          <div class="menu-item" @click="emitGetLikedDetial">
            <div class="list-cover">
              <img
                src="https://web-music.oss-cn-shenzhen.aliyuncs.com/static/3099b3803ad9496896c43f22fe9be8c4.png"
              />
            </div>
            <div class="list-info">
              <h3>我喜欢的音乐</h3>
              {{ liked_music.length }} 首
            </div>
          </div>
        </li>
        <li v-for="i in list_data" :key="i.l_id" class="m-i">
          <div class="menu-item" @click="emitGetDetial(i.l_id)">
            <div class="list-cover">
              <img :src="i.list_cover" />
            </div>
            <div class="list-info">
              <h3>{{ i.list_name }}</h3>
              {{ i.music_ids.length }}首
            </div>
          </div>
          <div class="list-ctrl">
            <div class="edit-list" @click="emitEnterEdit(i.l_id)" v-if="owned">
              <i class="fas fa-edit"></i>
            </div>
            <div class="delete-list">
              <!-- todo -->
              <removePlaylist @deleted="emitReload" :l_id="i.l_id">
                <i class="far fa-trash-alt"></i>
              </removePlaylist>
            </div>
          </div>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
import removePlaylist from "@/components/removePlaylist";
export default {
  components: {
    removePlaylist
  },
  props: ["owned", "list_data", "title"],
  data() {
    return {
      isOpen: true,
      popup: false,
      list_name: ""
    };
  },
  methods: {
    emitEnterEdit(l_id) {
      this.$emit(`enterEdit`, l_id);
    },
    emitGetDetial(l_id) {
      this.$emit(`getDetial`, l_id);
    },
    emitReload() {
      this.$emit(`reload`);
    },
    emitGetLikedDetial() {
      this.$emit(`getLikedDetial`);
    },
    submit() {
      this.$axios.post(`${process.env.BACKEND_URL}/create/musiclist`, {
        user_name: this.$store.state.userName,
        list_name: this.list_name
      });
      this.popup = false;
      this.$emit(`reload`);
    }
  },
  computed: {
    liked_music() {
      return this.$store.state.user.liked_music;
    }
  }
};
</script>

<style lang="scss">
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
    align-items: center;
    top: calc(50% - 10px);
    right: 10px;
    margin-left: auto;
    margin-right: 10px;
    i {
      font-size: 1rem;
    }
    & > * {
      cursor: pointer;
      margin-left: 7px;
    }
  }
}
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
</style>
