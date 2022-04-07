import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../../components/Layout';
import NFTProfile from '../../../components/NFT/NFTProfile';

export default function NFTProfilePage() {
  const router = useRouter();
  const [nft, setNft] = React.useState({});
  const activeNFT = router.query._id;
  const galleryData = [
    {
      _id: 0,
      title: 'Lion King',
      price: 10,
      collection: 'Collection Name',
      banner: '/Lion.jpg',
      owner: 'mzterdox.near',
    },
    {
      _id: 1,
      title: 'NEARLien 0',
      price: 10,
      collection: 'Collection Name',
      banner: '/12.png',
      owner: 'mzterdox.near',
    },
    {
      _id: 2,
      title: 'Blitzcreg Bop',
      price: 10,
      collection: 'Collection Name',
      banner: '/blitz.png',
      owner: 'mzterdox.near',
    },
    {
      _id: 3,
      title: 'Yakuza Kuza',
      price: 10,
      collection: 'Collection Name',
      banner: '/yakuza.png',
      owner: 'mzterdox.near',
    },
  ];

  React.useEffect(() => {
    const getNFTData = () => {
      for (let x = 0; x < galleryData.length; x++) {
        if (galleryData[x]._id.toString() == activeNFT) {
          setNft(galleryData[x]);
        }
      }
    };
    getNFTData();
  }, [activeNFT]);
  return (
    <Layout>
      <div className="p-4">
        <NFTProfile data={nft} />
      </div>
    </Layout>
  );
}
