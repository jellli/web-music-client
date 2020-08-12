<template>
  <div class="register-form restrainer">
    <h1>登录</h1>
    <form>
      <input type="text" placeholder="用户名" v-model="user_name" />
      <input type="password" placeholder="密码" v-model="user_pwd" />
      <input type="submit" value="登录" @click="login" />
      <div class="info-msg">
        <span>还没有账号？ <nuxt-link to="/register">注册</nuxt-link></span>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "登录"
    };
  },
  data() {
    return {
      user_name: "",
      user_pwd: ""
    };
  },
  methods: {
    async login(e) {
      e.preventDefault();
      const res = await this.$axios.post(`${process.env.BACKEND_URL}/login`, {
        user_name: this.user_name,
        user_pwd: this.user_pwd
      });

      if (res.data.status === 200) {
        this.$store.commit("toggleLoginState");
        this.$store.commit("setUserName", this.user_name);
        const user_res = await this.$axios.post(
          `${process.env.BACKEND_URL}/get/user`,
          {
            user_name: this.user_name
          }
        );

        this.$store.commit("setUserPic", user_res.data[0].user_pic);
        this.$store.commit("setUser", user_res.data[0]);
        this.$router.push(`/user/${this.user_name}`);
        this.$message({
          message: "登陆成功！正在跳转...",
          type: "success"
        });
      } else {
        this.$message.error("登录失败");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.restrainer {
  padding: 40px 0;
}
.register-form {
  h1 {
    text-align: center;
    color: #939393;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  input {
    width: 80%;
    max-width: 600px;
    outline: none;
    border: none;
    background: #282828;
    padding: 15px;
    font-size: 1.2rem;
    margin: 10px 0;
    border-radius: 2px;
  }
  input[type="submit"] {
    @extend input;
    background: #1db954;
    border-radius: calc((1.3rem + 30px) / 2);
  }
  span {
    color: #939393;
    a {
      color: #1db954;
    }
  }
}
</style>
