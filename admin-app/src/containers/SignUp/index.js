import React, { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signup } from "../../actions";
import Layout from "../../components/Layout";
import Input from "../../components/UI";
/**
 * @author
 * @function Signup
 **/

const Signup = (props) => {
  const [firstName,setFirstName]=useState('');
  const [lastName,setLastName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const dispatch=useDispatch()
   
  const userSignup=(e)=>{
    e.preventDefault();
    const user={
      firstName,lastName,email,password
    }
    dispatch(signup(user))
  };

  const auth = useSelector((state) => state.auth);
  const user= useSelector(state=>state.user);
  if (auth.authenticate) {
    return <Redirect to={"/"} />;
  }
  
  if(user.loading)
       return <p>Loading..........</p>
  return (
    <Layout>
      <Container>
        {user.message}
        <Form onSubmit={userSignup}>
          <Row style={{ marginTop: "50px" }}>
            <Col md={{ span: 6, offset: 3 }}>
              <Row>
                <Col md={6}>
                  <Input
                    Label="First Name"
                    placeholder="First Name"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Col>
                <Col md={6}>
                  <Input
                    Label="Last Name"
                    placeholder="Last Name"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Col>
              </Row>
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

export default Signup;
