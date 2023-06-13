import React, {useEffect, useState} from 'react';
import Axios from "axios";
import {domain, header} from "../../env";
import {Link} from "react-router-dom";

const History = () => {

    const [orders, setOrders] = useState(null);
    const [reload, setReload] = useState(null);
    const [orderdetails, setOrderdetails] = useState(null);

    console.log(orderdetails !== null && orderdetails?.cartproduct)

    useEffect(() => {
        const getorders = async () => {
            await Axios({
                method: "get",
                url: `${domain}/api/orders`,
                headers: header
            }).then(response => {
                // console.log(response.data, " $$$$$$$ OLD ORDERS")
                setOrders(response.data)
            })
        }
        getorders()
    }, [reload]);

    const getOrderDetails = async (id) => {
        await Axios({
            method: "get",
            url: `${domain}/api/orders/${id}/`,
            headers: header
        }).then(response => {
            // console.log(response.data["data"][0], " $$$$$$ Order Details Page $$$$$$$");
            setOrderdetails(response.data["data"][0])
        })
    }

    return (
        <div className="ml-auto mr-auto pl-10 pr-10">
            {
                orders?.length !== 0 ?
                    <>
                        <div className="card rounded-xl shadow-2xl shadow-violet-100">
                            <h1 className="text-center text-3xl my-2 ">Order History</h1>
                            <div className="overflow-x-auto rounded-xl">
                                <table className="table">

                                    <thead>
                                    <tr className="text-xl bg-green-700 text-white">
                                        <th>SN</th>
                                        <th>Date</th>
                                        <th>Total</th>
                                        <th>Item Amount</th>
                                        <th>Order Status</th>
                                        <th>Payment Status</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    {
                                        orders?.map((item, i) => (
                                            <tr key={i} className="text-lg">
                                                <th>{i + 1}</th>
                                                <td>{item?.date}</td>
                                                <td>{item?.total}</td>
                                                <td>{item?.cartproduct?.length}</td>
                                                <td>{item?.order_status?.choice}</td>
                                                <td>{item?.payment_complete !== false ? 'PAID' : 'NOT PAID'}</td>
                                                <td>
                                                    <button onClick={() => getOrderDetails(item?.id)}
                                                            className="btn btn-primary ">Details
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>

                                </table>
                            </div>

                            <div>
                                {
                                    orderdetails !== null &&
                                    <>
                                        <div className="grid gap-4 grid-cols-1 xl:grid-cols-2">
                                            <div className="mt-4">
                                                <>
                                                    <h1 className="text-center text-3xl my-2 ">Delivery Details</h1>
                                                    <div className="overflow-x-auto rounded-xl">
                                                        <table className="table">

                                                            <thead>
                                                            <tr className="text-xl bg-green-700 text-white">
                                                                <th>Email</th>
                                                                <th>Mobile</th>
                                                                <th>Address</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>

                                                            {
                                                                <tr className="text-lg">
                                                                    <td>{orderdetails?.email}</td>
                                                                    <td>{orderdetails?.mobile}</td>
                                                                    <td>{orderdetails?.address}</td>
                                                                </tr>
                                                            }
                                                            </tbody>

                                                        </table>
                                                    </div>
                                                </>
                                            </div>


                                            <div className="mt-4">
                                                <h1 className="text-center text-3xl my-2 ">Item Details
                                                </h1>
                                                <div className="overflow-x-auto rounded-xl">
                                                    <table className="table">

                                                        <thead>
                                                        <tr className="text-xl bg-green-700 text-white">
                                                            <th>SN</th>
                                                            <th>Item</th>
                                                            <th>Price</th>
                                                            <th>Quantity</th>
                                                            <th>Subtotal</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>

                                                        {
                                                            orderdetails?.cartproduct?.map((item, i) => (
                                                                <tr key={i} className="text-lg">
                                                                    <td>{i+1}</td>
                                                                    <td>{item?.menu[0]?.name}</td>
                                                                    <td>{item.price}</td>
                                                                    <td>{item?.quantity}</td>
                                                                    <td>{item?.subtotal}</td>
                                                                </tr>
                                                            ))

                                                        }
                                                        </tbody>

                                                    </table>
                                                </div>
                                            </div>

                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </>
                    :
                    <>

                    </>
            }
        </div>
    );
};

export default History;
