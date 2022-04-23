import React from 'react';
import Token from '../../models/Token';
import { toNEAR } from '../utils';

interface NFTProfileProps {
  data: Token;
  //sale: Sale <- update implementation 
}

export default function NFTProfile({ data }: NFTProfileProps) {
  return (
    <div>
      <div className="lg:hidden">
        <img src="/logo.png" alt="logo" className="w-36" />
      </div>
      <div className="mt-6 mx-3 lg:px-4 lg:w-full lg:text-center">

        <h2 className="text-figma-100 font-bold text-xl">{
          // @ts-ignore: Unreachable code error
          data?.metadata?.extra?.collection}</h2>
      </div>
      <div className="lg:w-full">
        <div className=" bg-figma-300 rounded-3xl drop-shadow-lg shadow-black p-5 mx-3 mt-2 lg:max-w-xl lg:mx-auto">
          <img
            src={data?.metadata?.media}
            alt={data?.metadata?.title}
            className="rounded-3xl object-cover"
          />
        </div>
        <div className="flex mx-3 lg:mx-0 justify-between mt-3 lg:w-full lg:justify-center">
          <div className="flex w-full lg:w-1/3 justify-between lg:px-8">
            <div className="mt-2">
              <h2 className="text-xl font-semibold text-figma-400">
                {data?.metadata?.title}
              </h2>
              <h2 className="text-xl font-semibold text-figma-100">
                {data?.receiver_id}
              </h2>
            </div>
            <div className="mt-2">
              <h2 className="text-xl font-bold text-figma-400 ">
                {/* {toNEAR(data?.metadata?.price)}  */}
                NEARs
              </h2>
            </div>
          </div>
        </div>
        <div className="mt-8 lg:w-full lg:text-center">
          <button
            type="button"
            className="bg-figma-100 rounded-xl w-full lg:w-1/3 p-2 drop-shadow-2xl"
          >
            <p className="text-figma-500 text-lg font-semibold">Buy Now</p>
          </button>
        </div>
      </div>
    </div>
  );
}
