import React, {PureComponent, useEffect, useState} from 'react';
import {useGlobalState} from "../state/provider";
import {
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Scatter,
    ResponsiveContainer,
} from 'recharts';
import {admin_header, domain} from "../env";
import Axios from "axios";

const Dashboard = () => {
    const [{only_product, page_reload}, dispatch] = useGlobalState();
    const [total, setTotal] = useState(null);
    console.log(only_product)

    useEffect(() => {
        const total = async () => {
            await Axios({
                method: "get",
                url: `${domain}/api/total_values/`,
                headers: admin_header
            }).then(response => {
                setTotal(response.data)
            })
        }
        total();
    }, []);


    return (
        <div className="h-screen">
            <h1 className="text-xl text-center">Comparison of Menu Items against Total Sold and Ratings</h1>
            <div>

                <div className="">
                    <ResponsiveContainer width={'99%'} height={500}>
                        <ComposedChart
                            width={500}
                            height={400}
                            data={only_product}
                            margin={{
                                top: 20,
                                right: 20,
                                bottom: 20,
                                left: 0,
                            }}
                        >
                            <CartesianGrid stroke="#f5f5f5"/>
                            <XAxis dataKey="name" scale="band"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <Area type="monotone" dataKey="total_sold" fill="#8884d8" stroke="#8884d8"/>
                            <Bar dataKey="ratings" barSize={20} fill="#413ea0"/>

                        </ComposedChart>
                    </ResponsiveContainer>

                </div>

                <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

                    <div className="card bg-primary text-primary-content">
                        <div className="card-body">
                            <h2 className="text-2xl text-white text-center">Total User: {" " + total?.user}</h2>
                        </div>
                    </div>

                    <div className="card bg-success text-primary-content">
                        <div className="card-body">
                            <h2 className="text-2xl text-white text-center">Total Order: {" " + total?.order}</h2>
                        </div>
                    </div>

                    <div className="card bg-purple-500 text-primary-content">
                        <div className="card-body">
                            <h2 className="text-2xl text-white text-center">Total Paid: {" " + total?.paid + " user"}</h2>
                        </div>
                    </div>

                    <div className="card bg-red-400 text-primary-content">
                        <div className="card-body">
                            <h2 className="text-2xl text-white text-center">Total Menu: {" " + total?.menu + " items"}</h2>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Dashboard;
