<template>
  <div class="restrainer">
    <h2 class="follow-title">
      {{ username }}的粉丝 ( {{ followers_list.length }} )
    </h2>
    <ul class="follow-list">
      <li v-for="(user, i) in followers_list" :key="i">
        <div class="user-info-f">
          <el-avatar shape="square" :src="user.user_pic" :size="80" fit="cover">
          </el-avatar>
          <div class="info">
            <p>
              <nuxt-link :to="`/user/${user.user_name}`">
                {{ user.user_name }}
              </nuxt-link>
            </p>
            <span>
              <nuxt-link :to="`/user/${user.user_name}/following`">
                关注: {{ user.following.length }}
              </nuxt-link>
            </span>
            <span>
              <nuxt-link :to="`/user/${user.user_name}/followers`">
                粉丝: {{ user.followers.length }}
              </nuxt-link>
            </span>
            <p>个人简介: {{ user.user_desc }}</p>
          </div>
          <followBtn
            :followers="user.followers"
            :currentUsername="user.user_name"
            style="margin-left:auto"
            size="medium"
            v-if="user.user_name !== user_name"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import followBtn from "@/components/followBtn";
export default {
  components: {
    followBtn
  },
  computed: {
    username() {
      return this.$route.params.username;
    },
    user_name() {
      if (this.$store.state.isLogin) {
        return this.$store.state.userName;
      } else {
        return null;
      }
    }
  },
  async asyncData({ params, $axios }) {
    const res = await $axios.post(`${process.env.BACKEND_URL}/get/user`, {
      user_name: params.username
    });
    // console.log(res.data[0]);
    const result = res.data[0].follower;
    const query = [];
    result.forEach(item => {
      query.push(item.user_name);
    });
    const following_res = await $axios.get(
      `${process.env.BACKEND_URL}/get/follow`,
      {
        params: {
          usernames: query.join(",")
        }
      }
    );
    for (let i = 0; i < result.length; i++) {
      result[i].following = following_res.data[i].following;
      result[i]["followers"] = following_res.data[i]["follower"];
      console.log(result);
    }
    return {
      followers_list: result
    };
  }
};
</script>

<style lang="scss">
.follow-title {
  margin-bottom: 20px;
}
.follow-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  li {
    padding: 10px 15px;
    transition: background ease 0.3s;
    &:hover {
      background: rgba(#fff, 0.2);
    }

    .user-info-f {
      display: flex;
      align-items: center;
      & > * {
        margin-right: 20px;
      }

      .info {
        p:first-child {
          font-size: 1.2rem;
          padding-right: 5px;
          & > a {
            color: #1db954;
          }
        }
        span {
          // border-left: 1px #fff solid;
          // padding: 0 5px;
          margin-right: 10px;
        }
        p {
          font-size: 0.9rem;
          color: #939393;
          padding: 5px 0;
        }
      }
    }
  }
}
</style>
