import React, { useState } from 'react'
import './login.css'
import axios from "axios";
import {useNavigate} from "react-router-dom"


function Login() {

    const [login, setlogin] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    const handlesubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:5000/login",login)
        .then(res =>{ 
            console.log(res.data);
            // setlogin({
            //     email: "",
            //     password: ""
            // })

            if(res.data.admin === true){
                console.log(res.data.admin)
                navigate(`/dashbord/${res.data.token}`)
            }
        
        })
        .catch(err => console.log(err.message))
        console.log("submit");
        
    }

    const onChange = (e) => {
        setlogin({ ...login, [e.target.name]: e.target.value })
    }
    console.log(login)
    return (
        <>
            <div className='container '>
                <div className='vh-100 d-flex align-items-center justify-content-center'>
                    <div className='like border p-3 shadow rounded-2'>
                        <form onSubmit={handlesubmit} >

                            <div className="login_form">
                                <div className="h3 my-3 text-center">
                                    LOGIN
                                </div>
                                <div className=" text-center">
                                    <input name='email' className=' inputs my-3 border-0 border-bottom border-2 ' value={login.email} placeholder='Email' onChange={onChange} type='email'></input><br />
                                    <input name="password" className=' inputs my-3 border-0 border-bottom border-2 'value={login.password} placeholder='Password' onChange={onChange} type='password'></input><br />
                                    <input className=' p-1 my-3 mt-4 w-50' type='submit'></input>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Login