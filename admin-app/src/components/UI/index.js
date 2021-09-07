import React from 'react'
import {Form} from 'react-bootstrap'
/**
* @author
* @function Input
**/

const Input = (props) => {
  return(
    <Form.Group >
    {props.Label&&<Form.Label>{props.Label}</Form.Label>}
    <Form.Control
    type={props.type} 
    placeholder={props.placeholder}
    value={props.value}
    onChange={props.onChange}
    {...props}
    />
    
    <Form.Text className="text-muted">
      {props.errorMessage}
    </Form.Text>
  </Form.Group>
  )
 }

export default Input