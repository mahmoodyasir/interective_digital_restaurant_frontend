import React from 'react';
import {useGlobalState} from "../../state/provider";
import {domain, header} from "../../env";
import toast from "react-hot-toast";
import Axios from "axios";

const Cart = () => {
    const [{cart_incomplete}, dispatch] = useGlobalState();
    console.log(cart_incomplete)
    let quantity = 0;
    let cart_product_length = 0

    if (cart_incomplete !== null) {
        cart_product_length = cart_incomplete?.cartproduct?.length
    } else {
        cart_product_length = 0
    }

    for (let i = 0; i < cart_incomplete?.cartproduct?.length; i++) {
        quantity = quantity + (cart_incomplete?.cartproduct[i]?.quantity);
    }

    const increase_cart = async (id) => {
        await Axios({
            method: "post",
            url: `${domain}/api/increasecart/`,
            headers: header,
            data: {"id": id}
        }).then(response => {
            // console.log(response.data);
            dispatch({
                type: "PAGE_RELOAD",
                page_reload: response.data
            })
        })
    }

    const decrease_cart = async (id) => {
        await Axios({
            method: "post",
            url: `${domain}/api/decreasecart/`,
            headers: header,
            data: {"id": id}
        }).then(response => {
            // console.log(response.data);
            dispatch({
                type: "PAGE_RELOAD",
                page_reload: response.data
            })
        })
    }

    const delete_cart_product = async (id) => {
        await Axios({
            method: "post",
            url: `${domain}/api/deletecartproduct/`,
            headers: header,
            data: {"id": id}
        }).then(response => {
            // console.log(response.data);
            dispatch({
                type: "PAGE_RELOAD",
                page_reload: response.data
            })
        })
    }

    const deletefullcart = async (id) => {
        await Axios({
            method: "post",
            url: `${domain}/api/deletefullcart/`,
            headers: header,
            data: {"id": id}
        }).then(response => {
            dispatch({
                type: "PAGE_RELOAD",
                page_reload: response.data
            })
            dispatch({
                type: "ADD_CARTINCOMPLETE",
                cart_incomplete: null
            })
            toast.error('Your Full Cart is Deleted')
            window.location.href = '/'
        })
    }

    return (
        <div className="xl:pl-28 xl:pr-28 ml-auto mr-auto pl-5 pr-5">
            <div className="card shadow-2xl">
                {
                    cart_product_length !== 0 ?
                        <>
                            <div className="overflow-x-auto">
                                <table className="table">

                                    <thead className="text-xl">
                                    <tr>
                                        <th>SN</th>
                                        <th>Item</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Subtotal</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    {
                                        cart_incomplete?.cartproduct?.map((item, i) => (
                                            <tr key={i}>
                                                <th>{i + 1}</th>
                                                <td>
                                                    <div className="flex items-center space-x-3">
                                                        <div className="avatar">
                                                            <div className="mask mask-squircle w-12 h-12">
                                                                <img src={`${domain}${item?.menu[0]?.menuImage}`}
                                                                     alt="Avatar Tailwind CSS Component"/>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div
                                                                className="font-bold text-xl">{item?.menu[0]?.name}</div>
                                                            <div
                                                                className="text-sm opacity-50">{item?.menu[0]?.ingredients}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="text-lg font-bold">{item?.price}</td>
                                                <td className="text-lg font-bold">{item?.quantity}</td>
                                                <td className="text-lg font-bold">{item?.subtotal}</td>
                                                <th>
                                                    <div className="join">
                                                        <button onClick={() => decrease_cart(item?.id)}
                                                            className="btn join-item text-2xl btn-outline btn-info">-
                                                        </button>
                                                        <button onClick={() => delete_cart_product(item?.id)}
                                                            className="btn join-item text-xl btn-outline btn-error">X
                                                        </button>
                                                        <button onClick={() => increase_cart(item?.id)}
                                                            className="btn join-item text-2xl btn-outline btn-success">+
                                                        </button>
                                                    </div>
                                                </th>
                                            </tr>
                                        ))
                                    }

                                    </tbody>

                                    <tfoot>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th className="text-xl"><p>{quantity + ' Items'}</p></th>
                                        <th className="text-xl"><p>Total: {' ' + cart_incomplete?.total + ' taka'}</p>
                                        </th>
                                        <th></th>
                                    </tr>
                                    </tfoot>

                                </table>
                            </div>
                        </>
                        :
                        <>
                            <h1 className="text-3xl text-center text-indigo-500">There is no product in Cart</h1>
                        </>
                }
            </div>
        </div>
    );
};

export default Cart;
