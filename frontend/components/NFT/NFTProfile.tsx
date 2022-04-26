import React from 'react';
import Sale from '../../models/Sale';
import Token from '../../models/Token';
import { initContract } from '../near/near';
import { toFixed, toNEAR, toYocto } from '../utils';
import { marketContractName, nftContractName } from '../../config';
import { useNear } from '../../hooks/useNear';

interface NFTProfileProps {
  data: Token;
}

export default function NFTProfile({ data }: NFTProfileProps) {
  const [username, setUsername] = React.useState<string>('');
  const [putSale, setPutSale] = React.useState<boolean>(false);
  const [newPrice, setNewPrice] = React.useState<number>(0);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [salePrice, setSalePrice] = React.useState('');
  const [nearContext, setNearContext] = useNear();
  const [saleData, setSaleData] = React.useState<Sale>();
  const [updateSale, setUpdateSale] = React.useState(false);

  const loadUserData = async () => {
    const NEAR = await initContract();
    setNearContext(NEAR);
    setUsername(await nearContext.contracts.nftContract.account.accountId);
    setLoaded(true);
  };

  const setPrice = (price) => {
    setNewPrice(toFixed(price));
  };

  const confirmSale = async () => {
    const condition = { sale_conditions: newPrice };
    //@ts-ignore: Unreachable code error
    await nearContext.contracts.nftContract.nft_approve(
      {
        token_id: data?.token_id,
        account_id: marketContractName,
        msg: JSON.stringify(condition),
      },
      '100000000000000',
      '440000000000000000000'
    );
  };

  const uniqueId = nftContractName + '.' + data?.token_id;

  const getSaleData = async () => {
    const sale =
      // @ts-ignore: Unreachable code error
      await nearContext.contracts.marketContract.get_sale({
        nft_contract_token: uniqueId,
      });
    setSaleData(await sale);
  };

  const setCurrentPrice = () => {
    setSalePrice(saleData?.sale_conditions);
  };

  const changeUpdateStatus = () => {
    setUpdateSale(!updateSale);
  };

  const removeFromSale = async () => {
    try {
      // @ts-ignore: Unreachable code error
      await nearContext.contracts.nftContract.nft_revoke(
        {
          token_id: data?.token_id,
          nft_contract_id: nearContext.contracts.nftContract,
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
        nft_contract_id: nearContext.contracts.marketContract, 
        token_id: data.token_id
      },
      '100000000000000',
      // @ts-ignore: Unreachable code error
      saleData.sale_conditions.price //FIXME this attribute needs to exist in the data received or saved in this page
      )
  }

  React.useEffect(() => {
    if (saleData) {
      setCurrentPrice();
    }
    loadUserData();
    getSaleData();
  }, [saleData]);
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
                {salePrice || '0'} NEARs
              </h2>
            </div>
          </div>
        </div>
        {data?.owner_id === username && loaded ? (
          <div>
            {saleData ? (
              <div className="flex justify-between mt-4 mx-3">
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
                <div>
                  <label htmlFor="price">NFT Price</label>
                  <input
                    type="number"
                    id="price"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
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
                onClick={()=>{purchaseToken()}}
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
