import React, {useState} from 'react';
import {admin_header, domain} from "../../env";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useGlobalState} from "../../state/provider";
import toast from "react-hot-toast";
import Axios from "axios";

const CreateAdmin = () => {
    const {register, reset, formState: {errors}, handleSubmit} = useForm();
    const [{all_admin}, dispatch] = useGlobalState();
    const [number, setNumber] = useState(all_admin?.length);
    console.log(all_admin, number)

    const registerAdmin = async (data) => {
        if (data?.password1 !== data?.password2) {
            toast.error("Password Doesn't Match")
        } else {
            await Axios({
                method: "post",
                url: `${domain}/auth/admin_register/`,
                headers: admin_header,
                data: {
                    "email": data?.email,
                    "password": data?.password1
                }
            }).then(response => {
                console.log(response.data)
                dispatch({
                    type: "PAGE_RELOAD",
                    page_reload: response.data
                })
                if (response.data?.error === true)
                {
                    toast.error("Try To Provide Correct Email")
                }
                else
                {
                    toast.success("New Admin User Added")
                }
            })
        }
    }

    const deleteAdmin = async (id) => {
        if(number <= 1)
        {
            toast.error("You CANNOT DELETE THE LAST ADMIN !!")
        }
        else
        {
            await Axios({
                method: "post",
                url: `${domain}/auth/admin_delete/${id}/`,
                headers: admin_header
            }).then(response =>{
                dispatch({
                    type: "PAGE_RELOAD",
                    page_reload: response.data
                })
                if(response.data.error === true)
                {
                    toast.error(response.data.message)
                }
                else if(response.data.error === false)
                {
                    toast.success(response.data.message)
                }
            })
        }
    }

    return (
        <div className="my-container">
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 ">

                <div>
                    <h1 className="text-3xl text-center text-white mb-4"><span
                        className="bg-indigo-500 px-7 py-1 rounded">Add Admin User</span></h1>
                    <div className="dark:bg-indigo-950 glass px-8 py-10 rounded-xl">

                        <form onSubmit={handleSubmit(registerAdmin)}>

                            <div className="form-control md:w-full">
                                <label className="label"> <span
                                    className="label-text text-white">Admin Email</span></label>
                                <input type="email"
                                       placeholder="Write New Admin Email ...."
                                       {...register("email", {
                                           required: "Please Provide New Admin Email",
                                       })}
                                       className="input input-bordered md:w-full"/>
                                {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                            </div>

                            <div className="form-control md:w-full">
                                <label className="label"> <span
                                    className="label-text text-white">Password</span></label>
                                <input type="password"
                                       placeholder="Input Password ...."
                                       {...register("password1", {
                                           required: "Please Provide Password",
                                       })}
                                       className="input input-bordered md:w-full"/>
                                {errors.password1 && <p className='text-red-600'>{errors.password1?.message}</p>}
                            </div>

                            <div className="form-control md:w-full">
                                <label className="label"> <span
                                    className="label-text text-white">Confirm Password</span></label>
                                <input type="password"
                                       placeholder="Confirm Password ...."
                                       {...register("password2", {
                                           required: "Please Confirm Password",
                                       })}
                                       className="input input-bordered md:w-full"/>
                                {errors.password2 && <p className='text-red-600'>{errors.password2?.message}</p>}
                            </div>


                            <input className='btn btn-info w-full mt-4 hover:text-white hover:bg-green-500'
                                   value="Register" type="submit"/>


                        </form>

                    </div>
                </div>
                <div className="card bg-gray-700 ">
                    <div className="overflow-x-auto overflow-y-auto">
                        <table className="table text-white">

                            <thead className="text-xl text-white">
                            <tr>
                                <th>SN</th>
                                <th>Image</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>

                            {
                                all_admin !== null &&
                                all_admin?.map((item, i) => (
                                    <tr key={i}>
                                        <th>{i + 1}</th>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={`${domain}${item?.image}`}
                                                             alt="Avatar Tailwind CSS Component"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-lg font-bold">{item?.prouser?.email}</td>
                                        <th>
                                            <button onClick={() => deleteAdmin(item?.id)}
                                                className="btn btn-error join-item hover:text-white hover:bg-red-500">Delete
                                            </button>
                                        </th>
                                    </tr>
                                ))
                            }

                            </tbody>


                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CreateAdmin;
