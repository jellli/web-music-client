<template>
  <div class="like-song">
    <div class="like-song-btn">
      <i
        class="fas fa-heart"
        v-if="likedMusic && likedMusic.includes(m_id)"
        @click="dislikeSong"
        style="color:#af3030"
      ></i>
      <i class="far fa-heart" v-else @click="likeSong"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: ["m_id"],
  computed: {
    likedMusic() {
      if (this.$store.state.isLogin) {
        return this.$store.state.user.liked_music;
      } else {
        return false;
      }
    }
  },
  methods: {
    async reloadUser() {
      const user_res = await this.$axios.post(
        `${process.env.BACKEND_URL}/get/user`,
        {
          user_name: this.$store.state.userName
        }
      );
      this.$store.commit("setUser", user_res.data[0]);
    },
    async likeSong() {
      if (this.$store.state.isLogin) {
        await this.$axios.post(`${process.env.BACKEND_URL}/update/like_music`, {
          music_id: this.m_id,
          user_name: this.$store.state.userName
        });
        this.reloadUser();
      } else {
        this.$message.warning({ message: "请先登录再进行操作" });
      }
    },
    async dislikeSong() {
      if (this.$store.state.isLogin) {
        await this.$axios.post(
          `${process.env.BACKEND_URL}/update/dislike_music`,
          {
            music_id: this.m_id,
            user_name: this.$store.state.userName
          }
        );
        this.reloadUser();
      } else {
        this.$message.warning({ message: "请先登录再进行操作" });
      }
    }
  }
};
</script>

<style></style>
