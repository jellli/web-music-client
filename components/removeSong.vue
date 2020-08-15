<template>
  <div class="remove-song">
    <div class="remove-song-btn" @click="visible = true">
      <i class="fas fa-trash"></i>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="visible"
      width="30%"
      center
      :modal="false"
    >
      <span>确认删除歌曲?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="handleClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["m_id", "l_id"],
  data() {
    return {
      visible: false
    };
  },
  methods: {
    async handleClick() {
      await this.$axios.post(`${process.env.BACKEND_URL}/delete/music`, {
        l_id: this.l_id,
        music_id: this.m_id
      });
      this.$message({
        message: "移除成功!",
        type: "success"
      });
      this.visible = false;
      this.$emit("reload");
    }
  }
};
</script>

<style></style>
