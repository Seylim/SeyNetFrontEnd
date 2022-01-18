import axios from "axios";

export default class TechnologyService{
    add(values) {
        return axios.post("http://localhost:8080/api/technology/add", values);
    }

    delete(id) {
        return axios.delete(`http://localhost:8080/api/technology/delete?id=${id}`);
    }
}
