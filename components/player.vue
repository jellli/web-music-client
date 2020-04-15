<template>
  <audio :src="this.playUrl" id="player"></audio>
</template>
<script>
export default {
  data() {
    return {
      playUrl: ""
    };
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
  }
};
</script>
