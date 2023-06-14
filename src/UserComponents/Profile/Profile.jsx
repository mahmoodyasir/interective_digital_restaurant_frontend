import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useGlobalState} from "../../state/provider";
import {admin_header, domain, header} from "../../env";
import Axios from "axios";
import toast from "react-hot-toast";

const Profile = () => {
    const {register, reset, formState: {errors}, handleSubmit} = useForm();
    const [{profile, admin_profile, page_reload}, dispatch] = useGlobalState();
    // const [firstname, setFirstname] = useState(profile !== null ? profile?.user_firstname : admin_profile?.admin_firstname);
    // const [lastname, setLastname] = useState(profile !== null ? profile?.user_lastname : admin_profile?.admin_lastname);
    // const [phone, setPhone] = useState(profile !== null ? profile?.user_phone : admin_profile?.admin_phone);
    // const [nid, setNid] = useState(profile !== null ? profile?.user_nid : admin_profile?.admin_nid);
    // console.log(profile)

    let header_value;
    if (profile !== null) {
        header_value = header
    } else {
        header_value = admin_header
    }

    const updateProfileImage = async (data) => {
        const image = data?.image[0];
        const formData = new FormData()
        formData.append('image', image)

        await Axios({
            method: "post",
            url: `${domain}/auth/profile_image_update/`,
            headers: header_value,
            data: formData
        }).then(response => {
            console.log(response.data)
            dispatch({
                type: "PAGE_RELOAD",
                page_reload: response.data
            })
        })
    }
    const userDataUpdate = async (data) => {
        console.log(data?.firstname, " ", data?.lastname, " ", data?.nid, " ", data?.phone)

        await Axios({
            method: "post",
            url: `${domain}/auth/userdataupdate/`,
            headers: header_value,
            data: {
                "firstname": data?.firstname,
                "lastname": data?.lastname,
                "nid": data?.nid,
                "phone": data?.phone
            }
        }).then(response => {
            dispatch({
                type: "PAGE_RELOAD",
                page_reload: response.data
            })
        })

    }

    const change_password = async (data) => {

        if (data?.newpassword.length < 6) {
            toast.error("Password must be at least 6 character")
        } else if (data?.oldpassword === data?.newpassword) {
            toast.error("Your Old Password cannot be the New Password")
        } else {
            await Axios({
                method: "post",
                url: `${domain}/auth/change_password/`,
                headers: header_value,
                data: {
                    "old_pass": data?.oldpassword,
                    "new_pass": data?.newpassword
                }
            }).then(response => {
                console.log(response.data["message"])
                if (response.data["message"] === true) {
                    toast.success("Password Changed Successfully")
                } else {
                    toast.error("Password not matched !! ")
                }
            })
        }

    }

    return (
        <div className="xl:pl-28 xl:pr-28 ml-auto mr-auto pl-10 pr-10">

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-container">
                <div
                    className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex justify-end px-4 pt-4">

                    </div>
                    <div className="flex flex-col items-center pb-10">
                        <img className="w-24 h-24 mb-3 rounded-full shadow-lg"
                             src={`${domain}${profile !== null ? profile?.profile?.image : admin_profile?.profile_info?.image}`} alt="Bonnie image"/>
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                            {profile !== null ? profile.user_firstname + " " + profile?.user_lastname :
                                admin_profile?.admin_firstname + " " + admin_profile?.admin_lastname}
                        </h5>
                        <span className="text-gray-500 dark:text-gray-400">
                    {profile !== null ? profile.user_email?.email : admin_profile?.admin_email?.email}
                    </span>
                        <span className="text-gray-500 dark:text-gray-400">NID:
                            {profile !== null ? profile.user_nid : admin_profile?.admin_nid}
                    </span>
                        <span className="text-gray-500 dark:text-gray-400">Phone:
                            {profile !== null ? profile.user_phone : admin_profile?.admin_phone}
                    </span>

                        <div className=" mt-4 md:mt-6">

                            <form onSubmit={handleSubmit(updateProfileImage)}>
                                <div className="form-control md:w-full md:max-w-sm">
                                    <label className="label"> <span
                                        className="label-text text-white">Choose Profile Image</span></label>
                                    <input type="file"
                                           {...register("image")}
                                           className="file-input w-full max-w-xs"/>
                                    {errors.image && <p className='text-red-600'>{errors.image?.message}</p>}
                                </div>
                                <input className='btn btn-accent mt-2 btn-sm' value="Upload" type="submit"/>
                            </form>

                            <form onSubmit={handleSubmit(userDataUpdate)}>
                                <div className="form-control md:w-full md:max-w-sm mt-2">
                                    <label className="label"> <span
                                        className="label-text text-white">Firstname</span></label>
                                    <input type="text" placeholder="First Name ....."
                                           defaultValue={profile !== null ? profile?.user_firstname : admin_profile?.admin_firstname }
                                           {...register("firstname")}
                                           className="input input-sm md:w-full md:max-w-sm"/>
                                    {errors.firstname && <p className='text-red-600'>{errors.firstname?.message}</p>}
                                </div>

                                <div className="form-control md:w-full md:max-w-sm">
                                    <label className="label"> <span
                                        className="label-text text-white">Lastname</span></label>
                                    <input type="text" placeholder="Last Name ....."
                                           defaultValue={profile !== null ? profile?.user_lastname : admin_profile?.admin_lastname}
                                           {...register("lastname")}
                                           className="input input-sm md:w-full md:max-w-sm"/>
                                    {errors.lastname && <p className='text-red-600'>{errors.lastname?.message}</p>}
                                </div>

                                <div className="form-control md:w-full md:max-w-sm">
                                    <label className="label"> <span className="label-text text-white">NID</span></label>
                                    <input type="number" placeholder="NID Number ....."
                                           defaultValue={profile !== null ? profile?.user_nid : admin_profile?.admin_nid}
                                           {...register("nid")}
                                           className="input input-sm md:w-full md:max-w-sm"/>
                                    {errors.nid && <p className='text-red-600'>{errors.nid?.message}</p>}
                                </div>

                                <div className="form-control md:w-full md:max-w-sm">
                                    <label className="label"> <span
                                        className="label-text text-white">Phone</span></label>
                                    <input type="phone" placeholder="Phone Number ....."
                                           defaultValue={profile !== null ? profile?.user_phone : admin_profile?.admin_phone}
                                           {...register("phone")}
                                           className="input input-sm md:w-full md:max-w-sm"/>
                                    {errors.phone && <p className='text-red-600'>{errors.phone?.message}</p>}
                                </div>
                                <input className='btn btn-accent w-full mt-4 ' value="Update" type="submit"/>
                            </form>

                        </div>
                    </div>
                </div>


                <div className="">
                    <h1 className="text-2xl text-indigo-400 font-bold">Change Password</h1>
                    <form onSubmit={handleSubmit(change_password)}>
                        <div
                            className="card shadow bg-indigo-600 glass grid justify-items-center max-w-md pt-3 pb-6 mt-3">
                            <div className="form-control md:w-full md:max-w-sm">
                                <label className="label"> <span
                                    className="label-text">Old Password</span></label>
                                <input type="password" placeholder="Old Password ....."
                                       {...register("oldpassword")}
                                       className="input md:w-full md:max-w-sm"/>
                                {errors.oldpassword && <p className='text-red-600'>{errors.oldpassword?.message}</p>}
                            </div>

                            <div className="form-control md:w-full md:max-w-sm">
                                <label className="label"> <span
                                    className="label-text">New Password</span></label>
                                <input type="password" placeholder="New Password ....."
                                       {...register("newpassword")}
                                       className="input md:w-full md:max-w-sm"/>
                                {errors.newpassword && <p className='text-red-600'>{errors.newpassword?.message}</p>}
                            </div>
                            <input className='btn btn-accent mt-4 btn-sm md:w-full md:max-w-sm' value="Update"
                                   type="submit"/>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default Profile;
