import React, { lazy, useState, Suspense } from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

const Home = lazy(() =>
  import('./view/home/FamousCardView')
);

function App() {
  const pages = [
    {
      pageLink: "/",
      view: Home,
      displayName: "Home",
    },
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
