<template>
  <div class="register-form">
    <div class="login-form">
      <p class="login-text">
        <span class="fa-stack fa-lg">
          <i class="fa fa-circle fa-stack-2x"></i>
          <i class="fa fa-lock fa-stack-1x"></i>
        </span>
      </p>
      <form class="l_form"> 
        <!-- <label class="login-username1">用户名</label> -->
        <input type="text" placeholder="用户名" class="login-username" v-model="user_name" />
        <!-- <label class="login-password1">密码</label> -->
        <input type="password" placeholder="密码" class="login-password" v-model="user_pwd" />
        <input type="submit" value="登录" class="login-submit" @click="login" />
        <div class="login-forgot-pass">
          <span>
            还没有账号？
            <nuxt-link to="/register">注册</nuxt-link>
          </span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "登录",
    };
  },
  data() {
    return {
      user_name: "",
      user_pwd: "",
    };
  },
  methods: {
    async login(e) {
      e.preventDefault();
      const res = await this.$axios.post(`${process.env.BACKEND_URL}/login`, {
        user_name: this.user_name,
        user_pwd: this.user_pwd,
      });

      if (res.data.status === 200) {
        this.$store.commit("toggleLoginState");
        this.$store.commit("setUserName", this.user_name);
        const user_res = await this.$axios.post(
          `${process.env.BACKEND_URL}/get/user`,
          {
            user_name: this.user_name,
          }
        );

        this.$store.commit("setUserPic", user_res.data[0].user_pic);
        this.$store.commit("setUser", user_res.data[0]);
        this.$router.push(`/user/${this.user_name}`);
        this.$message({
          message: "登陆成功！正在跳转...",
          type: "success",
        });
      } else {
        this.$message.error("登录失败");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.register-form {
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  animation: hue-rotate 6s infinite;
  background: url('https://31.media.tumblr.com/41c01e3f366d61793e5a3df70e46b462/tumblr_n4vc8sDHsd1st5lhmo1_1280.jpg') no-repeat;
  background-size: contain;
  z-index: -1;
  transform: translateY(-80px);
}
@keyframes hue-rotate {
  from {
    -webkit-filter: grayscale(30%) hue-rotate(0deg);
  }
  to {
    -webkit-filter: grayscale(30%) hue-rotate(360deg);
  }
}
.login-form {
  min-height: 10rem;
  margin: auto;
  max-width: 50%;
  padding: .5rem;
}
.login-text {
  color: white;
  font-size:1.5rem;
  margin: 0 auto;
  max-width: 50%;
  padding: .5rem;
  text-align: center;
  .fa-stack-1x {
    color: black;
  }
}
input {
  ::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  ::-moz-placeholder {
    color: rgba(255, 255, 255, 0.7);

  }
  :-ms-input-placeholder {
    color: rgba(255, 255, 255, 0.7);

  }
  &:focus {
    outline: 0 transparent solid;
    ::-webkit-input-placeholder {
      color: rgba(0, 0, 0, 0.7);
    }
    ::-moz-placeholder {
      color: rgba(0, 0, 0, 0.7);
    }
    :-ms-input-placeholder {
      color: rgba(0, 0, 0, 0.7);
    }
  }
}
.login-username, .login-password {
  background: transparent;
  border: 0 solid;
  border-bottom: 1px solid rgba(white, .5);
  color: white;
  display: block;
  margin: 1rem;
  padding: .5rem;
  transition: 250ms background ease-in;
  width: calc(100% - 3rem);
  font-size: 1.2rem;
  &:focus {
    background: white;
    color: black;
    transition: 250ms background ease-in;
    }
  }
.login-submit {
  border: 1px solid white;
  background: transparent;
  color: white;
  display: block;
  margin: 1rem auto;
  min-width: 1px;
  padding: .25rem;
  transition: 250ms background ease-in;
  font-size: 1.2rem;
  &:hover, &:focus {
    background: white;
    color: black;
    transition: 250ms background ease-in;
  }
}
.login-forgot-pass {
  //border-bottom: 1px solid white;
  color: white;
  cursor: pointer;
  display: block;
  font-size: 75%;
  left: 0;
  opacity: 0.6;
  padding: .5rem;
  position: absolute;
  text-align: center;
  //text-decoration: none;
  width: 100%;
  &:hover {
    opacity: 1;
  }
}
// .l_form{
//   position:relative;
// }
// label.login-username1{
//   position:absolute;
//   left:25px;
//   top:10px;
//   transition: all ease 0.3s;
// }
// .login-username{
//   &:foucus ~ .login-username1{
//     top: 0;
//   }
// }
</style>
