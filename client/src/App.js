import React from 'react';
import { Provider } from 'react-redux'
import store from './store/index';

import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Home, Login, Register, MyFav, Detail, SearchResults } from './pages';
import { Navbar } from './components';
import './assets/css/style.css';

const routes = [
  {
    exact: true,
    path: '/',
    children: <Home/>
  },
  {
    path: '/login',
    children: <Login/>
  },
  {
    path: '/register',
    children: <Register/>
  },
  {
    path: '/favorites',
    children: <MyFav/>
  },
  {
    path: '/detail',
    children: <Detail/>
  },
  {
    path: '/search',
    component: SearchResults
    // children: <SearchResults/>
  },

];

const AppRouter = () => (
  <Provider store={store}>

  <Switch>
    {routes.map((route) => <Route key={route} {...route} />)}
  </Switch>
  </Provider>

);

function App() {
  return (
    <Router>
        <Navbar />
        <div>
          <AppRouter />
        </div>
    </Router>
  );
}

export default App;
