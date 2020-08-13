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
        <div class="btn-ctrl">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="handleClick" v-if="owned">
            确 定
          </el-button>
          <collectBtn :l_id="l_id" @done="emitDeleted" v-else>
            <template v-slot:collected>
              <el-button type="primary">确 定</el-button>
            </template>
          </collectBtn>
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import collectBtn from "@/components/collectBtn";
export default {
  props: ["l_id", "owned"],
  components: {
    collectBtn
  },
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
        // 已完成 交由 collectBtn 组件处理
      }
    },
    emitDeleted() {
      this.visible = false;
      this.$emit("deleted");
    }
  }
};
</script>

<style lang="scss" scoped>
.btn-ctrl {
  display: flex;
  justify-content: center;
  & > * {
    margin: 0 5px;
  }
}
</style>
