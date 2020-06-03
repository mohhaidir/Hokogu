import React from "react";
import { Provider } from "react-redux";
import store from "./store/index";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  Home,
  Login,
  Register,
  MyFav,
  Detail,
  SearchResults,
  Popular,
  StepCooking,
  GroceryList
} from "./pages";
import { Navbar } from "./components";
import "./assets/css/style.css";
import ScrollToTop from './components/ScrollToTop'

const routes = [
  {
    exact: true,
    path: "/",
    children: <Home />
  },
  {
    path: "/login",
    children: <Login />
  },
  {
    path: "/register",
    children: <Register />
  },
  {
    path: "/popular",
    children: <Popular />
    // children: <SearchResults/>
  },
  {
    path: "/favorites",
    children: <MyFav />
  },
  {
    path: '/groceries',
    children: <GroceryList />
  },
  {
    path: '/step/:id',
    children: <StepCooking/>
  },
  {
    path: "/search",
    component: SearchResults
    // children: <SearchResults/>
  },
  {
    path: '/recipe/:id',
    component: Detail
  }

];

const NoMatch = ({ location }) => (
  <div>
    <h1>404 page</h1>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)

const AppRouter = () => (
  <Switch>
    {routes.map(route => (
      <Route key={route} {...route} />
    ))}
      <Route component={NoMatch} />
  </Switch>
);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop>
        <Navbar />
        <div className="underNav">
          <AppRouter />
        </div>
        </ScrollToTop>
      </Router>
    </Provider>
  );
}

export default App;
