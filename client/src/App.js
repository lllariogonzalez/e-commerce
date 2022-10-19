import { Route, Switch } from 'react-router-dom';
import PageNotFound from './pages/PageNotFound';
import FormCreate from './pages/FormCreate';
import ProductDetail from './pages/ProductDetail';
import Home from './pages/Home';
import About from './pages/About'
import * as bootstrap from 'bootstrap'; // do not delete this line - is for the navBar !!
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

export default function App() {
  return (
    <div className="App">      
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/create">
          <FormCreate />
        </Route>
        <Route exact path="/product/:id" component={ProductDetail}></Route>
        <Route exact path="/about">
          <About/>
        </Route>
        <Route>
          <PageNotFound />         
        </Route>
        
      </Switch>      
    </div>
  );
};