import React, { lazy, useState, Suspense } from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

const Home = lazy(() => import('./view/home/home'))
const Login = lazy(() =>
  import('./view/login/Login')
);

function App() {
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
  );
}

export default App;
