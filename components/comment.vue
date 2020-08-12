<template>
  <div class="comment">
    <div class="post-comment">
      <div class="comment-header">
        <div class="avatar">
          <img
            :src="
              this.$store.state.pic
                ? this.$store.state.pic
                : 'http://web-music.oss-cn-shenzhen.aliyuncs.com/avatar/e80d4c52-3e4f-44e7-be8d-509c380fc96c.jpg'
            "
          />
        </div>
        <div class="input-area">
          <textarea rows="2" v-model="content" maxlength="140"></textarea>
          <div class="post-ctrl">
            <span>{{ 140 - content.length }}</span>
            <input type="submit" value="评论" @click="submit" />
          </div>
        </div>
      </div>
      <!-- 暂时存在 -->
      <div class="temp">
        精彩评论<br />
        <hr />
        <br />
      </div>
      <div class="comment-list">
        <ul>
          <li v-for="comment in comments" :key="comment.c_id" class="list-item">
            <div class="n_comment">
              <div class="list-avatar">
                <img :src="comment.pic" />
              </div>
              <div class="list-content">
                <div class="username">
                  <nuxt-link :to="`/user/${comment.author}`">
                    {{ comment.author }}
                  </nuxt-link>
                </div>
                <div class="content">
                  {{ comment.content }}
                </div>
                <div class="reply-content" v-if="comment.isReply">
                  <nuxt-link :to="`/user/${comment.o_author}`">
                    {{ comment.o_author }} </nuxt-link
                  >: {{ comment.o_content }}
                </div>
              </div>
            </div>
            <div class="comment-operator">
              <span @click="openReplyArea(comment.c_id)">回复</span>
            </div>
            <div class="reply-area" v-if="openReply === comment.c_id">
              <textarea
                rows="2"
                v-model="reply_content"
                maxlength="140"
              ></textarea>
              <div class="reply-ctrl">
                <span>{{ 140 - content.length }}</span>
                <input
                  type="button"
                  value="回复"
                  @click="reply(comment.author, comment.content, comment.c_id)"
                />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["comments", "m_id"],
  data() {
    return {
      content: "",
      reply_content: "",
      openReply: null
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    }
  },
  methods: {
    reply(o_author, o_content, replyId) {
      if (this.$store.state.isLogin) {
        const payload = {
          m_id: parseInt(this.m_id),
          isReply: true,
          o_author,
          o_content,
          replyId,
          author: this.$store.state.userName,
          content: this.reply_content
        };
        this.$axios.post(`${process.env.BACKEND_URL}/create/comment`, payload);
        this.reply_content = "";
        this.openReply = null;
        this.$message({
          message: "回复成功！",
          type: "success"
        });
        this.$emit("reload");
      } else {
        this.$message({ message: "请先登录再进行操作", type: "warning" });
      }
    },
    openReplyArea(id) {
      this.reply_content = "";
      this.openReply === id ? (this.openReply = null) : (this.openReply = id);
    },
    async submit(e) {
      if (this.$store.state.isLogin) {
        e.preventDefault();
        const payload = {
          m_id: parseInt(this.m_id),
          isReply: false,
          o_author: null,
          o_content: null,
          replyId: null,
          author: this.$store.state.userName,
          content: this.content
        };
        await this.$axios.post(
          `${process.env.BACKEND_URL}/create/comment`,
          payload
        );
        this.content = "";
        this.$message({
          message: "评论成功！",
          type: "success"
        });
        this.$emit("reload");
      } else {
        this.$message({ message: "请先登录再进行操作", type: "warning" });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
a {
  font-weight: bold;
  color: #1db954;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
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
ul {
  list-style: none;
}
.post-comment {
  display: flex;
  flex-direction: column;
  // align-items: center;
  .comment-header {
    justify-content: space-evenly;
    display: flex;
  }
  .comment-list {
    padding: 0 32px;
    .list-item {
      // margin-bottom: 5px;
    }
    .n_comment {
      padding: 0 10px;
      display: flex;
      // justify-content: space-around;
      // align-items: center;
      .list-content {
        width: calc(100% - 80px);
      }
      .list-avatar {
        margin-right: 20px;
        width: 60px;
        height: 60px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }
      }
      .reply-content {
        margin-bottom: 10px;
        margin-top: 15px;
        width: 100%;
        padding: 10px;
        border: #707070 1px solid;
        background: rgba(#fff, 0.2);
      }
    }
    .comment-operator {
      // padding: 10px;
      display: flex;
      justify-content: flex-end;
      align-self: center;
      span {
        &:hover {
          text-decoration: underline;
        }
        cursor: pointer;
        color: #1db954;
      }
    }
    .reply-area {
      width: calc(100% - 80px);
      padding: 10px;
      margin-left: auto;
      // display: flex;
      // flex-direction: column;
      // align-items: flex-end;
      textarea {
        width: 100%;
        font-size: 1.2rem;
        padding: 16px 20px;
        resize: none;
        outline: none;
        border: #707070 solid 1px;
        background: rgba(#fff, 0.2);
      }
      .reply-ctrl {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        // height: auto;
        input {
          margin: 0;
          margin-left: 10px;
        }
      }
    }
  }
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
