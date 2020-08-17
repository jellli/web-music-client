<template>
  <div class="sl">
    <div class="sl-header">
      <div class="cover">
        <img :src="detial.list_cover" />
      </div>
      <div class="sl-info">
        <div class="sl-title">
          <h1>{{ detial.list_name }}</h1>
        </div>
        <div class="sl-info-d">
          <div class="avatar">
            <el-avatar :size="50" :src="creator_pic"></el-avatar>
          </div>
          <div class="info">
            <nuxt-link :to="`/user/${detial.created_by}`">
              {{ detial.created_by }}
            </nuxt-link>
            <time> {{ created_time }} 创建 </time>
          </div>
        </div>
        <div class="sl-ctrl">
          <playBtn :list="detial.music_ids">
            <template v-slot:play><button>播放</button></template>
          </playBtn>
          <collectBtn :l_id="detial.l_id" v-if="!owned">
            <template v-slot:collect>
              <button>收藏</button>
            </template>
            <template v-slot:collected>
              <button>取消收藏</button>
            </template>
          </collectBtn>
        </div>
      </div>
    </div>
    <div class="sl-content"></div>
  </div>
</template>

<script>
import collectBtn from "@/components/collectBtn";
import playBtn from "@/components/playBtn";
export default {
  components: {
    collectBtn,
    playBtn
  },
  props: ["detial", "creator_pic"],
  computed: {
    owned() {
      if (this.$store.state.isLogin) {
        return this.$store.state.userName === this.detial.created_by;
      } else {
        false;
      }
    },
    created_time() {
      const date = new Date(parseInt(this.detial.created_time * 1000));
      return this.$formatDate(date, "yyyy年MM月dd日");
    }
  }
};
</script>

<style lang="scss">
.sl {
  padding: 20px;
  .sl-header {
    display: flex;
    .cover {
      margin-right: 10px;
      width: 180px;
      height: 180px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .sl-info {
      padding: 10px;
      & > * {
        margin-bottom: 10px;
      }
      .sl-info-d {
        display: flex;
        align-items: center;
        & > * {
          margin-right: 15px;
        }
        .info {
          & > * {
            margin-right: 10px;
          }
          a {
            color: #1db954;
            font-size: 1.1rem;
          }
          time {
            font-size: 14px;
            color: #6c6c6c;
          }
        }
      }
      .sl-ctrl {
        display: flex;
        button {
          margin-right: 10px;
          cursor: pointer;
          padding: 5px 10px;
          border: none;
          outline: none;
          border-radius: calc(5px * 2 + 1rem);
          background: #1db954;
          transition: all ease 0.5s;
          &:hover {
            filter: brightness(1.2);
          }
        }
      }
    }
  }
}
</style>
