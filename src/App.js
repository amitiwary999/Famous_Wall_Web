/* eslint-disable react/jsx-filename-extension */
import React, { lazy, useState, Suspense } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import axios from 'axios';
import { AuthProvider } from './firebase/Auth';

const Home = lazy(() => import('./view/home/home'));
const Login = lazy(() => import('./view/login/Login'));
const videoCall = lazy(() => import('./view/VideoCall/VideoCallView'));

function App() {
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.baseURL = 'https://fwalls-dot-expinf.appspot.com/';

  const pages = [
    {
      pageLink: '/',
      view: Home,
    },
    {
      pageLink: '/login',
      view: Login,
      displayName: 'Home',
    },
    {
      pageLink: '/videocall',
      view: videoCall,
      displayName: 'VideoCall',
    },
  ];
  return (
    <AuthProvider>
      <div className="App">
        <Suspense fallback={<div />}>
          <Router>
            <Route
              render={({ location }) => (
                <>
                  <Switch location={location}>
                    {pages.map((page, index) => (
                      <Route
                        exact
                        path={page.pageLink}
                        render={({ match }) => <page.view />}
                        key={index}
                      />
                    ))}
                    <Redirect to="/" />
                  </Switch>
                </>
              )}
            />
          </Router>
        </Suspense>
      </div>
    </AuthProvider>
  );
}

export default App;
