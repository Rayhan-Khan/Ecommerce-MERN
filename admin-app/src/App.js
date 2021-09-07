import React, { useEffect } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Signin from "./containers/SignIn";
import Signup from "./containers/SignUp";
import PrivateRoute from "./components/HOC/PrivateRoute";
import { getAllCategory, getInitialData, isUserLoggedIn } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import Products from "./containers/Products";
import Orders from "./containers/Orders";
import Category from "./containers/Category";
import NewPage from "./containers/NewPage/Index";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    dispatch(getInitialData());
  }, []);

  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/page" component={NewPage} />
        <PrivateRoute path="/category" component={Category} />
        <PrivateRoute path="/products" component={Products} />
        <PrivateRoute path="/orders" component={Orders} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
