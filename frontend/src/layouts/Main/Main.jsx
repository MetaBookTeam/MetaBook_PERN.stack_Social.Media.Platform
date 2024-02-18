import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";

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
      <footer></footer>
    </div>
  );
};

export default Main;
