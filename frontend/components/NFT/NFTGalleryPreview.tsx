import { useRouter } from 'next/router';
import React from 'react';

interface NFTGalleryPreviewProps {
  data: any;
  isCollection?: boolean;
}

export default function NFTGalleryPreview({ data }: NFTGalleryPreviewProps) {
  const router = useRouter();
  return (
    <button type="button" onClick={() => router.push(`/app/nft/${data?._id}`)}>
      <div className=" bg-figma-700 rounded-md drop-shadow-lg shadow-black">
        <div className="p-4">
          <img
            src={data.banner}
            alt="peng"
            className="rounded-lg h-36 w-36 object-cover"
          />
          <div className="">
            <div className="mt-1">
              <h1 className="font-semibold text-md text-left">{data.title}</h1>
              <h1 className="font-medium text-left text-sm">
                {data.collection}
              </h1>
              <h1 className="font-medium text-left text-sm">{data.owner}</h1>
            </div>
            <div className="mt-2">
              <button className="w-full p-px bg-figma-800 rounded-2xl drop-shadow-lg border border-figma-300">
                <p>{data.price} N</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
