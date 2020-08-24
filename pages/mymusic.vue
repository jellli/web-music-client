<template>
  <div class="mymusic">
    <div class="restrainer">
      <div class="box" v-if="this.$store.state.isLogin">
        <div class="left-side">
          <showMusicList
            :list_data="user_created_list"
            :owned="true"
            title="创建的歌单"
            @reload="reloadCreatedMusicLists"
            @getDetial="getListDetial"
            @enterEdit="enterEdit"
            @getLikedDetial="getLikedDetial"
          />
          <showMusicList
            :list_data="user_collected_list"
            title="收藏的歌单"
            :owned="false"
            @reload="reloadCollectedMusicLists"
            @getDetial="getListDetial"
          />
        </div>
        <div class="right-side">
          <div v-if="detial">
            <sList :detial="detial" :creator_pic="creator_pic" />

            <div
              style="padding:0 20px"
              v-if="songs !== null && songs.length > 0"
            >
              <songsList
                :songs="
                  songs.slice((currentPage - 1) * 8, (currentPage - 1) * 8 + 7)
                "
                :list_id="current_list_id"
                @reload="reloadAll"
              />
              <el-pagination
                :hide-on-single-page="true"
                class="pagination"
                :total="songs.length"
                :current-page.sync="currentPage"
                background
              ></el-pagination>
            </div>
            <h2 v-else style="padding:0 20px">
              该歌单里还没添加任何歌曲
            </h2>
          </div>
          <div v-if="edit">
            <editList
              :pic_url="pic_url"
              :l_id="edit"
              :detial="edit_detial"
              @reload="reloadCreatedMusicLists"
              @edited="getListDetial(edit)"
            />
          </div>
        </div>
      </div>
      <div class="please_login" v-else>
        <div class="pelase_login_svg">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1104 916.056">
            <g id="_16" data-name="16" transform="translate(-168 -61.371)">
              <path
                id="Path_1"
                data-name="Path 1"
                d="M707,368.427a9,9,0,0,0-18,0v600a9,9,0,0,0,18,0Z"
                fill="#2b254e"
              />
              <path
                id="Path_2"
                data-name="Path 2"
                d="M352,396.426l-7.5,35-46,12-81.5,23,28-35-45.5,9L239.5,417l-35-.074-36.5-23.5,43.5,3.074,61,7.426-61-37.5Zm734,27,140.5-30Q1193.995,416,1194,416l38,7.426,40,27L1232,439.5l-51.5-.074,58,28-64-17,46.5,43-74.5-35h-53ZM711.016,140.406l-1.188-28.028-11-21.558,28.912,20.336-1.59-25.689-33.046-24.1,13.225,2.523,27.075,16.13,8.124,26.192,7.146-39.347,6.2,31.9,16.184-21.915L760.293,118.3,781.5,93.926l-18.5,50.5ZM583.338,726.243l26.378,17.582-5.81,46.837-8.855,83.508-8.14-11.956-3.5-31-33.5,43,14.337-54.354-21.337,42.354-19,23,6.5-28.5,19.5-49-19.5,32-19.935,9.526Zm135.01,22.009,30.665,8.036,9.755,46.177,18.815,81.841L765.5,874l-11.76-27.385-1.148.865L752.5,905.5,746,893l-11.5-75.5H733L729,874l-7,35.5h-2L715.5,874V843L707,867.5l-17.5,20.77Z"
                fill="#ffd25b"
                fill-rule="evenodd"
              />
              <path
                id="Path_3"
                data-name="Path 3"
                d="M698,359,645.5,493.5H773L735.5,369Z"
                fill="#ffd25b"
                fill-rule="evenodd"
              />
              <g id="Group_1" data-name="Group 1">
                <path
                  id="Path_4"
                  data-name="Path 4"
                  d="M579.5,664.427l-21.428,56.041A85.091,85.091,0,0,0,555,771.5q5.5,8,24.5,11t27.555.154l6.964-7.546a100,100,0,0,0,20.35-33.261l55.848-151.653L698,590V735.168A87.265,87.265,0,0,0,711.564,781.9,81.333,81.333,0,0,0,737,785.5q14.5,0,19.5-5.5a83.2,83.2,0,0,0,19.214-44.9L790,601.427,773,493.5q-15.333-4-37.5-4t-90-5.573Z"
                  fill="#ff6d5b"
                />
                <path
                  id="Path_5"
                  data-name="Path 5"
                  d="M648.666,703.518,613.5,711l36.736-37.441-10.263-62.123,37.4,21.988Z"
                  fill="#ffd25b"
                  fill-rule="evenodd"
                />
              </g>
              <path
                id="Path_6"
                data-name="Path 6"
                d="M770,367.927q41,29,83.5,41t245.5,0V493.5l-174.941,6.429a100.04,100.04,0,0,1-30.555-3.614L790,467.427l63.5,181-22.792,2.691L818.5,639.5l-5,11.5-30.251,5.722L773,639.5l-10.342,19.653L718,664.427l11-292.5Zm-107.5-8.5,38,6.5-104,298.5L553,655l-4-12.5-11.69,9.215L527,649.5v-22l-19.385,19.126L483,642.427l113.5-204.5q-53,22.574-78,22.573h-179V381.927q176.5-10,217.5-10T662.5,359.427Z"
                fill="#2b254e"
                fill-rule="evenodd"
              />
              <path
                id="Path_7"
                data-name="Path 7"
                d="M1099,408.927h87.75a7.25,7.25,0,0,1,0,14.5H1099Zm-846.75,0H340v14.5H252.25a7.25,7.25,0,0,1,0-14.5Z"
                transform="translate(0 1)"
                fill="#847daa"
                fill-rule="evenodd"
              />
              <path
                id="Path_8"
                data-name="Path 8"
                d="M755.145,392.926l10.287,159.517.068-.017L767,568.5l-5.5-.074V553.867l-9.338.859L753.5,569H748V555.109l-8.82.811L740.5,570H735V556.3l-9,.828V571h-4.5l.486-14.1-3.757-163.973H692.5c-1.5,0-20.5-37,49.5-31.5,24.571,1.931,36.71-3.594,44,0q7.292,3.594,2.5,20-17.5,11.5-30,11.5Z"
                fill="#60588e"
                fill-rule="evenodd"
              />
              <path
                id="Path_9"
                data-name="Path 9"
                d="M551.5,262.5q6.771,29.784,39,46.427t99,25.5l132.816.065,23.045-10.176,12.8-5.651a91.009,91.009,0,0,0,36.267-28.948L899,283.562q-1.23-6.812-38.5-22.062t-97.086-32.416q-23.991-16.207-71.128-7.767c-28.31,5.069-71.894,5.029-124.286,26.183Q562.235,249.828,551.5,262.5Z"
                fill="#2b254e"
                fill-rule="evenodd"
              />
              <path
                id="Path_10"
                data-name="Path 10"
                d="M650.5,353.427q-9,2-9,14.5T692.5,393q6.336-9.236,12.5-13t22-8.073Z"
                fill="#847daa"
                fill-rule="evenodd"
              />
              <g id="Group_2" data-name="Group 2">
                <path
                  id="Path_11"
                  data-name="Path 11"
                  d="M709.8,369.933c22.241,2.338,31.183,3.861,60.154.457,7.5-.882,9.016-5.015,15.549-7.891,4.162-1.832,9.5-4.5,13-5.5,24.256-6.93,27.69-36.961,30.336-62.132,3.792-36.081-35.249-73.566-64.336-89.368-16.356-8.885-14.707-3.122-36.848-5.449-15.3-1.609-3.34-6.273-17.152-2.551-41.706,11.24-92.5,36-100.5,71-5.855,25.612-1.5,63.5,27.5,78.5,1.724.892,9.509,4.393,13,6.5,3.337,2.015,3.884,5.138,5.5,6C671.339,367.692,689.388,367.788,709.8,369.933Z"
                  fill="#ff6d5b"
                />
              </g>
              <path
                id="Path_12"
                data-name="Path 12"
                d="M676.488,245.379,690.16,247.3a15,15,0,0,1,11.328,8.144q8.355,16.7,8.019,19.1t-12.492,12.948a15,15,0,0,1-11.923,3.529l-15.843-2.226a15,15,0,0,1-10.99-7.507q-6.421-11.428-5.952-14.774.477-3.384,10.423-15.7A15,15,0,0,1,676.488,245.379Zm98.481,11.383,9.837.86a15,15,0,0,1,12.09,8.2q7.83,15.546,7.624,17.907-.2,2.342-10.2,13.094a15,15,0,0,1-12.292,4.728L770.036,300.5a15,15,0,0,1-11.788-7.628q-5.816-10.413-5.531-13.668.291-3.326,8.392-15.709A15,15,0,0,1,774.969,256.762Z"
                fill="#fff"
                fill-rule="evenodd"
              />
              <path
                id="Path_13"
                data-name="Path 13"
                d="M686,274a7,7,0,1,1,7-7A7,7,0,0,1,686,274Zm94.819,11.182a7,7,0,1,1,7-7A7,7,0,0,1,780.819,285.182Zm-45.185-20.273a2,2,0,0,1,3.83.508l5.206,40.045a2.035,2.035,0,0,1,0,.487,2,2,0,0,1-2.216,1.758l-20.824-2.4a1.97,1.97,0,0,1-.537-.14,2,2,0,0,1-1.081-2.613ZM646.74,305.422l23.617.854,17.507,13.813,20.994-7.984,15.511,13.952,24.346-10.223,13.167,9.1,12.515-7.391,28.026,6.561-27.433,1.919-18.117,13.3-11.95-13.2-23.243,11.65-16.614-15.378L688.7,332.06l-19.746-17.165Z"
                fill="#2b254e"
                fill-rule="evenodd"
              />
              <path
                id="Path_14"
                data-name="Path 14"
                d="M696.439,142.026l-2.939,32.9,77.5,9.5,1.5-34.031a14,14,0,0,0-10.757-14.237q-20.448-4.848-32.133-6.17a135.043,135.043,0,0,0-19.688-.708A14,14,0,0,0,696.439,142.026Z"
                fill="#60588e"
                fill-rule="evenodd"
              />
              <g id="Group_4" data-name="Group 4">
                <path
                  id="Path_15"
                  data-name="Path 15"
                  d="M698,137.5q-30.5,65-87,87.927c-24.872,10.092-42.567,15.925-51.8,25.706a45.974,45.974,0,0,0-7.7,11.367q13.227,4.16,19.5,5.5c51.5,11,89.832,4.913,113,.5q16.59-3.16,50.341-12.249a100,100,0,0,1,39.52-2.521Q856.456,265,875,271q20.73,6.709,23.683,13.427,2.219-15.537-11.094-24.416c-4.324-2.883-29.549-8.572-48.089-20.584q-15.155-9.82-42.344-37.5a83,83,0,0,1-21.73-39.811L772,147Z"
                  fill="#60588e"
                />
                <g id="Group_3" data-name="Group 3">
                  <path
                    id="Path_16"
                    data-name="Path 16"
                    d="M652.5,200.5l32-21L698,211l16-31.5,30-4L714,162l-20.5-21Z"
                    fill="#2b254e"
                  />
                  <path
                    id="Path_17"
                    data-name="Path 17"
                    d="M706,154.5,684.5,206,698,218.5,758.5,176Z"
                    fill="#ffd25b"
                    fill-rule="evenodd"
                  />
                </g>
              </g>
              <path
                id="Path_18"
                data-name="Path 18"
                d="M343,179a41,41,0,1,0-41-41A41,41,0,0,0,343,179Z"
                fill="#ebeef6"
              />
              <path
                id="Path_19"
                data-name="Path 19"
                d="M433,247l-7,21.5H401l25,6.5q4,26.5,4,26.5s1.667-8,5-24l21.5-5-21.5-4Z"
                fill="#ffd25b"
                fill-rule="evenodd"
              />
              <path
                id="Path_20"
                data-name="Path 20"
                d="M946,138l-7,21.5H914l25,6.5q4,26.5,4,26.5s1.667-8,5-24l21.5-5-21.5-4Z"
                fill="#ffd25b"
                fill-rule="evenodd"
              />
              <path
                id="Path_21"
                data-name="Path 21"
                d="M993.216,332l-5.3,16.174H969l18.919,4.89L990.946,373s1.261-6.018,3.784-18.055l16.27-3.762-16.27-3.009Z"
                fill="#ffd25b"
                fill-rule="evenodd"
              />
              <path
                id="Path_22"
                data-name="Path 22"
                d="M536.333,135.5l-4.666,14.2H515l16.667,4.293q2.665,17.5,2.666,17.505s1.111-5.284,3.334-15.853l14.333-3.3L537.667,149.7Z"
                fill="#ffd25b"
                fill-rule="evenodd"
              />
              <path
                id="Path_23"
                data-name="Path 23"
                d="M434.713,576.083a.651.651,0,0,1,0,.108c-.2,2.268-12.127,4.241-26.8,2.955s-26.108-4.1-25.909-6.371a.739.739,0,0,1,.127-.348L386,553l-.186-18.806,2.288-23.561,51.579,4.46L432.567,534.9l2.225,41.187Zm634.617,36.833a.361.361,0,0,1,.02.1c.4,2.242-10.61,7.235-25.12,9.791s-26.28,2.8-26.68.553a.849.849,0,0,1,.05-.411L1017.5,606l-8.43-20.876a26.964,26.964,0,0,1-1.96-10.648l.25-12.716,50.98-9.041A80.641,80.641,0,0,1,1062.5,570q.765,7.353,0,22.5l6.9,20.4ZM962.75,606.66a.645.645,0,0,1,0,.108c-.159,2.272-12.051,4.452-26.747,3.422s-26.176-3.646-26.017-5.917a.745.745,0,0,1,.115-.341L913,586l.127-20.368,1.876-23.6,51.649,3.56L959.5,580.5l3.328,26.165Z"
                fill="#847daa"
                fill-rule="evenodd"
              />
              <path
                id="Path_24"
                data-name="Path 24"
                d="M413.549,517.151c-14.056-1.232-25.29-4.069-25.091-6.338s11.752-3.108,25.808-1.876,25.289,4.069,25.091,6.338S427.6,518.383,413.549,517.151ZM1033.63,561.47c-13.9,2.447-25.48,2.614-25.88.372s10.55-6.045,24.45-8.493,25.48-2.614,25.87-.372S1047.53,559.022,1033.63,561.47Zm-93.07-13.363c-14.075-.987-25.357-3.628-25.2-5.9s11.7-3.314,25.771-2.327,25.357,3.628,25.2,5.9S954.634,549.093,940.56,548.107Z"
                fill="#60588e"
                fill-rule="evenodd"
              />
              <path
                id="Path_26"
                data-name="Path 26"
                d="M422.954,444.113l4.211.881-9.5,67.376a2.013,2.013,0,0,1-2.274,1.713c-.044-.006-.088-.014-.131-.023a2.3,2.3,0,0,1-1.806-2.571ZM947.34,475l4.225.808-8.32,67.531A2.013,2.013,0,0,1,941,545.094c-.044-.005-.087-.012-.131-.021a2.3,2.3,0,0,1-1.85-2.538Zm70,14.052,4.27-.538,12.96,66.8a2.013,2.013,0,0,1-1.6,2.36c-.04.008-.08.015-.13.021a2.3,2.3,0,0,1-2.54-1.843Z"
                fill="#2b254e"
                fill-rule="evenodd"
              />
              <path
                id="Path_27"
                data-name="Path 27"
                d="M330,163.5a5.247,5.247,0,0,0,4.5-2,7.447,7.447,0,0,0,1.5-4,6.033,6.033,0,0,0-1.5-4.5,6.975,6.975,0,0,0-4.5-1.5,6.759,6.759,0,0,0-4.5,1.5,6.386,6.386,0,0,0,4.5,10.5Z"
                fill="#c1c6d3"
                fill-rule="evenodd"
              />
              <path
                id="Path_28"
                data-name="Path 28"
                d="M353,132a7.874,7.874,0,0,0,6.75-3,11.171,11.171,0,0,0,2.25-6c0-2.42-.44-5.043-2.25-6.75A10.458,10.458,0,0,0,353,114c-2.374,0-5.142.695-6.75,2.25-1.759,1.7-2.25,4.37-2.25,6.75A9.277,9.277,0,0,0,353,132Z"
                fill="#c1c6d3"
                fill-rule="evenodd"
              />
              <path
                id="Path_29"
                data-name="Path 29"
                d="M365.884,148.316a3.938,3.938,0,0,0,2.068-3.06,5.59,5.59,0,0,0-.636-3.141,4.528,4.528,0,0,0-2.743-2.266,5.232,5.232,0,0,0-3.458.835,5.071,5.071,0,0,0-2.266,2.742,4.789,4.789,0,0,0,7.035,4.89Z"
                fill="#c1c6d3"
                fill-rule="evenodd"
              />
            </g>
          </svg>
        </div>
        <div class="please_login_text">
          <h1>请登录</h1>
          <span style="color:rgb(121,121,121);display:block;margin-bottom:20px"
            >查看并管理你收藏的音乐</span
          >
          <el-button type="primary" @click="() => this.$router.push(`/login`)"
            >立即登录</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sList from "@/components/sList";
