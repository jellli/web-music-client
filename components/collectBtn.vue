<template>
  <div class="collect-btn-component">
    <div class="collect-btn" @click="handleClick">
      <slot name="collected" v-if="collected"></slot>
      <slot name="collect" v-else></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["l_id"],
  methods: {
    async handleClick() {
      if (this.isLogin) {
        const url = this.collected
          ? "/update/cancel_collected_music"
          : "/update/collected_music";
        await this.$axios.post(`${process.env.BACKEND_URL}/${url}`, {
          user_name: this.$store.state.userName,
          l_id: this.l_id
        });
        this.reloadUser();
        this.$emit("done");
      } else {
        this.$message({
          message: "请先登录再进行操作",
          type: "warning"
        });
      }
    },
    async reloadUser() {
      const user_res = await this.$axios.post(
        `${process.env.BACKEND_URL}/get/user`,
        {
          user_name: this.$store.state.userName
        }
      );
      this.$store.commit("setUser", user_res.data[0]);
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
    collected() {
      if (this.isLogin && this.$store.state.user.collected_music_list) {
        return this.$store.state.user.collected_music_list.includes(
          parseInt(this.l_id)
        );
      } else {
        return false;
      }
    }
  }
};
</script>

<style></style>
