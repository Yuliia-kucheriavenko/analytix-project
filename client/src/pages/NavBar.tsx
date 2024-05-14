import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { StoreContext } from "../store/StoreContext";

const NavBar = () => {
  const { store } = useContext(StoreContext);
  const isAuthenticated = store.isAuth;
  // const userRole = store.user.role;

  return (
    <>
      <header className="bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-end p-6 lg:px-8">
          <div className="justify-end">
            {isAuthenticated ? (
              <button onClick={() => store.loguot()}>
              <Link to="/#" className="text-sm  text-gray-900 p-2">
                Log out
              </Link>
              </button>

            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-semibold  text-gray-900 bg-sky-500 mr-2 p-2 rounded-md"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="text-sm font-semibold  text-gray-900 bg-sky-500/50 mr-2 p-2 rounded-md"
                >
                  Sing up
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default observer(NavBar);
