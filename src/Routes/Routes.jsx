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
import Cart from "../UserComponents/Order/Cart";
import MenuDetails from "../UserComponents/MenuDetails/MenuDetails";

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
            {
              path: "/cart",
              element: <UserRoute><Cart/></UserRoute>
            },
            {
              path: "/details/:id",
              element: <MenuDetails/>,
              loader: async ({params}) => fetch(`${domain}/api/menu/${params?.id}/`)
            },
        ]

    },
])

export default router;