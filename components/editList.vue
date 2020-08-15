<template>
  <div class="editlist">
    <h2>编辑歌单</h2>
    <div class="edit-list-area">
      <table>
        <tr>
          <td>歌单名</td>
          <td><input v-model="list_name" /></td>
        </tr>
        <tr>
          <td>歌单描述</td>
          <td><textarea v-model="list_desc" rows="8"></textarea></td>
        </tr>
        <tr>
          <td></td>
          <td>
            <el-button type="primary" round @click="handleSubmit"
              >确定</el-button
            >
            <el-button round>取消</el-button>
          </td>
        </tr>
      </table>

      <div class="edit-cover">
        <uploadImg :originSrc="pic_url" @change="setImg" size="150" />
      </div>
    </div>
  </div>
</template>

<script>
import uploadImg from "@/components/uploadImg";
export default {
  components: {
    uploadImg
  },
  props: ["pic_url", "l_id"],
  data() {
    return {
      list_name: "",
      list_desc: "",
      list_cover: null
    };
  },
  methods: {
    async handleSubmit() {
      if (this.list_name.length !== 0) {
        const data = new FormData();
        data.append("list_name", this.list_name);
        data.append("list_desc", this.list_desc);
        data.append("l_id", this.l_id);
        if (this.cover !== null) {
          data.append("list_cover", this.list_cover);
        }
        await this.$axios.post(
          `${process.env.BACKEND_URL}/update/musiclist`,
          data
        );
        this.$emit("reload");
        this.$emit("edited");
        this.$message({
          message: "修改歌单信息成功!",
          type: "success"
        });
      } else {
        this.$message.error({
          message: "歌单名称不能为空！"
        });
      }
    },
    setImg(file) {
      this.list_cover = file;
    }
  }
};
</script>

<style lang="scss">
.editlist {
  margin-top: 20px;
}
table > tr > td {
  padding: 5px 10px;
  input,
  textarea {
    width: 100%;
    padding: 10px;
    border: none;
    outline: none;
    border-radius: 5px;
    background: #282828;
  }
  &:first-child {
    display: flex;
    justify-content: flex-end;
  }
}
.edit-list-area {
  padding-top: 30px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  // align-items: center;
  // justify-content: space-between;
  & > *:nth-child(2) {
    margin-left: calc(50% - 75px);
  }
}
</style>
