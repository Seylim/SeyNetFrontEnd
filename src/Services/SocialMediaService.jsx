import axios from "axios";

export default class SocialMediaService{
    
    add(values) {
        return axios.post("http://localhost:8080/api/socialmedia/add", values);
    }

    delete(id) {
        return axios.delete(`http://localhost:8080/api/socialmedia/delete?id=${id}`);
    }
}
