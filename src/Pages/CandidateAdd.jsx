import React, { useState } from 'react'
import { Formik, useFormik } from "formik";
import CandidateService from '../Services/CandidateService'
import * as Yup from "yup";
import Headline from "../Layouts/Headline";
import DateLabel from "../Layouts/DateLabel";
import { Container, Grid, Label, Form, Button } from "semantic-ui-react";

export default function CandidateAdd() {
    const [open, setOpen] = useState(false);

    let candidateService = new CandidateService();

    const initialValues = {
        firstName: "",
        lastName: "",
        nationalIdNumber: "",
        yearOfBirth: "",
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        firstName: Yup.string().required("Required Field"),
        lastName: Yup.string().required("Required Field"),
        nationalIdNumber: Yup.string().length(11, "Not 11 Characters in Length").required("Required Field"),
        yearOfBirth: Yup.date().required("Required Field"),
        email: Yup.string().email("Not a Valid Email").required("Required Field"),
        password: Yup.string().required("Required Field"),
    });

    const onSubmit = (values, { resetForm }) => {
        console.log(values);
        candidateService.register(values);
        handleModal(true);
        setTimeout(() => {
            resetForm();
        }, 100);
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: onSubmit,
    });

    const handleModal = (value) => {
        setOpen(value);
    };

    const handleChange = (fieldName, value) => {
        formik.setFieldValue(fieldName, value);
    };

    return (
        <div>
      <Container className="content">
        <Headline content="Candidate Sign up" />

        <Grid>
          <Grid.Row>
            <Grid.Column width="3" />
            <Grid.Column width="10">
              <DateLabel value={new Date().toDateString()} />

              <Formik>
                <Form onSubmit={formik.handleSubmit}>
                  <Form.Input
                    name="firstName"
                    label="First Name"
                    onChange={(event, data) => handleChange("firstName", data.value)}
                    value={formik.values.firstName}
                  />
                  {formik.errors.firstName && formik.touched.firstName && <span><Label basic pointing color="pink" className="orbitron" content={formik.errors.firstName} /><br /><br /></span>}
                  <Form.Input
                    name="lastName"
                    label="Last Name"
                    onChange={(event, data) => handleChange("lastName", data.value)}
                    value={formik.values.lastName}
                  />
                  {formik.errors.lastName && formik.touched.lastName && <span><Label basic pointing color="pink" className="orbitron" content={formik.errors.lastName} /><br /><br /></span>}
                  <Form.Group widths="equal">
                    <Form.Input
                      name="nationalIdNumber"
                      label="Identity Number"
                      placeholder="XXXXXXXXXXX"
                      onChange={(event, data) => handleChange("nationalIdNumber", data.value)}
                      value={formik.values.nationalIdNumber}
                    />
                    <Form.Input
                      name="yearOfBirth"
                      label="Year of Birth"
                      placeholder="YYYY"
                      onChange={(event, data) => handleChange("yearOfBirth", data.value)}
                      value={formik.values.yearOfBirth}
                    />
                  </Form.Group>
                  <Grid>
                    <Grid.Row columns="equal">
                      <Grid.Column>
                        {formik.errors.identityNumber && formik.touched.identityNumber && <span><Label basic pointing color="pink" className="orbitron" content={formik.errors.identityNumber} /><br /><br /></span>}
                      </Grid.Column>
                      <Grid.Column>
                        {formik.errors.yearOfBirth && formik.touched.yearOfBirth && <span><Label basic pointing color="pink" className="orbitron" content={formik.errors.yearOfBirth} /><br /><br /></span>}
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <Form.Input
                    name="email"
                    label="E-mail"
                    placeholder="example@example.com"
                    onChange={(event, data) => handleChange("email", data.value)}
                    value={formik.values.email}
                  />
                  {formik.errors.email && formik.touched.email && <span><Label basic pointing color="pink" className="orbitron" content={formik.errors.email} /><br /><br /></span>}
                  <Form.Input
                    name="password"
                    label="Password"
                    onChange={(event, data) => handleChange("password", data.value)}
                    value={formik.values.password}
                  />
                  {formik.errors.password && formik.touched.password && <span><Label basic pointing color="pink" className="orbitron" content={formik.errors.password} /><br /><br /></span>}
                  
                  <br />
                  
                  <Button circular fluid type="submit" color="yellow" content="Sign up" />
                </Form>
              </Formik>
            </Grid.Column>
            <Grid.Column width="3" />
          </Grid.Row>
        </Grid>
      </Container>
    </div>
    )
}
