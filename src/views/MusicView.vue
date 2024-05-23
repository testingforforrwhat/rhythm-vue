<template>
  <div>
    <h1>Music List</h1>



    <div>
      <el-table
          :data="pagedMusicList"
          stripe
          border
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
            label="本周播放次数统计"
            prop="musicPlayCountWeek"
            width="150px"></el-table-column>

        <el-table-column
            fixed="right"
            width="290"
            label="操作">
          <template v-slot="scope">

            <audio controls>
              <source src="@/audio/song01.wav"
                      type="audio/mpeg">
              Your browser does not support the audio element.
            </audio>

            <div>
            <!-- https://www.runoob.com/jsref/dom-obj-audio.html -->
            <!-- @play -->
            <audio controls @play="playAudio_test(scope.row)" v-if="audioUrl">
              <source :src="audioUrl"
                      type="audio/wav"
                      >
              Your browser does not support the audio element.
            </audio>
            <el-button @click="playAudio_test(scope.row)" v-if="!audioUrl" style="padding: 3px" size="small">播放音频</el-button>
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
import {requestAll} from "@/utils/request"; // 引入 moment.js 用于时间格式化

export default {
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
      audioUrl: '',
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
  mounted() {
    this.fetchMusicList();
  },
  methods: {

    playAudio() {
      const audio =new Audio(this.audioTest);
      audio.play();
      this.music.musicPlayCountWeek++;
      console.log(this.music.musicId);
    },
    playAudio_test(music) {

      requestAll.get('playAudio/'+music.musicId)
          .then(response => {

            music.musicPlayCountWeek++;
            console.log(music.musicId);

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
            this.audioUrl = URL.createObjectURL(audioBlob);
            // // 转换为 Data URL
            // const reader = new FileReader();
            // reader.readAsDataURL(audioBlob);
            // this.audioUrl = reader.result; // 将 Data URL 存储到 audioUrl 变量中
            // console.log('reader.result:', reader.result)
            console.log('audioUrl:', this.audioUrl)

            // const audio = new Audio(this.audioUrl);
            // audio.play();

            return this.audioUrl;
            
          })
          .catch(error => {
            console.error('Error fetching audioBlob:', error);
          });

      // try {
      //   music.musicPlayCountWeek++
      //   console.log(music.musicId)
      //   const response = await requestAll.get('audio/'+music.musicId, {
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

    fetchMusicList() {
      requestAll.get('music')
          .then(response => {
            this.musicList = response.data.data;
          })
          .catch(error => {
            console.error('Error fetching music:', error);
          });
    },
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