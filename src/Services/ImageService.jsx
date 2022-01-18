import axios from "axios";

export default class ImageService{
    getAll(){
        return axios.get(`http://localhost:8080/api/image/getall`);
    }

    getbyuserid(userId){
        return axios.get(`http://localhost:8080/api/image/getbyuserid?userId=${userId}`);
    }
}
