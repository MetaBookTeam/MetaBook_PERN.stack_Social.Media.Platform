import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar";

const Main = () => {
  return (
    <div className="root-layout">
      <header>
        <NavBar />
      </header>
      <main>
        {/* Outlet : it the subRouter of Main {children:[]} */}
        <Outlet />
      </main>
    </div>
  );
};

export default Main;
