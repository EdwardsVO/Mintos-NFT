import { useRouter } from 'next/router';
import React from 'react';
import Token from '../../models/Token';
import { initContract } from '../near/near';
import NFTGalleryPreview from '../NFT/NFTGalleryPreview';
import { toNEAR } from '../utils';

export default function Profile() {
  const router = useRouter();
  const [tokens, setTokens] = React.useState<Array<Token>>([]);
  const [username, setUsername] = React.useState(null);
  const [balance, setBalance] = React.useState('');
  const getGalleryData = async () => {
    const { contracts } = await initContract();
    // @ts-ignore: Unreachable code error
    setUsername(await contracts.nftContract.account.accountId);
    setTokens(
      // @ts-ignore: Unreachable code error
      await contracts.nftContract.nft_tokens_for_owner({
        account_id: await contracts.nftContract.account.accountId,
        from_index: '0',
        limit: 20,
      })
    );
    console.log(tokens);
    // @ts-ignore: Unreachable code error
    const balance_yocto = (
      await contracts.nftContract.account.getAccountBalance()
    ).total;
    setBalance(toNEAR(balance_yocto).toString());
  };

  React.useEffect(() => {
    getGalleryData();
  }, []);

  const myNftsData = [
    {
      token_id: 1001,
      owner_id: 'mzterdox.testnet',
      metadata: {
        title: 'title',
        description: 'dkd',
        media: '/12.png',
        price: 1000000000000000000000000,
      },
    },
    {
      token_id: 1002,
      owner_id: 'mzterdox.testnet',
      metadata: {
        title: 'title',
        description: 'dkd',
        media: '/123123123.png',
        price: 1000000000000000000000000,
      },
    },
    {
      token_id: 1003,
      owner_id: 'mzterdox.testnet',
      metadata: {
        title: 'title',
        description: 'dkd',
        media: '/Lion.jpg',
        price: 1000000000000000000000000,
      },
    },
  ];
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
            {tokens ? (
              tokens.map((nft, i) => (
                <div className="px-6 py-3">
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
