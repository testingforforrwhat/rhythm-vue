<template>
  <div>
    <h1>Music List</h1>



    <div>
      <el-table
          :data="pagedMusicList"
          stripe
          border
          height="450"
          style="width: 100%"
      >

        <el-table-column
            type="selection"></el-table-column>

        <el-table-column
            label="音乐ID"
            prop="musicId"
            width="150px"></el-table-column>

        <el-table-column
            label="歌曲名称"
            prop="title"
            width="150px"></el-table-column>

        <el-table-column
            label="歌手"
            prop="artist"
            width="150px"></el-table-column>

        <el-table-column
            label="专辑"
            prop="album"
            width="150px"></el-table-column>

        <el-table-column
            label="分类ID"
            prop="categoryId"
            width="150px"></el-table-column>

        <el-table-column
            label="音乐文件路径"
            prop="musicFile"
            width="150px"></el-table-column>

        <el-table-column
            label="创建时间"
            prop="createdAt"
            width="150px"
            :formatter="formatDate"></el-table-column>

        <el-table-column
            label="更新时间"
            prop="updatedAt"
            width="150px"
            :formatter="formatDate"></el-table-column>

        <el-table-column
            fixed="right"
            label="本周播放次数统计(每天同步一次)"
            prop="musicPlayCountWeek"
            width="150px">

          <!-- 使用 v-slot:header 插槽自定义表头

           v-slot:header 用于自定义表头内容，将模版中的 header 插槽内容替换成 <span> 标签，并添加 title 属性以实现悬浮提示。

           https://element-plus.org/zh-CN/component/tooltip.html

           -->
          <template v-slot:header>
            <span class="tooltip" title="This is a tooltip: (每天同步一次)">本周播放次数统计

            <el-icon color="red"><Notification /></el-icon>

            </span>
          </template>


        </el-table-column>

        <el-table-column
            fixed="right"
            width="320"
            label="操作">
          <template v-slot="scope">
          <div>

            <!-- https://www.runoob.com/jsref/dom-obj-audio.html -->
            <!-- @play -->
            <!-- 音频播放控件，当存在 audioUrl 时显示 -->
            <audio ref="audioPlayer" controls @play="playAudio_test(scope.row)" v-if="scope.row.audioUrl">
              <source :src="scope.row.audioUrl"
                      type="audio/wav"
              >
              Your browser does not support the audio element.
            </audio>

          </div>
          </template>
        </el-table-column>

        <el-table-column
            fixed="right"
            width="290"
            label="操作">
          <template v-slot="scope">

<!--            <audio controls>-->
<!--              <source src="@/audio/song01.wav"-->
<!--                      type="audio/mpeg">-->
<!--              Your browser does not support the audio element.-->
<!--            </audio>-->

            <div>



            <el-button-group>

            <!-- 播放音频按钮，在 audioUrl 为空时显示 -->
            <el-button @click="playAudio_test(scope.row)"
                       v-if="!scope.row.buttonVisual"
                       style="padding: 3px"
                       size="small">
              播放音频
            </el-button>

              <el-button @click="upload(scope.row)"
                         style="padding: 3px"
                         size="small">
                upload
              </el-button>

              <el-button @click="download(scope.row)"
                         style="padding: 3px"
                         size="small">
                download
              </el-button>

            </el-button-group>

            </div>

          </template>
        </el-table-column>


      </el-table>

      <div class="demo-pagination-block">
        <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            v-model:total="totalRowsCount"
            :page-sizes="[10, 20, 30, 40]"
            :small="small"
            :disabled="disabled"
            :background="background"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            @prev-click="previousPage"
            @next-click="nextPage"
        />
      </div>



    </div>
  </div>
</template>

<script>
import moment from 'moment';
import {request} from "@/utils/request";
import {Notification} from "@element-plus/icons-vue";
import {fetchMusicList} from "@/data/music"; // 引入 moment.js 用于时间格式化


