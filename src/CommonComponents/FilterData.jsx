import React, {useState} from 'react';
import {useGlobalState} from "../state/provider";
import Axios from "axios";
import {domain} from "../env";
import toast from "react-hot-toast";

const FilterData = ({setMenuData, menuData}) => {
    const [{all_category, page_reload}, dispatch] = useGlobalState();
    const [newCategory, setNewCategory] = useState(null);
    const [tempData, setTempData] = useState(menuData);
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);

    const categoryFilter = async () => {
        console.log(newCategory)
        if (newCategory === '0' || newCategory === null) {
            toast.error("Choose Correct Category")
        } else {
            await Axios({
                method: "post",
                url: `${domain}/api/category_filter/`,
                data: {
                    "id": newCategory
                }
            }).then(response => {
                setMenuData(response.data)
            })
        }

    }

    const priceFilter = async () => {
        if(start === null || end === null)
        {
             toast.error("Enter Accurate Price")
        }
        else
        {
            await Axios({
                method: "post",
                url: `${domain}/api/price_filter/`,
                data:{
                    "start": start,
                    "end": end
                }
            }).then(response => {
                setMenuData(response.data)
            })
        }
    }

    const clear = async () => {
        setMenuData(tempData)

    }

    return (
        <div>
            <div
                className="mb-4 grid gap-3 grid-cols-1 xl:grid-cols-3 justify-items-center bg-gray-700 py-3 px-2 rounded-xl">

                <div className="flex gap-2">
                    <div className="form-control">
                        <select onChange={(e) => setNewCategory(e.target.value)}
                                className="select input-bordered md:w-full">
                            <option value={0}>Select a category</option>

                            {
                                all_category?.map(item => <option
                                    key={item?.id}
                                    value={item?.id}
                                >{item?.title}</option>)
                            }
                        </select>
                    </div>

                    <div>
                        <button onClick={categoryFilter} className="btn btn-info btn-outline">Filter By Category</button>
                    </div>
                </div>

                <div className="grid gap-2 grid-cols-1 lg:grid-cols-3 justify-items-center">

                    <div className="md:w-full flex">

                        <div>
                            <input type="number" min={0} placeholder="From ...."
                                   onChange={(e) => setStart(e.target.value)}
                                   value={start}
                                   className="input input-bordered md:w-full"/>
                        </div>
                    </div>

                    <div className="md:w-full flex">

                        <div>
                            <input type="number" min={0} placeholder="To ...."
                                   onChange={(e) => setEnd(e.target.value)}
                                   value={end}
                                   className="input input-bordered md:w-full "/>
                        </div>
                    </div>

                    <div>
                        <button onClick={priceFilter} className="btn btn-success btn-outline">Filter By Price</button>
                    </div>

                </div>

                <div className="">
                    <button onClick={clear} className="btn btn-error btn-outline">Clear</button>
                </div>

            </div>
        </div>
    );
};

export default FilterData;
