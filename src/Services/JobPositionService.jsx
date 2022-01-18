import axios from "axios";

export default class JobPositionService {

    add(values){
        return axios.post(`http://localhost:8080/api/jobposition/add`, values);
    }

    getAll(){
        return axios.get(`http://localhost:8080/api/jobposition/getall`);
    }

    getAllActiveOnesByPageFilteredByCityAndJobTitle(cityId, jobTitleId, pageNo, pageSize){
        return axios.get(`http://localhost:8080/api/jobposition/getAllActiveOnesByPageFilteredByCityAndJobTitle?cityId=${cityId}&jobTitleId=${jobTitleId}&pageNo=${pageNo}&pageSize=${pageSize}`);
    }

    getAllActiveOnesFilteredByCityAndJobTitle(cityId, jobTitleId){
        return axios.get(`http://localhost:8080/api/jobposition/getAllActiveOnesFilteredByCityAndJobTitle?cityId=${cityId}&jobTitleId=${jobTitleId}`);
    }

    getAllActiveOnesSortedByPostingDateTop6(){
        return axios.get(`http://localhost:8080/api/jobposition/getAllActiveOnesSortedByPostingDateTop6`);
    }

    getAllActiveOnesByEmployerIdSortedByPostingDate(employerId){
        return axios.get(`http://localhost:8080/api/jobposition/getAllActiveOnesByEmployerIdSortedByPostingDate?employerId=${employerId}`);
    }

    getById(id){
        return axios.get(`http://localhost:8080/api/jobposition/getbyid?id=${id}`)
    }

}
