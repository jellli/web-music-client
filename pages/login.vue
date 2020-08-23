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
        <div class="input-user">
          <input
            type="text"
            placeholder="用户名"
            class="login-username"
            v-model="user_name"
          />
          <div class="validate-username">
            <span v-if="includeChinese">用户名不能包含中文字符</span>
            <span v-else-if="stratWithNum">用户名不能以数字开头</span>
            <span v-else-if="!validUsername">符号只能使用下划线</span>
            <span v-else-if="user_name.length === 0"></span>
            <span v-else-if="user_name.length < 4 || user_name.length > 16"
              >用户名长度必须大于3小于17位</span
            >
          </div>
        </div>
        <div class="input-password">
          <input
            type="password"
            placeholder="密 码"
            class="login-password"
            v-model="user_pwd"
          />
          <div class="validate-password">
            <span v-if="includeChinese1">密码不能包含中文字符</span>
            <span v-else-if="user_pwd.length === 0"></span>
            <span v-else-if="user_pwd.length < 6 || user_name.length > 16">
              密码长度必须大于6小于17位
            </span>
          </div>
        </div>
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
  },
  computed: {
    includeChinese() {
      return /[\u4e00-\u9fa5]+/.test(this.user_name);
    },
    includeChinese1() {
      return /[\u4e00-\u9fa5]+/.test(this.user_pwd);
    },
    stratWithNum() {
      return /^\d+/.test(this.user_name);
    },
    validUsername() {
      return /[a-zA-Z0-9_]|^$/.test(this.user_name);
    }
  }
};
</script>

<style lang="scss" scoped>
.input-user {
  position: relative;
  .validate-username {
    position: absolute;
    top: 12px;
    left: 100%;
    white-space: nowrap;
  }
}
.input-password {
  position: relative;
  .validate-password {
    position: absolute;
    top: 12px;
    left: 100%;
    white-space: nowrap;
  }
}
.l_form {
  position: relative;
}
label.login-username1 {
  position: absolute;
  left: 25px;
  top: 10px;
  transition: all ease 0.3s;
}
.login-username {
  &:foucus + .login-username1 {
    transform: translateY(-2rem);
  }
}
.register-form {
  display: flex;
  width: 100vw;
  height: calc(100vh - 260px);
  overflow: hidden;
  animation: hue-rotate 6s infinite;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, #000 220px),
    url("https://web-music.oss-cn-shenzhen.aliyuncs.com/static/album-backgrounds.jpg")
      repeat-x center -115px;
  background-position: top 60px;
  z-index: -1;
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
  padding: 0.5rem;
}
.login-text {
  color: white;
  font-size: 1.5rem;
  margin: 0 auto;
  max-width: 50%;
  padding: 0.5rem;
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
.login-username,
.login-password {
  background: transparent;
  border: 0 solid;
  border-bottom: 1px solid rgba(white, 0.5);
  color: white;
  display: block;
  margin: 1rem;
  padding: 0.5rem;
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
  padding: 0.25rem 1rem;
  transition: 250ms background ease-in;
  font-size: 1.2rem;
  cursor: pointer;
  &:hover,
  &:focus {
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
  padding: 0.5rem;
  position: absolute;
  text-align: center;
  //text-decoration: none;
  width: 100%;
  &:hover {
    opacity: 1;
  }
}
</style>
