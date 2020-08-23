<template>
  <div class="restrainer">
    <h2>{{ username }}的关注 ( {{ following_list.length }} )</h2>
    <ul class="follow-list">
      <li v-for="(user, i) in following_list" :key="i">
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
  components: { followBtn },
  head() {
    return {
      title: `${this.username}的关注列表`
    };
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
    const result = res.data[0].following;
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
      following_list: result
    };
  }
};
</script>
