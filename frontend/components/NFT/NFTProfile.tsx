import React from 'react';
import Sale from '../../models/Sale';
import Token from '../../models/Token';
import { initContract } from '../near/near';
import { ONE_NEAR_IN_YOCTO, toFixed, toNEAR, toYocto } from '../utils';
import { marketContractName, nftContractName } from '../../config';
import { useNear } from '../../hooks/useNear';
import WholeToken from '../../models/WholeToken';
import Input from '../inputs/Input';
import { useRouter } from 'next/router';
import useUser from '../../hooks/useUser';
import { useToast } from '@chakra-ui/react';

interface NFTProfileProps {
  data: WholeToken;
}

export default function NFTProfile({ data }: NFTProfileProps) {
  const [username, setUsername] = React.useState<string>('');
  const [putSale, setPutSale] = React.useState<boolean>(false);
  const [newPrice, setNewPrice] = React.useState<number>(0);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [nearContext, setNearContext] = useNear();
  const [currentPrice, setCurrentPrice] = React.useState('');
  const router = useRouter();
  const [user] = useUser();
  const toast = useToast();
  const loadUserData = async () => {
    const NEAR = await initContract();
    setNearContext(NEAR);
    try {
      setUsername(await nearContext.contracts.nftContract.account.accountId);
      setLoaded(true);
      setCurrentPrice(data?.sale?.sale_conditions);
    } catch (e) {
      router.push('/app/profile');
    }
  };

  const logIn = async () => {
    await nearContext.walletConnection.requestSignIn();
  };

  const setPrice = (price) => {
    const x = toFixed(price * ONE_NEAR_IN_YOCTO);
    setNewPrice(x);
  };

  const confirmSale = async () => {
    const condition = { sale_conditions: newPrice };
    //@ts-ignore: Unreachable code error
    await nearContext.contracts.nftContract.nft_approve(
      {
        token_id: data?.token?.token_id,
        account_id: marketContractName,
        msg: JSON.stringify(condition),
      },
      '100000000000000',
      '440000000000000000000'
    );
  };

  const changeUpdateStatus = () => {
    setPutSale(!putSale);
  };

  const removeFromSale = async () => {
    try {
      // @ts-ignore: Unreachable code error
      await nearContext.contracts.marketContract.remove_sale(
        {
          nft_contract_id: nearContext.contracts.nftContract.contractId,
          token_id: data?.token?.token_id,
        },
        '100000000000000',
        '1'
      );
    } catch (e) {
      console.log(e);
    }
  };

  const purchaseToken = async () => {
    // @ts-ignore: Unreachable code error
    await nearContext.contracts.marketContract.offer(
      {
        nft_contract_id: nearContext.contracts.nftContract.contractId,
        token_id: data.token?.token_id,
      },
      '300000000000000',
      data.sale.sale_conditions
    );
  };

  const putOnSale = async () => {
    const currentReservedBalance =
    // @ts-ignore: Unreachable code error
      await nearContext.contracts.marketContract.storage_balance_of({
        account_id: user.username,
      });
      const currentSalesSupply =
      // @ts-ignore: Unreachable code error
      await nearContext.contracts.marketContract.get_supply_by_owner_id({
        account_id: user.username,
      });

    const neededRersevedCapacity = (Number(currentSalesSupply) + 1) * 0.01;
    if ( await (Number(currentReservedBalance)/ONE_NEAR_IN_YOCTO) >= neededRersevedCapacity) {
      setPutSale(true);
      console.log('current: '+Number(currentReservedBalance)/ONE_NEAR_IN_YOCTO);
      console.log('needed: ' + neededRersevedCapacity)
      console.log('sales: ' + currentSalesSupply)
    } else {
      toast({
        title: "You need to cover storage per sale.",
        description: `Currently you have ${currentReservedBalance/ONE_NEAR_IN_YOCTO}NEARs for storage, needed ${neededRersevedCapacity}NEARs. Go to 'MyNFTs' page`,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  React.useEffect(() => {
    loadUserData();
  }, []);
  return (
    <div className="min-h-screen">
      <div className="mt-3 mx-3 lg:px-4 lg:w-full lg:text-center">
        <h2 className="text-figma-100 font-bold text-xl">
          {
            // @ts-ignore: Unreachable code error
            data?.metadata?.extra?.collection
          }
        </h2>
      </div>
      <div className="lg:w-full lg:flex lg:flex-col lg:mt-16">
        <div className="lg:flex lg:align-middle lg:justify-center lg:items-center lg:flex-col">
          <div className="lg:flex lg:justify-between lg:w-10/12 lg:h-imheight">
            <div className="border-b-2 mb-5 lg:hidden p-6">
              <div className="flex flex-col">
                <h2 className="text-2xl font-light mr-3 text-figma-400 ">
                  ID#{data?.token?.token_id}
                </h2>
                <h2 className="text-4xl font-semibold lg:text-6xl text-figma-400">
                  {data?.token?.metadata?.title}
                </h2>
              </div>
              <h2 className="text-2xl font-semibold text-figma-900">
                {data?.token?.owner_id}
              </h2>
            </div>
            <div className="rounded-xl lg:flex drop-shadow-lg shadow-black shadow-2xl mx-3 lg:w-imwidth lg:h-imheight lg:mx-auto">
              <img
                src={data?.token?.metadata?.media}
                alt={data?.token?.metadata?.title}
                className="rounded-xl object-fill lg:w-imwidth lg:h-imheight"
              />
            </div>
            <div className="w-full lg:w-1/2 text-left text-lg p-3 lg:p-10 lg:flex lg:flex-col mt-5 lg:mt-0 rounded-md bg-figma-300 shadow-lg overflow-scroll">
              <div className=" border-b-2 border-figma-900 mb-5 hidden lg:flex lg:flex-col lg:pb-5">
                <div className="flex flex-col">
                  <h2 className="text-4xl font-semibold lg:text-6xl text-figma-400">
                    {data?.token?.metadata?.title}
                  </h2>
                  <h2 className="text-2xl font-light mr-3 text-figma-400 ">
                    ID#{data?.token?.token_id}
                  </h2>
                </div>
                <h2 className="text-2xl font-semibold text-figma-900 mt-5">
                  {data?.token?.owner_id}
                </h2>
              </div>
              <div className="text-2xl font-semibold ">Description</div>
              <div className="lg:w-full lg:text-2xl lg:mt-2 lg:flex lg:items-center lg:align-middle">
                <div>{data?.token?.metadata?.description}</div>
              </div>
              <div className="w-full flex align-middle items-center mt-5">
                <div className="text-2xl lg:text-2xl font-semibold mr-2">
                  Copies:
                </div>
                <div>
                  {data?.token?.metadata?.copies ? (
                    <div>{data?.token?.metadata?.copies}</div>
                  ) : (
                    <div className="lg:text-2xl text-center align-middle">
                      <p>Unique</p>
                    </div>
                  )}
                </div>
              </div>
              <div className=" font-semibold text-2xl mt-5">
                Perpetual Royalties
              </div>
              <div className="flex">
                {data?.token?.royalty ? (
                  <div className="lg:text-2xl">
                    {Object.keys(data?.token?.royalty).map((accountId, idx) => {
                      return (
                        <div className="flex mt-2 space-x-8" key={idx}>
                          <div className="w-2/3 flex ">
                            <p>{accountId}:</p>
                          </div>
                          <div className="w-1/3 text-right pr-6">
                            <p>{data?.token?.royalty[accountId] / 100}%</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div>No Perpetual Royalties</div>
                )}
              </div>
              <div>
                <div className="flex mx-3 lg:mx-0 mt-5 lg:w-full lg:items-center justify-between">
                  <div className="text-2xl align-middle font-bold">
                    Current Price
                  </div>
                  <h2 className="text-2xl font-bold text-figma-900 border-gray-200 border-2 rounded-lg p-1">
                    {Number(data?.sale?.sale_conditions) / ONE_NEAR_IN_YOCTO ||
                      '0'}{' '}
                    Ⓝ
                  </h2>
                </div>
              </div>
              <div className="">
                {data?.token?.owner_id === username && loaded ? (
                  <>
                    {data?.sale ? (
                      <div className="flex justify-between mt-4">
                        <div>
                          <button
                            type="button"
                            className="w-full px-5 py-2 bg-figma-900 text-figma-300 font-semibold rounded-sm"
                            onClick={() => removeFromSale()}
                          >
                            Remove from Sale
                          </button>
                        </div>
                        <div>
                          <button
                            type="button"
                            className="w-full px-5 py-2 bg-figma-900 text-figma-300 font-semibold rounded-sm"
                            onClick={() => changeUpdateStatus()}
                          >
                            Update Sale
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div></div>
                    )}
                    {putSale  ? (
                      <div className="text-center justify-between mt-4">
                        <div className="flex justify-center">
                          <Input
                            type="number"
                            id="price"
                            label="NFT Price"
                            className="lg:w-auto"
                            placeholder={'NEAR Ⓝ'}
                            onChange={(e) => {
                              e.preventDefault();
                              setPrice(e.target.value);
                            }}
                          />
                        </div>
                        <div className="mt-4">
                          <button
                            type="button"
                            className="bg-figma-900 rounded-xl w-full lg:w-1/3 p-2 drop-shadow-2xl hover:shadow-figma-900 shadow-lg"
                            onClick={() => {
                              confirmSale();
                            }}
                          >
                            <p className="text-white  text-lg font-semibold">
                              Confirm Sale
                            </p>
                          </button>
                        </div>
                      </div>
                    ) : (
                      !data?.sale ? (
                      <div>
                        <div className="mt-8 lg:w-full lg:text-center">
                        <button
                          type="button"
                          className={`bg-figma-900 rounded-lg hover:shadow-figma-900 shadow-lg w-full lg:w-1/3 p-6 drop-shadow-2xl`}
                          onClick={() => {
                            putOnSale();
                          }}
                        >
                          <p className="text-figma-500 text-lg font-bold">
                            Put on Sale
                          </p>
                        </button>
                      </div>
                      </div>) : (<></>)
                    )}
                  </>
                ) : (
                  <div>
                    {user ? (
                      <div className="mt-8 lg:w-full lg:text-center">
                        <button
                          type="button"
                          className="bg-figma-100 rounded-xl w-full lg:w-1/3 p-2 drop-shadow-2xl"
                          onClick={() => {
                            purchaseToken();
                          }}
                        >
                          <p className="text-figma-500 text-lg font-semibold">
                            Buy Now
                          </p>
                        </button>
                      </div>
                    ) : (
                      <div className="mt-8 lg:w-full lg:text-center">
                        <button
                          type="button"
                          className="bg-figma-100 rounded-xl w-full lg:w-1/3 p-2 drop-shadow-2xl"
                          onClick={logIn}
                        >
                          <p className="text-figma-500 text-lg font-semibold">
                            Connect Wallet
                          </p>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
