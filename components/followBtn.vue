<template>
  <div class="follow-btn-component">
    <el-button
      type="primary"
      round
      @click="handleClick"
      :loading="loading"
      :size="size"
    >
      <!-- <i class="fas fa-plus" v-if="!isFollowed || !loading"></i>
      <i class="fas fa-check" v-else-if="isFollowed || !loading"></i> -->
      {{ isFollowed ? "已关注" : "关注" }}
    </el-button>
  </div>
</template>

<script>
export default {
  props: {
    followers: {
      type: Array,
      default: function() {
        return [];
      }
    },
    currentUsername: {
      default: ""
    },
    size: {
      default: "mini"
    }
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    username() {
      if (this.$store.state.isLogin) {
        return this.$store.state.userName;
      } else {
        return "";
      }
    },
    isFollowed() {
      return (
        this.followers.filter(item =>
          Object.values(item).includes(this.username)
        ).length > 0
      );
      // return Object.values(this.followers[0]).includes(this.username);
    }
  },
  methods: {
    async handleClick() {
      if (this.$store.state.isLogin) {
        if (this.isFollowed) {
          this.loading = true;
          await this.$axios.post(`${process.env.BACKEND_URL}/update/follow`, {
            following: this.currentUsername,
            follower: this.$store.state.userName,
            type: "unfollow"
          });
          this.loading = false;
          this.followers.splice(
            this.followers.indexOf(this.$store.state.userName),
            1
          );
        } else {
          this.loading = true;
          await this.$axios.post(`${process.env.BACKEND_URL}/update/follow`, {
            following: this.currentUsername,
            follower: this.$store.state.userName,
            type: "follow"
          });
          this.loading = false;
          this.followers.push({
            user_name: this.$store.state.username
          });
        }
      } else {
        this.$message({ message: "请先登录再进行操作", type: "warning" });
      }
    }
  }
};
</script>

<style></style>
