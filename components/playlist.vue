<template>
  <div class="playlist-component" v-popover:popover>
    <el-popover
      ref="popover"
      title="播放列表"
      width="350"
      trigger="click"
      popper-class="playlist-list"
    >
      <ul class="playlist-list" v-if="songs && songs.length !== 0">
        <li v-for="song in songs" :key="song.id" class="playlist-item">
          <div
            class="list-item"
            @click="play(song.id)"
            :style="currentId === song.id ? `color:#1db954` : ``"
          >
            {{ song.name }}
          </div>
          <div class="list-ctrl">
            <likeSong :m_id="song.id" />
            <cMbtn :music_id="song.id">
              <i class="fas fa-folder-plus"></i>
            </cMbtn>
            <div
              class="remove-from-playlist"
              @click="removeFromPlaylist(song.id)"
            >
              <i class="fas fa-minus"></i>
            </div>
          </div>
        </li>
      </ul>
      <h3 v-else>播放列表为空</h3>
    </el-popover>
    <svg
      slot="reference"
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="list-music"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="16"
      height="16"
      class="svg-inline--fa fa-list-music fa-w-16 fa-3x"
    >
      <path
        fill="#fff"
        d="M16 256h256a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16zm0-128h256a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16H16A16 16 0 0 0 0 80v32a16 16 0 0 0 16 16zm128 192H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM470.94 1.33l-96.53 28.51A32 32 0 0 0 352 60.34V360a148.76 148.76 0 0 0-48-8c-61.86 0-112 35.82-112 80s50.14 80 112 80 112-35.82 112-80V148.15l73-21.39a32 32 0 0 0 23-30.71V32a32 32 0 0 0-41.06-30.67z"
        class=""
      ></path>
    </svg>
  </div>
</template>

<script>
import cMbtn from "@/components/cMbtn";
import likeSong from "@/components/likeSong";
export default {
  components: {
    cMbtn,
    likeSong
  },
  data() {
    return {
      songs: []
    };
  },
  methods: {
    play(id) {
      // 先获取url 如果不为null再切换状态
      if (this.$store.state.currentId == id) {
        this.$store.commit("togglePlayingState");
      } else if (this.$store.state.isPlaying) {
        this.$store.commit("togglePlayingState");
        this.$store.commit("setCurrentId", id);
        this.$store.commit("togglePlayingState");
      } else {
        this.$store.commit("setCurrentId", id);
        this.$store.commit("togglePlayingState");
      }
    },
    async getSongs() {
      const query = this.$store.state.playlist
        .map(id => id.toString())
        .join(",");
      const res = await this.$axios.get(
        `${process.env.MUSIC_API_URL}/song/detail?ids=${query}`
      );
      this.songs = res.data.songs;
    },
    removeFromPlaylist(id) {
      this.$store.commit("removeFromPlaylist", id);
    }
  },
  computed: {
    playlist() {
      return this.$store.state.playlist.length;
    },
    isLogin() {
      return this.$store.state.isLogin;
    },
    currentId() {
      return this.$store.state.currentId;
    },
    user() {
      return this.$store.state.user;
    }
  },
  watch: {
    playlist() {
      this.getSongs();
    },
    isLogin() {
      this.getSongs();
    },
    user() {
      this.getSongs();
    }
  }
};
</script>

<style lang="scss">
.el-popover.el-popper.playlist-list {
  border: none;
  min-height: 300px;
}
.playlist-component {
  margin-right: 10px;
  & > * {
    width: 14px;
    height: 14px;
    cursor: pointer;
  }
}
.playlist-list {
  .playlist-item {
    padding: 7px 12px;
    position: relative;
    cursor: pointer;
    &:hover {
      background: rgba(#fff, 0.2);
    }
    .list-item {
    }
    .list-ctrl {
      display: flex;
      align-items: center;
      position: absolute;
      font-size: 16px;
      top: calc(50% - 10px);
      right: 10px;
      & > * {
        margin-left: 10px;
      }
    }
  }
}
</style>
