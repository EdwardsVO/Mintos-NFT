import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../../components/Layout';
import NFTProfile from '../../../components/NFT/NFTProfile';
import { nftContractName } from '../../../config';
import { useNear } from '../../../hooks/useNear';
import Sale from '../../../models/Sale';
import Token from '../../../models/Token';
import WholeToken from '../../../models/WholeToken';

export default function NFTProfilePage() {
  const router = useRouter();
  const [nft, setNft] = React.useState<Token>();
  const [sale, setSale] = React.useState<Sale>();
  const [wholeNftData, setWholeNftData] = React.useState<WholeToken>();
  const [nearContext] = useNear();

  const id = router.query.token_id;

  const start = async () => {
    const idInt = await router.query.token_id;
    const token_id = String(idInt);
    const uniqueId = nftContractName + '.' + token_id;
    console.log(token_id.toString());
    try {
      if (token_id) {
        // @ts-ignore: Unreachable code error
        const token = await nearContext.contracts.nftContract.nft_token({
          token_id: token_id,
        });
        setNft(token);
        const sale =
          // @ts-ignore: Unreachable code error
          await nearContext.contracts.marketContract.get_sale({
            nft_contract_token: uniqueId,
          });
        setSale(await sale);

        const wholeData: WholeToken = {
          sale: sale,
          token: token,
        };
        setWholeNftData(wholeData);
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
        <NFTProfile data={wholeNftData} />
      </div>
    </Layout>
  );
}
