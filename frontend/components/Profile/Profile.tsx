import { useRouter } from 'next/router';
import React from 'react';
import { useNear } from '../../hooks/useNear';
import Sale from '../../models/Sale';
import Token from '../../models/Token';
import WholeToken from '../../models/WholeToken';
import Loader from '../common/Loader';
import FilterDropdown from '../dropdowns/FilterDropdown';
import { initContract } from '../near/near';
import NFTGalleryPreview from '../NFT/NFTGalleryPreview';
import { ONE_NEAR_IN_YOCTO, toNEAR, toFixed } from '../utils';
import { motion } from 'framer-motion';

export default function Profile() {
  const router = useRouter();
  const [tokens, setTokens] = React.useState<Array<Token>>([]);
  const [sales, setSales] = React.useState<Array<Sale>>([]);
  const [username, setUsername] = React.useState(null);
  const [balance, setBalance] = React.useState('');
  const [storage, setStorage] = React.useState('');
  const [amountForStorage, setAmountForStorage] = React.useState<string>('');
  const [nearContext, setNearContext] = useNear();
  // True view = market, False view = wallet
  const [changeView, setChangeView] = React.useState(true);
  const [marketTokens, setMarketTokens] = React.useState<Array<WholeToken>>([]);
  const [walletTokens, setWalletTokens] = React.useState<Array<WholeToken>>([]);
  const [filter, setFilter] = React.useState(0);
  const [loaded, setLoaded] = React.useState(false);

  const setStorageInNEAR = (e: any) => {
    const amount = Number(e) * ONE_NEAR_IN_YOCTO;
    const completeAmount = toFixed(amount).toString();
    setAmountForStorage(completeAmount);
  };

  const getGalleryData = async () => {
    const NEAR = await initContract();
    setNearContext(NEAR);
    // @ts-ignore: Unreachable code error
    setUsername(await nearContext.contracts.nftContract.account.accountId);
    setTokens(
      // @ts-ignore: Unreachable code error
      await nearContext.contracts.nftContract.nft_tokens_for_owner({
        account_id: await nearContext.contracts.nftContract.account.accountId,
        from_index: '0',
        limit: 20,
      })
    );
    // @ts-ignore: Unreachable code error
    const balance_yocto = (
      await nearContext.contracts.nftContract.account.getAccountBalance()
    ).total;
    setBalance(toNEAR(balance_yocto).toString());

    const available_storage =
      // @ts-ignore: Unreachable code error
      await nearContext.contracts.marketContract.storage_balance_of({
        account_id: nearContext.contracts.nftContract.account.accountId,
      });

    setStorage(await toNEAR(available_storage));
  };

  const getSalesData = async () => {
    const NEAR = await initContract();
    setNearContext(NEAR);
    const currentSales =
      // @ts-ignore: Unreachable code error
      await nearContext.contracts.marketContract.get_sales_by_owner_id({
        account_id:
          username || nearContext.contracts.nftContract.account.accountId,
        from_index: '0',
        limit: 10,
      });
    setSales(currentSales);
  };

  const getMarketTokens = async () => {
    const market = [];
    const saleTokenIds = [];
    const walletTokenIds = [];
    for (let x = 0; x < sales.length; x++) {
      saleTokenIds.push(sales[x].token_id);
    }
    for (let i = 0; i < tokens.length; i++) {
      walletTokenIds.push(tokens[i].token_id);
    }
    const intersection = walletTokenIds.filter((tokenId) =>
      saleTokenIds.includes(tokenId)
    );
    for (let index = 0; index < tokens.length; index++) {
      for (let x = 0; x < sales.length; x++) {
        for (let i = 0; i < intersection.length; i++) {
          if (
            tokens[index].token_id === intersection[i] &&
            tokens[index].token_id === sales[x].token_id
          ) {
            const f: WholeToken = {
              token: tokens[index],
              sale: sales[x],
            };
            market.push(f);
          }
        }
      }
      setMarketTokens(market);
    }
  };

  const getWalletTokens = async () => {
    const wallet = [];
    const saleTokenIds = [];
    const walletTokenIds = [];
    for (let x = 0; x < sales.length; x++) {
      saleTokenIds.push(sales[x].token_id);
    }
    for (let i = 0; i < tokens.length; i++) {
      walletTokenIds.push(tokens[i].token_id);
    }
    const intersection = walletTokenIds.filter(
      (tokenId) => !saleTokenIds.includes(tokenId)
    );
    for (let index = 0; index < tokens.length; index++) {
      for (let i = 0; i < intersection.length; i++) {
        if (tokens[index].token_id === intersection[i]) {
          const f: WholeToken = {
            token: tokens[index],
            sale: null,
          };
          wallet.push(f);
        }
      }
    }
    setWalletTokens(wallet);
  };

  const addStorageDeposit = async () => {
    // @ts-ignore: Unreachable code error
    nearContext.contracts.marketContract.storage_deposit(
      {
        account_id: username,
      },
      100000000000000,
      amountForStorage
    );
  };

  React.useEffect(() => {
    if (tokens.length === 0) {
      getGalleryData();
    }
    getSalesData();
    getMarketTokens();
    getWalletTokens();
  }, [sales]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen min-w-full mb-20">
      <div className="p-4 flex flex-col">
        <div className="w-full my-7">
          <img
            src="/profile.png"
            alt="profile"
            className="w-40 lg:w-60 mx-auto"
          />
        </div>
        <div className="flex flex-col justify-center align-middle items-center self-center p-3 text-lg lg:border-2 xrounded-lg  lg:w-1/2 shadow-2xl">
          <div className="w-full lg:flex lg:justify-between">
            <div className="lg:w-1/2 lg:p-6">
              <div className="text-4xl font-semibold text-center mb-5">
                User Data
              </div>
              <div className="flex justify-between w-full pb-2">
                <div className="font-semibold text-figma-100">User</div>{' '}
                <div className="font-bold">{username}</div>
              </div>
              <div className="flex justify-between w-full pb-2">
                <div className="font-semibold text-figma-100">Email </div>{' '}
                <div>Comming Soon</div>
              </div>
              <div className="flex justify-between w-full pb-2">
                <div className="font-semibold text-figma-100">Artist Name </div>{' '}
                <div>Comming Soon</div>
              </div>
              <div className="flex justify-between w-full pb-2">
                <div className="font-semibold text-figma-100">Role</div>{' '}
                <div>Comming Soon</div>
              </div>
              <div className="flex justify-between w-full pb-2">
                <div className="font-semibold text-figma-100">Range</div>{' '}
                <div>Comming Soon</div>
              </div>
              <div className="flex justify-between w-full pb-2">
                <div className="font-semibold text-figma-100">Init Date</div>{' '}
                <div>Comming Soon</div>
              </div>
            </div>
            <div className="lg:w-1/2 lg:p-6">
              <div className="text-4xl font-semibold mb-5 text-center mt-5 lg:mt-0">
                Market Data
              </div>
              <div className="flex justify-between w-full pb-2">
                <div className="font-semibold text-figma-100">NFTs Minted </div>{' '}
                <div>Comming Soon</div>
              </div>
              <div className="flex justify-between w-full pb-2">
                <div className="font-semibold text-figma-100">NFTs Sold </div>{' '}
                <div>Comming Soon</div>
              </div>
              <div className="flex justify-between w-full pb-2">
                <div className="font-semibold text-figma-100">Total Sales </div>{' '}
                <div>Comming Soon</div>
              </div>
              <div className="flex justify-between w-full pb-2">
                <div className="font-semibold text-figma-100">
                  Total Profit{' '}
                </div>{' '}
                <div>Comming Soon</div>
              </div>
              <div className="flex justify-between w-full lg:hidden mt-5 border-t-2 pt-5">
                <div className="font-light">Available Balance </div>{' '}
                <div className="font-bold">{balance} NEAR Ⓝ</div>
              </div>
              <div className="flex justify-between w-full">
                <div className="font-light">Reserved Storage</div>{' '}
                <div className="font-bold"> {storage} NEAR Ⓝ</div>
              </div>
              <div className="text-center mt-8 border-2 p-6">
                <p>Reserve Storage for Minting</p>
                <div className="flex justify-center align-middle items-center">
                  <input
                    type="number"
                    placeholder="Reserve Storage Ⓝ"
                    onChange={(e) => {
                      setStorageInNEAR(e.target.value);
                    }}
                    className="mr-6"
                  />
                  <button
                    type="button"
                    onClick={() => addStorageDeposit()}
                    className=" text-center bg-figma-100 rounded-full w-9 h-9 text-white hover:bg-figma-900"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 px-4 flex justify-between mb-2 md:px-9">
          <h2 className="font-semibold text-2xl">My NFTs</h2>
        </div>
        {tokens.length > 0 ? (
          <div>
            <div className="flex w-full justify-start px-4 mb-2 md:px-9 lg:px-8">
              <div>
                <FilterDropdown filter={filter} setFilter={setFilter} />
              </div>
            </div>
            <div className="">
              {filter === 0 ? (
                <div className="flex justify-center items-center flex-col md:grid md:grid-cols-2 md:justify-items-center md:justify-between lg:grid-cols-3 xl:grid-cols-4 lg:justify-between 2xl:grid-cols-6 2xl:justify-between">
                  {marketTokens.map((nft) => (
                    <div key={nft?.token?.token_id} className="2xl:my-3 pt-4">
                      <NFTGalleryPreview
                        data={nft}
                        key={nft?.token?.token_id}
                        className="h-72 w-72"
                      />
                    </div>
                  ))}
                  {walletTokens.map((nft) => (
                    <div key={nft?.token?.token_id} className="2xl:my-3 pt-4">
                      <NFTGalleryPreview
                        data={nft}
                        key={nft?.token?.token_id}
                        className="h-72 w-72"
                      />
                    </div>
                  ))}
                </div>
              ) : null}
              {filter === 1 ? (
                <div className="flex justify-center items-center flex-col md:grid md:grid-cols-2 md:justify-items-center md:justify-between lg:grid-cols-3 xl:grid-cols-4 lg:justify-between 2xl:grid-cols-6 2xl:justify-between">
                  {marketTokens.map((nft) => (
                    <div key={nft?.token?.token_id} className="2xl:my-3 pt-4">
                      <NFTGalleryPreview
                        data={nft}
                        key={nft?.token?.token_id}
                        className="h-72 w-72"
                      />
                    </div>
                  ))}
                </div>
              ) : null}
              {filter === 2 ? (
                <div className="flex justify-center items-center flex-col md:grid md:grid-cols-2 md:justify-items-center md:justify-between lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 2xl:justify-between">
                  {walletTokens.map((nft) => (
                    <div key={nft?.token?.token_id} className="2xl:my-3 pt-4">
                      <NFTGalleryPreview
                        data={nft}
                        key={nft?.token?.token_id}
                        className="h-72 w-72"
                      />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col justify-center items-center align-middle p-11">
            <div className="font-bold lg:text-2xl flex text-center">
              <img src="/planet_logo.png" className="w-10" alt="" />
              <div className="">No NFTs created or bought</div>
              <img src="/planet_logo.png" className="w-10" alt="" />
            </div>
            <div className="mt-5 font-thin text-xl text-center">
              Reserve Storage and Start Minting
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
