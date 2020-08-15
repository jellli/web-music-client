<template>
  <div class="upload-img-component">
    <el-image
      :src="imgSrc.length === 0 ? originSrc : imgSrc"
      fit="cover"
      :style="`width:${size}px;height:${size}px;margin-bottom:10px`"
    ></el-image>
    <el-upload
      action=""
      :auto-upload="false"
      :on-change="change"
      :multiple="false"
      :show-file-list="false"
    >
      <el-button type="primary" round size="mini">选取文件</el-button>
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgSrc: ""
    };
  },
  props: {
    originSrc: {
      default: ""
    },
    size: {
      default: 100
    }
  },
  methods: {
    change(file) {
      var _this = this;
      var event = event || window.event;
      var file = event.target.files[0];
      var reader = new FileReader();
      //转base64
      reader.onload = function(e) {
        _this.imgSrc = e.target.result; //将图片路径赋值给src
      };
      reader.readAsDataURL(file);
      this.$emit("change", file);
    }
  }
};
</script>
