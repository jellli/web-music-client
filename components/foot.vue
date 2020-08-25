<template>
  <footer class="restrainer">
    <div class="footer-left">
      <span style="font-size:1.6rem">
        <a href="https://github.com/hothoney/web-music-client" title="项目地址"
          ><i class="fab fa-github"></i
        ></a>
      </span>
    </div>
    <div class="footer-right">
      <span>
        created by
      </span>
      <a href="https://github.com/Greyy-Y" title="Greyy-Y">
        <el-avatar
          size="small"
          src="https://web-music.oss-cn-shenzhen.aliyuncs.com/avatar/grey.jpg"
        ></el-avatar>
      </a>
      <a href="https://github.com/hothoney" title="hothoney">
        <el-avatar
          size="small"
          src="https://web-music.oss-cn-shenzhen.aliyuncs.com/avatar/hoon.jpg"
        ></el-avatar>
      </a>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.restrainer {
  min-height: 0;
}
footer {
  height: 200px;
  // background: #282828;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
a {
  color: #1db954;
}
.footer-left,
.footer-right {
  display: flex;
  align-items: center;
  & > * {
    margin-right: 10px;
  }
}
</style>
