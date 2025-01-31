import {request} from "@/utils/request";

export const fetchMusicList = function (){
    return request.get('music/queryAll')
        .then(response => {
            this.musicList = response.data.data;
        })
        .catch(error => {
            console.error('Error fetching music:', error);
        });
}
