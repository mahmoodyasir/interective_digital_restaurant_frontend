import {RouterProvider} from "react-router-dom";
import router from "./Routes/Routes";
import {Toaster} from "react-hot-toast";
import ApiCheck from "./ApiCheck";

function App() {

  return (
    <div className="">
      {/*  A Router Provider named router is imported to maintaining routes*/}
      <RouterProvider router={router}>

      </RouterProvider>
        {/*Fetching All Required data in ApiCheck Module*/}
        <ApiCheck/>
        <Toaster/>
    </div>
  );
}

export default App;
