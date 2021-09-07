import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import Input from "../../components/UI";
import { login } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

/**
 * @author
 * @function Signin
 **/

const Signin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [Error, setError] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const userLogin = (event) => {
    event.preventDefault();
    const user = {
      email,
      password,
    };
    dispatch(login(user));
  };
  if (auth.authenticate) {
    return <Redirect to={"/"} />;
  }
  return (
    <Layout>
      <Container>
        <Form onSubmit={userLogin}>
          <Row style={{ marginTop: "50px" }}>
            <Col md={{ span: 6, offset: 3 }}>
              <Input
                Label="Email"
                placeholder="Email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                Label="Password"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </Layout>
  );
};

export default Signin;
