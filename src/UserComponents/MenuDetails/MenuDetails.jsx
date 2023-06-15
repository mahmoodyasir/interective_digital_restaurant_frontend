import React, {useEffect, useState} from 'react';
import {Link, useLoaderData, useNavigate, useParams} from "react-router-dom";
import {BsStarFill, BsStarHalf, BsStar} from "react-icons/bs";
import {domain, header, userToken} from "../../env";
import {useGlobalState} from "../../state/provider";
import Axios from "axios";

const MenuDetails = () => {
    const [{profile, cart_incomplete, page_reload}, dispatch] = useGlobalState();
    const itemdata = useLoaderData();
    const [ifadded, setIfadded] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [cartId, setCartId] = useState(null);
    const [myRating, setMyRating] = useState(null);
    const [render, setRender] = useState(null);
    const navigate = useNavigate();

    if (render !== null) {
        setRender(null)
        navigate(`/details/${itemdata?.id}`)
    }

    let starRemain = 0;
    if (myRating !== null && myRating !== undefined) {
        starRemain = 5 - myRating
    }
    console.log(myRating, starRemain)
    const totalStars = 5;
    const rating = itemdata?.ratings

    let rem = totalStars - rating
    let newfull = Math.floor(rating)
    let newempty = Math.floor(rem)
    let newhalf = Math.ceil(rem - newempty)

    const stardata = [
        {"fullstar": newfull},
        {"halfstar": newhalf},
        {"emtystar": newempty}
    ]

    // console.log(itemdata)

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
                    data: {"cartId": cart_incomplete?.id, "menuId": itemdata?.id}
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

    useEffect(() => {
        // On start of this component
        // It is checked that if this user has already rated this item
        if (userToken !== null) {
            const getUserRating = async () => {
                await Axios({
                    method: "post",
                    url: `${domain}/api/ownrating/`,
                    data: {"menuId": itemdata?.id},
                    headers: header
                }).then(response => {
                    // console.log(response.data[0]?.ratingScore)
                    if (response.data[0]?.ratingScore !== null) {
                        setMyRating(response.data[0]?.ratingScore)
                    }
                })
            }
            getUserRating()
        }
    }, [myRating]);


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

    const ratingValue = async (ratings) => {
        // Providing rating data
        console.log(itemdata?.id, ' ', ratings)
        await Axios({
            method: "post",
            url: `${domain}/api/putrating/`,
            headers: header,
            data: {
                "rating": ratings,
                "menuId": itemdata?.id
            }
        }).then(response => {
            console.log(response.data.message.ratings)
            setMyRating(response.data.message.ratings);
            setRender(response.data.message.ratings)
        })
    }

    return (
        <div>
            <div className="grid gap-2 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                <div>
                    <div className="grid justify-items-center">
                        <img className="mask mask-squircle w-3/4" src={itemdata?.menuImage} alt=""/>
                    </div>
                    <div className="mt-4">
                        {
                            ifadded === true ?
                                // It shows when a particular item is viewed
                                // and, if the user add it to cart or previously added
                                // it will show button with increment and decrement
                                <>
                                    <div className="grid justify-items-center">
                                        <div className="join w-2/4 ">
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
                                // When item is not in the cart
                                // It will show as plain add to cart button
                                // Pressing it will activate previous logic
                                <>
                                    <div className="grid justify-items-center">
                                        <Link onClick={() => addtocart(itemdata?.id)} to="#"
                                              className="btn btn-outline btn-success w-2/4">Add to Cart</Link>
                                    </div>
                                </>
                        }


                    </div>
                </div>

                <div className="grid justify-items-center mx-3">
                    <div className="card bg-violet-500 glass shadow-xl w-full">
                        <div className="card-body">
                            <h2 className="card-title bg-white p-2 rounded">{itemdata?.name}</h2>
                            <p><span className="bg-white p-1 rounded">Ingredients: </span>
                                <span className="text-white font-bold whitespace-nowrap">{itemdata?.ingredients}</span>
                            </p>
                            <p><span className="bg-white p-1 rounded">Category:</span> <span
                                className="text-white font-bold">{itemdata?.category?.title}</span></p>
                            <p><span className="bg-white p-1 rounded">Price:</span> <span
                                className="text-white font-bold">{itemdata?.price + " " + "taka"}</span></p>
                            <div className="flex"><span className="bg-white p-1 rounded">Ratings:</span>

                                {/*Here, overall mean value of ratings for a certain item will be shown as star*/}
                                {/*Three types of star -> full, half full, blank*/}
                                <p className="flex text-2xl px-2 text-yellow-400">
                                    {
                                        [...new Array(stardata[0]?.fullstar)].map((item, i) => (
                                            <BsStarFill key={i}/>
                                        ))
                                    }
                                    {
                                        [...new Array(stardata[1]?.halfstar)].map((item, i) => (
                                            <BsStarHalf key={i}/>
                                        ))
                                    }
                                    {
                                        [...new Array(stardata[2]?.emtystar)].map((item, i) => (
                                            <BsStar key={i}/>
                                        ))
                                    }
                                </p>
                            </div>
                            <div className="text-white bg-gray-800 p-2 rounded-xl">
                                <h2 className="bg-violet-500 text-center rounded">Description</h2>
                                <p>{itemdata?.description}</p>
                            </div>
                            <div className="card-actions justify-end">

                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid justify-items-center">
                    {
                        profile !== null ?
                            <>
                                <div>
                                    <h1 className="text-4xl text-violet-400 font-bold mb-4">Ratings</h1>
                                    {
                                        myRating !== null && myRating !== undefined ?
                                            // When User Allready gave ratings to this product
                                            // So, here star according to his rating will show
                                            <>
                                                <div>
                                                    <div className="grid justify-items-center card bg-indigo-500 p-2">
                                                        <h1 className="text-xl text-white">Your Ratings</h1>
                                                        <p className="flex text-3xl px-2 text-yellow-400">
                                                            {
                                                                [...new Array(myRating)].map((item, i) => (
                                                                    <BsStarFill key={i}/>
                                                                ))
                                                            }
                                                            {
                                                                [...new Array(starRemain !== null ? starRemain : 0)].map((item, i) => (
                                                                    <BsStar key={i}/>
                                                                ))
                                                            }
                                                        </p>
                                                    </div>

                                                    <div className="mt-2 card bg-indigo-500 py-2 px-3">
                                                        <h1 className="text-2xl text-white">Rate Again</h1>
                                                        <div className="flex justify-between">
                                                            <div className="tooltip tooltip-left" data-tip="1">
                                                                <Link onClick={() => ratingValue(1)} to="#"
                                                                      className="text-3xl text-gray-400 hover:text-yellow-400"><BsStarFill/></Link>
                                                            </div>
                                                            <div className="tooltip tooltip-left" data-tip="2">
                                                                <Link onClick={() => ratingValue(2)} to="#"
                                                                      className="text-3xl text-gray-400 hover:text-yellow-400"><BsStarFill/></Link>
                                                            </div>
                                                            <div className="tooltip tooltip-left" data-tip="3">
                                                                <Link onClick={() => ratingValue(3)} to="#"
                                                                      className="text-3xl text-gray-400 hover:text-yellow-400"><BsStarFill/></Link>
                                                            </div>
                                                            <div className="tooltip tooltip-left" data-tip="4">
                                                                <Link onClick={() => ratingValue(4)} to="#"
                                                                      className="text-3xl text-gray-400 hover:text-yellow-400"><BsStarFill/></Link>
                                                            </div>
                                                            <div className="tooltip tooltip-left" data-tip="5">
                                                                <Link onClick={() => ratingValue(5)} to="#"
                                                                      className="text-3xl text-gray-400 hover:text-yellow-400"><BsStarFill/></Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                            :
                                            // Here, When User didn't give rating to this item.
                                            // So, they will see blank star option to rate
                                            <>
                                                <div className="mt-2 card bg-indigo-500 py-2 px-3">
                                                    <h1 className="text-2xl text-white">Rate this Item</h1>
                                                    <div className="flex justify-between">
                                                        <div className="tooltip tooltip-left" data-tip="1">
                                                            <Link onClick={() => ratingValue(1)} to="#"
                                                                  className="text-3xl text-gray-400 hover:text-yellow-400"><BsStarFill/></Link>
                                                        </div>
                                                        <div className="tooltip tooltip-left" data-tip="2">
                                                            <Link onClick={() => ratingValue(2)} to="#"
                                                                  className="text-3xl text-gray-400 hover:text-yellow-400"><BsStarFill/></Link>
                                                        </div>
                                                        <div className="tooltip tooltip-left" data-tip="3">
                                                            <Link onClick={() => ratingValue(3)} to="#"
                                                                  className="text-3xl text-gray-400 hover:text-yellow-400"><BsStarFill/></Link>
                                                        </div>
                                                        <div className="tooltip tooltip-left" data-tip="4">
                                                            <Link onClick={() => ratingValue(4)} to="#"
                                                                  className="text-3xl text-gray-400 hover:text-yellow-400"><BsStarFill/></Link>
                                                        </div>
                                                        <div className="tooltip tooltip-left" data-tip="5">
                                                            <Link onClick={() => ratingValue(5)} to="#"
                                                                  className="text-3xl text-gray-400 hover:text-yellow-400"><BsStarFill/></Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                    }


                                </div>
                            </>
                            :
                            <>
                                <div className="grid justify-items-center p-2">
                                    <h1 className="text-3xl text-indigo-500">You Need to <span
                                        className="text-white bg-green-400 p-1 rounded hover:bg-green-700"><Link
                                        to="/login">Login</Link></span> to Provide Ratings</h1>
                                </div>
                            </>
                    }
                </div>
            </div>
        </div>
    );
};

export default MenuDetails;
