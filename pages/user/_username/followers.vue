<template>
  <div class="restrainer">
    <h2>这里是{{ username }}的followers页面</h2>
    <ul>
      <li v-for="(user, i) in followers_list" :key="i">
        {{ user }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    username() {
      return this.$route.params.username;
    }
  },
  async asyncData({ params, $axios }) {
    const res = await $axios.post(`${process.env.BACKEND_URL}/get/user`, {
      user_name: params.username
    });
    // console.log(res.data[0]);
    return {
      followers_list: res.data[0].follower
    };
  }
};
</script>

<style></style>
