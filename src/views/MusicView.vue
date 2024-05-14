<template>
  <div>
    <h1>Music List</h1>

    <div>

      <el-upload
          :show-file-list="false"
          :before-upload="beforeUpload"
          :on-success="onSuccess"
          :on-error="onError"
          :disabled="importDataDisabled"
          style="display: inline-flex;margin-right: 8px"
          action="/api/basic/import">

        <el-button :disabled="importDataDisabled" type="success" :icon="importDataBtnIcon">
          {{importDataBtnText}}
        </el-button>

      </el-upload>

      <el-button type="success" @click="exportData" :icon="Download">
        导出数据
      </el-button>

      <el-button type="primary" @click="ShowaddCategoryView" :icon="Plus">
        添加分类
      </el-button>
    </div>

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
            label="分类名称"
            prop="categoryName"
            width="150px"
            v-slot="scope">
          <el-input v-if="scope.row.editing"
                    v-model="scope.row.categoryName"
                    @keyup.enter="saveCategory(scope.row.categoryName)" />
        </el-table-column>


        <el-table-column
            fixed="right"
            width="290"
            label="操作">
          <template v-slot="scope">
            <el-input v-if="scope.row.editing" v-model="scope.row.categoryName" @keyup.enter="saveCategory(scope.row.categoryName)" />
            <el-button @click="toggleEditing(scope.row)" style="padding: 3px" size="small">
              {{ scope.row.editing ? '保存' : '编辑' }}
            </el-button>
            <el-button style="padding: 3px" size="small" type="primary">查看详细资料</el-button>
            <el-button @click="deleteCategory(scope.row)" style="padding: 3px" size="small" type="danger">删除
            </el-button>
            <el-button @click="playAudio(scope.row)" style="padding: 3px" size="small">Play Audio</el-button>
            <audio ref="audio" @play="incrementPlayCount"></audio>

            <button @click="playAudio_test(scope.row)">Play Audio_test</button>

            <div>
              <audio controls :src="audioSrc" @play="onPlay"></audio>
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

      <el-dialog
          :title="title"
          v-model="dialogVisible"
          width="80%">
        <div>
          <el-form :model="categoryForm" ref="categoryForm">

            <el-row>
              <el-col :span="6">
                <el-form-item label="分类:" prop="categoryName">
                  <el-input size="small" style="width: 150px" prefix-icon="el-icon-edit" v-model="categoryForm.categoryName"
                            placeholder="请输入分类"></el-input>
                </el-form-item>
              </el-col>

            </el-row>
          </el-form>
        </div>
        <span  class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addCategory">确 定</el-button>
  </span>
      </el-dialog>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import {Download, Plus} from "@element-plus/icons-vue";
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

    };
  },
  computed: {
    Plus() {
      return Plus
    },
    Download() {
      return Download
    },
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
    this.fetchAudio('example.mp3');
  },
  methods: {
    async playAudio_test(music) {
      try {
        music.musicPlayCountWeek++
        console.log(music.musicId)
        const response = await axios.get('http://localhost:8080/api/audio/'+music.musicId, {
          contentType: 'application/octet-stream',
          responseType: 'json'
        });

        console.log([response.data.data])
        const audioBlob = new Blob([response.data.data], { type: 'audio/mpeg' });
        console.log(audioBlob)
        const audioUrl = URL.createObjectURL(audioBlob);

        const audio = new Audio(audioUrl);
        await audio.play();
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    },
    playAudio() {
      const audio = this.$refs.audio;
      audio.src = this.audioUrl;
      audio.play();
    },
    incrementPlayCount() {
      axios.post('http://localhost:8080/api/increment-play-count', {
        songId: 1 // 假设歌曲ID为1
      });
    },

    fetchAudio(filename) {
      axios({
        url: `http://localhost:8080/api/audio/${filename}`,
        method: 'GET',
        responseType: 'blob',  // 重要：确保响应类型为 blob
      }).then(response => {
        this.audioSrc = URL.createObjectURL(response.data);
      }).catch(error => {
        console.error('Error fetching audio:', error);
      });
    },
    onPlay() {
      console.log('Audio is playing...');
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
    addCategory() {
      // Implement add category functionality here
      console.log('Adding a new category');

      const formData = new FormData();
      formData.append('categoryName', this.categoryForm.categoryName);

      axios.post(
          'http://127.0.0.1:8001/api/categories',
          {'categoryName': this.categoryForm.categoryName})
          .then(response => {
            console.log('Category added successfully:', response.data);
            // Handle success response
            // Optionally, update the category list with the new data
            // Manually update the category list by fetching the updated data
            this.dialogVisible = false;
            this.fetchCategoryList();
          })
          .catch(error => {
            console.error('Error adding category:', error);
            // Handle error
          });

    },
    enableEditing(category) {
      this.categoryList = this.categoryList.map(c => {
        if (c.categoryId === category.categoryId) {
          return {...c, editing: true};
        }
        return c;
      });
    },
    toggleEditing(category) {
      if (category.editing) {
        this.saveCategory(category);
      } else {
        this.enableEditing(category);
      }
    },
    saveCategory(category) {
      const formData = new FormData();
      formData.append('categoryId', category.categoryId);
      formData.append('categoryName', category.categoryName);
      axios.patch('http://127.0.0.1:8001/api/categories', formData)
          .then(response => {
            console.log('Category updated successfully:', response.data);
            category.editing = false; // Turn off editing mode
            // Manually update the category list by fetching the updated data
            this.fetchCategoryList();
          })
          .catch(error => {
            console.error('Error updating category:', error);
          });
    },
    editCategory(category) {
      // Implement edit functionality here
      console.log('Editing category:', category);
    },
    ShowaddCategoryView() {
      this.emptyCategory();
      this.title = '添加分类';

      this.dialogVisible = true;
    },
    deleteCategory(category) {
      // Implement delete functionality here

      console.log('Deleting category with ID:', category.categoryId);

      axios.delete("http://127.0.0.1:8001/api/categories/" + category.categoryId)
          .then(response => {
            console.log('Category deleted successfully:', response.data);
            // Handle success response
            // Manually update the category list by fetching the updated data
            this.fetchCategoryList();
          })
          .catch(error => {
            console.error('Error deleting category:', error);
            // Handle error
          });

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
    emptyCategory() {
      this.category = {
        categoryId: 1,
        categoryName: "test",
        createdAt: 0,
        updatedAt: 0,
      }
    }
  },
};
</script>