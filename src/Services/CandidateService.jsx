import axios from "axios";

export default class CandidateService {

    register(values) {
        return axios.post("http://localhost:8080/api/candidates/register", values);
    }

    login(email, password){
        return axios.get(`http://localhost:8080/api/candidates/login?eMail=${email}?passwordAgain=${password}`);
    }

    getById(id) {
        return axios.get(`http://localhost:8080/api/candidates/getById?id=${id}`);
    }

}
