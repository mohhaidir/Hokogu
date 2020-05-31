import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Home, Login, Register, MyFav, Detail, StepCooking } from './pages';
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
    path: '/detail/:id',
    children: <Detail/>
  },
  {
    path: '/step/:id',
    children: <StepCooking/>
  },
];

const AppRouter = () => (
  <Switch>
    {routes.map((route) => <Route key={route} {...route} />)}
  </Switch>
);

function App() {
  return (
    <Router>
        <Navbar />
        <div className='underNav'>
          <AppRouter />
        </div>
    </Router>
  );
}

export default App;
