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
import Order from "../UserComponents/Order/Order";
import History from "../UserComponents/Order/History";
import AdminLogin from "../AdminComponents/AdminAuthentication/AdminLogin";
import AdminRoute from "./AdminRoute";

const router = createBrowserRouter([
    {
        path: "/admin_login",
        element: <AdminLogin/>
    },
    {
        path: "/admin",
        element: <AdminRoute><AdminLayout/></AdminRoute>,
        children: [

            {
                path: "/admin",
                element: <AdminRoute><Dashboard/></AdminRoute>
            },
            {
                path: "/admin/controlmenu",
                element: <AdminRoute><ControlFood/></AdminRoute>
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
              path: "/order",
              element: <UserRoute><Order/></UserRoute>
            },
            {
              path: "/order_history",
              element: <UserRoute><History/></UserRoute>
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