import songsList from "@/components/songsList";
import editList from "@/components/editList";
import showMusicList from "@/components/showMusicList";
export default {
  head() {
    return {
      title: "我的音乐"
    };
  },
  components: {
    sList,
    songsList,
    editList,
    showMusicList
  },
  async asyncData({ $axios, store }) {
    if (store.state.isLogin) {
      const user_created_list_res = await $axios.post(
        `${process.env.BACKEND_URL}/get/created_musiclist`,
        {
          user_name: store.state.userName
        }
      );
      const user_collected_list_res = await $axios.post(
        `${process.env.BACKEND_URL}/get/collected_musiclist`,
        {
          user_name: store.state.userName
        }
      );
      // console.log(user_collected_list_res);
      return {
        user_created_list: user_created_list_res.data,
        user_collected_list: user_collected_list_res.data
      };
    }
  },
  data() {
    return {
      currentPage: 1,
      isOpen: true,
      src: null,
      detial: null,
      edit: null,
      songs: [],
      pic_url: null,
      creator_pic: null,
      user_created_list: null,
      user_collected_list: null,
      current_list_id: null,
      edit_detial: {}
    };
  },
  methods: {
    async reloadCreatedMusicLists() {
      const user_created_list_res = await this.$axios.post(
        `${process.env.BACKEND_URL}/get/created_musiclist`,
        {
          user_name: this.$store.state.userName
        }
      );
      this.user_created_list = user_created_list_res.data;
    },
    async reloadCollectedMusicLists() {
      const user_collected_list_res = await this.$axios.post(
        `${process.env.BACKEND_URL}/get/collected_musiclist`,
        {
          user_name: this.$store.state.userName
        }
      );
      this.user_collected_list = user_collected_list_res.data;
    },
    async enterEdit(l_id) {
      this.detial = null;
      this.current_list_id = null;
      this.edit = l_id;
      const detial = await this.$axios.post(
        `${process.env.BACKEND_URL}/get/musiclist_detail`,
        {
          l_id: l_id
        }
      );
      this.edit_detial = detial.data[0];
      const res = await this.$axios.post(
        `${process.env.BACKEND_URL}/get/list_cover`,
        {
          l_id
        }
      );
      this.pic_url = res.data.list_cover;
    },

    async getListDetial(listId, force = false) {
      if (listId !== this.current_list_id || force) {
        this.edit = null;
        this.songs = null;
        // 获取用户创建的歌单详情
        const detial = await this.$axios.post(
          `${process.env.BACKEND_URL}/get/musiclist_detail`,
          {
            l_id: listId
          }
        );
        this.detial = detial.data[0];
        if (detial.data[0].music_ids.length !== 0) {
          // 获取歌单中所有歌曲详情
          const query = [];
          detial.data[0].music_ids.forEach(id => {
            query.push(id.toString());
          });
          const res = await this.$axios.get(
            `${process.env.MUSIC_API_URL}/song/detail?ids=${query.join(",")}`
          );
          const temp = [];
          // 处理数据
          res.data.songs.forEach(async song => {
            const al = await this.$axios.get(
              `${process.env.MUSIC_API_URL}/album?id=${song.al.id}`
            );
            const item = {
              id: song.id,
              name: song.name,
              artists: song.ar,
              album_pic: al.data.songs[0].al.picUrl
            };
            temp.push(item);
          });
          this.songs = temp;
          this.current_list_id = listId;
        }
      }
    },
    async getLikedDetial() {
      this.songs = null;
      this.edit = null;
      this.detial = {
        liked: true,
        list_name: "我喜欢的音乐",
        creator_pic: this.$store.state.pic,
        created_by: this.$store.state.userName,
        list_cover:
          "https://web-music.oss-cn-shenzhen.aliyuncs.com/static/3099b3803ad9496896c43f22fe9be8c4.png",
        music_ids: this.$store.state.user.liked_music
      };
      const temp = [];
      if (this.$store.state.user.liked_music.length > 0) {
        const query = this.$store.state.user.liked_music
          .map(item => item.toString())
          .join(",");
        const res = await this.$axios.get(
          `${process.env.MUSIC_API_URL}/song/detail?ids=${query}`
        );
        // 处理数据
        res.data.songs.forEach(async song => {
          const al = await this.$axios.get(
            `${process.env.MUSIC_API_URL}/album?id=${song.al.id}`
          );
          const item = {
            id: song.id,
            name: song.name,
            artists: song.ar,
            album_pic: al.data.songs[0].al.picUrl
          };
          temp.push(item);
        });
      }
      this.songs = temp;
      this.current_list_id = "liked";
    },
    reloadAll(reloadDetial = true) {
      this.reloadCreatedMusicLists();
      this.reloadCollectedMusicLists();
      if (reloadDetial) {
        this.getListDetial(this.current_list_id, true);
      }
    }
  },
  mounted() {
    if (this.$store.state.isLogin) {
      this.getLikedDetial();
    }
  },
  watch: {
    async detial() {
      // 获取创建者头像
      const user_pic_res = await this.$axios.post(
        `${process.env.BACKEND_URL}/get/user_pic`,
        {
          user_name: this.detial.created_by
        }
      );
      this.creator_pic = user_pic_res.data.user_pic;
    }
  }
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.box {
  min-height: 80vh;
  // border: 1px #fff solid;
  // background: #141414;
  display: flex;
  // padding: 20px;
}
.left-side {
  width: 30%;
  // border: 1px #eee solid;
}
.right-side {
  width: 70%;
  // border: 1px #eee solid;
}
.please_login {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  align-items: center;
  text-align: center;
  .please_login_svg {
    width: 50%;
    height: 100%;
    svg {
      width: 100%;
      height: 100%;
    }
  }
}
.pagination {
  margin-top: 20px;
}
</style>
