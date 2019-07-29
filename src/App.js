import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

//Redux 

import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';

//Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import user from './pages/user';

//Components
import Navbar from './components/layout/Navbar';
import AuthRoute from './util/AuthRoute';

const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()){
    store.dispatch(logoutUser())
    window.location.href = '/login';
  } else{
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#33c9dc',
      main: '#12b596',
      dark: '#008394',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#b22a00',
      contrastText: '#fff'
    }
  },
  typography: {
    useNextVariants: true
  },
  grid: {
    textAlign: 'center'
  },
  image: {
      margin: '20px auto 20px auto'
  },
  form: {
      margin: '20px auto 20px auto'
  },
  textField: {
      margin: '10px auto'
  },
  button: {
      padding: '8px',
      fontSize: '16px',
      position: 'relative'
  },
  customError: {
      fontSize: '14px',
      padding: '10px',
      backgroundColor: '#de3b3b',
      color: '#fff',
      marginBottom: '10px',
      borderRadius: '4px'
  },
  signup: {
      margin: '20px auto'
  },
  progress: {
      position: 'absolute'
  }
});


export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <div className="container">
            <Navbar/>
            <Switch>
              <Route exact path='/' component={home}/>
              <AuthRoute exact path='/login' component={login}/>
              <AuthRoute exact path='/signup' component={signup}/>
              <Route exact path="/users/:handle" component={user} />
            </Switch>
          </div>
        </Router>
      </Provider>
      </MuiThemeProvider>
    )
  }
}
