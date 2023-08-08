import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import { Switch } from 'react-router-dom';
import Bookslist from './Component/Bookslist';
import AddBooks from './Component/AddBooks';
import EditBooks from './Component/EditBooks';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Bookslist/>
        </Route>
        <Route exact path="/add">
          <AddBooks/>
        </Route>
        <Route exact path="/edit/:id">
          <EditBooks />
        </Route>
      </Switch>
    </div>
  );
}

export default App;