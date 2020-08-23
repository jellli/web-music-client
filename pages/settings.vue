<template>
  <div class="restrainer">
    <h2>个人设置</h2>
    <table>
      <tr>
        <td>
          修改头像
        </td>
        <td>
          <uploadImg :originSrc="user_pic" @change="setImg"></uploadImg>
        </td>
      </tr>
      <tr>
        <td>昵称</td>
        <td>
          <input type="text" v-model="user_nick" />
        </td>
      </tr>
      <tr>
        <td>介绍</td>
        <td>
          <textarea v-model="user_desc"></textarea>
        </td>
      </tr>
      <tr>
        <td>性别</td>
        <td>
          <el-radio-group v-model="gender">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
            <el-radio :label="3">保密</el-radio>
          </el-radio-group>
        </td>
      </tr>
      <tr>
        <td>生日</td>
        <td>
          <el-date-picker
            v-model="date"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </td>
      </tr>
      <tr>
        <td></td>
        <td>
          <el-button type="primary" @click="handleSave">保存</el-button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
// import { provinceAndCityData } from 'element-china-area-data';
import uploadImg from "@/components/uploadImg";
export default {
  head() {
    return {
      title: "个人设置"
    };
  },
  data() {
    return {
      // options: provinceAndCityData,
      // selectedOptions: [],
      date: "",
      gender: parseInt(this.$store.state.user.user_sex),
      user_desc: this.$store.state.user.user_desc,
      user_nick: this.$store.state.user.user_nick,
      avatar: null
    };
  },
  components: { uploadImg },
  computed: {
    user_pic() {
      return this.$store.state.pic;
    }
  },
  methods: {
    async handleSave() {
      if (this.user_nick.len != 0) {
        const data = new FormData();
        data.append("user_nick", this.user_nick);
        data.append("user_desc", this.user_desc);
        data.append("user_sex", this.gender);
        data.append("user_name", this.$store.state.userName);
        if (this.avatar !== null) {
          data.append("user_avatar", this.avatar);
        }
        await this.$axios.post(
          `${process.env.BACKEND_URL}/update/ucenter`,
          data
        );
        this.$message({
          message: "修改成功！",
          type: "success"
        });
        this.reloadAvatar();
        this.reloadUser();
        this.$router.push(`/user/${this.$store.state.userName}`);
      }
    },
    async reloadAvatar() {
      const result = await this.$axios.post(
        `${process.env.BACKEND_URL}/get/user_pic`,
        { user_name: this.$store.state.userName }
      );
      this.$store.commit("setUserPic", result.data.user_pic);
      // console.log(result);
    },
    async reloadUser() {
      const result = await this.$axios.post(
        `${process.env.BACKEND_URL}/get/user`,
        { user_name: this.$store.state.userName }
      );
      this.$store.commit("setUser", result.data[0]);
    },
    setImg(file) {
      this.avatar = file;
    }
  }
};
</script>
