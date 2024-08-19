import {requestAll} from "@/utils/request";

export const fetchMusicList = function (){
    return requestAll.get('music')
        .then(response => {
            this.musicList = response.data.data;
        })
        .catch(error => {
            console.error('Error fetching music:', error);
        });
}
