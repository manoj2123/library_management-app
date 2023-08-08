import Base from '../Base/Base'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams } from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import { AppStates } from './Context/AppProvider';
import * as yup from 'yup';
import { useFormik } from 'formik';


const filedValidationSchema = yup.object({
  name : yup.string().required("please fill Name of the Book"),
  author : yup.string().required("Please fill author name")

})


const EditBooks = () => {
  const {book, setBook} = AppStates();
  console.log(book)
 
  const {id} = useParams()
  const editBook = book[id]
  console.log(editBook)
  const {handleSubmit, values, handleChange, handleBlur, errors, touched} = useFormik({
    initialValues:{
      name:editBook.name,
    author:editBook.author
    
    },

    validationSchema :  filedValidationSchema, 
    onSubmit : (newData) =>{
      console.log("onsubmit",newData)
      updateBook(newData)
    }
  })
    // const {id} = useParams()
    // const editBook = book[id]
    // const [name, setName] = useState("");
    // const [author, setAuthor] = useState("");
     const history = useHistory();

    //  useEffect(()=>{
    //      setName(editBook.name)
    //      setAuthor(editBook.author)
    //  },[editBook])

  //   console.log('values useEffect: ', formik.values)
  // },[formik.values.n

  const updateBook = async(newData) =>{
        // const updateObj = {
        //    name: name,
        //     author: author
       
        // }

        console.log(newData)
        const response = await fetch(`https://64d2290bf8d60b1743618e79.mockapi.io/Books/${editBook.id}`,{
            method:"PUT",
            body:JSON.stringify(newData),
            headers:{
                "Content-Type":"application/json"
            },
        })
        const data = await response.json()
        if(data){
            console.log(newData)
            book[id] = newData;
            setBook([...book])
            history.push("/")
        }
    }

  return (
    <Base
    title={"Edit Book list here"}
    description={"Never Put Off Til Tomorrow The Book You Can Read Today"}
    >
    <Container >
      <Row>
        <Col sm={11}>
        <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Book Name</Form.Label>
        <Form.Control 
       id = "filled-basic"
        type="text" 
        placeholder="Enter Book Name"
         style={{width:'45%', marginLeft:'30%'}}
         value={values.name}
         onBlur={handleBlur}
         onChange={handleChange}
         name = "name"
         />
      </Form.Group>
      <div style={{color:"crimson"}}>{touched.name && errors.name ? errors.name : ""}</div>
      <Form.Group className="mb-3">
        <Form.Label>Author Name</Form.Label>
        <Form.Control 
         id = "filled-basic"
        type="text" 
        placeholder="Enter Author Name" 
        style={{width:'45%', marginLeft:'30%'}}
        value={values.author}
        name = "author"
        onChange={handleChange}
        onBlur={handleBlur}
        />
      </Form.Group>
      <div style={{color:"crimson"}}>{touched.author && errors.author ? errors.author : ""}</div>
      <Button variant="primary" type="submit"
      >
        Edit Books
      </Button>
    </Form>
        </Col>
      </Row>
    </Container>
    </Base>
  )
}

export default EditBooks