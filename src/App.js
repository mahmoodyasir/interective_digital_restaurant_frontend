import {RouterProvider} from "react-router-dom";
import router from "./Routes/Routes";
import {Toaster} from "react-hot-toast";
import {useContext, useEffect} from "react";
import {stateContext, useGlobalState} from "./state/provider";
import {domain, header, userToken} from "./env";
import Axios from "axios";

function App() {
    const { isLoggedIn, setIsLoggedIn} = useContext(stateContext);
    const [{profile, page_reload}, dispatch] = useGlobalState();

    useEffect(() => {
        if(userToken !== null)
        {
            const getUserProfile = async () => {
                await Axios({
                    method: "get",
                    url: `${domain}/auth/user/`,
                    headers: header
                }).then(response => {
                    console.log(response.data["data"][0]);
                    dispatch({
                        type: "ADD_PROFILE",
                        profile: response.data["data"][0]
                    })
                })
            }
            getUserProfile();
        }
    }, [dispatch, page_reload]);
  return (
    <div className="">
      <RouterProvider router={router}>

      </RouterProvider>
        <Toaster/>
    </div>
  );
}

export default App;
