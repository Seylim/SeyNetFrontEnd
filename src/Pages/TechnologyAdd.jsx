import React, { useState } from "react";
import { useParams } from "react-router";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import Headline from "../Layouts/Headline";
import DateLabel from "../Layouts/DateLabel";
import TechnologyService from "../Services/TechnologyService";
import ResumeService from "../Services/ResumeService";
import MessageModal from "../Layouts/MessageModal";
import { Container, Grid, Form, Label, Button } from "semantic-ui-react";

export default function TechnologyAdd() {
  let { id } = useParams();

  const [open, setOpen] = useState(false);

  let technologyService = new TechnologyService();
  let resumeService = new ResumeService();

  const initialValues = {
    resume: {id: id},
    technology: "",
  };

  const validationSchema = Yup.object({
    technology: Yup.string().required("Required Field"),
  });

  const onSubmit = (values, { resetForm }) => {
    technologyService.add(values);
    resumeService.update({id: id});
    console.log(values);
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
        <Headline content="Add Technology" />

        <Grid>
          <Grid.Row>
            <Grid.Column width="3" />
            <Grid.Column width="10">
              <DateLabel value={new Date().toDateString()} />

              <Formik>
                <Form onSubmit={formik.handleSubmit}>
                  <Form.Input
                    name="Technology"
                    label="Technology"
                    onChange={(event, data) => handleChange("technology", data.value)}
                    value={formik.values.technology}
                  />
                  {formik.errors.technology && formik.touched.technology && <span><Label basic pointing color="pink" className="orbitron" content={formik.errors.technology} /><br /></span>}
                  <br />

                  <Button circular fluid type="submit" color="yellow" content="Add" />
                </Form>
              </Formik>
            </Grid.Column>
            <Grid.Column width="3" />
          </Grid.Row>
        </Grid>

        <MessageModal onClose={() => handleModal(false)} onOpen={() => handleModal(true)} open={open} content="Added !" />
      </Container>
    </div>
  );
}