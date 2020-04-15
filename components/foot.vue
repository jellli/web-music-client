<template>
  <footer>
    <div class="restrainer">
      <div class="footer-left">
        <span>
          Create By
          <a href="#">Hoon</a>
          <span>&</span>
          <a href="#">Grey</a>
        </span>
      </div>
      <div class="footer-right"></div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  height: 200px;
  background: #282828;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
}
a {
  color: #1db954;
}
span > span {
  color: #1db954;
}
</style>
