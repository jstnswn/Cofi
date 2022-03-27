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
import MainSidebar from './components/MainSidebar';
import Library from './components/Library';
import Splash from './components/Splash';
import ErrorPage from './ErrorPage';
import Album from './components/Album';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector(({ session }) => session.user);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate())
        // .then(() => dispatch(getPlaylists()))
      // await dispatch(loadHome())
      // await dispatch(getPlaylists())
      setLoaded(true)
    })();

  }, [dispatch]);

  // useEffect(() => {
  //   if (!user) return;
  //   dispatch(getPlaylists())
  // }, [user, dispatch])

  if (!loaded) return null;

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
        <ProtectedRoute path={`/library`}>
          <Library />
          {/* <MainSidebar /> */}
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <Home />
          {/* <MainSidebar /> */}
        </ProtectedRoute>
        <ProtectedRoute path='/album/:albumId' exact={true}>
          <Album />
        </ProtectedRoute>
        <Route>
          <ErrorPage />
        </Route>
      </Switch>
      {user && (
        <>
          {/* <MainSidebar /> */}
          <Player />
        </>

      )}
    </BrowserRouter>
  );
}

export default App;
