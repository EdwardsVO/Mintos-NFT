import React from 'react';

interface FilterDropdownProps {
  filter;
  setFilter: React.Dispatch<React.SetStateAction<number>>;
}

const modalityList = [
  { _id: 0, name: 'All' },
  { _id: 1, name: 'On Sale' },
  { _id: 2, name: 'Not on Sale' },
];

export default function FilterDropdown({
  filter,
  setFilter,
}: FilterDropdownProps) {
  return (
    <div className="">
      <label htmlFor="filter">
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(parseInt(e.target.value))}
          onBlur={(e) => setFilter(parseInt(e.target.value))}
          className="sm:w-1/2 lg:w-full flex mt-2 shadow-lg text-sm lg:p-3 lg:text-base rounded-md bg-figma-200 drop-shadow-md"
        >
          {modalityList.map((c) => (
            <option value={c._id} key={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
