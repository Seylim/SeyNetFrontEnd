import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Headline from "../Layouts/Headline";
import ResumeService from "../Services/ResumeService";
import ButtonsOfEdit from "../Layouts/ButtonsOfEdit";
import { Container, Grid } from "semantic-ui-react";

export default function ResumeDetailsEdit() {
  let { id } = useParams();

  const [resume, setResume] = useState({});

  let resumeService = new ResumeService();

  useEffect(() => {
    resumeService.getById(id).then((result) => setResume(result.data.data));
  }, []);

  return (
    <div>
      <Container className="content">
        <Headline content="Edit Resume Details" />

        <Grid>
          <Grid.Row>
            <Grid.Column width="5" />
            <Grid.Column width="6">
              <ButtonsOfEdit 
                content="Social Media"
                firstIcon="add"
                secondIcon="trash"
                firstTo={`/candidates/resume/${resume.id}/socialmedia/add`}
                secondTo={`/candidates/resume/${resume.id}/socialmedia/delete`}
              />
              <ButtonsOfEdit
                content="Education"
                firstIcon="add"
                secondIcon="trash"
                firstTo={`/candidates/resume/${resume.id}/education/add`}
                secondTo={`/candidates/resume/${resume.id}/education/delete`}
              />
              <ButtonsOfEdit
                content="Experience"
                firstIcon="add"
                secondIcon="trash"
                firstTo={`/candidates/resume/${resume.id}/experience/add`}
                secondTo={`/candidates/resume/${resume.id}/experience/delete`}
              />
              <ButtonsOfEdit
                content="Language"
                firstIcon="add"
                secondIcon="trash"
                firstTo={`/candidates/resume/${resume.id}/languageLevel/add`}
                secondTo={`/candidates/resume/${resume.id}/languageLevel/delete`}
              />
              <ButtonsOfEdit
                content="Technologies"
                firstIcon="add"
                secondIcon="trash"
                firstTo={`/candidates/resume/${resume.id}/technologies/add`}
                secondTo={`/candidates/resume/${resume.id}/technologies/delete`}
              />
            </Grid.Column>
            <Grid.Column width="5" />
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
}