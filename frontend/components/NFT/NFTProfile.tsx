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
      <div className="lg:w-full lg:flex lg:flex-col">
        <div className="lg:flex lg:align-middle lg:justify-center lg:items-center lg:flex-col">
          <div className="p-6">
            <div className="flex items-center align-middle">
              <h2 className="text-xl font-light mr-3 text-figma-400">
                ID#{data?.token?.token_id}
              </h2>
              <h2 className="text-2xl font-semibold lg:text-3xl text-figma-400">
                {data?.token?.metadata?.title}
              </h2>
            </div>
            <h2 className="text-xl font-semibold text-figma-100">
              {data?.token?.owner_id}
            </h2>
          </div>
          <div className=" bg-figma-300 rounded-3xl lg:flex drop-shadow-lg shadow-black p-5 mx-3 mt-2 lg:max-w-xl lg:mx-auto">
            <img
              src={data?.token?.metadata?.media}
              alt={data?.token?.metadata?.title}
              className="rounded-3xl object-cover"
            />
          </div>
          <div className="w-full text-center text-lg p-3">
            {data?.token?.metadata?.description}
          </div>
          <div>{data?.token?.perpetual_royalties}</div>
        </div>
        <div className="flex mx-3 lg:mx-0 justify-between mt-3 lg:w-full lg:justify-center">
          <div className="flex w-full lg:w-1/3 justify-between lg:px-8">
            <div className="flex w-full mt-2 items-center align-middle border-t-2 justify-between pt-5">
              <div className="text-xl font-semibold">Price</div>
              <h2 className="text-xl font-bold text-figma-400 border-gray-200 border-2 rounded-lg p-1">
                {Number(data?.sale?.sale_conditions) / ONE_NEAR_IN_YOCTO || '0'}{' '}
                NEAR
              </h2>
            </div>
          </div>
        </div>
        {data?.token?.owner_id === username && loaded ? (
          <div>
            {data?.sale ? (
              <div className="flex justify-between mt-4 mx-3 lg:justify-center lg:space-x-64">
                <div>
                  <button
                    type="button"
                    className="w-full px-5 py-2 bg-figma-100 text-figma-300 font-semibold rounded-lg"
                    onClick={() => changeUpdateStatus()}
                  >
                    Update Sale
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="w-full px-5 py-2 bg-figma-100 text-figma-300 font-semibold rounded-lg"
                    onClick={() => removeFromSale()}
                  >
                    Remove from Sale
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-8 lg:w-full lg:text-center">
                <button
                  type="button"
                  className={`bg-figma-100 rounded-xl w-full lg:w-1/3 p-2 drop-shadow-2xl`}
                  onClick={() => setPutSale(true)}
                >
                  <p className="text-figma-500 text-lg font-semibold">
                    Put on Sale!
                  </p>
                </button>
              </div>
            )}
            {putSale ? (
              <div className="text-center justify-between mt-4">
                <div className="flex justify-center">
                  <Input
                    type="text"
                    id="price"
                    label="NFT Price"
                    className="lg:w-auto"
                    placeholder={(
                      Number(currentPrice) / ONE_NEAR_IN_YOCTO
                    ).toString()}
                    onChange={(e) => {
                      e.preventDefault();
                      setPrice(e.target.value);
                    }}
                  />
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    className="bg-figma-100 rounded-xl w-full lg:w-1/3 p-2 drop-shadow-2xl"
                    onClick={() => {
                      confirmSale();
                    }}
                  >
                    <p className="text-figma-500 text-lg font-semibold">
                      Confirm Sale
                    </p>
                  </button>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
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
  );
}
