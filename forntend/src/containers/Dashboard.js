import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import { update_profile } from '../actions/profile_action'
import { delete_account } from '../actions/auth_action'

const Dashboard = ({
    update_profile,
    first_name_global,
    last_name_global,
    phone_global,
    city_global,
    delete_account
}) => {
    // const [profileUpdate,setProfileUpadte]=useState(false)
    const [formData,setFormData]=useState({
        first_name:"",
        last_name:"",
        phone:"",
        city:""
    })
    useEffect(() => {
        setFormData({
            first_name:first_name_global,
            last_name:last_name_global,
            phone:phone_global,
            city:city_global
        })
        return () => {
            
        }
    }, [city_global, first_name_global, last_name_global, phone_global])
    const {first_name,last_name,phone,city}=formData
    const onChange=e=>setFormData({...formData,[e.target.name]:e.target.value})
    const onSubmit=e=>{
        e.preventDefault()

        // const updateProfile=async () =>{
        //    await update_profile(first_name,last_name,phone,city)
        //    setProfileUpadte(!profileUpdate)
        // }
        // updateProfile()
         update_profile(first_name,last_name,phone,city)

    }
    return (
        <div className='container'>
            <h1 className='mt-3'>Welcome to your User Dashboard</h1>
            <p className='mt-3 mb-3'>Update Your User Profile below</p>
            <form onSubmit={e=>onSubmit(e)}>
                <div className='form-group'>
                    <label className='form-lebel' htmlFor='first_name'>First Name</label>
                    <input type="text" 
                    className='form-control' 
                    name='first_name' 
                    placeholder={`${first_name_global}`} 
                    onChange={e=>onChange(e)} 
                    value={first_name}
                    />
                </div>
                <div className='form-group'>
                    <label className='form-lebel' htmlFor='last_name'>Last Name</label>
                    <input type="text" 
                    className='form-control' 
                    name='last_name' 
                    placeholder={`${last_name_global}`} 
                    onChange={e=>onChange(e)} 
                    value={last_name}
                    />
                </div>
                <div className='form-group'>
                    <label className='form-lebel' htmlFor='phone'>Phone</label>
                    <input type="number" 
                    className='form-control' 
                    name='phone' 
                    placeholder={`${phone_global}`} 
                    onChange={e=>onChange(e)} 
                    value={phone}
                    />
                </div>
                <div className='form-group'>
                    <label className='form-lebel' htmlFor='first_name'>City</label>
                    <input type="text" 
                    className='form-control' 
                    name='city' 
                    placeholder={`${city_global}`} 
                    onChange={e=>onChange(e)} 
                    value={city}
                    />
                </div>
            <button className='btn btn-primary mt-3' type='submit'>Update Profile</button>
            </form>
            <p className='mt-3'>
                Click the button below to delete your user account:
            </p>
            <a className='btn btn-danger' 
            href='#!'
            onClick={delete_account}
            >Delete Account</a>
        </div>
    )
}

const mapStateToProps=state=>({
    first_name_global:state.profile.first_name,
    last_name_global:state.profile.last_name,
    phone_global:state.profile.phone,
    city_global:state.profile.city,
    
})

export default connect(mapStateToProps,{update_profile,delete_account})(Dashboard)
