<template>
  <div class="register-form restrainer">
    <h1>注册</h1>
    <form>
      <input type="text" placeholder="用户名" v-model="user_name" />
      <input type="password" placeholder="密码" v-model="user_pwd" />
      <input type="password" placeholder="重复密码" v-model="user_pwd1" />
      <input type="submit" value="注册" @click="register" />
      <div class="info-msg">
        <span>
          已经有账号了吗？
          <nuxt-link to="/login">登录</nuxt-link>
        </span>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "注册",
    };
  },
  data() {
    return {
      user_name: "",
      user_pwd: "",
      user_pwd1: "",
    };
  },
  methods: {
    async register(e) {
      e.preventDefault();
      if (this.user_name.length === 0 || this.user_pwd.length === 0) {
        this.$message({
          message: "用户名和密码不能为空！",
          type: "warning",
        });
      } else if (this.user_pwd != this.user_pwd1) {
        this.$message({
          message: "密码必须一致",
          typ: "warning",
        });
      } else {
        const res = await this.$axios.post(
          `${process.env.BACKEND_URL}/register`,
          {
            user_name: this.user_name,
            user_pwd: this.user_pwd,
          }
        );
        this.$message({
          message: "注册成功！",
          type: "success",
        });
        this.$router.push(`/login`);
      }
    },
  },
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
