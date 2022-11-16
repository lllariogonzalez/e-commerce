import { Route, Switch } from 'react-router-dom';
import PageNotFound from './pages/PageNotFound';
import ProductDetail from './pages/ProductDetail';
import Home from './pages/Home';
import About from './pages/About'
import * as bootstrap from 'bootstrap'; // do not delete this line - is for the navBar !!
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Dashboard from './layouts/Dashboard';
import ProfilePage from './pages/ProfilePage';
import {Cart} from './components/Cart/Cart';
import Order from './components/Order/Order';
import { ToastContainer } from 'react-toastify';
import Developers from './pages/Developers/Developers';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';

export default function App() {

  return (
    <div className="App">      
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/product/:id" component={ProductDetail}></Route>
        <Route exact path="/about">
          <About/>
        </Route>
        <Route exact path="/developers">
          <Developers/>
        </Route>
        <Route exact path="/contact">
          <Contact/>
        </Route>
        <Route exact path="/privacy">
          <Privacy/>
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/profile">
          <ProfilePage />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/order">
          <Order />
        </Route>
        <Route>
          <PageNotFound />         
        </Route>
      </Switch> 
      <ToastContainer/>
    </div>
  );
};