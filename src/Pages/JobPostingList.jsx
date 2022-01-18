import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import JobPositionService from "../Services/JobPositionService";
import CityService from "../Services/CityService.jsx";
import JobTitleService from "../Services/JobTitleService";
import ButtonsOfPagination from "../Layouts/ButtonsOfPagination";
import { Card, Label, Button, Icon, Grid, Form } from "semantic-ui-react";

export default function JobPostingList({ type, itemsPerRow, id }) {
  const [jobPositions, setJobPositions] = useState([]);
  const [cities, setCities] = useState([]);
  const [jobTitles, setJobTitles] = useState([]);

  const [cityId, setCityId] = useState(0);
  const [jobTitleId, setJobTitleId] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [numberOfData, setNumberOfData] = useState(0);

  let jobPositionService = new JobPositionService();
  let cityService = new CityService();
  let jobTitleService = new JobTitleService();

  let totalNumberOfPages = Math.ceil(numberOfData === 0 ? 1 : numberOfData/pageSize);

  useEffect(() => {
    if (type === "filtered") {
      jobPositionService.getAllActiveOnesByPageFilteredByCityAndJobTitle(cityId, jobTitleId, pageNo, pageSize).then((result) => setJobPositions(result.data.data));
      jobPositionService.getAllActiveOnesFilteredByCityAndJobTitle(cityId, jobTitleId).then((result) => setNumberOfData(result.data.data.length));
      cityService.getAll().then((result) => setCities(result.data.data));
      jobTitleService.getAll().then((result) => setJobTitles(result.data.data));
    } else if (type === "recently") {
      jobPositionService.getAllActiveOnesSortedByPostingDateTop6().then((result) => setJobPositions(result.data.data));
    } else if (type === "byEmployer") {
      jobPositionService.getAllActiveOnesByEmployerIdSortedByPostingDate(id).then((result) => setJobPositions(result.data.data));
    }

  }, [pageNo, pageSize, numberOfData]);

  const cityOptions = [{value: 0, text: "City"}];
  cities.map((city) => (cityOptions.push({
    key: city.id,
    text: city.city,
    value: city.id,
  })));  

  const jobTitleOptions = [{value: 0, text: "Job Title"}];
  jobTitles.map((jobTitle) => (jobTitleOptions.push({
    key: jobTitle.id,
    text: jobTitle.title,
    value: jobTitle.id,
  })));

  const handlePreviousPage = () => {
    if (pageNo != 1) {
      setPageNo(pageNo - 1);
    }
  };

  const handleNextPage = () => {
    if (pageNo != totalNumberOfPages) {
      setPageNo(pageNo + 1);
    }    
  };

  const handlePageSize = (size) => {
    setPageNo(1);
    setPageSize(size);
  };

  const handleCity = (value) => {
    setCityId(value);
  };

  const handleJobTitle = (value) => {
    setJobTitleId(value);
  };

  const handleFilter = () =>  {
    setPageNo(1);
    setPageSize(10);
    jobPositionService.getAllActiveOnesFilteredByCityAndJobTitle(cityId, jobTitleId).then((result) => setNumberOfData(result.data.data.length));
    jobPositionService.getAllActiveOnesByPageFilteredByCityAndJobTitle(cityId, jobTitleId, pageNo, pageSize).then((result) => setJobPositions(result.data.data));
  };

  const handleClearFilter = () => {
    window.location.reload();
  };  

  return (
    <Grid>
      {type === "filtered" && <Grid.Row>        
        <Grid.Column width="12" textAlign="center">
          <ButtonsOfPagination
            previous={() => handlePreviousPage()}
            next={() => handleNextPage()}
            pageContent={pageNo + " / " + totalNumberOfPages}
            pageSizeOne={() => handlePageSize(10)}
            pageSizeTwo={() => handlePageSize(20)}
            pageSizeThree={() => handlePageSize(50)}
            pageSizeFour={() => handlePageSize(100)}
            pageSizeContent={"Page Size: " + pageSize}
          />
        </Grid.Column>
        <Grid.Column width="4" />      
      </Grid.Row>}      

      <Grid.Row>
        <Grid.Column width={type === "filtered" ? "12" : "16"}>
          <Card.Group itemsPerRow={itemsPerRow}>
            {jobPositions.map((jobPosition) => (
              <Card raised key={jobPosition.id}>
                <Card.Content>
                    
                  <Card.Header className="montserrat">
                    {jobPosition.jobTitle?.title}
                  </Card.Header>
                  <Card.Meta>
                    {jobPosition.employer?.companyName}
                    <br />
                    <strong>Number of Open Positions</strong>
                    &nbsp;
                    <Label circular color="pink" className="orbitron" content={jobPosition.numberOfOpenPositions} />
                  </Card.Meta>
                  <Card.Description className="orbitron">
                    <strong>Posting Date</strong>
                    &nbsp;&nbsp;
                    {new Date(jobPosition.postingDate).toDateString()}
                    <br />
                    <strong>Closing Date</strong>
                    &nbsp;&nbsp;
                    
                    {new Date(jobPosition.closingDate).toDateString()}
                  </Card.Description>
                </Card.Content>
                <Card.Content>
                  {type === "recently" && <Icon name="fire" size="big" color="yellow" />}
                  <Button circular compact floated="right" color="violet" content="View Detail" as={NavLink} to={`/jobPositions/jobPosition/${jobPosition.id}`} />
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>

        {type === "filtered" && <Grid.Column width="4">
          <Form>
            <Form.Select
              name="jobTitle"
              placeholder="Job Title"
              options={jobTitleOptions}
              onChange={(event, data) => handleJobTitle(data.value)}
            />
            <Form.Select
              name="city"
              placeholder="City"
              options={cityOptions}
              onChange={(event, data) => handleCity(data.value)}
            />

            <Button circular fluid color="yellow" content="Filter" onClick={() => handleFilter()} />
            <br />
            <Button circular fluid color="pink" content="Clear Filter" onClick={() => handleClearFilter()} />
          </Form>
        </Grid.Column>} 
      </Grid.Row>
    </Grid>      
  );
}