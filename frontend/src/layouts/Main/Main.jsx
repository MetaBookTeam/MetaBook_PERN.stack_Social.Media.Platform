import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";


const Main = () => {
  return (
    <div className="root-layout">
      <header>
        <NavBar/>
      </header>
      <main>
        {/* Outlet : it the subRouter of Main {children:[]} */}
        <Outlet/>
      </main>
      <footer>
       <Footer/>
      </footer>
    </div>
  );
};

export default Main;
