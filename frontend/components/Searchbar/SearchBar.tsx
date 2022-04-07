import React from 'react';
import { SearchIcon } from '../icons';

export default function SearchBar() {
  return (
    <div className="flex justify-center w-full">
      <div className="relative flex flex-wrap items-stretch w-full mb-4">
        <input
          type="search"
          className=" h-11 rounded px-6 w-3/4 border-2 border-figma-300 text-figma-400 font-medium"
          placeholder="Search artwork"
        />
        <button className="inline-block px-1 py-2 border-2 border-figma-100 text-figma-100 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-1/4">
          Search
        </button>
      </div>
    </div>
  );
}
