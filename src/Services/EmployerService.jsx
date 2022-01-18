import axios from "axios";

export default class EmployerService{
    Add(values){
        return axios.post("http://localhost:8080/api/employer/add", values);
    }

    getAll(){
        return axios.get(`http://localhost:8080/api/employer/getall`);
    }
    getById(id){
        return axios.get(`http://localhost:8080/api/employer/getbyid?id=${id}`)
    }
}
