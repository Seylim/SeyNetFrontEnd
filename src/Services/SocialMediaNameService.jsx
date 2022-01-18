import axios from "axios";

export default class SocialMediaNameService{
    add(values) {
        return axios.post("http://localhost:8080/api/socialmedianame/add", values);
    }

    update(values) {
        return axios.put("http://localhost:8080/api/socialmedianame/update", values);
    }

    getAll() {
        return axios.get("http://localhost:8080/api/socialmedianame/getall");
    }
}
