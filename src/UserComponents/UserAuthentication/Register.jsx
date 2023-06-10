import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import Axios from "axios";
import {domain} from "../../env";

const Register = () => {
    const {register, formState: {errors}, handleSubmit} = useForm();
    const [registerError, setRegisterError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (data) => {
        setRegisterError('');
        if(data?.password1 !== data?.password2)
        {
            toast.error("Password Not Matched");
        }
        else
        {
            await Axios({
                method: "post",
                url: `${domain}/auth/register/`,
                data: {
                    "email": data?.email,
                    "password": data?.password1
                }
            }).then(response => {
                if(response.data["error"] === false)
                {
                    toast.success("User is Created. Please Login Now.");
                    navigate('/login');

                }
            })
        }
    }

    return (
        <div>
            <div className="md:w-2/4  ml-auto mr-auto rounded-xl login-form">
            <div className="md:w-3/4 mx-auto">

                <div>
                    <div className="card shadow-2xl glass bg-success">
                        <div className="card-body">

                            <form onSubmit={handleSubmit(handleRegister)}>

                                <div className="form-control md:w-full">
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
                                           {...register("password1", {
                                               required: "Please Provide Valid Password",
                                               minLength: {value: 6, message: 'Password must be 6 characters or longer'}
                                           })}
                                           className="input md:w-full "/>
                                    {errors.password1 && <p className='text-red-600'>{errors.password1?.message}</p>}
                                </div>

                                <div className="form-control md:w-full ">
                                    <label className="label"> <span className="label-text">Confirm Password</span></label>
                                    <input type="password" placeholder="Confirm Password ....."
                                           {...register("password2", {
                                               required: "Please Provide Valid Password",
                                               minLength: {value: 6, message: 'Password must be 6 characters or longer'}
                                           })}
                                           className="input md:w-full "/>
                                    {errors.password2 && <p className='text-red-600'>{errors.password2?.message}</p>}
                                </div>

                                <input className='btn btn-primary w-full mt-8' value="Register" type="submit"/>

                                <div className="mt-4">
                                    {registerError && <p className='text-red-600'>{registerError}</p>}
                                </div>

                                <p>Have account ? <Link className="link link-primary" to="/login">Login</Link></p>

                            </form>

                        </div>
                    </div>
                </div>

            </div>
        </div>
        </div>
    );
};

export default Register;
