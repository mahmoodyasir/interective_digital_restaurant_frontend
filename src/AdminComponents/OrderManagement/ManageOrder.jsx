import React, {useState} from 'react';
import {admin_header, domain} from "../../env";
import {Link} from "react-router-dom";
import {useGlobalState} from "../../state/provider";
import toast from "react-hot-toast";
import Axios from "axios";

const ManageOrder = () => {
    const [{page_reload, all_orders, all_status}, dispatch] = useGlobalState();
    const [pay_id, setPay_id] = useState(null);
    const [status_id, setStatus_id] = useState(null);

    const UpdateStatus = async (indicator, id) => {

        if (indicator === 'p') {
            if (pay_id === null || pay_id === '0') {
                toast.error('Choose an Option First')
            } else {
                await Axios({
                    method: "put",
                    url: `${domain}/api/allorders/${id}/`,
                    headers: admin_header,
                    data: {
                        "indicator": indicator,
                        "pay_id": pay_id
                    }
                }).then(response => {
                    dispatch({
                        type: "PAGE_RELOAD",
                        page_reload: response.data
                    })
                    toast.success("Payment Status Updated")
                })
            }
        } else if (indicator === 'o') {
            if (status_id === null || status_id === '0') {
                toast.error('Choose an Option First')
            } else {
                await Axios({
                    method: "put",
                    url: `${domain}/api/allorders/${id}/`,
                    headers: admin_header,
                    data: {
                        "indicator": indicator,
                        "status_id": status_id
                    }
                }).then(response => {
                    dispatch({
                        type: "PAGE_RELOAD",
                        page_reload: response.data
                    })
                    toast.success("Order Status Updated")
                })
            }
        }

    }

    return (
        <div>
            <div className="grid justify-items-center">
                <h1 className="bg-purple-500 text-white text-4xl rounded px-2 py-1 mb-4">Order Management</h1>
            </div>
            <div className="card bg-gray-700 ">
                <div className="overflow-x-auto overflow-y-auto">
                    <table className="table text-white">

                        <thead className="text-xl text-white bg-indigo-600 rounded-t-xl">
                        <tr>
                            <th>SN</th>
                            <th>Order ID</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Date</th>
                            <th>Payment Status</th>
                            <th>Order Status</th>
                        </tr>
                        </thead>
                        <tbody>

                        {
                            all_orders !== null &&
                            all_orders?.map((item, i) => (
                                <tr key={i}>
                                    <th>{i + 1}</th>
                                    <td className="text-lg font-bold">{item?.id}</td>
                                    <td className="text-lg font-bold">{item?.email}</td>
                                    <td className="text-lg font-bold">{item?.mobile}</td>
                                    <td className="text-lg font-bold">{item?.date}</td>
                                    <td className="text-lg font-bold border-2">
                                        <div className="grid gap-1 grid-cols-1">
                                            {item?.payment_complete !== true ? "Unpaid" : "Paid"}
                                            <div className="grid gap-1 grid-cols-1">
                                                <select onChange={(e) => setPay_id(e.target.value)}
                                                        className="select text-black">
                                                    <option value={0} selected>Select</option>
                                                    <option value={1}>Paid</option>
                                                    <option value={2}>Unpaid</option>
                                                </select>
                                                <button onClick={() => UpdateStatus('p', item?.id)}
                                                        className="btn btn-success">Update
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-lg font-bold">
                                        <div className="grid gap-1 grid-cols-1">
                                            {item?.order_status?.choice}
                                            <div className="grid gap-1 grid-cols-1 text-black">
                                                <select onChange={(e) => setStatus_id(e.target.value)}
                                                        className="select text-black">
                                                    <option value={0} selected>Select</option>
                                                    {
                                                        all_status?.map(item => <option
                                                            key={item?.id}
                                                            value={item?.id}
                                                        >{item?.choice}</option>)
                                                    }
                                                </select>
                                                <button onClick={() => UpdateStatus('o', item?.id)}
                                                        className="btn btn-success">Update
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }

                        </tbody>


                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageOrder;
