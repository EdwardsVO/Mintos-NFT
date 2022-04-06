import React from 'react';

interface NFTProfileProps {
  data: any;
}

export default function NFTProfile({ data }: NFTProfileProps) {
  return (
    <div>
      <div>
        <img src="/logo.png" alt="logo" className="w-36" />
      </div>
      <div className="mt-6 mx-3">
        <h2 className="text-figma-100 font-bold text-xl">{data?.collection}</h2>
      </div>
      <div className=" bg-figma-300 rounded-3xl drop-shadow-lg shadow-black p-5 mx-3 mt-2">
        <img
          src={data?.banner}
          alt={data?.title}
          className="rounded-3xl object-cover"
        />
      </div>
      <div className="flex mx-3 justify-between mt-3">
        <div className="mt-2">
          <h2 className="text-xl font-semibold text-figma-400">
            {data?.title}
          </h2>
          <h2 className="text-xl font-semibold text-figma-100">
            {data?.owner}
          </h2>
        </div>
        <div className="mt-2">
          <h2 className="text-xl font-bold text-figma-400">{data?.price} N</h2>
        </div>
      </div>
      <div className="mt-8">
        <button
          type="button"
          className="bg-figma-100 rounded-xl w-full p-2 drop-shadow-2xl"
        >
          <p className="text-figma-500 text-lg font-semibold">Buy Now</p>
        </button>
      </div>
    </div>
  );
}
