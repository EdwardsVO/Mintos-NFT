import React from 'react';

interface NFTPreviewProps {
  data: any;
  isCollection?: boolean;
}

export default function NFTPreview({
  data,
  isCollection = false,
}: NFTPreviewProps) {
  return (
    <button type="button">
      <div className=" bg-figma-700 rounded-md drop-shadow-lg shadow-black">
        <div className="p-4">
          <img src="/123123123.png" alt="peng" className="rounded-lg" />
          <h1 className="font-semibold text-md text-left">{data.title}</h1>
          {isCollection ? (
            <p className="text-left">Total Sold ({data.sold})</p>
          ) : (
            <p className="text-left">Available NFTs ({data.availableNfts})</p>
          )}
        </div>
      </div>
    </button>
  );
}
