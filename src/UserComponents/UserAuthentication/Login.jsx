import React, {useContext, useState} from 'react';
import {useForm} from 'react-hook-form'
import {Link, useLocation, useNavigate} from "react-router-dom";
import {stateContext, useGlobalState} from "../../state/provider";
import Axios from "axios";
import {domain, header} from "../../env";
import toast from "react-hot-toast";

const Login = () => {
    const {isLoggedIn, setIsLoggedIn} = useContext(stateContext);
    const {register, formState: {errors}, handleSubmit} = useForm()
    const [{profile, page_reload}, dispatch] = useGlobalState();
    const [loginError, setLoginError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';
    console.log(from)


    const handleLogin = async (data) => {
        setLoginError('')
        await Axios({
            method: "post",
            url: `${domain}/auth/login/`,
            data: {
                'email': data?.email,
                'password': data?.password
            }
        }).then(response => {
            console.log(response.data['token'])
            window.localStorage.setItem("token", response.data['token'])
            setIsLoggedIn(true)
            if(from === '/')
            {
                toast.success("Successfully Logged In !! ")
                window.location.href = '/'
            }
            else
            {
                toast.success("Successfully Logged In !! ")
                navigate(from, {replace: true});
                navigate(0);
            }
        }).catch(_ => {
            toast.error("Your username or password is incorrect !! Try Again ....");
        })

    }

    return (
        <div className="md:w-2/4  ml-auto mr-auto rounded-xl login-form">
            <div className="md:w-2/4 mx-auto">

                <div>
                    <div className="card shadow-2xl  glass bg-violet-600">
                        <div className="card-body">

                            <form onSubmit={handleSubmit(handleLogin)}>

                                <div className="form-control md:w-full ">
                                    <label className="label"> <span className="label-text">Email</span></label>
                                    <input type="text" placeholder="Type Email ....."
                                           {...register("email", {
                                               required: "Please Provide Email Address"
                                           })}
                                           className="input md:w-full "/>
                                    {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                                </div>

                                <div className="form-control md:w-full ">
                                    <label className="label"> <span className="label-text">Password</span></label>
                                    <input type="password" placeholder="Type Password ....."
                                           {...register("password", {
                                               required: "Please Provide Valid Password",
                                               minLength: {value: 6, message: 'Password must be 6 characters or longer'}
                                           })}
                                           className="input md:w-full "/>
                                    {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                                </div>

                                <input className='btn btn-accent w-full mt-8' value="Login" type="submit"/>

                                <div className="mt-4">
                                    <p className='text-red-600'>{loginError}</p>
                                </div>

                                <p>No account ? <Link className="link link-primary " to="/register">Register</Link></p>

                            </form>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;
