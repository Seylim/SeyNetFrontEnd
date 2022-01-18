import axios from "axios";

export default class JobTitleService{

    add(values) {
        return axios.post("http://localhost:8080/api/jobtitle/add", values);
    }

    update(values) {
        return axios.put("http://localhost:8080/api/jobtitle/update", values);
    }

    getAll(){
        return axios.get(`http://localhost:8080/api/jobtitle/getall`);
    }
}
