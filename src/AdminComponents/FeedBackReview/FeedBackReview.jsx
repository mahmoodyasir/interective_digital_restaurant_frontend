import React, {useEffect, useState} from 'react';
import {admin_header, domain} from "../../env";
import {Link} from "react-router-dom";
import {useGlobalState} from "../../state/provider";
import Axios from "axios";

const FeedBackReview = () => {

    const [{admin_profile, page_reload}, dispatch] = useGlobalState();
    const [reviewData, setReviewData] = useState(null);

    useEffect(() => {
        const getReviewData = async () => {
            await Axios({
                method: "get",
                url: `${domain}/api/all_review/`
            }).then(response => {
                setReviewData(response.data)

            })
        }
        getReviewData();
    }, [page_reload]);

    const timeConvert = (time) => {
        const timeString = time;
        const formattedTime = new Date(`1970-01-01T${timeString}`).toLocaleTimeString();
        return formattedTime;
    }

    const dateConvert = (date) => {
        const dateString = date;
        const options = {year: 'numeric', month: 'long', day: 'numeric'};
        const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
        return formattedDate;
    }

    const deleteReview = async (id) => {
        await Axios({
            method: "delete",
            url: `${domain}/api/delete_review_admin/${id}/`,
            headers: admin_header
        }).then(response => {
            dispatch({
                type: "PAGE_RELOAD",
                page_reload: response.data
            })
        })
    }

    return (
        <div>
            <div>

                <div className="rounded-xl bg-gray-700">
                    <div className="overflow-x-auto overflow-y-auto">
                        <table className="table text-white">

                            <thead className="text-xl text-white">
                            <tr>
                                <th>SN</th>
                                <th>Image</th>
                                <th>Email</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Comment</th>
                                <th>Rating</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody className="">

                            {
                                reviewData !== null &&
                                reviewData?.map((item, i) => (
                                    <tr key={i}>
                                        <th>{i + 1}</th>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={`${domain}${item?.user?.image}`}
                                                             alt="Avatar Tailwind CSS Component"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-lg font-bold">{item?.user?.prouser?.email}</td>
                                        <td className="text-lg font-bold">{dateConvert(item?.date)}</td>
                                        <td className="text-lg font-bold">{timeConvert(item?.time)}</td>
                                        <td className="text-lg font-bold border-2">{item?.comment}</td>
                                        <td className="text-lg font-bold border-2">{item?.rating}</td>
                                        <th>
                                            <button onClick={() => deleteReview(item?.id)}
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

export default FeedBackReview;
