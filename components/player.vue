<template>
  <div
    class="player"
    :style="
      `transition:all ease 0.3s; ${
        isOpen ? '' : 'transform: translateY(85px);'
      }`
    "
  >
    <!-- vue中使用ref获取页面元素 -->
    <audio
      :src="this.playUrl"
      id="player"
      @timeupdate="timeLine"
      ref="player"
    ></audio>
    <div class="stick-lock">
      <div @click="isOpen = !isOpen">
        <i
          class="fas fa-angle-down"
          :style="
            `transition:all ease 0.3s; ${
              isOpen ? '' : 'transform: rotate(180deg);'
            }`
          "
        ></i>
      </div>
    </div>
    <div class="player-song-data" v-if="JSON.stringify(data) !== '{}'">
      <div class="player-song-cover" v-loading="loading">
        <el-image
          style="width: 100%; height: 100%"
          :src="data.al.picUrl"
          fit="cover"
          :load="(loading = false)"
        ></el-image>
      </div>
      <div>
        <div class="player-song-name">
          <nuxt-link :to="`/song/${data.id}`">{{ data.name }}</nuxt-link>
        </div>
        <div class="player-song-artists">
          <nuxt-link
            :to="`/artist/${artist.id}`"
            v-for="(artist, index) in data.ar"
            :key="index"
          >
            {{ artist.name }}
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="song-fake-data" v-else></div>
    <div class="song-ctrl">
      <div class="btns">
        <i class="fas fa-backward" @click="prevSong"></i>
        <i
          class="fas fa-play-circle"
          @click="play"
          v-if="getIsPlaying === false"
        ></i>
        <i class="fas fa-pause-circle" @click="play" v-else></i>
        <i class="fas fa-forward" @click="nextSong"></i>
      </div>
      <div class="progress">
        <span>
          {{ this.$formatTime(currentTime) }}
        </span>
        <el-slider
          v-model="currentTime"
          style="width:100%"
          @change="setProgress"
          :max="duration"
          :show-tooltip="false"
          :disabled="playUrl.length === 0"
        ></el-slider>
        <!-- <div class="progress-bar" id="pr" @click="setProgress">
          <div
            class="current-progress"
            :style="`width:${(currentTime / duration) * 100}%`"
          ></div>
        </div> -->
        <span v-if="!isNaN(duration)">
          {{ this.$formatTime(duration) }}
        </span>
        <span v-else>
          00:00
        </span>
      </div>
    </div>
    <div class="song-nav">
      <playlist />
      <div class="volume">
        <i
          class="fas fa-volume-mute"
          v-if="this.volume === 0"
          @click="toggleVolume"
        ></i>
        <i
          class="fas fa-volume-down"
          v-else-if="this.volume <= 0.5"
          @click="toggleVolume"
        ></i>
        <i class="fas fa-volume-up" v-else @click="toggleVolume"></i>
        <el-slider
          v-model="volume"
          style="width:70%;flex-shrink:0;"
          :max="1"
          :step="0.05"
          tooltip-class="volume-tooltip"
          :format-tooltip="volume => `${parseInt(volume * 100)}`"
          @input="setVolume"
        ></el-slider>
        <!-- <div class="volume-bar" @click="setVolume" id="vo">
          <div class="current-volume" :style="`width:${volume * 100}%`"></div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import playlist from "@/components/playlist";
