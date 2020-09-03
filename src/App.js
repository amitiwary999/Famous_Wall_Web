import React, { lazy, useState, Suspense } from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import axios from 'axios'
import { AuthProvider } from "./firebase/Auth";
const Home = lazy(() => import('./view/home/home'))
const Login = lazy(() =>
  import('./view/login/Login')
);

function App() {
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.baseURL = 'https://expinf.firebaseapp.com/';

  const pages = [
    {
      pageLink: "/",
      view: Home
    },
    {
      pageLink: "/login",
      view: Login,
      displayName: "Home",
    }
  ];
  return (
    <AuthProvider>
      <div className="App">
        <Suspense fallback={<div />}>
          <Router>
            <Route
              render={({ location }) => (
                <React.Fragment>
                  <Switch location={location}>
                    {pages.map((page, index) => {
                      return (
                        <Route
                          exact
                          path={page.pageLink}
                          render={({ match }) => <page.view />}
                          key={index}
                        />
                      );
                    })}
                    <Redirect to="/" />
                  </Switch>
                </React.Fragment>
              )}
            />
          </Router>
        </Suspense>
      </div>
    </AuthProvider>
  );
}

export default App;
