import React, {useState} from 'react';
import {useGlobalState} from "../../state/provider";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import Axios from "axios";
import {domain, header} from "../../env";
import toast from "react-hot-toast";

const Order = () => {
    const [{cart_incomplete, profile}, dispatch] = useGlobalState();
    const {register, reset, formState: {errors}, handleSubmit} = useForm();
    const navigate = useNavigate()
    let quantity = 0;

    for (let i = 0; i < cart_incomplete?.cartproduct?.length; i++) {
        quantity = quantity + (cart_incomplete?.cartproduct[i]?.quantity);
    }

    const getOrder = async (data) => {
        console.log(data?.email, " ", data?.phone, " ", data?.address)

        await Axios({
            method: "post",
            url: `${domain}/api/orders/`,
            headers: header,
            data: {
                "cartId": cart_incomplete?.id,
                "address": data?.address,
                "email": data?.email,
                "mobile": data?.phone
            }
        }).then(response => {
            dispatch({
                type: "PAGE_RELOAD",
                page_reload: response.data
            })
            dispatch({
                type: "ADD_CARTINCOMPLETE",
                cart_incomplete: null
            })
            toast.success("Your order has been placed")
            navigate('/order_history')
        })

    }

    return (
        <div className="my-container">
            <h1 className="text-center text-3xl text-indigo-600 font-bold mb-2">Checkout Section</h1>
            <div className="grid gap-3 grid-cols-1 md:grid-cols-2 px-8">
                <div className="overflow-x-auto shadow-2xl border-2 border-indigo-600 rounded-xl">
                    <table className="table table-zebra">

                        <thead>
                        <tr className="bg-orange-300 text-white text-xl">
                            <th>SN</th>
                            <th>Item</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                        </tr>
                        </thead>
                        <tbody>

                        {
                            cart_incomplete?.cartproduct?.map((item, i) => (
                                <tr key={i}>
                                    <th>{i + 1}</th>
                                    <td>{item?.menu[0]?.name}</td>
                                    <td>{item?.price + " BDT"}</td>
                                    <td>{item?.quantity}</td>
                                    <td>{item?.subtotal + " BDT"}</td>
                                </tr>
                            ))
                        }
                        </tbody>
                        <tfoot>
                        <tr className="bg-gray-600 text-white text-xl">
                            <th></th>
                            <th></th>
                            <th></th>
                            <th>{quantity + " Items"}</th>
                            <th>{`Total: ${cart_incomplete?.cartproduct[0]?.cart?.total}`}</th>
                        </tr>
                        </tfoot>

                    </table>
                </div>

                <div>
                    <div className="dark:bg-gray-800 px-8 py-10 rounded-xl">

                        <form onSubmit={handleSubmit(getOrder)}>

                            <div className="form-control md:w-full">
                                <label className="label"> <span
                                    className="label-text text-white">Your Email</span></label>
                                <input type="email" defaultValue={profile?.user_email?.email}
                                       {...register("email", {
                                           required: "Please Provide Your Email",
                                       })}
                                       className="input input-bordered md:w-full" disabled/>
                                {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                            </div>

                            <div className="form-control md:w-full">
                                <label className="label"> <span
                                    className="label-text text-white">Your Address</span></label>
                                <input type="text" placeholder="Write Your Address ...."
                                       {...register("address", {
                                           required: "Please Provide Your Address",
                                       })}
                                       className="input input-bordered md:w-full"/>
                                {errors.address && <p className='text-red-600'>{errors.address?.message}</p>}
                            </div>

                            <div className="form-control md:w-full">
                                <label className="label"> <span
                                    className="label-text text-white">Your Phone</span></label>
                                <input type="text" placeholder="Enter Phone No ..." defaultValue={profile?.user_phone}
                                       {...register("phone", {
                                           required: "Please Provide Phone Number",
                                       })}
                                       className="input input-bordered md:w-full"/>
                                {errors.phone && <p className='text-red-600'>{errors.phone?.message}</p>}
                            </div>

                            <input onClick={() => reset({
                                email: profile?.user_email?.email,
                                phone: profile?.user_phone,

                            })} className='btn btn-accent w-full mt-4 ' value="Checkout" type="submit"/>

                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;
