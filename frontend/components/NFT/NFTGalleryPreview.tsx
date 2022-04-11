import { useRouter } from 'next/router';
import React from 'react';
import Token from '../../models/Token';
import { toNEAR } from '../utils';

interface NFTGalleryPreviewProps {
  data?: Token;
}

export default function NFTGalleryPreview({ data }: NFTGalleryPreviewProps) {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.push(`/app/nft/${data?.token_id}`)}
    >
      <div className=" bg-figma-700 rounded-md drop-shadow-lg shadow-black">
        <div className="p-4">
          <img
            src={
              data?.metadata.media ||
              'http://cdn.onlinewebfonts.com/svg/img_24787.png'
            }
            alt="peng"
            className="rounded-lg h-36 w-36 object-cover lg:h-72 lg:w-72 lg:object-fill lg:mx-auto"
          />
          <div className="lg:mx-2">
            <div className="mt-1">
              <h1 className="font-semibold text-md text-left">
                {data?.metadata.title}
              </h1>
              <h1 className="font-medium text-left text-sm">
                {/* Contract dont allow collections */}
                Collection
              </h1>
              <h1 className="font-medium text-left text-sm">
                {data?.owner_id}
              </h1>
            </div>
            <div className="mt-2">
              <div className="w-full p-px bg-figma-800 rounded-2xl drop-shadow-lg border border-figma-300">
                <p>{toNEAR((data?.metadata.price).toString())} N</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
