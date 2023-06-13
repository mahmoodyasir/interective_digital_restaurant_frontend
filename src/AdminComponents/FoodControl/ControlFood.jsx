import React, {useEffect, useState} from 'react';
import {admin_header, domain} from "../../env";
import {Link} from "react-router-dom";
import Axios from "axios";
import {useForm} from "react-hook-form";
import toast from "react-hot-toast";
import {useGlobalState} from "../../state/provider";

const ControlFood = () => {
    const [{only_product, admin_profile}, dispatch] = useGlobalState();
    const [category, setCategory] = useState([]);
    const [errCategory, setErrCategory] = useState('');
    const [toogle, setToogle] = useState(false);
    const [newData, setNewData] = useState(null);
    const {register, reset, formState: {errors}, handleSubmit} = useForm();

    useEffect(() => {
        const getCategory = async () => {
            await Axios({
                method: "get",
                url: `${domain}/api/category/`
            }).then(response => {
                // console.log(response.data)
                setCategory(response.data)
            })
        }
        getCategory();
    }, []);

    const addMenuItem = async (data) => {
        console.log(data)
        setErrCategory('')
        if (data?.category === '0') {
            setErrCategory('Please Select a Category')
        } else {
            const formdata = new FormData()

            formdata.append('name', data?.name);
            formdata.append('category', data?.category);
            formdata.append('price', data?.price);
            formdata.append('menuImage', data?.image[0]);
            formdata.append('ingredients', data?.ingredients);
            formdata.append('description', data?.desc);

            if (newData !== null && toogle !== false) {


            } else {

                await Axios({
                    method: "post",
                    url: `${domain}/api/add_item/`,
                    headers: admin_header,
                    data: formdata
                }).then(response => {
                    toast.success("Menu Item Added")
                    dispatch({
                        type: "ADMIN_PROFILE",
                        admin_profile: response.data
                    })
                })
            }
        }
    }

    const getAddedData = async (id) => {
        setNewData(null)
        setToogle(false)

        await Axios({
            method: "get",
            url: `${domain}/api/menu/${id}/`
        }).then(response => {
            console.log(response.data)
            setNewData(response.data)
            setToogle(true)
            // toast.dismiss("Input Field Is Updated. Please Check.")
        })
    }


    return (
        <div>
            <div className="grid gap-4 grid-cols-1 xl:grid-cols-2 ">

                <div>
                    <h1 className="text-3xl text-center text-white mb-4"><span
                        className="bg-indigo-500 px-7 py-1 rounded">Add Items</span></h1>
                    <div className="dark:bg-gray-800 px-8 py-10 rounded-xl">

                        <form onSubmit={handleSubmit(addMenuItem)}>

                            <div className="form-control md:w-full">
                                <label className="label"> <span
                                    className="label-text text-white">Item Name</span></label>
                                <input type="text"
                                       defaultValue={newData !== null && toogle !== false ? newData?.name : null}
                                       placeholder="Write Item Name ...."
                                       {...register("name", {
                                           required: "Please Provide Item Name",
                                       })}
                                       className="input input-bordered md:w-full"/>
                                {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}
                            </div>

                            <div className="md:flex gap-2">
                                <div className="form-control md:w-full">
                                    <label className="label"> <span
                                        className="label-text text-white">Category</span></label>
                                    <select
                                        {...register('category', {
                                            required: "Please Select an Item Category",
                                        })}
                                        className="select input-bordered md:w-full">
                                        <option value={0}>Select a Category</option>
                                        {
                                            category?.map(item => <option
                                                selected={newData !== null && toogle !== false ? newData?.category?.id : 0}
                                                key={item?.id}
                                                value={newData !== null && toogle !== false ? newData?.category?.id : item?.id}
                                            >{newData !== null && toogle !== false ? newData?.category?.title : item?.title}</option>)
                                        }
                                    </select>
                                    {errors.category && <p className='text-red-600'>{errors.category?.message}</p>}
                                    {errCategory && <p className='text-red-600'>{errCategory}</p>}
                                </div>

                                <div className="form-control md:w-full">
                                    <label className="label"> <span
                                        className="label-text text-white">Price</span></label>
                                    <input type="number"
                                           defaultValue={newData !== null && toogle !== false ? newData?.price : null}
                                           placeholder="Enter Item Price ..."
                                           {...register("price", {
                                               required: "Please Provide Item Price",
                                           })}
                                           className="input input-bordered md:w-full"/>
                                    {errors.price && <p className='text-red-600'>{errors.price?.message}</p>}
                                </div>
                            </div>

                            <div className="md:flex gap-2">
                                <div className="form-control md:w-full ">
                                    <label className="label"> <span
                                        className="label-tex text-white">Item Image</span></label>
                                    <input type="file"
                                           {...register("image", {
                                               required: "Please Upload Item Image",
                                           })}
                                           className="file-input input-bordered w-full"/>
                                    {errors.image && <p className='text-red-600'>{errors.image?.message}</p>}
                                </div>

                                <div className="form-control md:w-full mt-1">
                                    <label className="label"> <span className="label-text text-white">Ingredients</span></label>
                                    <input type="ingredients"
                                           defaultValue={newData !== null && toogle !== false ? newData?.ingredients : null}
                                           placeholder="Write Some Ingredients ..."
                                           {...register("ingredients", {
                                               required: "Please Provide Ingredients",
                                           })}
                                           className="input input-bordered md:w-full"/>
                                    {errors.ingredients &&
                                        <p className='text-red-600'>{errors.ingredients?.message}</p>}
                                </div>

                            </div>

                            <div className="form-control md:w-full">
                                <label className="label"> <span
                                    className="label-text">Item Description</span></label>
                                <textarea
                                    defaultValue={newData !== null && toogle !== false ? newData?.description : null}
                                    placeholder="Write Item Description ..."
                                    {...register("desc", {
                                        required: "Please Provide Item Description",
                                    })}
                                    className="textarea textarea-bordered h-24 md:w-full"/>
                                {errors.desc && <p className='text-red-600'>{errors.desc?.message}</p>}
                            </div>

                            {
                                newData !== null && toogle !== false ?
                                    <>
                                        <button onClick={() => reset({
                                            name: newData !== null && toogle !== false ? newData?.name : null,
                                            category: newData !== null && toogle !== false ? newData?.category?.id : null,
                                            price: newData !== null && toogle !== false ? newData?.price : null,
                                            ingredients: newData !== null && toogle !== false ? newData?.ingredients : null,
                                            desc: newData !== null && toogle !== false ? newData?.description : null,
                                            id: newData !== null && toogle !== false ? newData?.id : null,

                                        })}
                                                className='btn btn-info w-full mt-4 '>Update Fields
                                        </button>
                                        "/>
                                    </>
                                    :
                                    <>
                                        <input className='btn btn-accent w-full mt-4 ' value="Add Item" type="submit"/>
                                    </>
                            }


                        </form>

                    </div>
                </div>

                <div className="card bg-gray-700 ">
                    <div className="overflow-x-auto overflow-y-auto">
                        <table className="table text-white">

                            <thead className="text-xl text-white">
                            <tr>
                                <th>SN</th>
                                <th>Image</th>
                                <th>Item</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>

                            {
                                only_product !== null &&
                                only_product?.map((item, i) => (
                                    <tr key={i}>
                                        <th>{i + 1}</th>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={`${domain}${item?.menuImage}`}
                                                             alt="Avatar Tailwind CSS Component"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-lg font-bold">{item?.name}</td>
                                        <td className="text-lg font-bold">{item?.price + " BDT"}</td>
                                        <th>
                                            <div className="join">
                                                <button
                                                    className="btn btn-error join-item hover:text-white hover:bg-red-500">Delete
                                                </button>
                                                <button
                                                    className="btn btn-info join-item hover:text-white hover:bg-blue-500">Details
                                                </button>
                                                <button onClick={() => getAddedData(item?.id)}
                                                        className="btn btn-success join-item hover:text-white hover:bg-green-500">Update
                                                </button>
                                            </div>
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

export default ControlFood;
