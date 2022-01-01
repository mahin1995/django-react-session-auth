import React from "react";
import {Navigate} from 'react-router-dom'
import { connect } from "react-redux";


function PrivateRoute({ children,isAuthenticated }) {
    const auth = isAuthenticated
    return auth ? children : <Navigate to="/login" />;
  }
const mapStateToProps=state=>({
    isAuthenticated:state.auth.isAuthenticated
})
export default connect(mapStateToProps,{})(PrivateRoute)