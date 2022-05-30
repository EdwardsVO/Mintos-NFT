import { useRouter } from 'next/router';
import React from 'react';
import { useNear } from '../../hooks/useNear';
import Sale from '../../models/Sale';
import Token from '../../models/Token';
import WholeToken from '../../models/WholeToken';
import { initContract } from '../near/near';
import NFTGalleryPreview from '../NFT/NFTGalleryPreview';
import { ONE_NEAR_IN_YOCTO, toNEAR, toFixed } from '../utils';

export default function Profile() {
  const router = useRouter();
  const [tokens, setTokens] = React.useState<Array<Token>>([]);
  const [sales, setSales] = React.useState<Array<Sale>>([]);
  const [wholeDataSet, setWholeDataSet] = React.useState<Array<WholeToken>>([]);
  const [username, setUsername] = React.useState(null);
  const [balance, setBalance] = React.useState('');
  const [storage, setStorage] = React.useState('');
  const [amountForStorage, setAmountForStorage] = React.useState<string>('');
  const [nearContext, setNearContext] = useNear();
  // True view = market, False view = wallet
  const [changeView, setChangeView] = React.useState(true);
  const [marketTokens, setMarketTokens] = React.useState<Array<WholeToken>>([]);
  const [walletTokens, setWalletTokens] = React.useState<Array<WholeToken>>([]);

  const setStorageInNEAR = (e: any) => {
    const amount = Number(e) * ONE_NEAR_IN_YOCTO;
    const completeAmount = toFixed(amount).toString();
    setAmountForStorage(completeAmount);
  };

  const changePreferredView = () => {
    setChangeView(!changeView);
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
    // wholeData();
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

  return (
    <div>
      <div className="min-h-screen min-w-full mb-20">
        <div className="p-4">
          <div className="w-full my-7">
            <img src="/profile.png" alt="profile" className="w-40 mx-auto" />
          </div>
          <div className="text-center">
            <h2>User: {username}</h2>
            <h2>Email: email@mail.com</h2>
            <h2>Available Balance: {balance} NEAR</h2>
            <h2>Available Storage: {storage} NEAR</h2>
            <div className="text-center">
              <input
                type="text"
                placeholder="AGREGAR MONTO"
                onChange={(e) => {
                  setStorageInNEAR(e.target.value);
                }}
              />
              <button
                type="button"
                onClick={() => addStorageDeposit()}
                className="underline text-center"
              >
                add more storage
              </button>
            </div>
          </div>
          <div className="mt-6 px-4 flex justify-between mb-2 md:px-9">
            <h2 className="font-semibold text-2xl">My NFTs</h2>
            <button
              type="button"
              className="bg-figma-100 rounded text-figma-300 px-4 py-1 drop-shadow-md font-semibold"
              onClick={() => router.push('/app/mint')}
            >
              Mint
            </button>
          </div>
          <div className="flex justify-center space-x-12">
            <button
              className={`${
                changeView === true
                  ? 'underline decoration text-figma-100 text-semibold transition duration-300'
                  : ''
              }`}
              onClick={() => changePreferredView()}
            >
              Market
            </button>
            <button
              className={`${
                changeView === false
                  ? 'underline decoration text-figma-100 text-semibold transition duration-300'
                  : ''
              }`}
              onClick={() => changePreferredView()}
            >
              Wallet
            </button>
          </div>
          <div className="">
            {changeView ? (
              <div className="flex justify-center flex-col md:grid md:grid-cols-2 md:justify-items-center md:justify-between lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 2xl:justify-between">
                {marketTokens.map((nft) => (
                  <div key={nft?.token?.token_id} className="pt-4">
                    <NFTGalleryPreview
                      data={nft}
                      key={nft?.token?.token_id}
                      className="h-72 w-72"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center flex-col md:grid md:grid-cols-2 md:justify-items-center md:justify-between lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 2xl:justify-between">
                {walletTokens.map((nft) => (
                  <div key={nft?.token?.token_id} className="2xl:my-5">
                    <NFTGalleryPreview
                      data={nft}
                      key={nft?.token?.token_id}
                      className="h-72 w-72"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* {wholeDataSet ? (
              wholeDataSet.map((nft, i) => (
                <div key={i} className="px-6 py-3">
                  <NFTGalleryPreview data={nft} key={i} className="h-72 w-72" />
                </div>
              ))
            ) : (
              <div>Nothing to show yet...</div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
