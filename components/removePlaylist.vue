<template>
  <div class="remove-playlist">
    <div @click="visible = true">
      <slot></slot>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="visible"
      width="30%"
      center
      :modal="false"
    >
      <span v-if="owned">确认要删除该歌单吗?</span>
      <span v-else>确定取消收藏歌单?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="handleClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["l_id", "owned"],
  data() {
    return {
      visible: false
    };
  },
  methods: {
    async handleClick() {
      this.visible = false;
      if (this.owned) {
        await this.$axios.post(`${process.env.BACKEND_URL}/delete/musiclist`, {
          l_id: this.l_id,
          user_name: this.$store.state.userName
        });
        this.$message({
          message: "删除成功!",
          type: "success"
        });
        this.$emit("deleted");
      } else {
        // todo 取消收藏歌单
      }
    }
  }
};
</script>

<style></style>
