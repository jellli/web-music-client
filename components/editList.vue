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
          <td><textarea v-model="list_desc" rows="4"></textarea></td>
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
        <el-image
          style="width: 150px; height: 150px"
          :src="pic_url"
          fit="cover"
        >
        </el-image>
        <span>编辑封面</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["pic_url", "l_id"],
  data() {
    return {
      list_name: null,
      list_desc: null
    };
  },
  methods: {
    async handleSubmit() {
      await this.$axios.post(`${process.env.BACKEND_URL}/update/musiclist`, {
        list_name: this.list_name,
        list_desc: this.list_desc,
        l_id: this.l_id
      });
      this.$emit("reload");
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