export default {
  components: {
    playlist
  },
  data() {
    return {
      playUrl: "",
      data: {},
      currentTime: 0,
      duration: 0,
      volume: 0.5,
      temp: 0,
      isOpen: true,
      loading: false
    };
  },
  methods: {
    play() {
      if (
        this.$store.state.currentId.length === 0 &&
        this.$store.state.playlist.length !== 0
      ) {
        this.$store.commit("setCurrentId", this.$store.state.playlist[0]);
        this.$store.commit("togglePlayingState");
      } else if (this.$store.state.currentId.length !== 0) {
        this.$store.commit("togglePlayingState");
      } else {
        this.$message({
          message: "当前没有歌曲可以播放",
          type: "warning"
        });
      }
    },
    timeLine() {
      this.currentTime = player.currentTime;
      this.duration = player.duration;
      if (player.currentTime === player.duration) {
        this.nextSong();
        player.currentTime = 0;
      }
    },
    setProgress(event) {
      if (this.$store.state.isPlaying === false) {
        this.$store.commit("togglePlayingState");
      }
      player.currentTime = this.currentTime;
    },
    setVolume(event) {
      player.volume = this.volume;
      // player.volume = event.offsetX / vo.clientWidth;
      // this.volume = player.volume;
    },
    toggleVolume() {
      if (this.volume === 0) {
        this.volume = this.temp;
      } else {
        this.temp = this.volume;
        this.volume = 0;
      }
    },
    prevSong() {
      if (this.$store.state.playlist.indexOf(this.getPlayId) === 0) {
        this.$store.commit(
          "setCurrentId",
          this.$store.state.playlist[this.$store.state.playlist.length - 1]
        );
      } else {
        this.$store.commit(
          "setCurrentId",
          this.$store.state.playlist[
            this.$store.state.playlist.indexOf(this.getPlayId) - 1
          ]
        );
      }
    },
    nextSong() {
      if (
        this.$store.state.playlist.indexOf(this.getPlayId) ===
        this.$store.state.playlist.length - 1
      ) {
        this.$store.commit("setCurrentId", this.$store.state.playlist[0]);
      } else {
        this.$store.commit(
          "setCurrentId",
          this.$store.state.playlist[
            this.$store.state.playlist.indexOf(this.getPlayId) + 1
          ]
        );
      }
    }
  },
  computed: {
    getPlayId() {
      return this.$store.state.currentId;
    },
    getIsPlaying() {
      return this.$store.state.isPlaying;
    }
  },
  watch: {
    async getPlayId() {
      try {
        // 获取播放链接,如果有版权保护,播放链接为null
        this.loading = true;
        const playUrl = await this.$axios.get(
          `${process.env.MUSIC_API_URL}/song/url?id=${this.$store.state.currentId}`
        );
        // 若可播放再改变当前播放器的内容
        if (playUrl.data.data[0].url) {
          const detial = await this.$axios.get(
            `${process.env.MUSIC_API_URL}/song/detail?ids=${this.$store.state.currentId}`
          );
          this.data = detial.data.songs[0];
          this.playUrl = playUrl.data.data[0].url;
          // this.loading = false;
        } else {
          // this.loading = false;
          this.$message({
            message: "因版权问题该音乐不提供播放,请尝试其他歌曲",
            type: "warning"
          });
          this.nextSong();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getIsPlaying(val) {
      if (val === true) {
        // 当音乐缓冲到可以播放的程度再进行播放操作，避免用户进行播放时无反应
        await player.addEventListener("canplaythrough", () => {
          player.play();
        });
        player.play();
      } else {
        player.pause();
      }
    },
    currentTime() {
      this.$store.commit("setCurrentTime", this.currentTime);
    },
    volume() {
      localStorage.setItem("volume", this.volume);
    }
  },
  mounted() {
    const player = document.getElementById("player");
    if (localStorage.getItem("id")) {
      this.$store.commit("setCurrentId", parseInt(localStorage.getItem("id")));
    }
    if (localStorage.getItem("playlist")) {
      this.$store.commit(
        "setPlaylist",
        localStorage
          .getItem("playlist")
          .split(",")
          .map(id => parseInt(id))
      );
    }
    if (localStorage.getItem("volume")) {
      this.volume = parseFloat(localStorage.getItem("volume"));
    }
    if (localStorage.getItem("userName")) {
      this.$store.commit("toggleLoginState");
      this.$store.commit("setUserName", localStorage.getItem("userName"));
    }
    if (localStorage.getItem("userPic")) {
      this.$store.commit("setUserPic", localStorage.getItem("userPic"));
    }
    if (localStorage.getItem("user")) {
      this.$store.commit("setUser", JSON.parse(localStorage.getItem("user")));
    }
  }
};
</script>

<style lang="scss">
$height: 90px;
.player {
  width: 100vw;
  height: $height;
  position: fixed;
  bottom: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: #030306 solid 1px;
  // background: #141414;
  background: linear-gradient(to top, #141414, 90%, #212121);
}
.player-song-data {
  display: flex;
  align-items: center;
}
.player-song-cover {
  width: $height;
  height: $height;
  flex-shrink: 0;
  margin-right: 20px;
  img {
    width: 100%;
    height: 100%;
  }
}
.player-song-name {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  a {
    text-overflow: ellipsis;
    font-size: 1.2rem;
  }
}
.player-song-artists {
  a {
    // margin-right: 10px;
    color: #939393;
    &:not(:last-child)::after {
      content: "·";
    }
  }
}
.song-ctrl {
  height: $height;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .btns {
    display: flex;
    justify-content: center;
    align-items: center;
    i {
      color: #b3b3b3;
      margin: 0 20px;
      cursor: pointer;
      &:nth-child(2) {
        font-size: 2rem;
      }
    }
  }
  .progress {
    width: 100%;
    display: grid;
    align-items: center;
    justify-items: center;
    grid-template-columns: 1fr 5fr 1fr;
    cursor: pointer;
    span {
      font-size: 0.9rem;
      color: #939393;
    }
  }
  .progress-bar {
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background: #535353;
    cursor: pointer;
  }
  .current-progress {
    width: 0;
    height: 100%;
    border-radius: inherit;
    background: #1db954;
    transition: all ease 0.2s;
  }
}
.song-nav {
  display: flex;
  padding: 20px;
  justify-content: flex-end;
  align-items: center;
}

.volume {
  display: flex;
  align-items: center;
  // justify-content: space-evenly;
  padding-right: 20px;
  width: 200px;
  i {
    font-size: 1rem;
    width: 1rem;
    height: 1rem;
    cursor: pointer;
    margin-right: 15px;
    // padding-right: 20px;
  }
}
.volume-bar {
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: #535353;
  cursor: pointer;
  .current-volume {
    width: 0;
    height: 100%;
    border-radius: inherit;
    background: #1db954;
    transition: all ease 0.2s;
  }
}
.el-tooltip__popper.is-dark.volume-tooltip {
  background: #282828;
  border: 1px #000 solid;
  color: #282828;
}
.stick-lock {
  position: absolute;
  top: -100px;
  right: 20px;
  width: 70px;
  height: 100px;
  // background: #1db954;
  border-top: 20px solid transparent;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 20px solid #2e2e2e;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  & > * {
    position: relative;
    bottom: -19px;
    cursor: pointer;
  }
}
</style>
