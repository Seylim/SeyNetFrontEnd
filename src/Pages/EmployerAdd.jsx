import React, { useState } from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import Headline from "../Layouts/Headline";
import EmployerService from "../Services/EmployerService";
import DateLabel from "../Layouts/DateLabel";
import MessageModal from "../Layouts/MessageModal";
import { Container, Grid, Label, Form, Button } from "semantic-ui-react";

export default function EmployerAdd() {
  const [open, setOpen] = useState(false);

  let employerService = new EmployerService();

  const initialValues = {
    companyName: "",
    phoneNumber: "",
    webAdrress: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    companyName: Yup.string().required("Required Field"),
    phoneNumber: Yup.string().required("Required Field"),
    webAdrress: Yup.string().required("Required Field"),
    email: Yup.string().email("Not a Valid Email").required("Required Field"),
    password: Yup.string().required("Required Field"),
  });

  const onSubmit = (values, { resetForm }) => {
    console.log(values);
    employerService.Add(values);
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
        <Headline content="Employer Sign up" />

        <Grid>
          <Grid.Row>
            <Grid.Column width="3" />
            <Grid.Column width="10">
              <DateLabel value={new Date().toDateString()} />

              <Formik>
                <Form onSubmit={formik.handleSubmit}>
                  <Form.Input
                    name="companyName"
                    label="Company Name"
                    onChange={(event, data) => handleChange("companyName", data.value)}
                    value={formik.values.companyName}
                  />
                  {formik.errors.companyName && formik.touched.companyName && <span><Label basic pointing color="pink" className="orbitron" content={formik.errors.companyName} /><br /><br /></span>}
                  <Form.Input
                    name="phoneNumber"
                    label="Phone Number"
                    onChange={(event, data) => handleChange("phoneNumber", data.value)}
                    value={formik.values.phoneNumber}
                  />
                  {formik.errors.phoneNumber && formik.touched.phoneNumber && <span><Label basic pointing color="pink" className="orbitron" content={formik.errors.phoneNumber} /><br /><br /></span>}
                  <Form.Input
                    name="webAdrress"
                    label="Web Address (The domains of the e-mail and web address must be the same.)"
                    placeholder="example.com"
                    onChange={(event, data) => handleChange("webAdrress", data.value)}
                    value={formik.values.webAddress}
                  />
                  {formik.errors.webAdrress && formik.touched.webAdrress && <span><Label basic pointing color="pink" className="orbitron" content={formik.errors.webAdrress} /><br /><br /></span>}
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

        <MessageModal onClose={() => handleModal(false)} onOpen={() => handleModal(true)} open={open} content="Registered is Succesful." />
      </Container>
    </div>
  );
}