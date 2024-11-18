import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import HeadSidebar from "./HeadSideBar";
import MenuBar from "./MenuBar";
import { useState } from "react";

function Sidebar() {
  const [openToggle, setOpenToggle] = useState<boolean>(true);

  return (
    <div
    style={{zIndex:"10"}}
      className={` lg:relative absolute  h-[100vh] bg-white flex flex-col justify-start transition-all duration-300 ${
        openToggle ? "w-[15%] min-w-[274px]" : "w-0 min-w-0 "
      }`}
    >
      {openToggle && (
        <>
          <HeadSidebar />
          <hr className="mt-[11px]" />
          <MenuBar />
        </>
      )}
      {/* Floating Icon for Toggling */}
      <div
        className="absolute top-[20px] -right-[21px] cursor-pointer bg-[#a6ee98] w-[42px] h-[42px] flex items-center justify-center rounded-full"

        onClick={() => setOpenToggle(!openToggle)}
      >
        <Icon
          icon="duo-icons:menu"
          width="1.5rem"
          height="1.5rem"
          style={{ color: "black" ,position:"relative" }}
          
        />
      </div>
    </div>
  );
}

export default Sidebar;
