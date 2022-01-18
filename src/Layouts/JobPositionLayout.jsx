import React from "react";
import Headline from "./Headline";
import JobPostingList from "../Pages/JobPostingList";
import { Container } from "semantic-ui-react";

export default function JobPositionLayout() {
  return (
    <div>
      <Container className="content">
        <Headline content="Job Postings" />

        <JobPostingList type="filtered" itemsPerRow="2" />
      </Container>
    </div>
  );
}