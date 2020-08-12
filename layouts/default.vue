<template>
  <div>
    <Navbar />
    <nuxt />
    <foot />
    <player />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import foot from "@/components/foot.vue";
import player from "@/components/player.vue";
export default {
  components: {
    Navbar,
    foot,
    player
  }
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: #fff;
}
body {
  background: #030306;
  overflow-x: hidden;
}
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background-color: #575757;
}

::-webkit-scrollbar-thumb {
  background-color: #282828;
  border-radius: 3px;
}
a {
  text-decoration: none;
  color: #fff;
}
.align-center {
  display: flex;
  align-items: center;
}
.restrainer {
  min-height: calc(100vh - 260px);
  padding: 40px 0;
  width: 70%;
  margin: 0 auto;
  @media screen and (max-width: 1200px) {
    width: 85%;
  }
}
</style>
