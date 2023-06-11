import {RouterProvider} from "react-router-dom";
import router from "./Routes/Routes";
import {Toaster} from "react-hot-toast";
import {useContext, useEffect} from "react";
import {stateContext, useGlobalState} from "./state/provider";
import {domain, header, userToken} from "./env";
import Axios from "axios";
import ApiCheck from "./ApiCheck";

function App() {

  return (
    <div className="">
      <RouterProvider router={router}>

      </RouterProvider>
        <ApiCheck/>
        <Toaster/>
    </div>
  );
}

export default App;
