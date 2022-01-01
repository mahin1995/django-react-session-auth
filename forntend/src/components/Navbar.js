import React, { Fragment } from 'react'
import { Link, NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../actions/auth_action'


const Navbar = ({isAuthenticated,logout}) => {
  const authLink=(
    <Fragment>
               <li className='nav-item'>
                <Link className='nav-link' to='/dashboard'>Dashboard</Link >
              </li>
                <li className='nav-item'>
                <a className='nav-link' onClick={logout} href='#!'>Logout</a>
              </li>
    </Fragment>
  )
    const guestLink=(
            <Fragment>
                <li className='nav-item'>
                <Link className='nav-link' to='/login'>Login</Link >
              </li>
                <li className='nav-item'>
                <Link className='nav-link' to='/register'>Register</Link >
              </li>
            </Fragment>
    )
    return (
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <div className='container-fluid'>
            
          <Link className='navbar-brand' to='/'>Session Auth</Link>
          <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
         
            <li className='nav-item'>
                <NavLink className={(props)=>{
                    return `nav-link ${props.isActive?"active":""}`
                }} aria-current='page' to='/'>Home</NavLink >
              </li>
        
           {isAuthenticated?authLink:guestLink}
            </ul>
      
          </div>
        </div>
      </nav>
    )
}

const mapStateToProps=state=>({
  isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps,{logout})(Navbar)
