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
      <div class="box">
        <div class="left-side">
          <div class="menu">
            <div class="menu-title" @click="isOpen = !isOpen">
              创建的歌单
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
                <li class="menu-item" @click="getListDetail(3136952023)">
                  歌单1
                </li>
                <li class="menu-item" @click="getListDetail(24381617)">
                  歌单2
                </li>
                <li class="menu-item">
                  歌单3
                </li>
              </ul>
            </transition>
          </div>
        </div>
        <div class="right-side">
          <span v-if="detail">{{ detail.name }}</span>
          <img :src="detail.coverImgUrl" v-if="detail" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      src: null,
      detail: null,
      popup: false,
      list_name: ""
    };
  },
  methods: {
    submit() {
      this.$axios.post(`${process.env.BACKEND_URL}/create/musiclist`, {
        user_name: this.$store.state.userName,
        list_name: this.list_name
      });
      this.popup = false;
    },
    async getListDetail(listId) {
      const detail = await this.$axios.get(
        `${process.env.MUSIC_API_URL}/playlist/detail?id=${listId}`
      );
      console.log(detail);
      this.detail = detail.data.playlist;
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
  min-height: 60vh;
  border: 1px #fff solid;
  display: flex;
  padding: 20px;
  ul {
    list-style: none;
  }
  .menu {
    font-size: 1.2rem;
    padding: 10px;
    .menu-title {
      padding: 10px;
      transition: all ease 0.3s;
      cursor: pointer;
      &:hover {
        background: rgba(#fff, 0.2);
      }
    }
    .menu-item {
      @extend .menu-title;
      font-size: 1.1rem;
      padding-left: 20px;
    }
  }
}
.left-side {
  width: 30%;
  border: 1px #eee solid;
}
.right-side {
  width: 70%;
  border: 1px #eee solid;
}
</style>
