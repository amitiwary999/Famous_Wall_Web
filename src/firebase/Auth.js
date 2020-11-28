import React, { useEffect, useState, createContext } from 'react';
import firebase from './Firebase';
import Spinner from './LoadingSpinner';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);
  useEffect(() => {
    console.log('auth pr ');
    firebase.auth().onAuthStateChanged((user) => {
      console.log(`user ${user}`);
      setCurrentUser(user);
      setPending(false);
    });
  }, []);
  if (pending) {
    return <Spinner />;
  }
  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
