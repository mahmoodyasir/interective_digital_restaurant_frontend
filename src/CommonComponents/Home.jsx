import React, {useState} from 'react';
import {useLoaderData} from "react-router-dom";
import SingleMenuCard from "./SingleMenuCard";
import FilterData from "./FilterData";
import Banner from "./Banner";
import Footer from "./Footer";
import Axios from "axios";

const Home = () => {

    const allMenu = useLoaderData();
    const [menuData, setMenuData] = useState(allMenu?.results);
    const [paginationData, setPaginationData] = useState(allMenu);
    console.log(menuData)

    const previous_products = async () => {

        await Axios({
            method: "get",
            url: paginationData?.previous
        }).then(response => {
            setMenuData(response.data?.results)
            setPaginationData(response.data)
        })
    }

    const next_products = async () => {
        await Axios({
            method: "get",
            url: paginationData?.next
        }).then(response => {
            setMenuData(response.data?.results)
            setPaginationData(response.data)
        })
    }


    return (
        <div className="">
            <Banner/>
            <div className="xl:pl-28 xl:pr-28 ml-auto mr-auto pl-10 pr-10">

                <FilterData setMenuData={setMenuData} menuData={menuData}/>

                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3">
                    {
                        menuData?.map(item => (
                            <SingleMenuCard
                                key={item?.id}
                                item={item}
                            />
                        ))
                    }
                </div>

                <div className="grid justify-items-center mt-4">
                    <div className="join grid grid-cols-2">
                        {
                            paginationData?.previous !== null ?
                                <>
                                    <button onClick={previous_products} className="join-item btn btn-info hover:bg-blue-500 hover:text-white">Previous page</button>
                                </>
                                :
                                <>
                                    <button className="join-item btn btn-info hover:bg-blue-500 hover:text-white " disabled={true}>Previous page</button>
                                </>
                        }
                        {
                            paginationData?.next !== null ?
                                <>
                                    <button onClick={next_products} className="join-item btn btn-success hover:bg-green-500 hover:text-white">Next</button>
                                </>
                                :
                                <>
                                    <button className="join-item btn btn-success hover:bg-green-500 hover:text-white" disabled={true}>Next</button>
                                </>
                        }
                    </div>
                </div>

            </div>
            <Footer/>
        </div>
    );
};

export default Home;
