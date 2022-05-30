import { useRouter } from 'next/router';
import React from 'react';
import WholeToken from '../../models/WholeToken';
import Token from '../../models/Token';
import { ONE_NEAR_IN_YOCTO, toFixed } from '../utils';
import useUser from '../../hooks/useUser';

interface NFTGalleryPreviewProps {
  data?: WholeToken;
  className?: string;
}

export default function NFTGalleryPreview({
  data,
  className,
}: NFTGalleryPreviewProps) {
  const router = useRouter();
  const [user] = useUser();
  const [isLogged, setIsLogged] = React.useState(true);

  const checkUser = () => {
    if (user) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  };
  return (
    <div>
      {data !== undefined ? (
        <button
          type="button"
          className="group"
          onClick={() => router.push(`/app/nft/${data?.token?.token_id}`)}
          onMouseEnter={() => checkUser()}
          onMouseLeave={() => setIsLogged(true)}
        >
          <div className=" bg-figma-700 rounded-md drop-shadow-lg shadow-black ">
            <div className="p-4">
              <img
                src={
                  data?.token?.metadata?.media ||
                  'http://cdn.onlinewebfonts.com/svg/img_24787.png'
                }
                alt="peng"
                className={`rounded-lg object-cover lg:max-h-56 lg:w-56 md:object-cover lg:object-fill lg:mx-auto ${className}`}
              />
              <div className="lg:mx-2">
                <div className="mt-1">
                  <h1 className="font-semibold text-md text-left">
                    {data?.token?.metadata?.title}
                  </h1>
                  <h1 className="font-medium text-left text-sm">
                    {
                      // @ts-ignore: Unreachable code error
                      JSON.parse(data.token?.metadata?.extra)?.collection || ''
                    }
                  </h1>
                  <h1 className="font-medium text-left text-sm">
                    {data?.token?.owner_id}
                  </h1>
                </div>
                <div className="divide-y-4 divide-gray-200">
                  {isLogged ? (
                    <div className="mt-2">
                      <div className="w-full p-px bg-figma-800 rounded-2xl drop-shadow-lg border border-figma-300 group-hover:bg-gray-100/[.7] group-hover:border-gray-600/[.05]">
                        {data?.sale?.sale_conditions ? (
                          <div>
                            {`${
                              Number(data?.sale?.sale_conditions) /
                              ONE_NEAR_IN_YOCTO
                            } N`}
                          </div>
                        ) : (
                          <button>Put On Sale</button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-start">
                      <button className="text-figma-100 font-semibold text-md py-1.5">
                        Connect
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </button>
      ) : (
        <div>
          <h2>null</h2>
        </div>
      )}
    </div>
  );
}
