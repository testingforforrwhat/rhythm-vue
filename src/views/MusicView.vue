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