<template>
  <div>
    <Navbar />
    <nuxt />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
  components: {
    Navbar
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
  padding: 40px 0;
  width: 80%;
  margin: 0 auto;
}
</style>
