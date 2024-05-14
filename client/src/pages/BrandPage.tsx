import NavBar from "./NavBar";
import { useContext } from "react";
import { StoreContext } from "../store/StoreContext";

export const BrandPage = () => {
  const { store } = useContext(StoreContext);
  const userEmail = store.user.email;
  return (
    <div className="bg-[#F2F2F2]">
      <NavBar />
      <div className="flex">
        <section className="w-[10vw] h-[50vw] bg-gradient-to-b from-[#70A9FF] via-[#316EC9] to-[#0149B4] text-[24px] font-bold text-white p-3">
          <div>Analytix</div>
        </section>
        <section className="w-[80vw] h-[33.7vw] bg-[#fff] flex flex-col gap-[60px] m-4 rounded-[10px]">
          <div className="w-[77.3vw] h-[7.8vw] bg-gradient-to-r from-[#70A9FF] via-[#316EC9] to-[#0149B4] text-[28px] font-bold text-white rounded-2xl">
            <p className="ml-4 mt-7">Your Profile</p>
          </div>
          <div className="flex flex-row ml-4 gap-[50px]">
            <div className="left text-xl text-[#6C757D] font-medium flex flex-col gap-[12px]">
              <div>Admin id:</div>
              <div>Name:</div>
              <div>Address:</div>
              <div>Contact No:</div>
              <div>Email:</div>
              <div>Password:</div>
            </div>
            <div className="right text-xl text-[#2B3674] font-bold flex flex-col gap-[12px]">
              <div>110A</div>
              <div>Adela Parkson</div>
              <div>Khumaltar, Lalitpur</div>
              <div>9841236978</div>
              <div>{userEmail}</div>
              <div>********</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
