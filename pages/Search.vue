<template>
  <div class="search restrainer">
    <div class="search-bar">
      <form>
        <input
          type="text"
          placeholder="搜索"
          v-model="keyword"
          @keydown.enter="search"
        />
        <label for="submit" @click="search">
          <svg
            t="1586781861453"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3116"
            width="200"
            height="200"
          >
            <path
              d="M994.141988 949.585564c-27.627331-27.622514-143.098941-143.105564-220.155876-220.155875 68.219103-76.725794 109.661002-177.787386 109.661003-288.530916 0-239.918927-194.488895-434.402404-434.401802-434.402404-239.914111 0-434.403608 194.483477-434.403608 434.402404 0 239.907488 194.489497 434.402404 434.403608 434.402404 65.279782 0 127.180127-14.421458 182.735223-40.215477 16.304743-40.491828-16.0019-59.45352-30.931508-65.811412-46.16998 21.347708-97.591242 33.283808-151.809736 33.283808-199.918391 0-362.003107-161.978751-362.003106-361.820679 0-199.835907 162.084114-361.819474 362.003106-361.819474 199.92983 0 362.007923 161.982966 362.007924 361.819474 0 105.734883-45.38006 200.863646-117.72517 267.011617-17.785843 30.759315-3.298157 47.186279 24.462834 74.466214 0.033114-0.027695 0.071647-0.055391 0.104761-0.082484l9.577177 9.576576c3.479983 3.424592 7.103861 7.026194 10.843338 10.848756h0.006021c71.505218 71.510637 174.239369 174.240573 201.327242 201.332059 42.700232 42.69662 96.680305-11.924059 54.298569-54.304591z m0 0"
              p-id="3117"
              fill="#939393"
            ></path>
          </svg>
        </label>
        <input type="submit" style="display:none;" />
      </form>
    </div>
    <div class="search-result">
      <bestMatch v-if="this.result.length > 0" :bestMatch="result[0]" />
      <searchList v-if="this.result.length > 0" :list="result.slice(1)" />
      <hotKeyword
        :hotKeyword="this.hotKeyword"
        :searchFunc="setKeyword"
        v-if="this.result.length == 0"
      />
    </div>
  </div>
</template>

<script>
import bestMatch from "@/components/bestMatch";
import searchList from "@/components/searchList";
import hotKeyword from "@/components/hotKeyword";
export default {
  components: {
    bestMatch,
    searchList,
    hotKeyword
  },
  head() {
    return {
      title: "搜索"
    };
  },
  data() {
    return {
      keyword: "",
      result: []
    };
  },
  methods: {
    setKeyword(keyword) {
      this.keyword = keyword;
      this.search();
    },
    async search(event) {
      if (event) {
        event.preventDefault();
      }
      const res = await this.$axios.get(
        `${process.env.MUSIC_API_URL}/search?keywords=${this.keyword}&limit=10`
      );
      const temp = [];
      res.data.result.songs.map(async item => {
        const id = item.id;
        const name = item.name;
        const artists = item.artists;
        const album_id = item.album.id;
        const album_detial = await this.$axios.get(
          `${process.env.MUSIC_API_URL}/album?id=${album_id}`
        );
        const album_pic =
          album_detial.data.songs[0].al.picUrl + "?param=150y150";
        temp.push({
          id,
          name,
          artists,
          album_pic
        });
      });
      console.log(temp);
      this.result = temp;
    }
  },
  async asyncData({ $axios }) {
    const BASE_URL = process.env.MUSIC_API_URL;
    const hot_keyword = await $axios.$get(`${BASE_URL}/search/hot`);
    const hotKeyword = hot_keyword.result.hots;
    return { hotKeyword };
  }
};
</script>

<style lang="scss" scoped>
.restrainer {
  padding: 40px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.search {
  .search-bar {
    width: 70%;
    border-radius: calc(1.2rem / 2 + 15px);
    background: #282828;
  }
  svg {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  label {
    display: flex;
  }
  form {
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  input[type="text"] {
    width: calc(100% - 60px);
    border-radius: calc(1.2rem / 2 + 15px);
    outline: none;
    border: none;
    padding: 15px 10px;
    background: #282828;
    font-size: 1.2rem;
  }
}
.search-result {
  width: 70%;
  padding: 40px 0;
  display: grid;
  grid-template-columns: 2fr 3fr;
  // align-self: start;
}
</style>
