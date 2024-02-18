import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routers";


function App() {
  return (
    <RouterProvider router={router} />
    //   <div className="app">React Router APP</div>
    // </RouterProvider>
   
  );
}

export default App;
