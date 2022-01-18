import React from "react";
import Navi from "../Layouts/Navi"
import { Container } from "semantic-ui-react";
import { Switch, Route, } from "react-router-dom";
import HomeLayout from "./HomeLayout";
import CandidateAdd from "../Pages/CandidateAdd";
import EmployerAdd from "../Pages/EmployerAdd";
import EmployerLayout from "./EmployerLayout";
import EmployerDetail from "../Pages/EmployerDetail";
import CandidateList from "../Pages/CandidateList";
import CandidateDetail from "../Pages/CandidateDetail";
import JobPositionLayout from "./JobPositionLayout";
import JobPostingDetail from "../Pages/JobPostingDetail";
import JobPostingAdd from "../Pages/JobPostingAdd";
import AboutUsLayout from "./AboutUsLayout";
import ResumeDetailsEdit from "../Pages/ResumeDetailsEdit";
import TechnologyAdd from "../Pages/TechnologyAdd";
import TechnologyDelete from "../Pages/TechnologyDelete";
import SocialMediaAdd from "../Pages/SocialMediaAdd";
import SocialMediaDelete from "../Pages/SocialMediaDelete";
import EducationAdd from "../Pages/EducationAdd";
import EducationDelete from "../Pages/EducationDelete";
import ExperienceAdd from "../Pages/ExperienceAdd";
import ExperienceDelete from "../Pages/ExperienceDelete";
import LanguageAdd from "../Pages/LanguageAdd";
import LanguageDelete from "../Pages/LanguageDelete";
export default function Dashboard() {
    return(
        <Container className="dashboard">
            <Navi/>
            <Switch>
                <Route exact path="/" component={HomeLayout}/>
                <Route exact path="/home" component={HomeLayout}/>
                <Route exact path="/jobPostings" component={JobPositionLayout}/>
                <Route exact path="/jobPositions/jobPosition/:id" component={JobPostingDetail} />
                <Route exact path="/candidate/add" component={CandidateAdd}/>
                <Route exact path="/candidates" component={CandidateList}/>
                <Route exact path="/candidates/candidate/:id" component={CandidateDetail}/>
                <Route exact path="/employers" component={EmployerLayout}/>
                <Route exact path="/employer/add" component={EmployerAdd}/>
                <Route exact path="/employers/employer/:id" component={EmployerDetail}/>
                <Route exact path="/employers/employer/:id/jobPosting/add" component={JobPostingAdd} />

                <Route exact path="/candidates/resume/:id/edit" component={ResumeDetailsEdit} />

                <Route exact path="/candidates/resume/:id/socialmedia/add" component={SocialMediaAdd} />
                <Route exact path="/candidates/resume/:id/socialmedia/delete" component={SocialMediaDelete} />

                <Route exact path="/candidates/resume/:id/education/add" component={EducationAdd}/>
                <Route exact path="/candidates/resume/:id/education/delete" component={EducationDelete}/>

                <Route exact path="/candidates/resume/:id/experience/add" component={ExperienceAdd}/>
                <Route exact path="/candidates/resume/:id/experience/delete" component={ExperienceDelete}/>

                <Route exact path="/candidates/resume/:id/languageLevel/add" component={LanguageAdd}/>
                <Route exact path="/candidates/resume/:id/languageLevel/delete" component={LanguageDelete}/>

                <Route exact path="/candidates/resume/:id/technologies/add" component={TechnologyAdd} />
                <Route exact path="/candidates/resume/:id/technologies/delete" component={TechnologyDelete} />



                <Route exact path="/aboutUs" component={AboutUsLayout}/>
            </Switch>
        </Container>
    );
}