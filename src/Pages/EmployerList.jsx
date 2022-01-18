import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import EmployerService from "../Services/EmployerService";
import { Card, Header, } from "semantic-ui-react";

export default function EmployerList() {
    const [employers, setEmployers] = useState([]);

    let employerService = new EmployerService();

    useEffect(() => {
        employerService.getAll().then((result) => setEmployers(result.data.data));
    },[]);

    return (
            <Card.Group itemsPerRow="2" className="">
                {employers.map((employer) => (
                    <Card raised key={employer.id}>
                        <Card.Content textAlign="center" as={NavLink} to={`/employers/employer/${employer.id}/`}>
                            <Card.Header>
                                <Header as="h3" color="violet" content={employer.companyName} />
                            </Card.Header>
                            <Card.Meta content={employer.webAdrress} />
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
    );
}