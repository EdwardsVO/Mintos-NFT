import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../../components/Layout';
import NFTProfile from '../../../components/NFT/NFTProfile';
import { useNear } from '../../../hooks/useNear';
import Token from '../../../models/Token';

export default function NFTProfilePage() {
  const router = useRouter();
  const [nft, setNft] = React.useState<Token>();
  const [nearContext] = useNear();

  const id = router.query.token_id;

  const start = async () => {
    const idInt = await router.query.token_id;
    const token_id = String(idInt);
    console.log(token_id.toString());
    try {
      if (token_id) {
        // @ts-ignore: Unreachable code error
        const token = await nearContext.contracts.nftContract.nft_token({
          token_id: token_id,
        });
        setNft(token);
      }
    } catch (e) {
      router.push('/app');
    }
  };

  React.useEffect(() => {
    if (!id) {
      return;
    }
    const startClass = async () => {
      await start();
    };
    startClass();
  }, [id]);

  return (
    <Layout>
      <div className="p-4">
        <NFTProfile data={nft} />
      </div>
    </Layout>
  );
}
