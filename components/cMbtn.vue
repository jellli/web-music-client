<template>
  <div class="collect-ctrl">
    <div class="slot-ctrl" @click="handleClick">
      <slot></slot>
    </div>
    <el-dialog title="收藏到歌单" :visible.sync="visible" width="30%" center>
      <div class="showLists">
        <div class="showLists-title">
          <span>创建的歌单</span>
        </div>
        <ul v-if="user_created_list && user_created_list.length > 0">
          <li
            :class="
              `showLists-item ${[
                isChoose && current_list_id === i.l_id ? 'list_chosen' : ''
              ]}`
            "
            v-for="i in user_created_list"
            :key="i.l_id"
            @click="handleChoose(i.l_id)"
          >
            <div class="list-cover">
              <img :src="i.list_cover" />
            </div>
            <div class="list-info">
              <h3>{{ i.list_name }}</h3>
              {{ i.music_ids.length }}首
            </div>
          </li>
        </ul>
        <div v-else>
          <span @click="visible = false">
            你还没有创建任何歌单
            <nuxt-link to="/mymusic" style="font-size:16px;color:#1db954"
              >去创建！</nuxt-link
            >
          </span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="submit" :disabled="!isChoose">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["music_id"],
  data() {
    return {
      visible: false,
      user_created_list: null,
      current_list_id: null,
      isChoose: false
    };
  },
  methods: {
    async submit() {
      if (this.current_list_id) {
        await this.$axios.post(`${process.env.BACKEND_URL}/collect/music`, {
          l_id: this.current_list_id,
          music_id: this.music_id
        });
        this.visible = false;
        this.$message({
          message: "收藏歌曲成功！",
          type: "success"
        });
        this.$emit("reload");
      } else {
        this.$message({ message: "请选择要收藏到的歌单", type: "warning" });
      }
    },
    handleChoose(id) {
      if (id === this.current_list_id) {
        this.isChoose = false;
        this.current_list_id = null;
      } else {
        this.current_list_id = id;
        this.isChoose = true;
      }
    },
    async handleClick() {
      if (this.$store.state.isLogin) {
        this.visible = true;
        // 获取所有用户创建的歌单id
        const user_created_list_res = await this.$axios.post(
          `${process.env.BACKEND_URL}/get/created_musiclist`,
          {
            user_name: this.$store.state.userName
          }
        );
        this.user_created_list = user_created_list_res.data;
        this.Loading = false;
      } else {
        this.$message({ message: "请先登录再进行操作", type: "warning" });
      }
    }
  }
};
</script>

<style lang="scss">
.slot-ctrl {
  display: flex;
  align-items: center;
}
ul {
  list-style: none;
}
.list_chosen {
  background: rgba(#fff, 0.2);
}
.showLists {
  max-height: 325px;
  overflow: auto;
  font-size: 1.2rem;
  // padding: 10px;
  .showLists-title {
    // padding: 10px;
    // position: sticky;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .showLists-item {
    // margin-bottom: 10px;
    padding: 5px 10px;
    transition: all ease 0.3s;
    cursor: pointer;
    &:hover {
      background: rgba(#fff, 0.2);
    }
    display: flex;
    font-size: 0.9rem;
    .list-cover {
      width: 80px;
      height: 80px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .list-info {
      padding: 10px;
      h3 {
        margin-bottom: 7px;
      }
    }
  }
}
</style>
