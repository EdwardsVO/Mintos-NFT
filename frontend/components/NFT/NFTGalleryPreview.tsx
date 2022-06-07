import { useRouter } from 'next/router';
import React from 'react';
import WholeToken from '../../models/WholeToken';
import { ONE_NEAR_IN_YOCTO } from '../utils';
import useUser from '../../hooks/useUser';
import { useNear } from '../../hooks/useNear';
import { CopyIcon } from '../icons';
import { useToast } from '@chakra-ui/toast';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import NFTModal from './NFTModal';

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
  const [nearContext] = useNear();
  const toast = useToast();
  const [modalOpen, setModalOpen] = React.useState(false);

  const logIn = async () => {
    await nearContext.walletConnection.requestSignIn();
  };

  const copy = () => {
    navigator.clipboard.writeText(
      `https://mintosnft.app/app/nft/${data?.token?.token_id}`
    );
    toast({
      title: 'Copied to clipboard.',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    });
  };

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
        <motion.div>
          <button
            type="button"
            className="group mt-0"
            onMouseEnter={() => checkUser()}
            onMouseLeave={() => setIsLogged(true)}
            // onClick={() => setModalOpen(true)}
          >
            <motion.div
              className="bg-figma-700 rounded-md drop-shadow-lg shadow-black hover:bg-gray-400/[.1]"
              whileHover={{ scale: 1.1 }}
            >
              <div className="p-4">
                <img
                  src={
                    data?.token?.metadata?.media ||
                    'http://cdn.onlinewebfonts.com/svg/img_24787.png'
                  }
                  alt="peng"
                  className={`rounded-lg object-cover lg:max-h-56 lg:w-56 md:object-cover lg:object-fill lg:mx-auto ${className}`}
                  // onClick={() => setModalOpen(true)}
                  onClick={() =>
                    router.push(`/app/nft/${data?.token?.token_id}`)
                  }
                />
                <div className="lg:mx-2">
                  <div
                    className="mt-1"
                    // onClick={() => setModalOpen(!modalOpen)}
                    onClick={() =>
                      router.push(`/app/nft/${data?.token?.token_id}`)
                    }
                  >
                    <h1 className="font-semibold text-md text-xl text-left">
                      {data?.token?.metadata?.title}
                    </h1>
                    <h1 className="font-medium text-left text-sm">
                      {
                        // @ts-ignore: Unreachable code error
                        JSON.parse(data.token?.metadata?.extra)?.collection ||
                          'No Collection'
                      }
                    </h1>
                    <h1 className="font-medium text-left text-sm text-figma-100">
                      {data?.token?.owner_id}
                    </h1>
                  </div>
                  <div>
                    {isLogged ? (
                      <div className="mt-4 flex justify-between align-middle items-center">
                        {data?.sale?.sale_conditions ? (
                          <button className="font-bold p-1 border border-gray-100 rounded-md hover:border-figma-900">
                            See Details
                          </button>
                        ) : (
                          <div></div>
                        )}
                        <div className="">
                          {data?.sale?.sale_conditions ? (
                            <div className="font-bold text-lg text-figma-900">
                              {`${
                                Number(data?.sale?.sale_conditions) /
                                ONE_NEAR_IN_YOCTO
                              } Ⓝ`}
                            </div>
                          ) : (
                            <button className="font-bold p-1">
                              Put on Sale
                            </button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between">
                          <a
                            className="text-figma-100 mt-4 font-semibold text-md py-1.5 hover:text-figma-900"
                            onClick={logIn}
                          >
                            Connect
                          </a>
                          <a
                            className="hover:bg-gray-600/[.05] mt-4 align-middle flex items-center justify-center px-3 rounded-md text-center"
                            onClick={() => copy()}
                            title="Copy Link"
                          >
                            <CopyIcon className="w-5" />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </button>
        </motion.div>
      ) : (
        <div>
          <h2>null</h2>
        </div>
      )}
    </div>
  );
}
