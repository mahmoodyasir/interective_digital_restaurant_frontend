import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Axios from "axios";
import {domain} from "../../env";
import toast from "react-hot-toast";

const AdminLogin = () => {
    const {register, formState: {errors}, handleSubmit} = useForm();
    const [loginError, setLoginError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/admin';

    const adminLogin = async (data) => {
        setLoginError('')
        await Axios({
            method: "post",
            url: `${domain}/auth/admin_login/`,
            data: {
                'email': data?.email,
                'password': data?.password
            }
        }).then(response => {
            console.log(response.data['admin_token'])

            if (response.data['error'] === false) {
                window.localStorage.setItem("admin_token", response.data['admin_token'])
                if (from === '/admin') {
                    toast.success("Successfully Logged In !! ")
                    window.location.href = '/admin'
                } else {
                    toast.success("Successfully Logged In !! ")
                    navigate(from, {replace: true});
                    navigate(0);
                }
            }
            else if(response.data['error'] === true)
            {
                toast.error("You are not authorized. Try with correct Credentials.");
            }

        }).catch(_ => {
            toast.error("Your username or password is incorrect");
        })
    }

    return (
        <div className="w-3/4 md:w-3/4 lg:w-2/4  ml-auto mr-auto rounded-xl login-form">
            <div className="md:w-2/4 mx-auto">

                <div>
                    <div className="card shadow-2xl  glass bg-orange-500">
                        <div className="card-body">
                            <h1 className="text-center text-white text-xl font-bold italic">ADMIN PORTAL LOGIN</h1>

                            <form onSubmit={handleSubmit(adminLogin)}>

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

                            </form>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminLogin;
