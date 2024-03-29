import React from 'react';
import Token from '../../models/Token';
import SearchIcon from '../icons/SearchIcon';

interface SearchBarProps {
  tokens?: Array<Token>;
  className?: string;
}

export default function SearchBar({ tokens, className }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = React.useState<Array<Token>>([]);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    // eslint-disable-next-line arrow-body-style
    const newFilter = tokens.filter((value) => {
      if (searchWord === '') return null;
      return value.metadata.title.toLowerCase().includes(searchWord);
    });
    setSearchTerm(newFilter);
  };
  return (
    <div>
      <div className="flex justify-center align-middle items-center">
        <input
          type="text"
          className="h-full border-2 p-3 w-full rounded-lg outline-none bg-figma-200 lg:bg-white"
          placeholder="Search artwork"
          onChange={handleFilter}
          disabled={true}
        />
        <SearchIcon className="h-8 ml-2 top-1 text-figma-600 font-bold" />
      </div>
      {searchTerm?.length !== 0 && (
        <div className="w-56 bg-gray-50 overflow-hidden overflow-y-auto text-md p-2 mt-3 shadow-lg scrollbar-hide absolute">
          {searchTerm?.map((value, i) => (
            <a
              key={i}
              href={`/app/nft/${value?.token_id}`}
              className="w-full flex items-center border-b-2 border-primary-blue-400 hover:bg-gray-100 hover:text-black text-gray-500 py-1 relative"
            >
              <a className="text-black">{value.metadata.title}</a>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
