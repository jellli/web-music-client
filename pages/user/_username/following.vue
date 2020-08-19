<template>
  <div class="restrainer">
    <h2>这里是{{ username }}的following页面</h2>
    <ul>
      <li v-for="(user, i) in following_list" :key="i">
        {{ user }}
        <!-- <followBtn :foll/> -->
      </li>
    </ul>
  </div>
</template>

<script>
// import followBtn from "@/components/followBtn";
export default {
  // components: { followBtn },
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
      following_list: res.data[0].following
    };
  }
};
</script>

<style></style>
