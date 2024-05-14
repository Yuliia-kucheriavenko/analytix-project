import { observer } from "mobx-react-lite";
import NavBar from "./NavBar";

export const HomePage = observer(() => {
  return (
    <>
      <NavBar />
      <section className="w-[100vw] h-[30vw] bg-gradient-to-b from-[#70A9FF] via-[#316EC9] to-[#0149B4] text-[54px] font-bold text-white  max-[500px]:h-[100vw]">
        <h1 className="text-center pt-9">Home page</h1>
      </section>
    </>
  );
});
