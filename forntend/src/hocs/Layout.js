import React,{useEffect} from 'react'
import Navbar from '../components/Navbar'
import {connect} from 'react-redux'
import { checkAuthenticated } from '../actions/auth_action'
import { load_user } from '../actions/profile_action'

const Layout = ({children,checkAuthenticated,load_user}) => {
useEffect(() => {
    checkAuthenticated()
    load_user()
}, [checkAuthenticated, load_user])

    return (
        <>
        <div className='container-fluid'>
            <div className='row'>
            <Navbar/>
            {children}
            </div>
        </div>

        </>
    )
}

export default connect(null,{checkAuthenticated,load_user})(Layout)
