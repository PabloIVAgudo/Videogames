import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './components/home/home';
import PageInicio from './components/pageInicio/pageInicio';
import VideogameDetail from './components/videogameDetail/videogameDetail';
import CreateVideogame from './components/createVideogame/createVideogame';
import ErrorRoute from './components/errorRoute/errorRoute';

function App() {

  return (
    <BrowserRouter>      
      <Switch>
        <Route exact path="/">
          <PageInicio />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/videogameDetail/:id">
          <VideogameDetail />
        </Route>
        <Route path="/createVideogame">
          <CreateVideogame />
        </Route>
        <Route>
          <ErrorRoute />
        </Route>
      </Switch>      
    </BrowserRouter>
  );
}

export default App;
