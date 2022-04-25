import React from 'react';
import Sale from '../../models/Sale';
import Token from '../../models/Token';
import { initContract } from '../near/near';
import { toFixed, toNEAR, toYocto } from '../utils';
import { marketContractName } from '../../config';

interface NFTProfileProps {
  data: Token;
  sale?: Sale;
}

export default function NFTProfile({ data, sale }: NFTProfileProps) {
  const [username, setUsername] = React.useState<string>('');
  const [putSale, setPutSale] = React.useState<boolean>(false);
  const [newPrice, setNewPrice] = React.useState<number>(0);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const loadUserData = async () => {
    const { contracts } = await initContract();
    setUsername(await contracts.nftContract.account.accountId);
    setLoaded(true);
  };

  const setPrice = (price) => {
    setNewPrice((price));
  };

  const confirmSale = async () => {
    const { contracts } = await initContract();
    const condition = { sale_conditions: newPrice };
    //@ts-ignore: Unreachable code error
    await contracts.nftContract.nft_approve(
      {
        token_id: data?.token_id,
        account_id: marketContractName,
        msg: JSON.stringify(condition),
      },
      "100000000000000", 
      "440000000000000000000"
    );
  };

  React.useEffect(() => {
    loadUserData();
  }, []);
  return (
    <div>
      <div className="lg:hidden">
        <img src="/logo.png" alt="logo" className="w-36" />
      </div>
      <div className="mt-6 mx-3 lg:px-4 lg:w-full lg:text-center">
        <h2 className="text-figma-100 font-bold text-xl">
          {
            // @ts-ignore: Unreachable code error
            data?.metadata?.extra?.collection
          }
        </h2>
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
                {data?.owner_id}
              </h2>
            </div>
            <div className="mt-2">
              <h2 className="text-xl font-bold text-figma-400 ">
                {toNEAR(sale?.sale_conditions || '0')}
                NEARs
              </h2>
            </div>
          </div>
        </div>
        {data?.owner_id === username && loaded ? (
          <div>
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
            {putSale ? (
              <div className="text-center justify-between mt-4">
                <div>
                  <label htmlFor="price">NFT Price</label>
                  <input
                    type="number"
                    id="price"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                {newPrice}
                <div className="mt-4">
                  <button
                    type="button"
                    className="bg-figma-100 rounded-xl w-full lg:w-1/3 p-2 drop-shadow-2xl"
                    onClick={() => confirmSale()}
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
            <div className="mt-8 lg:w-full lg:text-center">
              <button
                type="button"
                className="bg-figma-100 rounded-xl w-full lg:w-1/3 p-2 drop-shadow-2xl"
              >
                <p className="text-figma-500 text-lg font-semibold">Buy Now</p>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
