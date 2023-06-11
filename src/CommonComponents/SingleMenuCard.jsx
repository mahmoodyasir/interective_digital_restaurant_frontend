import React from 'react';
import {GoLocation} from "react-icons/go";
import {Link} from "react-router-dom";
import {useGlobalState} from "../state/provider";
import {BsStarFill, BsStarHalf, BsStar} from "react-icons/bs";


const SingleMenuCard = ({item}) => {
    const [{profile}] = useGlobalState();
    return (
        <div className="card shadow-2xl glass">
            <div className="card-body bg-orange-500 glass rounded-t-xl">
                <h2 className="text-center text-xl font-bold" style={{fontFamily: "Rockwell"}}>{item?.name}</h2>
                <div className="flex-col md:flex text-center">
                    <p className="font-bold">Category: <span className="badge badge-primary">{item?.category?.title}</span></p>
                </div>
            </div>
            <figure><img className="w-full h-64" src={item?.menuImage} alt="books image"/></figure>
            <div className="card-body">

                <div className="">
                    <div className="indicator">
                        <span className="indicator-item badge badge-success font-bold">Price</span>
                        <p className="text-3xl bg-violet-500 text-white p-1 rounded">{item?.price} taka</p>
                    </div>
                    <h2 className="mt-4"><span className="mt-4 text-blue-600 font-bold">
                            Ingredients: </span>
                        <span className="bg-indigo-100 text-white text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-500 dark:text-white ">{item?.ingredients} </span>
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
                    <BsStarFill className="text-yellow-400 font-bold text-2xl"/>
                    <BsStarFill className="text-yellow-400 font-bold text-2xl"/>
                    <BsStarFill className="text-yellow-400 font-bold text-2xl"/>
                    <BsStarFill className="text-yellow-400 font-bold text-2xl"/>
                    <BsStarHalf className="text-yellow-400 font-bold text-2xl"/>
                </div>


                <div className="">
                    <p className="text-start">{item?.description?.slice(0, 100) + " ..... "}<Link to="#" className="btn btn-xs btn-outline btn-info">See Details </Link></p>

                </div>

                {
                    profile ?
                        <>
                            <div className="">
                                <label htmlFor="order-modal"
                                       className="btn btn-outline btn-success w-full">Add to Cart</label>
                            </div>
                        </>
                        :
                        <>
                            <div>
                                <Link to="/login" className="btn btn-outline btn-success w-full">Add to Cart</Link>
                            </div>
                        </>
                }

            </div>
        </div>
    );
};

export default SingleMenuCard;
