import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router";
import EmployerService from "./../Services/EmployerService";
import Headline from "../Layouts/Headline";
import { Container, Header, Grid, Divider, Icon, Button } from "semantic-ui-react";

export default function EmployerDetail() {
    let { id } = useParams();

    const [employer, setEmployer] = useState({});

    let employerService = new EmployerService();

    useEffect(() => {
        employerService.getById(id).then((result) => setEmployer(result.data.data));
    },[]);

    return (<div>
        <Container className="content">
            <Headline content="Employer" />

            <Grid>
                <Grid.Row>
                    <Grid.Column width="3" />
                    <Grid.Column width="10">
                        <Grid.Row>
                            <br /><br /><br />
                            <Button circular compact floated="right" color="yellow" icon="cog" as={NavLink} to={`/employers/employer/${id}/update`} />
                            <Button compact circular floated="right" color="violet" content="Post a Job" as={NavLink} to={`/employers/employer/${id}/jobPosting/add`} />
                        </Grid.Row>
                        <Grid.Row>
                            <Header>
                                <span className="detail-header">
                                    {employer.companyName}
                                </span>
                            </Header>
                            <Icon name="linkify" />
                            {employer.webAdrress}
                            <br />
                            <Icon name="envelope" />
                            {employer.email}
                            <br />
                            <Icon name="phone" />
                            {employer.phoneNumber}
                            <Divider />
                            <br />
                        </Grid.Row>
                    </Grid.Column>
                    <Grid.Column width="3" />
                </Grid.Row>
            </Grid>
        </Container>
    </div>
    );
}