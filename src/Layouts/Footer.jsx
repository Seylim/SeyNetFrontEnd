import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Divider, Grid, List, Icon } from "semantic-ui-react";

export default function Footer() {
  return (
    <Container className="footer">
      <Divider />
      <br />

      <Grid>
        <Grid.Row centered>
          <List link horizontal>
            <List.Item as={NavLink} to="/home" content="HOME" />
            <List.Item as={NavLink} to="/jobPostings" content="JOB POSTINGS" />
            <List.Item as={NavLink} to="/candidates" content="CANDIDATES" />
            <List.Item as={NavLink} to="/employers" content="EMPLOYERS" />
            <List.Item as={NavLink} to="/aboutUs" content="ABOUT US" />
          </List>
        </Grid.Row>
        <Grid.Row centered>2021 ・ Emre Kaan Seylim</Grid.Row>
        <Grid.Row centered>
          <List link horizontal>
            <List.Item href="https://github.com/seylim" target="blank">
              <Icon name="github" size="large" />
            </List.Item>
            <List.Item href="https://www.linkedin.com/in/emre-kaan-seylim-04a758134/" target="blank">
              <Icon name="linkedin" size="large" />
            </List.Item>
          </List>
        </Grid.Row>
      </Grid>
      <br />
      <br />
      <br />
    </Container>
  );
}