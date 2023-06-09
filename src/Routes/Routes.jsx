import {createBrowserRouter} from "react-router-dom";
import AdminLayout from "../Layout/AdminLayout";
import UserLayout from "../Layout/UserLayout";
import Dashboard from "../AdminComponents/Dashboard/Dashboard";
import ControlFood from "../AdminComponents/FoodControl/ControlFood";
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
import FoodDetails from "../AdminComponents/FoodControl/FoodDetails";
import ManageOrder from "../AdminComponents/OrderManagement/ManageOrder";
import CreateAdmin from "../AdminComponents/AdminAuthentication/CreateAdmin";
import FeedBack from "../UserComponents/FeedBack/FeedBack";
import FeedBackReview from "../AdminComponents/FeedBackReview/FeedBackReview";


// Controls Every Route of the Application
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
            },
            {
                path: "/admin/details/:id",
                element: <AdminRoute><FoodDetails/></AdminRoute>,
                loader: async ({params}) => fetch(`${domain}/api/menu/${params?.id}/`)
            },
            {
                path: "/admin/manageorders",
                element: <AdminRoute><ManageOrder/></AdminRoute>
            },
            {
                path: "/admin/profile",
                element: <AdminRoute><Profile/></AdminRoute>
            },
            {
                path: "/admin/createadmin",
                element: <AdminRoute><CreateAdmin/></AdminRoute>
            },
            {
                path: "/admin/review_feedback",
                element: <AdminRoute><FeedBackReview/></AdminRoute>
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
            {
                path: "/feedback",
                element: <FeedBack/>
            }
        ]

    },
])

export default router;