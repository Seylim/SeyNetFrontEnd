import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Headline from "../Layouts/Headline";
import DateLabel from "../Layouts/DateLabel";
import ResumeService from "../Services/ResumeService";
import TechnologyService from "../Services/TechnologyService";
import MessageModal from "../Layouts/MessageModal";
import { Container, Grid, Segment, Button, Header } from "semantic-ui-react";

export default function TechnologyDelete() {
  let { id } = useParams();

  const [resumes, setResumes] = useState([]);
  const [resume, setResume] = useState({});
  const [open, setOpen] = useState(false);
  
  let resumeService = new ResumeService();
  let technologyService = new TechnologyService();

  useEffect(() => {
    resumeService.getAllResumesDetailsByCandidate().then((result) => setResumes(result.data.data));
    resumeService.getById(id).then((result) => setResume(result.data.data));
  }, [resume]);

  const handleModal = (value) => {
    setOpen(value)
  };

  const handleDelete = (technologyId) => {    
    technologyService.delete(technologyId);
    resumeService.update({id: id});
    handleModal(true);
  };

  return (
    <div>
      <Container className="content">
        <Headline content="Delete Technology" />

        <Grid>
          <Grid.Row>
            <Grid.Column width="3" />
            <Grid.Column width="10">
              {resumes.map((resume) => (
                <span>
                  {resume.id === id && (
                    <span key={resume.id}>
                      {resume.technologies.length === 0
                        ? <Segment raised textAlign="center" ><Header color="pink" content="No technology has been added to the resume yet." /></Segment>
                        : <span>
                          <DateLabel value={new Date().toDateString()} />
                          <br /><br /><br />

                          {resume.technologies.map((technology) => (
                            <Segment raised>
                              <Button circular compact  icon="trash" color="pink" floated="right" onClick={() =>  handleDelete(technology.id)} />
                              <br />
                              ・ {technology.technology}
                              <br /><br />
                            </Segment>
                          ))}
                        </span>}
                    </span>
                  )}
                </span>
              ))}
            </Grid.Column>
            <Grid.Column width="3" />
          </Grid.Row>
        </Grid>

        <MessageModal onClose={() => handleModal(false)} onOpen={() => handleModal(true)} open={open} content="Deleted !" />
      </Container>
    </div>
  );
}