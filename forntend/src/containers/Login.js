import React,{useState} from 'react'
import {connect} from 'react-redux'
import {login} from '../actions/auth_action'
import { Navigate,Link } from "react-router-dom";
import CSRFtoken from '../components/CSRFtoken';


const Login = ({login,isAuthenticated}) => {
  
    const [formData,setFormData]=useState({
        username:"",
        password:"",
     
    })
 
    const {username,password}=formData;
    const onChange=e=>setFormData({
        ...formData,[e.target.name]:e.target.value
    })
    const onSubmit=e=>{
        e.preventDefault()


            login(username,password)
            
  
    }
    if(isAuthenticated){
       return  <Navigate to="/dashboard" />
    }
    return (
        <>

    <div className='container d-flex justify-content-center'>
        {/* <div className='row justify-content-md-center m-5'> */}
        <div className=''>
        <form onSubmit={e=>onSubmit(e)}>
<CSRFtoken />
<h1 className="h3 mb-3 fw-normal">Please sign in</h1>
<div className='form-group m-5'>
<div className='form-row'>
    <div className='col-md-12'>
    <div className="form-floating">
  <input type="username" name="username" className="form-control" id="floatingInput" placeholder="username" onChange={e=>onChange(e)} required value={username} />
  <label for="floatingInput">Username</label>
</div>
    </div>
</div>

<br/>
<div className="form-floating">
  <input type="password" name="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={e=>onChange(e)} required value={password} />
  <label for="floatingPassword">Password</label>
</div>
 
<br/>
</div>
<button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>

</form>

<p className='mt-3'>
        Don't Have an account? <Link to="/register">register</Link>
</p>
        </div>
 
    </div>
        </>
    )
}

const mapStateToProps=state=>({
    isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps,{login})(Login)
