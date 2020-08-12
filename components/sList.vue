<template>
  <div class="sl">
    <div class="sl-header">
      <div class="cover">
        <img :src="detial.list_cover" />
      </div>
      <div class="sl-info">
        <div class="sl-title">
          <h2>{{ detial.list_name }}</h2>
        </div>
        <div class="sl-info-d">
          <div class="avatar">
            <el-avatar :size="50" :src="creator_pic"></el-avatar>
          </div>
          <div class="info">
            {{ detial.created_by }}
            <!-- {{ detial.created_time }} -->
          </div>
        </div>
        <div class="sl-ctrl">
          <button>收藏</button>
        </div>
      </div>
    </div>
    <div class="sl-content"></div>
  </div>
</template>

<script>
export default {
  props: ["detial", "creator_pic"]
};
</script>

<style lang="scss">
.sl {
  padding: 20px;
  .sl-header {
    display: flex;
    .cover {
      margin-right: 10px;
      width: 180px;
      height: 180px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .sl-info {
      padding: 10px;
      & > * {
        margin-bottom: 10px;
      }
      .sl-info-d {
        display: flex;
        align-items: center;
        & > * {
          margin-right: 15px;
        }
      }
      .sl-ctrl {
        button {
          cursor: pointer;
          padding: 5px 10px;
          border: none;
          outline: none;
          border-radius: calc(5px * 2 + 1rem);
          background: #1db954;
          transition: all ease 0.5s;
          &:hover {
            filter: brightness(1.2);
          }
        }
      }
    }
  }
}
</style>
