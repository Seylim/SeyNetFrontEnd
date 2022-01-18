import axios from "axios";

export default class ResumeService{
    getAll(){
        return axios.get(`http://localhost:8080/api/resume/getall`);
    }

    getById(id){
        return axios.get(`http://localhost:8080/api/resume/getbyid?id=${id}`);
    }

    update(values) {
        return axios.put("http://localhost:8080/api/resume/update", values);
    }

    getbycandidateid(candidateId){
        return axios.get(`http://localhost:8080/api/resume/getbycandidateid?candidateId=${candidateId}`);
    }

    getAllResumesDetailsByCandidate() {
        return axios.get("http://localhost:8080/api/resume/getallresumesdetailsbycandidate");
    }

    getResumeDetailsByCandidateId(candidateId){
        return axios.get(`http://localhost:8080/api/resume/getResumeDetailsByCandidateId?candidateId=${candidateId}`);
    }

}
