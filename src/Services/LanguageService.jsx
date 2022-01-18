import axios from "axios";

export default class LanguageService{

    add(values) {
        return axios.post("http://localhost:8080/api/language/add", values);
    }

    delete(id) {
        return axios.delete(`http://localhost:8080/api/language/delete?id=${id}`);
    }
}
