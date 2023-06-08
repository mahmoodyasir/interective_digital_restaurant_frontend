import {createBrowserRouter} from "react-router-dom";
import AdminLayout from "../Layout/AdminLayout";
import UserLayout from "../Layout/UserLayout";
import Dashboard from "../AdminComponents/Dashboard";
import ControlFood from "../AdminComponents/ControlFood";

const router = createBrowserRouter([
    {
        path: "/admin",
        element: <AdminLayout/>,
        children: [
            {
                path: "/admin",
                element: <Dashboard/>
            },
            {
                path: "/admin/controlmenu",
                element: <ControlFood/>
            }
        ]
    },
    {
        path: "/",
        element: <UserLayout/>,
        children: [
            {},
        ]

    },
])

export default router;