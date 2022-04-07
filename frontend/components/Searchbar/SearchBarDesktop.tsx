import React from 'react';
import SearchIcon from '../icons/SearchIcon';

interface SearchBarProps {
  className?: string;
  data?: any;
}

export default function SearchBar({ className, data }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = React.useState([]);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    // eslint-disable-next-line arrow-body-style
    const newFilter = data.filter((value) => {
      if (searchWord === '') return null;
      return value.title.toLowerCase().includes(searchWord);
    });
    setSearchTerm(newFilter);
  };
  return (
    <div className={className}>
      <div className="flex">
        <input
          type="text"
          className="h-full border-0 w-full rounded-lg outline-none"
          placeholder="Search artwork"
          onChange={handleFilter}
        />
        <SearchIcon className="h-6 top-1 text-figma-600 font-bold" />
      </div>
      {searchTerm?.length !== 0 && (
        <div className="w-full bg-gray-50 overflow-hidden overflow-y-auto text-md p-2 mt-3 shadow-lg scrollbar-hide z-50 relative">
          {searchTerm?.map((value, i) => (
            <a
              key={i}
              href={`/app/nft/${value?._id}`}
              className="w-full flex items-center border-b-2 border-primary-blue-400 hover:bg-gray-100 hover:text-black text-gray-500 py-1"
            >
              <a>{value.title}</a>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
