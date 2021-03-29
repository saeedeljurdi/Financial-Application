import './App.css';
import { BrowserRouter, BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import About from './components/about/about';
import Admin from './components/admin/admin';
import Expenses from './components/expenses/expenses';
import Home from './components/home/home';
import Income from './components/income/income';
import Categories from './components/categories/categories';
import Login from './components/login/login';
import { useEffect, useState } from 'react';


function App() {

  const [token, setToken] = useState('');

  useEffect(() => {
    const checkToken = () => {
      return setToken(localStorage.getItem('token'));
     }
     checkToken();
  }, []);

  const redirectFunction = () => {
    if (token)  {
      return <Redirect to="/home" />
    } else {
      return <Redirect to="/" />
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        {redirectFunction()}
        <Route exact path="/home" component={Home} />
        <Route exact path="/" >
        <Login token={token} setToken={setToken} />
        </Route>
        <Route exact path="/income" component={Income} />
        <Route exact path="/expenses" component={Expenses} />
        <Route exact path="/categories" component={Categories} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/about" component={About} />
      </BrowserRouter>
    </div>
  );
}

export default App;
