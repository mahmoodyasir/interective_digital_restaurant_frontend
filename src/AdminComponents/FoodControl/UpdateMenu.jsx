import React, {useEffect, useState} from 'react';
import './Modal.css'
import Axios from "axios";
import {admin_header, domain} from "../../env";
import toast from "react-hot-toast";
import {useGlobalState} from "../../state/provider";

const UpdateMenu = ({setToogle, newData, category, menuId}) => {
    const [{page_reload}, dispatch] = useGlobalState();
    const [newName, setNewName] = useState(newData !== null ? newData?.name : null);
    const [newCategory, setNewCategory] = useState(newData !== null ? newData?.category?.id : null);
    const [newPrice, setNewPrice] = useState(newData !== null ? newData?.price : null);
    const [newImage, setNewImage] = useState(null);
    const [newIngredients, setNewIngredients] = useState(newData !== null ? newData?.ingredients : null);
    const [newDesk, setNewDesk] = useState(newData !== null ? newData?.description : null);
    const [imgErr, setImgErr] = useState(null);

    const updateItem = async () => {
        setImgErr('')
        if([newName, newCategory, newPrice, newImage, newIngredients, newDesk].some(variable => variable === null || variable === undefined || variable === ""))
        {
            if (newImage === null) setImgErr('Input Image Again')
            toast.error("You MUST input ALL FIELD")
        }
        else{
            console.log(newCategory)

            const formdata = new FormData()

            formdata.append('name', newName);
            formdata.append('category', newCategory);
            formdata.append('price', newPrice);
            formdata.append('menuImage', newImage);
            formdata.append('ingredients', newIngredients);
            formdata.append('description', newDesk);
            formdata.append('menu_id', menuId);

            await Axios({
                method: "post",
                url: `${domain}/api/update_item/`,
                headers: admin_header,
                data: formdata
            }).then(response => {
                dispatch({
                    type: "PAGE_RELOAD",
                    page_reload: response.data
                })
                toast.success("Item Successfully Updated")
                setToogle(false)
            })
        }
    }

    return (
        <div>
            <div className="modalBackground ">
                <div className="modalContainer ">
                    <div className="titleCloseBtn">
                        <button
                            onClick={() => {
                                setToogle(false);
                            }}
                        >
                            X
                        </button>
                    </div>

                    <div className="body">

                        <div>
                            <h1 className="text-3xl text-center text-white mb-4"><span
                                className="bg-green-500 px-7 py-1 rounded">Update Items</span></h1>
                            <div className="dark:bg-gray-800 px-8 py-10 rounded-xl">

                                <div>

                                    <div className="form-control md:w-full">
                                        <label className="label"> <span
                                            className="label-text text-white">Item Name</span></label>
                                        <input type="text" onChange={(e) => setNewName(e.target.value)}
                                               value={newName}
                                               placeholder="Write Item Name ...."
                                               className="input input-bordered md:w-full"/>

                                    </div>

                                    <div className="md:flex gap-2">
                                        <div className="form-control md:w-full">
                                            <label className="label"> <span
                                                className="label-text text-white">Category</span></label>
                                            <select onChange={(e) => setNewCategory(e.target.value)}
                                                className="select input-bordered md:w-full">

                                                {
                                                    category?.map(item => <option
                                                        selected={newData.category?.id === item?.id && newData.category?.id}
                                                        key={item?.id}
                                                        value={item?.id}
                                                    >{item?.title}</option>)
                                                }
                                            </select>
                                        </div>

                                        <div className="form-control md:w-full">
                                            <label className="label"> <span
                                                className="label-text text-white">Price</span></label>
                                            <input type="number" onChange={(e) => setNewPrice(e.target.value)}
                                                   value={newPrice}
                                                   placeholder="Enter Item Price ..."
                                                   className="input input-bordered md:w-full"/>

                                        </div>
                                    </div>

                                    <div className="md:flex gap-2">
                                        <div className="form-control md:w-full ">
                                            <label className="label"> <span
                                                className="label-tex text-white">Item Image</span></label>
                                            <input type="file" onChange={(e) => setNewImage(e.target.files[0])}
                                                   className="file-input input-bordered w-full"/>
                                            {imgErr && <p className='text-red-600'>{imgErr}</p>}

                                        </div>

                                        <div className="form-control md:w-full mt-1">
                                            <label className="label"> <span
                                                className="label-text text-white">Ingredients</span></label>
                                            <input onChange={(e) => setNewIngredients(e.target.value)}
                                                   value={newIngredients}
                                                   type="ingredients" className="input input-bordered md:w-full"/>

                                        </div>

                                    </div>

                                    <div className="form-control md:w-full">
                                        <label className="label"> <span
                                            className="label-text">Item Description</span></label>
                                        <textarea onChange={(e) => setNewDesk(e.target.value)}
                                                  value={newDesk}
                                                  placeholder="Write Item Description ..."
                                                  className="textarea textarea-bordered h-24 md:w-full"/>

                                    </div>

                                    <div className="mt-4 flex gap-2 justify-evenly">
                                        <button className="btn btn-error hover:bg-red-500 hover:text-white"
                                                onClick={() => {
                                                    setToogle(false);
                                                }}
                                                id="cancelBtn">
                                            Cancel
                                        </button>
                                        <button className="btn btn-accent" onClick={updateItem}>
                                            Update Item
                                        </button>
                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateMenu;
