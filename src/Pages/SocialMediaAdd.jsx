import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import Headline from "../Layouts/Headline";
import DateLabel from "../Layouts/DateLabel";
import SocialMediaNameService from "../Services/SocialMediaNameService";
import SocialMediaService from "../Services/SocialMediaService";
import ResumeService from "../Services/ResumeService";
import MessageModal from "../Layouts/MessageModal";
import { Container, Grid, Form, Label, Button } from "semantic-ui-react";

export default function LinkAdd() {
  let { id } = useParams();

  const [socialMediaNames, setSocialMediaNames] = useState([]);
  const [open, setOpen] = useState(false);

  let socialMediaService = new SocialMediaService();
  let socialMediaNameService = new SocialMediaNameService();
  let resumeService = new ResumeService();

  useEffect(() => {
    socialMediaNameService.getAll().then((result) => setSocialMediaNames(result.data.data));
  }, []);

  const socialMediaNameOptions = socialMediaNames.map((socialMediaName) => ({
    key: socialMediaName.id,
    text: socialMediaName.name,
    value: socialMediaName,
  }));

  const initialValues = {
    resume: {id: id},
    socialMediaName: "",
    url: "",
  };

  const validationSchema = Yup.object({
    socialMediaName: Yup.object().required("Required Field"),
    url: Yup.string().required("Required Field"),
  });

  const onSubmit = (values, { resetForm }) => {
    socialMediaService.add(values);
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
        <Headline content="Add Social Media" />

        <Grid>
          <Grid.Row>
            <Grid.Column width="3" />
            <Grid.Column width="10">
              <DateLabel value={new Date().toDateString()} />

              <Formik>
                <Form onSubmit={formik.handleSubmit}>
                  <Form.Select
                    name="socialMediaName"
                    label="Social Media Name"                     
                    options={socialMediaNameOptions}
                    onChange={(event, data) => handleChange("socialMediaName", data.value)}
                    value={formik.values.socialMediaName}
                  />
                  {formik.errors.socialMediaName && formik.touched.socialMediaName && <span><Label basic pointing color="pink" className="orbitron" content={formik.errors.socialMediaName} /><br /><br /></span>}
                  <Form.Input
                    name="url"
                    label="Url"
                    onChange={(event, data) => handleChange("url", data.value)}
                    value={formik.values.url}
                  />
                  {formik.errors.url && formik.touched.url && <span><Label basic pointing color="pink" className="orbitron" content={formik.errors.url} /><br /></span>}
                  <br />
                  
                  <Button circular fluid type="submit" color="yellow" content={"Add"} />
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