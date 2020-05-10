import React from "react";
import "./App.css";
import {BrowserRouter as Router , Switch, Route} from "react-router-dom";
import { SignUp } from "./pages/auth/signup";
import { Login } from "./pages/auth/login";
import { Home } from "./pages/homepage";
import { UnAuthenticatedRoute } from "./components/routes/unauthenticatedRoutes";

function App() {

  return (
      <Router>
        <Switch>
          <UnAuthenticatedRoute path= '/login'>
            <Login />
          </UnAuthenticatedRoute>
          <UnAuthenticatedRoute path= '/signup'>
            <SignUp />
          </UnAuthenticatedRoute>
          <Route>
            <Home exact path='/'/>
          </Route>
         
          
        </Switch>
      </Router>
    
  );
}

export default App;
