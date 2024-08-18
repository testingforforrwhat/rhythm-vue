import {requestAll} from "@/utils/request";

export const fetchMusicList = function (){
    return requestAll.get('music')
}
