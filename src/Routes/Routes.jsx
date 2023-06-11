import {createBrowserRouter} from "react-router-dom";
import AdminLayout from "../Layout/AdminLayout";
import UserLayout from "../Layout/UserLayout";
import Dashboard from "../AdminComponents/Dashboard";
import ControlFood from "../AdminComponents/ControlFood";
import Login from "../UserComponents/UserAuthentication/Login";
import Register from "../UserComponents/UserAuthentication/Register";
import Profile from "../UserComponents/Profile/Profile";
import UserRoute from "./UserRoute";
import Home from "../CommonComponents/Home";
import {domain} from "../env";

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
            {
                path: "/",
                element: <Home/>,
                loader: () => fetch(`${domain}/api/menu/`)
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
              path: "/register",
              element: <Register/>
            },
            {
              path: "/profile",
              element: <UserRoute><Profile/></UserRoute>
            },
        ]

    },
])

export default router;