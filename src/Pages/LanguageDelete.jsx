import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Headline from "../Layouts/Headline";
import DateLabel from "../Layouts/DateLabel";
import ResumeService from "../Services/ResumeService";
import LanguageService from "../Services/LanguageService";
import MessageModal from "../Layouts/MessageModal";
import LanguageLevelIcons from "../Layouts/LanguageLevelIcons";
import { Container, Grid, Segment, Button, Header } from "semantic-ui-react";

export default function LanguageDelete() {
  let { id } = useParams();

  const [resumes, setResumes] = useState([]);
  const [resume, setResume] = useState({});
  const [open, setOpen] = useState(false);
  
  let resumeService = new ResumeService();
  let languageService = new LanguageService();

  useEffect(() => {
    resumeService.getAllResumesDetailsByCandidate().then((result) => setResumes(result.data.data));
    resumeService.getById(id).then((result) => setResume(result.data.data));
  }, [resume]);

  const handleModal = (value) => {
    setOpen(value)
  };

  const handleDelete = (languageLevelId) => {    
    languageService.delete(languageLevelId);
    resumeService.update({id: id});
    handleModal(true);
  };

  return (
    <div>
      <Container className="content">
        <Headline content="Delete Language" />

        <Grid>
          <Grid.Row>
            <Grid.Column width="3" />
            <Grid.Column width="10">
              {resumes.map((resume) => (
                <span>
                  {resume.id == id && (
                    <span key={resume.id}>
                      {resume.languages.length === 0
                        ? <Segment raised textAlign="center" ><Header color="pink" content="No language has been added to the resume yet." /></Segment>
                        : <span>
                            <DateLabel value={new Date().toDateString()} />
                            <br /><br /><br />

                            {resume.languages.map((language) => (
                              <Segment raised>
                                <Button circular compact  icon="trash" color="pink" floated="right" onClick={() =>  handleDelete(language.id)} />
                                <br />
                                <LanguageLevelIcons level={language.level} />
                                  &nbsp;&nbsp;
                                  {language.language}
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