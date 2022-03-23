import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Home from './components/Home';
import NavBar from './components/Navbar';
import Player from './components/Player';
import { loadHome } from './store/home';
import MainSidebar from './components/MainSidebar';
import Library from './components/Library';
import { getPlaylists } from './store/playlists';
import Splash from './components/Splash';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector(({ session }) => session.user);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      await dispatch(loadHome())
      await dispatch(getPlaylists())
      setLoaded(true)
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        {/* <Route path='/login' exact={true}>
          <LoginForm />
        </Route> */}
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
        <ProtectedRoute path={`/library/:${user?.username}`}>
          <Library />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <Home />
        </ProtectedRoute>
      </Switch>
      {user && (
        <>
          <MainSidebar />
          <Player />
        </>

      )}
    </BrowserRouter>
  );
}

export default App;
