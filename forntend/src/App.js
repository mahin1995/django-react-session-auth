import React from 'react'
import { BrowserRouter as Routers,  Routes,Route } from "react-router-dom";
import Layout from './hocs/Layout'
import Home from './containers/Home'
import Register from './containers/Register'
import Login from './containers/Login'
import Dashboard from './containers/Dashboard'
import {Provider} from 'react-redux'
import store from './store'
import PrivateRoute from './hocs/PrivateRoute';

function App() {
  return (
    <Provider store={store}>
 <Routers>
      <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={ 
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
        } />
      </Routes>
      </Layout>
    </Routers>
    </Provider>
   
  )
}

export default App
