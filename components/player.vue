<template>
  <div class="player">
    <audio :src="this.playUrl" id="player" @timeupdate="timeLine"></audio>
    <div class="player-song-data" v-if="JSON.stringify(data) !== '{}'">
      <div class="player-song-cover">
        <img :src="data.al.picUrl" />
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
        <i class="fas fa-backward"></i>
        <i
          class="fas fa-play-circle"
          @click="play"
          v-if="getIsPlaying === false"
        ></i>
        <i class="fas fa-pause-circle" @click="play" v-else></i>
        <i class="fas fa-forward"></i>
      </div>
      <div class="progress">
        <span>
          {{ this.$formatTime(currentTime) }}
        </span>
        <div class="progress-bar" id="pr" @click="setProgress">
          <div
            class="current-progress"
            :style="`width:${(currentTime / duration) * 100}%`"
          ></div>
        </div>
        <span v-if="!isNaN(duration)">
          {{ this.$formatTime(duration) }}
        </span>
        <span v-else>
          00:00
        </span>
      </div>
    </div>
    <div class="song-nav">
      <div class="volume">
        <i class="fas fa-volume-mute" v-if="this.volume === 0"></i>
        <i class="fas fa-volume-down" v-if="this.volume <= 0.5"></i>
        <i
          class="fas fa-volume-up"
          v-if="this.volume <= 1 && this.volume > 0.5"
        ></i>
        <div class="volume-bar" @click="setVolume" id="vo">
          <div class="current-volume" :style="`width:${volume * 100}%`"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      playUrl: "",
      data: {},
      currentTime: 0,
      duration: 0,
      volume: 0.5
    };
  },
  methods: {
    play() {
      if (this.getIsPlaying === true) {
        player.pause();
        this.$store.commit("togglePlayingState");
      } else {
        player.play();
        this.$store.commit("togglePlayingState");
      }
    },
    timeLine() {
      this.currentTime = player.currentTime;
      this.duration = player.duration;
      if (player.currentTime === player.duration) {
        player.currentTime = 0;
        this.$store.commit("togglePlayingState");
      }
    },
    setProgress(event) {
      if (this.$store.state.isPlaying === false) {
        this.$store.commit("togglePlayingState");
      }
      player.currentTime = this.duration * (event.offsetX / pr.clientWidth);
    },
    setVolume(event) {
      player.volume = event.offsetX / vo.clientWidth;
      this.volume = player.volume;
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
        const playUrl = await this.$axios.get(
          `${process.env.MUSIC_API_URL}/song/url?id=${this.$store.state.currentId}`
        );
        const detial = await this.$axios.get(
          `${process.env.MUSIC_API_URL}/song/detail?ids=${this.$store.state.currentId}`
        );
        this.data = detial.data.songs[0];
        if (playUrl.data.length == 0) {
          this.playUrl = "";
        } else {
          this.playUrl = playUrl.data.data[0].url;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getIsPlaying(val) {
      // 此处较愚蠢 待改进
      setTimeout(() => {
        if (val === true) {
          player.play();
        } else {
          player.pause();
        }
      }, 500);
    }
  },
  mounted() {
    const player = document.getElementById("player");
    const pr = document.getElementById("pr");
    const vo = document.getElementById("vo");
  }
};
</script>

<style lang="scss" scoped>
$height: 90px;
.player {
  width: 100vw;
  height: $height;
  position: fixed;
  bottom: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: #030306 solid 1px;
  background: #282828;
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
  justify-content: space-evenly;
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
  width: 100px;
  i {
    margin-right: 10px;
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
</style>
