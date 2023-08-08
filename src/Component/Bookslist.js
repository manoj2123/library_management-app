import Base from '../Base/Base'
import {useHistory} from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import { AppStates } from './Context/AppProvider';

const Bookslist = () => {
  const {book, setBook} = AppStates();
    const history = useHistory();

    const deleteBook = async (bookId) =>{
        const response = await fetch(`https://64d2290bf8d60b1743618e79.mockapi.io/Books/${bookId}`,{
            method:"DELETE",
        });
        const data = response.json();
        if(data){
            const remainingbooks = book.filter((book, idx) => book.id !== bookId);
            setBook(remainingbooks);
        }
    }

  return (
  <Base
  title={"Book List"}
  description={"Today a reader, tomorrow a leader"}
  >
   <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Author Name</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {book.map((book,idx)=>(
          <tr key={idx}>
          <td>{book.id}</td>
          <td>{book.name}</td>
          <td>{book.author}</td>
          <td><button className="button" onClick={() =>history.push(`edit/${idx}`)}>Edit</button></td>
          <td><button className="button" onClick={()=>deleteBook(book.id)}>Delete</button></td>
        </tr>
        ))}
      </tbody>
    </Table>
        
  </Base>
  )
}
  
export default Bookslist