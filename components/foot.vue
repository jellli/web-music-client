<template>
  <footer>
    <div class="restrainer">
      <div class="footer-left">
        <span>
          Created By
          <a href="https://github.com/Greyy-Y">Grey</a>
          <span>&</span>
          <a href="https://github.com/hothoney">Hoon</a>
        </span>
      </div>
      <div class="footer-right"></div>
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
  font-size: 1.2rem;
}
a {
  color: #1db954;
}
span > span {
  // color: #fff;
}
</style>
