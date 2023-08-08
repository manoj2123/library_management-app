// import React, { useState } from 'react'
import Base from '../Base/Base';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useHistory} from 'react-router-dom'
import * as yup from 'yup'
import { useFormik } from 'formik';
import { AppStates } from './Context/AppProvider';

 const filedValidationSchema = yup.object({
  name : yup.string().required("please fill Name of the Book"),
  author : yup.string().required("Please fill author name")

})

const AddBooks = () => {
  const {book, setBook} = AppStates();
const {handleSubmit, values, handleChange, handleBlur, errors, touched} = useFormik({
  initialValues:{
    name:"",
  author:""
  },
  validationSchema :  filedValidationSchema, 
  onSubmit : (newData) =>{
    console.log("onsubmit",newData)
     createbooks(newData)
  }
})
  const history = useHistory();
// const [name, setName] = useState("");
// const [author, setAuthor] = useState("");


const createbooks = async(newData) =>{
  // const newbooks = {
  //   name,
  //   author
  // }

  const response = await fetch("https://64d2290bf8d60b1743618e79.mockapi.io/Books",{
    method:"POST",
    body:JSON.stringify(newData),
    headers:{
      "Content-Type":"application/json"
    },
  })

  const data = await response.json();
  setBook([...book, data])
  console.log(newData);
  history.push("/");
}

  return (
   <Base
   title={"Add Books"}
   description={"Books May Well Be The Only True Magic"}
   >
   <Container >
      <Row>
        <Col sm={11}>
        <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Book Name</Form.Label>
        <Form.Control 
        id = "filled-basic"
        name='name'
        type="name" 
        onBlur={handleBlur}
        placeholder="Enter Book Name"
         style={{width:'45%', marginLeft:'30%'}}
         value={values.name}
         onChange={handleChange}
         />
      </Form.Group>
      <div style={{color:"crimson"}}>{touched.name && errors.name ? errors.name : ""}</div>
      <Form.Group className="mb-3">
        <Form.Label>Author Name</Form.Label>
        <Form.Control 
         id = "filled-basic"
         name='author'
        type="author" 
        onBlur={handleBlur}
        placeholder="Enter Author Name" 
        style={{width:'45%', marginLeft:'30%'}}
        value={values.author}
        onChange={handleChange}
        />
      </Form.Group>
      <div style={{color:"crimson"}}>{touched.author && errors.author ? errors.author : ""}</div>
      <Button variant="primary" type="submit" 

      >
        Add Books
      </Button>
    </Form>
        </Col>
      </Row>
    </Container>
    </Base>
  )
}

export default AddBooks