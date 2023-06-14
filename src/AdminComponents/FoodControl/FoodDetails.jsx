import React from 'react';
import {Link, useLoaderData} from "react-router-dom";
import {BsStar, BsStarFill, BsStarHalf} from "react-icons/bs";

const FoodDetails = () => {
    const itemdata = useLoaderData();

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

    return (
        <div>
            <div className="grid justify-items-center gap-2 grid-cols-1 ">


                <div className="grid justify-items-center mx-3">
                    <div>
                    <div className="grid justify-items-center">
                        <img className="mask mask-squircle w-3/4" src={itemdata?.menuImage} alt=""/>
                    </div>

                </div>
                    <div className="card bg-violet-500 glass shadow-xl lg:w-2/4 mt-4">
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

            </div>
        </div>
    );
};

export default FoodDetails;
