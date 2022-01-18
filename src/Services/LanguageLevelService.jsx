import axios from "axios";

export default class LanguageLevelService{

    add(values) {
        return axios.post("http://localhost:8080/api/languagelevel/add", values);
    }

    update(values) {
        return axios.put("http://localhost:8080/api/languagelevel/update", values);
    }

    getAll() {
        return axios.get("http://localhost:8080/api/languagelevel/getall");
    }
}
