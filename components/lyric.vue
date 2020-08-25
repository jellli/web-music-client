<template>
  <div class="lyric">
    <ul ref="text" class="text" v-if="lyric.length > 0">
      <li
        v-for="(item, i) in lyric"
        :key="i"
        :style="
          index === i
            ? `font-size:22px;color:#1db954`
            : `font-size:14px;color:#848484`
        "
      >
        {{ item.text }}
      </li>
    </ul>
    <span v-else style="font-size:18px;color:#848484">纯音乐，请欣赏</span>
  </div>
</template>

<script>
export default {
  props: ["m_id"],
  data() {
    return {
      lyric: [],
      index: 0
    };
  },
  methods: {
    formatLyric(text) {
      let arr = text.split("\n"); //原歌词文本已经换好行了方便很多，我们直接通过换行符“\n”进行切割
      let row = arr.length; //获取歌词行数
      for (let i = 0; i < row; i++) {
        let temp_row = arr[i]; //现在每一行格式大概就是这样"[00:04.302][02:10.00]hello world";
        let temp_arr = temp_row.split("]"); //我们可以通过“]”对时间和文本进行分离
        let text = temp_arr.pop(); //把歌词文本从数组中剔除出来，获取到歌词文本了！
        //再对剩下的歌词时间进行处理
        temp_arr.forEach(element => {
          let obj = {};
          let time_arr = element.substr(1, element.length - 1).split(":"); //先把多余的“[”去掉，再分离出分、秒
          let s = parseInt(time_arr[0]) * 60 + Math.round(time_arr[1]); //把时间转换成与currentTime相同的类型，方便待会实现滚动效果
          if (text !== "") {
            obj.time = s;
            obj.text = text;
            this.lyric.push(obj); //每一行歌词对象存到组件的lyric歌词属性里
          }
        });
      }
    }
  },
  computed: {
    currentTime() {
      return this.$store.state.currentTime;
    }
  },
  async created() {
    const res = await this.$axios.get(
      `${process.env.MUSIC_API_URL}/lyric?id=${this.m_id}`
    );
    if (res.data.lrc) {
      this.formatLyric(res.data.lrc.lyric);
    }
  },
  watch: {
    currentTime() {
      if (this.m_id == this.$store.state.currentId) {
        this.lyric.forEach((el, index) => {
          if (el.time === parseInt(this.currentTime)) {
            this.$refs.text.style.transform = `translateY(-${index * 26.8 -
              50}px)`;
            this.index = index;
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.lyric {
  width: 100%;
  height: 138px;
  overflow: hidden;
  .text {
    transform: translateY(20px);
    transition: all ease 0.3s;
    li {
      padding: 3px 0;
    }
    & > * {
      transition: all ease 0.3s;
      // text-align: center;
    }
  }
}
</style>
