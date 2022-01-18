import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Headline from "../Layouts/Headline";
import DateLabel from "../Layouts/DateLabel";
import ResumeService from "../Services/ResumeService";
import SocialMediaService from "../Services/SocialMediaService";
import GithubButton from "../Layouts/GithubButton";
import LinkedinButton from "../Layouts/LinkedinButton";
import MessageModal from "../Layouts/MessageModal";
import { Container, Grid, Segment, Button, Header } from "semantic-ui-react";

export default function SocialMediaDelete() {
  let { id } = useParams();

  const [resumes, setResumes] = useState([]);
  const [resume, setResume] = useState({});
  const [open, setOpen] = useState(false);
  
  let resumeService = new ResumeService();
  let socialMediaService = new SocialMediaService();

  useEffect(() => {
    resumeService.getAllResumesDetailsByCandidate().then((result) => setResumes(result.data.data));
    resumeService.getById(id).then((result) => setResume(result.data.data));
  }, [resume]);

  const handleModal = (value) => {
    setOpen(value)
  };

  const handleDelete = (linkId) => {    
    socialMediaService.delete(linkId);
    resumeService.update({id: id});
    handleModal(true);
  };

  return (
    <div>
      <Container className="content">
        <Headline content="Delete Social Media" />

        <Grid>
          <Grid.Row>
            <Grid.Column width="3" />
            <Grid.Column width="10">
              {resumes.map((resume) => (
                <span>
                  {resume.id == id && (
                    <span key={resume.id}>
                      {resume.socialMedias?.length == 0
                        ? <Segment raised textAlign="center" ><Header color="pink" content="No link has been added to the resume yet." /></Segment>
                        : <span>
                            <DateLabel value={new Date().toDateString()} />
                            <br /><br /><br />
                            
                            {(resume.socialMedias.map((socialMedia) =>
                              (socialMedia.socialMediaName?.id === 1 
                                ? <Segment raised>
                                    <Button circular compact  icon="trash" color="pink" floated="right" onClick={() =>  handleDelete(socialMedia.id)} />
                                    <br />
                                    <GithubButton url={socialMedia.url} />&nbsp;&nbsp;&nbsp;<strong>{socialMedia.url}</strong>
                                    <br /><br />
                                  </Segment>
                                : <Segment raised>
                                    <Button circular compact icon="trash" color="pink" floated="right" onClick={() =>  handleDelete(socialMedia.id)} />
                                    <br />
                                    <LinkedinButton url={socialMedia.url} />&nbsp;&nbsp;&nbsp;<strong>{socialMedia.url}</strong>
                                    <br /><br />
                                  </Segment>)))}
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