import { useRouter } from 'next/router';
import React from 'react';
import Sale from '../../models/Sale';
import Token from '../../models/Token';
import { toNEAR } from '../utils';

interface NFTGalleryPreviewProps {
  data?: Token;
  saleData?: Sale;
  className?: string;
}

export default function NFTGalleryPreview({
  data,
  saleData,
  className,
}: NFTGalleryPreviewProps) {
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
            className={`rounded-lg object-cover lg:h-72 lg:w-72 md:object-cover lg:object-fill lg:mx-auto ${className}`}
          />
          <div className="lg:mx-2">
            <div className="mt-1">
              <h1 className="font-semibold text-md text-left">
                {data?.metadata.title}
              </h1>
              <h1 className="font-medium text-left text-sm">
                {
                  // @ts-ignore: Unreachable code error
                  JSON.parse(data.metadata.extra)?.collection
                }
              </h1>
              <h1 className="font-medium text-left text-sm">
                {data?.owner_id}
              </h1>
            </div>
            <div className="mt-2">
              <div className="w-full p-px bg-figma-800 rounded-2xl drop-shadow-lg border border-figma-300">
                <p>{0} N</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
