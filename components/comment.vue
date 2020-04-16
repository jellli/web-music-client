<template>
  <div class="comment">
    <div class="post-comment" v-if="isLogin">
      <div class="avatar">
        <img
          src="https://hoon-cc.oss-cn-shenzhen.aliyuncs.com/wp-content/uploads/2019/02/65223547_p0_master1200-3.jpg"
        />
      </div>
      <div class="input-area">
        <form>
          <textarea rows="2" v-model="comment" maxlength="140"></textarea>
          <div class="post-ctrl">
            <span>{{ 140 - comment.length }}</span>
            <input type="submit" value="评论" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      comment: ""
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    }
  }
};
</script>

<style lang="scss" scoped>
.post-comment {
  display: flex;
  justify-content: space-evenly;
  // align-items: center;
  .avatar {
    width: 80px;
    height: 80px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  .input-area {
    width: 85%;
    textarea {
      width: 100%;
      font-size: 1.2rem;
      padding: 16px 20px;
      resize: none;
      outline: none;
      border: #707070 solid 1px;
      background: rgba(#fff, 0.2);
    }
    input {
      margin: 20px 0;
      outline: none;
      border: none;
      background-color: #1db954;
      padding: 5px 10px;
      border-radius: 13px;
      cursor: pointer;
    }
    .post-ctrl {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      input {
        margin-left: 10px;
      }
    }
  }
}
</style>
