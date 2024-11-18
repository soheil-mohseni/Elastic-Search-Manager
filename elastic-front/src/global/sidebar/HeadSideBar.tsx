import { Icon } from "@iconify-icon/react";
import useDebouncedSearch from "../hook/useDebouncedSearch";

function HeadSidebar() {

  const [search, handleSearchChange]:any = useDebouncedSearch();

  return (
    <div className="w-[100%] h-[15vh]  flex flex-col items-center justify-around">
      {/* Logos and title of project */}
      <div className=" w-[45%] flex flex-row justify-around pt-[20px] items-center">
        <Icon
          icon="oui:app-index-rollup"
          width="2.5rem"
          height="2.5rem"
          style={{ color: "#00fbff" }}
          className="pr-[8px]"
        />
        <h1>Generator</h1>
      </div>

      {/* SEARCH BAR */}

      <form className="max-w-md w-[80%]  mx-auto">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute   inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            value={search}
            onChange={handleSearchChange}
            className="block w-full pl-[44px] text-sm py-[7px] focus:outline-none    focus:ring-blue-500  bg-[#f5f6f7]  text-black dark:placeholder-gray-400  "
            placeholder="Search Categories..."
            required
          />
        </div>
      </form>
    </div>
  );
}

export default HeadSidebar;
