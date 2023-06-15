import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useGlobalState} from "../state/provider";
import {BsStarFill, BsStarHalf, BsStar} from "react-icons/bs";
import Axios from "axios";
import {domain, header} from "../env";


const SingleMenuCard = ({item}) => {
    const [{profile, cart_incomplete, only_product, page_reload}, dispatch] = useGlobalState();
    const [ifadded, setIfadded] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [cartId, setCartId] = useState(null);
    const navigate = useNavigate();

    const totalStars = 5;
    const rating = item?.ratings

    let rem = totalStars - rating
    let newfull = Math.floor(rating)
    let newempty = Math.floor(rem)
    let newhalf = Math.ceil(rem - newempty)

    const stardata = [
        {"fullstar": newfull},
        {"halfstar": newhalf},
        {"emtystar": newempty}
    ]

    let cart_product_length = 0
    if (cart_incomplete !== null) {
        cart_product_length = cart_incomplete?.cartproduct?.length
    } else {
        cart_product_length = 0
    }

    useEffect(() => {
        const CheckCartData = async () => {
            if (cart_incomplete !== null) {
                await Axios({
                    method: "post",
                    url: `${domain}/api/checkproduct/`,
                    headers: header,
                    data: {"cartId": cart_incomplete?.id, "menuId": item?.id}
                }).then(response => {
                    setIfadded(response.data["status"])
                    setQuantity(response.data["cartdata"]?.[0]?.quantity)
                    setCartId(response.data["cartdata"]?.[0]?.id)
                    // console.log(response.data["cartdata"]?.[0]?.product?.[0]?.id)
                    dispatch({
                        type: "PAGE_RELOAD",
                        page_reload: response.data["status"]
                    })
                })
            }
        }
        CheckCartData();
    }, [cart_product_length, quantity]);

    const addtocart = async (id) => {
        profile !== null ? (
                await Axios({
                    method: "post",
                    url: `${domain}/api/addtocart/`,
                    data: {"id": id},
                    headers: header
                }).then(response => {
                    dispatch({
                        type: "PAGE_RELOAD",
                        page_reload: response.data
                    })
                })
            ) :
            (
                navigate('/login')
            )
    }

    const increase_cart = async (id) => {
        await Axios({
            method: "post",
            url: `${domain}/api/increasecart/`,
            headers: header,
            data: {"id": id}
        }).then(response => {
            // console.log(response.data);
            setQuantity(quantity + 1)
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
            setQuantity(quantity - 1)
            dispatch({
                type: "PAGE_RELOAD",
                page_reload: response.data
            })
        })
    }


    return (
        <div className="card shadow-2xl glass">
            <div className="card-body bg-orange-500 glass rounded-t-xl">
                <h2 className="text-center text-xl font-bold" style={{fontFamily: "Rockwell"}}>{item?.name}</h2>
                <div className="flex-col md:flex text-center">
                    <p className="font-bold">Category: <span
                        className="badge badge-primary">{item?.category?.title}</span></p>
                </div>
            </div>
            <figure><img className="w-full h-64" src={item?.menuImage} onError={(e) => {
                                        e.target.src = `${domain}${item?.menuImage}`
                                    }} alt="books image"/></figure>
            <div className="card-body">

                <div className="">
                    <div className="indicator">
                        <span className="indicator-item badge badge-success font-bold">Price</span>
                        <p className="text-3xl bg-violet-500 text-white p-1 rounded">{item?.price} taka</p>
                    </div>
                    <h2 className="mt-4"><span className="mt-4 text-blue-600 font-bold">
                            Ingredients: </span>
                        <span
                            className="bg-indigo-100 text-white text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-500 dark:text-white ">{item?.ingredients} </span>
                    </h2>
                </div>

                <div className="divider"></div>

                <div className="flex justify-between text-center my-2">
                    <div>
                        <p className="font-bold">Ratings Score: <span
                            className="badge badge-primary badge-outline">Good</span></p>
                    </div>
                </div>

                <div className="flex justify-start">
                    {
                        [...new Array(stardata[0]?.fullstar)].map((item, i) => (
                            <BsStarFill key={i} className="text-yellow-400 font-bold text-2xl"/>
                        ))
                    }
                    {
                        [...new Array(stardata[1]?.halfstar)].map((item, i) => (
                            <BsStarHalf key={i} className="text-yellow-400 font-bold text-2xl"/>
                        ))
                    }
                    {
                        [...new Array(stardata[2]?.emtystar)].map((item, i) => (
                            <BsStar key={i} className="text-yellow-400 font-bold text-2xl"/>
                        ))
                    }
                </div>


                <div className="">
                    <p className="text-start">{item?.description?.slice(0, 100) + " ..... "}<Link
                        to={`/details/${item?.id}`}
                        className="btn btn-xs btn-outline btn-info">See
                        Details </Link></p>

                </div>

                {
                    ifadded === true ?
                        <>
                            <div className="">
                                <div className="join w-full">
                                    <button onClick={() => decrease_cart(cartId)}
                                            className="btn btn-error join-item w-2/5 text-3xl">-
                                    </button>
                                    <button style={{backgroundColor: "white", color: "black"}}
                                            className="btn btn-ghost join-item w-1/5 text-xl font-bold"
                                            disabled={true}>{quantity}</button>
                                    <button onClick={() => increase_cart(cartId)}
                                            className="btn btn-success join-item w-2/5 text-3xl">+
                                    </button>
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <div>
                                <Link onClick={() => addtocart(item?.id)} to="#"
                                      className="btn btn-outline btn-success w-full">Add to Cart</Link>
                            </div>
                        </>
                }

            </div>
        </div>
    );
};

export default SingleMenuCard;
