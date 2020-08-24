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
        </div>
      </div>
      <div class="post-ctrl">
        <span>{{ 140 - content.length }}</span>
        <input type="submit" value="评论" @click="submit" />
      </div>
      <div class="temp">
        评论
      </div>
      <div class="comment-list">
        <ul v-if="comments.length > 0">
          <li
            v-for="(comment, i) in comments.slice(
              (currentPage - 1) * 12,
              (currentPage - 1) * 12 + 11
            )"
            :key="comment.c_id"
            class="list-item"
          >
            <div class="n_comment">
              <div class="list-avatar">
                <img :src="comment.pic" />
              </div>
              <div class="list-content">
                <div class="username">
                  <nuxt-link :to="`/user/${comment.author}`">
                    {{ comment.author }}
                  </nuxt-link>
                  ：{{ comment.content }}
                </div>
                <div class="content"></div>
                <div class="reply-content" v-if="comment.isReply">
                  <nuxt-link :to="`/user/${comment.o_author}`">
                    {{ comment.o_author }} </nuxt-link
                  >: {{ comment.o_content }}
                </div>
              </div>
            </div>
            <div class="comment-operator">
              <time>
                {{ formatDate(comment.created_time) }}
              </time>
              <div class="r">
                <span class="liked">
                  <i
                    class="fas fa-thumbs-up"
                    v-if="isLogin && comment.liked.includes(username)"
                    @click="dislikeComment(i, comment.c_id)"
                  ></i>
                  <i
                    class="far fa-thumbs-up"
                    @click="likeComment(i, comment.c_id)"
                    v-else
                  ></i>
                  ( {{ comment.liked.length }} )
                </span>
                <span @click="openReplyArea(comment.c_id)">回复</span>
              </div>
            </div>
            <div class="reply-area" v-if="openReply === comment.c_id">
              <textarea
                rows="2"
                v-model="reply_content"
                maxlength="140"
              ></textarea>
              <div class="reply-ctrl">
                <span>{{ 140 - reply_content.length }}</span>
                <input
                  type="submit"
                  value="回复"
                  @click="
                    reply(
                      comment.author,
                      comment.content,
                      comment.c_id,
                      comment.pic
                    )
                  "
                />
              </div>
            </div>
          </li>
        </ul>
        <span v-else>还没有评论...</span>
      </div>
      <el-pagination
        :hide-on-single-page="true"
        class="pagination"
        :total="comments.length"
        :current-page.sync="currentPage"
        background
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: ["comments", "m_id"],
  data() {
    return {
      currentPage: 1,
      content: "",
      reply_content: "",
      openReply: null
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
    username() {
      return this.$store.state.userName;
    }
  },
  methods: {
    async reply(o_author, o_content, replyId, pic) {
      if (this.$store.state.isLogin) {
        const payload = {
          m_id: parseInt(this.m_id),
          isReply: true,
          o_author,
          o_content,
          replyId,
          author: this.$store.state.userName,
          content: this.reply_content,
          pic
        };
        await this.$axios.post(
          `${process.env.BACKEND_URL}/create/comment`,
          payload
        );
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
          content: this.content,
          pic: this.$store.state.pic
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
    },
    formatDate(time) {
      const date = new Date(time * 1000);
      return this.$formatDate(date, "yyyy年MM月dd日 hhh:mm:ss");
    },
    async likeComment(index, c_id) {
      if (this.$store.state.isLogin) {
        this.comments[index].liked.push(this.username);
        await this.$axios.post(
          `${process.env.BACKEND_URL}/update/comment/liked`,
          {
            user_name: this.username,
            c_id
          }
        );
      } else {
        this.$message({ message: "请先登录再进行操作", type: "warning" });
      }
    },
    async dislikeComment(index, c_id) {
      this.comments[index].liked.pop();
      await this.$axios.post(
        `${process.env.BACKEND_URL}/update/comment/disliked`,
        {
          user_name: this.username,
          c_id
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.liked {
  i {
    transform: rotateY(180deg);
  }
  .fas.fa-thumbs-up {
    color: #1bd954;
  }
}
.temp {
  font-size: 1.2rem;
  padding-bottom: 10px;
  margin-bottom: 25px;
  border-bottom: 2px #1bd954 solid;
}
.post-ctrl {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  input {
    margin-left: 10px;
  }
}
.list-item {
  padding-bottom: 15px;
  margin-bottom: 20px;
  &:not(:last-child) {
    border-bottom: 1px dotted #444;
  }
}
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
  padding: 0 20px;
  // align-items: center;
  .comment-header {
    justify-content: space-between;
    display: flex;
  }
  .comment-list {
    // padding: 0 32px;
    .n_comment {
      padding: 0 10px;
      display: flex;
      // justify-content: space-around;
      // align-items: center;
      .list-content {
        width: calc(100% - 80px);
        // display: flex;
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
        border: #2f2f2f 1px solid;
        background: rgba(175, 175, 175, 0.2);
      }
    }
    .comment-operator {
      // padding: 10px;
      width: calc(100% - 90px);
      margin-left: auto;
      display: flex;
      justify-content: space-between;
      align-self: center;
      time {
        font-size: 14px;
        color: #6c6c6c;
      }
      .r {
        display: flex;
        align-items: center;
        justify-content: center;
        & > * {
          padding-left: 10px;
          // margin-left: 10px;
        }
        // & > *:not(:first-child) {
        //   border-left: #444 2px solid;
        // }
        & > *:first-child {
          &:hover {
            text-decoration: none;
          }
        }
      }
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
        margin-bottom: 10px;
        width: 100%;
        font-size: 1.2rem;
        padding: 16px 20px;
        resize: none;
        outline: none;
        border: #2f2f2f 1px solid;
        background: rgba(175, 175, 175, 0.2);
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
    width: calc(100% - 100px);
    height: 80px;
    textarea {
      width: 100%;
      height: 100%;
      font-size: 1.2rem;
      padding: 16px 20px;
      resize: none;
      outline: none;
      border: #2f2f2f 1px solid;
      background: rgba(175, 175, 175, 0.2);
    }
  }
}
</style>
