import React, {useEffect, useState} from 'react';
import Axios from "axios";
import {domain, header} from "../../env";
import defaultImage from '../../assets/food.png'
import {useGlobalState} from "../../state/provider";
import {BsStar, BsStarFill, BsStarHalf} from "react-icons/bs";
import {Link} from "react-router-dom";
import toast from "react-hot-toast";
import Footer from "../../CommonComponents/Footer";

const FeedBack = () => {

    const [{profile, page_reload}, dispatch] = useGlobalState();
    const [reviewData, setReviewData] = useState(null);
    const [myRatings, setMyRatings] = useState(null);
    const [myComment, setMyComment] = useState(null);


    useEffect(() => {
        const getReview = async () => {
            await Axios({
                method: "get",
                url: `${domain}/api/all_review/`,
            }).then(response => {
                setReviewData(response.data)
            })
        }
        getReview();
    }, [page_reload]);

    const ratingValue = (rate) => {
        setMyRatings(rate)
    }

    const setReview = async () => {
        if (myRatings === null || myComment === null || myComment === "") {
            toast.error("Provide Both Feedback and Ratings")
        } else {
            await Axios({
                method: "post",
                url: `${domain}/api/review/`,
                headers: header,
                data: {
                    "comment": myComment,
                    "rating": myRatings
                }
            }).then(response => {
                if (response.data.error === false) {
                    dispatch({
                        type: "PAGE_RELOAD",
                        page_reload: response.data
                    })
                    toast.success(response.data.message)
                } else {
                    toast.error("Something Went Wrong. Try again later.")
                }
            })
        }
    }

    const dateConvert = (date) => {
        const dateString = date;
        const options = {year: 'numeric', month: 'long', day: 'numeric'};
        const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
        return formattedDate;
    }

    const deleteOwnRating = async (id) => {
        await Axios({
            method: "delete",
            url: `${domain}/api/review/${id}/`,
            headers: header
        }).then(response => {
            dispatch({
                type: "PAGE_RELOAD",
                page_reload: response.data
            })

            if (response.data?.error === false) toast.success(response.data?.message)
            else if (response.data?.error === false) toast.error(response.data?.message)

        })
    }



    return (
        <div className="my-container mb-8">
            <div>

                <div>

                    {
                        profile !== null ?
                            <>
                                <div className="form-control md:w-full ">
                                    <label className="label"> <span
                                        className="label-text text-2xl">Provide Your Feedback</span></label>
                                    <input type="text" onChange={(e) => setMyComment(e.target.value)}
                                           placeholder="What's on your mind ......."

                                           className="input input-bordered input-accent md:w-full "/>
                                </div>

                                <div className="mt-4">
                                    <label className="label"> <span
                                        className="label-text text-2xl">Provide Ratings</span></label>
                                    <div className="flex justify-start">
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
                                        {
                                            myRatings !== null &&
                                            <div className="ml-8 bg-purple-600 rounded px-2 text-white text-lg">
                                                <span>{myRatings + " stars"}</span>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <button className="btn btn-success btn-outline mt-4" onClick={setReview}>Comment</button>
                            </>
                            :
                            <>
                                <div className="ml-8">
                                    <h1 className="text-2xl">You Need to <span><Link to="/login" className="link text-blue-600">Login</Link></span> to give
                                        a feedback.</h1>
                                </div>
                            </>
                    }

                </div>


                <div className="mt-8">
                    {
                        reviewData !== null &&
                        reviewData.map((item, i) => (
                            <>
                                <div className="chat chat-start mb-5" key={i}>
                                    <div className="chat-image avatar">
                                        <div className="w-10 rounded-full">
                                            <img
                                                src={item?.customer?.image !== null ? `${domain}${item?.customer?.image}` : `${defaultImage}`}/>
                                        </div>
                                    </div>
                                    <div className="chat-header flex">
                                        {item?.user?.prouser?.email}
                                        <time className="text-xs opacity-50 pl-2">{dateConvert(item?.date)}</time>
                                        <time className=" pl-2">


                                            <div className="flex text-blue-700">
                                                {
                                                    [...new Array(item?.rating)].map((item, i) => (
                                                        <BsStarFill key={i}/>
                                                    ))
                                                }

                                                {
                                                    [...new Array(item?.remain_star)].map((item, i) => (
                                                        <BsStar key={i}/>
                                                    ))
                                                }
                                            </div>

                                        </time>
                                    </div>
                                    <div className="chat-bubble">{item?.comment}</div>

                                    {
                                        profile?.profile?.id === item?.user?.id &&
                                        <>
                                            <div className="chat-footer px-1 mt-1">
                                                <span className=" flex gap-2">
                                                    <span className="bg-blue-600 text-white rounded px-1">Your Comment</span>
                                                    <span className="px-1">
                                                        <button onClick={() => deleteOwnRating(item?.id)} className="btn btn-xs btn-error">Delete</button>
                                                    </span>
                                                </span>
                                            </div>


                                        </>
                                    }


                                </div>
                            </>
                        ))
                    }
                </div>

            </div>
        </div>
    );
};

export default FeedBack;