// 导出一个vue实例 object
export default {
  name: "MusicView",
  //   接收组件标签上的属性值
  props: null,
  //   是否要继承组件标签上的属性
  inheritAttrs: false,
  components: {Notification},

  /**
   *
   * 返回一个数据对象
   *
   *
   * 在组件选项对象中有一个data选项，该选项是一个函数，
   *
   * Vue在创建组件实例时会调用该函数。
   * data()函数可以返回一个数据对象，应用程序实例本身会代理该数据对象中的所有数据。
   *
   *
   * @returns {{small: boolean, categoryForm: {categoryName: string}, audioSrc: string, importDataDisabled: boolean, importDataBtnIcon: string, pageSize: number, importDataBtnText: string, audioUrlLoaded: boolean, total: number, audioUrl: null, music: {createdAt: string, musicId: string, artist: string, album: string, musicPlayCount: string, musicFile: string, musicPlayCountWeek: string, title: string, categoryId: string, updatedAt: string}, dialogVisible: boolean, background: boolean, scope: {row: {audioUrl: null, buttonVisual: boolean}}, disabled: boolean, currentPage: number, musicList: *[], audioTest: string}}
   */
  data() {
    return {
      musicList: [],
      currentPage: 1, // 当前页数
      pageSize: 10, // 每页条数
      total: 0, // 总条数
      small: false,
      disabled: false,
      background: false,

      importDataBtnText: '导入数据',
      importDataBtnIcon: 'Upload',
      importDataDisabled: false,

      music: {
        musicId: '',
        title: '',
        artist: '',
        album: '',
        categoryId: '',
        musicFile: '',
        createdAt: '',
        updatedAt: '',
        musicPlayCount:'',
        musicPlayCountWeek:'',
      },

      dialogVisible: false,
      categoryForm: {
        categoryName: ''
      },

      audioSrc: '',
      audioUrl: null,  // 初始值为 null
      audioUrlLoaded: false, // 初始值为 false
      scope: {
        row: {
          audioUrl: null,  // 示例音频 URL，可以根据实际情况设置
          buttonVisual: false,
        }
      },
      audioTest: 'https://audio04.dmhmusic.com/71_53_T10052122270_128_4_1_0_sdk-cpm/cn/0311/M00/75/BA/ChAKC12hSzSAOawRADq0vt10Kl8819.mp3?xcode=c7b414287b12e594de7d16b44cff129b2cbdc8f'

    };
  },
  computed: {

    pagedMusicList() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.musicList.slice(start, end);
    },
    totalPages() {
      console.log(`总页数为: ${Math.ceil(this.musicList.length / this.pageSize)}`)
      return Math.ceil(this.musicList.length / this.pageSize) * 10;
    },
    totalRowsCount() {
      console.log(`总数据量数目为: ${Math.ceil(this.musicList.length)}`)
      return Math.ceil(this.musicList.length);
    },
  },

  // 挂载视图完毕后的生命周期方法
  mounted() {
    fetchMusicList();
  },
  methods: {

    playAudio() {
      const audio =new Audio(this.audioTest);
      audio.play();
      this.music.musicPlayCountWeek++;
      console.log(this.music.musicId);
    },

    async playAudio_test(row) {
      try {
        // 假设这是一个异步操作，通过 API 获取音频 URL
        const response = await request.get('playAudio/'+row.musicId)

        row.musicPlayCountWeek++;
        console.log(row.musicId);

        console.log('response.data.data:', response.data.data)

        // const decodedAudioData = atob(response.data.data); // 解码音频数据
        // const audioUrl = `data:audio/mpeg;base64,${decodedAudioData}`; // 创建音频 URL

        // 从后端接收的字符串数据
        let audioDataString = response.data.data;
        // 去掉字符串两端的方括号和中间的空格
        const cleanString = audioDataString.substring(1, audioDataString.length - 1).replace(/\s+/g, '');

        // 分割字符串，将其转换为数字数组
        const byteArray = cleanString.split(',').map(Number);

        console.log(byteArray); // 输出转换后的数组
        // 假设 audioData 是您的音频数据字节数组
        let uint8Array = new Uint8Array(byteArray);

        console.log('arrayBuffer:', uint8Array)
        const audioBlob = new Blob([uint8Array], { type: 'audio/wav' });
        console.log('audioBlob:', audioBlob)
        row.audioUrl = URL.createObjectURL(audioBlob);


          // 确保这里的路径根据您的 API 响应格式正确
        // 设置音频 URL
        this.audioUrl = row.audioUrl;

        // 强制重新加载音频元素
        this.audioUrlLoaded = false;
        row.buttonVisual = false;
        await this.$nextTick(); // wait for the DOM update cycle
        this.audioUrlLoaded = true;
        row.buttonVisual = true;

        const audioPlayer = this.$refs.audioPlayer;
        audioPlayer.load(); // 强制重新加载音频文件

        // 打印日志以确认 URL 已更新
        console.log('音频 URL 已更新:', this.audioUrl);
      } catch (error) {
        console.error('获取音频 URL 失败:', error);
      }
    },

    async playAudio_test_(row) {

      await request.get('playAudio/'+row.musicId)
          .then(response => {

            row.musicPlayCountWeek++;
            console.log(row.musicId);

            console.log('response.data.data:', response.data.data)

            // const decodedAudioData = atob(response.data.data); // 解码音频数据
            // const audioUrl = `data:audio/mpeg;base64,${decodedAudioData}`; // 创建音频 URL

            // 从后端接收的字符串数据
            let audioDataString = response.data.data;
            // 去掉字符串两端的方括号和中间的空格
            const cleanString = audioDataString.substring(1, audioDataString.length - 1).replace(/\s+/g, '');

           // 分割字符串，将其转换为数字数组
            const byteArray = cleanString.split(',').map(Number);

            console.log(byteArray); // 输出转换后的数组
            // 假设 audioData 是您的音频数据字节数组
            let uint8Array = new Uint8Array(byteArray);

            console.log('arrayBuffer:', uint8Array)
            const audioBlob = new Blob([uint8Array], { type: 'audio/wav' });
            console.log('audioBlob:', audioBlob)
            row.audioUrl = URL.createObjectURL(audioBlob);

            // 更新 audioUrl 以触发 audio 元素重新渲染
            this.audioUrl = row.audioUrl;

            // // 转换为 Data URL
            // const reader = new FileReader();
            // reader.readAsDataURL(audioBlob);
            // this.audioUrl = reader.result; // 将 Data URL 存储到 audioUrl 变量中
            // console.log('reader.result:', reader.result)
            console.log('播放音频的audioUrl:', this.audioUrl)

            // const audio = new Audio(this.audioUrl);
            // audio.play();

            return this.audioUrl;

          }


          )
          .catch(error => {
            console.error('Error fetching audioBlob:', error);
          });

      // try {
      //   music.musicPlayCountWeek++
      //   console.log(music.musicId)
      //   const response = await request.get('audio/'+music.musicId, {
      //     contentType: 'application/octet-stream',
      //     responseType: 'json'
      //   });
      //
      //   console.log('response.data.data:', [response.data.data])
      //   const audioBlob = new Blob([response.data.data], { type: 'audio/mpeg' });
      //   console.log('audioBlob:', audioBlob)
      //   const audioUrl = URL.createObjectURL(audioBlob);
      //   console.log('audioUrl:', audioUrl)
      //
      //   const audio = new Audio(audioUrl);
      //   await audio.play();
      // } catch (error) {
      //   console.error('Error playing audio:', error);
      // }
    },
    handleSizeChange(size) {
      this.pageSize = size;
    },
    handleCurrentChange(page) {
      this.currentPage = page;
    },

    // fetchMusicList() {
    //   request.get('music')
    //       .then(response => {
    //         this.musicList = response.data.data;
    //       })
    //       .catch(error => {
    //         console.error('Error fetching music:', error);
    //       });
    // },
    formatDate(row, column, cellValue) {
      return moment(cellValue).format('YYYY-MM-DD HH:mm:ss'); // 格式化日期时间
    },

    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },

  },
};
</script>

<style scoped>

</style>
