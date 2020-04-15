<template>
  <div class="hot-keyword">
    <h2>热门搜索</h2>
    <ul class="keywords">
      <li
        v-for="item in hotKeyword"
        :key="item.first"
        @click="searchFunc(item.first)"
      >
        {{ item.first }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["hotKeyword", "searchFunc"]
};
</script>

<style lang="scss" scoped>
.keywords {
  margin-top: 20px;
  list-style: none;
  li {
    padding: 5px 0;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
