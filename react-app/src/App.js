import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SignUpForm from './components/auth/SignUpForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import { authenticate } from './store/session';
import Home from './components/Home';
import NavBar from './components/Navbar';
import Player from './components/Player';
import Library from './components/Library';
import Splash from './components/Splash';
import ErrorPage from './ErrorPage';
import SongPage from './components/SongPage';
import { PathProvider } from './context/PathContext';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector(({ session }) => session.user);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate())
      setLoaded(true)
    })();

  }, [dispatch]);

  if (!loaded) return null;

  return (
    <BrowserRouter>
      <PathProvider>


        <NavBar />
        <Switch>
          <Route path='/sign-up' exact={true}>
            <SignUpForm />
          </Route>
          {!user && (
            <Route path='/' exact={true}>
              <Splash />
            </Route>
          )}

          <ProtectedRoute path='/users' exact={true} >
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute path={`/library`}>
            <Library />
          </ProtectedRoute>
          <ProtectedRoute path='/' exact={true} >
            <Home />
          </ProtectedRoute>
          <ProtectedRoute path='/album/:albumId' exact={true}>
            <SongPage />
          </ProtectedRoute>
          <Route>
            <ErrorPage />
          </Route>
        </Switch>
        {user && (
          <>
            <Player />
          </>

        )}
      </PathProvider>
    </BrowserRouter>
  );
}

export default App;
