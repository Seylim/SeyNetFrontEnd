import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Container, Header } from "semantic-ui-react";
import LogIn from "./Login";
import SignUp from "./SingUp";

export default function Navi() {
  return (
    <Menu borderless fixed="top">
      <Container>
        <Menu.Item color="violet" position="left">
          <Header as="h4" color="teal" className="orbitron" icon="fire" content="SEYNET" />
        </Menu.Item>
        <Menu.Item as={NavLink} to="/home" content="HOME" />
        <Menu.Item as={NavLink} to="/jobPostings" content="JOB POSTING" />
        <Menu.Item as={NavLink} to="/candidates" content="CANDIDATES" />
        <Menu.Item as={NavLink} to="/employers" content="EMPLOYERS" />
        <Menu.Item as={NavLink} to="/aboutUs" content="ABOUT US" />
        <Menu.Menu position="right">
          <Menu.Item position="right">
            <LogIn />
          </Menu.Item>
          <Menu.Item position="right">
            <SignUp />
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
}