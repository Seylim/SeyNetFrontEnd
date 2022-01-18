import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import Headline from "../Layouts/Headline";
import DateLabel from "../Layouts/DateLabel";
import LanguageLevelService from "../Services/LanguageLevelService";
import LanguageService from "../Services/LanguageService";
import ResumeService from "../Services/ResumeService";
import MessageModal from "../Layouts/MessageModal";
import { Container, Grid, Form, Label, Button } from "semantic-ui-react";

export default function LanguageAdd() {
  let { id } = useParams();

  const [languages, setLanguages] = useState([]);
  const [open, setOpen] = useState(false);

  let languageLevelService = new LanguageLevelService();
  let languageService =  new LanguageService();
  let resumeService = new ResumeService();

  useEffect(() => {
    languageLevelService.getAll().then((result) => setLanguages(result.data.data));
  }, []);

  const languageLevelOptions = languages.map((language) => ({
    key: language.id,
    text: language.level,
    value: language,
  }));

  const languageOptions = languages.map((language) => ({
    key: language.id,
    text: language.language,
    value: language,
  }));


  const initialValues = {
    resume: {id: id},
    language: "",
    level: "",
  };

  const validationSchema = Yup.object({
    language: Yup.object().required("Required Field"),
    level: Yup.object().required("Required Field"),
  });

  const onSubmit = (values, { resetForm }) => {
    languageService.add(values);
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
        <Headline content="Add Language" />

        <Grid>
          <Grid.Row>
            <Grid.Column width="3" />
            <Grid.Column width="10">
              <DateLabel value={new Date().toDateString()} />

              <Formik>
                <Form onSubmit={formik.handleSubmit}>
                  <Form.Select
                    name="languageLevel"
                    label="Language"
                    options={languageOptions}
                    onChange={(event, data) => handleChange("languageLevel", data.value)}
                    value={formik.values.languageLevel}
                  />
                  {formik.errors.languageLevel && formik.touched.languageLevel && <span><Label basic pointing color="pink" className="orbitron" content={formik.errors.languageLevel} /><br /><br /></span>}
                  <Form.Select
                    name="level"
                    label="Level"
                    options={languageLevelOptions}
                    onChange={(event, data) => handleChange("level", data.value)}
                    value={formik.values.level}
                  />
                  {formik.errors.languageLevel && formik.touched.languageLevel && <span><Label basic pointing color="pink" className="orbitron" content={formik.errors.languageLevel} /><br /></span>}
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