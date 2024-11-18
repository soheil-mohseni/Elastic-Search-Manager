import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { useAtomValue } from "jotai";
import {  searchAtom } from "./atoms";
import { useNavigate } from "react-router-dom";

function MenuBar() {
  const searchValue = useAtomValue(searchAtom); // Track search value changes
  const navigate = useNavigate();

  return (
    <ul className="w-full h-[84vh] flex flex-col items-center justify-start">
      {(searchValue === "Config" || !searchValue) ? (
        <li
          style={{ transitionDuration: "400ms" }}
          onClick={()=>{navigate('/dashboard/config')}}
          className="flex flex-row justify-start items-center w-[75%] mt-[1.75rem]  hover:bg-[#e0e1e4] rounded-[13%] pl-[11px] py-[5px] cursor-pointer transition-all  ease-in-out"
        >
          <Icon
            icon="mynaui:config"
            width="1.55rem"
            height="1.55rem"
            style={{ color: "#5f6061" }}
            className="pr-[15px]"
          />
          <p className="text-[#5f6061] text-[1.15rem]">Config</p>
        </li>
      ) : null}
      {(searchValue === "Core" || !searchValue) ? (
        <li
          style={{ transitionDuration: "400ms" }}
          onClick={()=>{navigate('/dashboard/core')}}
          className="flex flex-row justify-start items-center w-[75%] mt-[1.75rem]  hover:bg-[#e0e1e4] rounded-[13%] pl-[11px] py-[5px] cursor-pointer transition-all  ease-in-out"
        >
          <Icon
            icon="ic:outline-factory"
            width="1.55rem"
            height="1.55rem"
            style={{ color: "#5f6061" }}
            className="pr-[15px]"
          />
          <p className="text-[#5f6061] text-[1.15rem]">Core</p>
        </li>
      ) : null}
    </ul>
  );
}

export default MenuBar;
