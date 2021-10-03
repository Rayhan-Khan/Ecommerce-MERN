
import './App.css';

import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import HomePage from './containers/HomePage';
import ProductListPage from './containers/ProductListPage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { isUserLoggedIn } from './actions';
import ProductDetailsPage from './containers/ProductDetailsPage';
import CartPage from './containers/Cartpage';

function App() {
  const dispatch=useDispatch();
  const auth=useSelector(state=>state.auth)
  useEffect(()=>{
    if(!auth.authenticate){
      dispatch(isUserLoggedIn())
    }
  },[auth.authenticate]);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' exact component={HomePage}/>
          <Route path='/cart' component={CartPage} />
          <Route path='/:slug' exact component={ProductListPage}/>
          <Route path='/:ProductSlug/:productId/p' component={ProductDetailsPage}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
