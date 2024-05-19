

/*  登录 业务模块 的 子仓库  */
import {fetchMusicList} from "@/data/music";

export default {
    // 是否开启独立命名空间
    // false 逻辑分区 (默认值)
    // true  物理分区
    namespaced: true,
    // 各组件实例的data 迁移到这儿
    state: {

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

    },
    // 各组件实例的(同步)方法 迁移到这儿
    mutations: {
    },
    // 各组件实例的(异步)方法 迁移到这儿
    actions: {

        fetchMusicList(context) {
            console.log( context );
            // context.state 获取当前仓库的state状态数据
            // context.commit 载荷调用当前仓库的mutations同步方法
            // context.dispatch 载荷调用当前仓库的actions异步方法
            fetchMusicList()
                .then(response => {
                    context.state.musicList = response.data.data;
                    console.log( 'context.state.musicList:',context.state.musicList );
                })
                .catch(error => {
                    console.error('Error fetching music:', error);
                });
        },

    }
}