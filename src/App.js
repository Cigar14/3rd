
import './App.css';
import { useReducer} from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { UserProvider } from './UserContext'
import { initialState, reducer } from './reducer/UserReducer'

import Home from './pages/Home'
import Products from './pages/Products'
import Register from './pages/Register'
import Login from './pages/Login'
import ErrorPage from './pages/ErrorPage'
import Logout from './pages/Logout'
import SingleProduct from './pages/SingleProduct'
import AddProduct from './pages/AddProduct'

import AppNavbar from './components/AppNavbar' 
import Footer from './components/Footer'

function App() {

  const [ state, dispatch ] = useReducer(reducer, initialState)
  console.log(state)

  return(
    <UserProvider value={{ state, dispatch }} >
      <BrowserRouter>
        <AppNavbar/>          
        <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="/products" element={ <Products/> } />
          <Route path="/products/:productId" element={ <SingleProduct/> } />
          <Route path="/register" element={ <Register/> } />
          <Route path="/login" element={ <Login/> } />
          <Route path="/logout" element={ <Logout/> } />
          <Route path="/addProduct" element={ <AddProduct /> } />
          <Route path="*" element={ <ErrorPage/> } />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </UserProvider>

  )
}

export default App;
