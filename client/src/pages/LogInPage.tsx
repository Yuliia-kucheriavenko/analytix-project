import LoginForm from "../components/LoginForm";
import bg_photo from "../img/Bg-image.svg";
import bg_logo from "../img/bg_logo.svg";
import { observer } from "mobx-react-lite";

const LogInPage = () => {
  return (
    <section className="flex justify-center items-center max-[1024px]:items-start">
      <div className="flex-1 flex justify-center items-center pl-12 pt-[40px]">
        <LoginForm />
      </div>
      <div className="relative flex-1 max-[864px]:hidden">
        <img
          src={bg_photo}
          alt=""
          className="w-40vw max-h-screen object-cover"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center">
          <img src={bg_logo} alt="" />
          <p className="text-8xl font-bold text-white max-[1024px]:text-3xl">
            Analytix
          </p>
        </div>
      </div>
    </section>
  );
};
export default observer(LogInPage);
