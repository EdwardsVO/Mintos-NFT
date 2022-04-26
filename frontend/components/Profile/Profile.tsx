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
    wholeData();
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
    wholeData();
  };

  const wholeData = () => {
    let wholeDataArray = [];
    for (let index = 0; index < sales.length; index++) {
      for (let j = 0; j < tokens.length; j++) {
        if (sales[index].token_id === tokens[j].token_id) {
          let wholeToken: WholeToken = {
            owner_id: tokens[j].owner_id,
            token_id: tokens[j].token_id,
            account_id: sales[index].account_id,
            nft_contract_id: sales[index].nft_contract_id,
            approval_id: sales[index].approval_id,
            sale_conditions: sales[index].sale_conditions,
            metadata: tokens[j].metadata,
            approved_accounts_id: tokens[j].approved_accounts_id,
            royalties: tokens[j].royalties,
          };
          wholeDataArray.push(wholeToken);
        }
      }
    }
    setWholeDataSet(wholeDataArray);
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
  }, [sales]);

  return (
    <div>
      <div className="min-h-screen min-w-full mb-20">
        <div className="p-4">
          <div className="lg:hidden">
            <img src="/logo.png" alt="logo" className="w-36" />
          </div>
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
          <div className="mt-6 px-4 flex justify-between mb-2">
            <h2 className="font-semibold text-2xl">My NFTs</h2>
            <button
              type="button"
              className="bg-figma-100 rounded text-figma-300 px-4 py-1 drop-shadow-md font-semibold"
              onClick={() => router.push('/app/mint')}
            >
              Mint
            </button>
          </div>
          <div className="md:grid md:grid-cols-2 md:gap-4 text-center">
            {wholeDataSet ? (
              wholeDataSet.map((nft, i) => (
                <div key={i} className="px-6 py-3">
                  <NFTGalleryPreview data={nft} key={i} className="h-72 w-72" />
                </div>
              ))
            ) : (
              <div>Nothing to show yet...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
