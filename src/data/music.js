import {requestAll} from "@/utils/request";

export const fetchMusicList = () => requestAll.get('music')