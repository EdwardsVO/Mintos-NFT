import React from 'react';

interface CategoryProps {
  categories: any;
}

export default function Category({ categories }: CategoryProps) {
  const [active, setActive] = React.useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <div className="">
      <div //button
        // type="button"
        className={` ${
          active ? 'bg-figma-100 text-gray-200' : 'bg-figma-500 text-gray-400'
        } shadow-black drop-shadow-xl rounded-lg p-2 border border-figma-600 px-4`}
        // onClick={handleClick}
      >
        {categories.title}
      </div>
    </div>
  );
}
