import React, {useState} from 'react';
import {useLoaderData} from "react-router-dom";
import SingleMenuCard from "./SingleMenuCard";

const Home = () => {

    const allMenu = useLoaderData();
    const [menuData, setMenuData] = useState(allMenu?.results);

    return (
        <div className="">
            <div className="xl:pl-28 xl:pr-28 ml-auto mr-auto pl-10 pr-10">
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
            </div>
        </div>
    );
};

export default Home;
