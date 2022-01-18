import axios from "axios";

export default class EduucationService {

    add(values) {
        return axios.post("http://localhost:8080/api/education/add", values);
    }

    delete(id) {
        return axios.delete(`http://localhost:8080/api/education/delete?id=${id}`);
    }

}
