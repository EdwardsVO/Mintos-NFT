import React from 'react';
import Input from '../inputs/Input';
import { create } from 'ipfs-http-client';
import { useNear } from '../../hooks/useNear';
import Token from '../../models/Token';
import ExtraMetadata from '../../models/ExtraMetadata';
import useUser from '../../hooks/useUser';
import { ONE_NEAR_IN_YOCTO, toFixed } from '../utils';
import Royalties from '../../models/Royalties';
import { useRouter } from 'next/router';
import useMint  from '../../hooks/useMint';

export default function MintForm() {
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [collection, setCollection] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [file, setFile] = React.useState([]);
  const [urlArr, setUrlArr] = React.useState<string>('');
  const [nearContext] = useNear();
  const [user] = useUser();
  const [uploaded, setUploaded] = React.useState(false);
  const [tokensSupply, setTokensSupply] = React.useState<string>('');
  const [category, setCategory] = React.useState<string>('');
  const [royaltiesList, setRoyaltiesList] = React.useState<Array<Royalties>>(
    []
  );
  const [royaltyBool, setRoyaltyBool] = React.useState<boolean>(false);
  const [royaltyAccount, setRoyaltyAccount] = React.useState<string>();
  const [royaltyAmount, setRoyaltyAmount] = React.useState<number>();
  const [royalties] = React.useState([]);
  const [mintContext, setMintContext] = useMint();
  const router = useRouter();

  // @ts-ignore: Unreachable code error
  const client = create('https://ipfs.infura.io:5001/api/v0');

  const getTotalSupply = async () => {
    // @ts-ignore: Unreachable code error
    var tokenId = await nearContext.contracts.nftContract.nft_total_supply();
    setTokensSupply(tokenId);
  };

  const confirmRoyalty = () => {
    royalties.push({
      accountId: royaltyAccount,
      value: royaltyAmount,
    });
    setRoyaltyBool(false);
    setRoyaltyAccount('');
    setRoyaltyAmount(0);
  };

  const addNewRoyalty = () => {
    setRoyaltyBool(true);
  };

  const retrieveFile = async (e) => {
    e.preventDefault();
    setUploaded(false);
    const data = e.target.files[0];
    setFile(e.target.files[0]);
    try {
      const created = await client.add(data);
      setUploaded(true);
      const url = `https://ipfs.infura.io/ipfs/${created.path}`;
      setUrlArr(url);
      console.log('File uploaded ', url);
      console.log(file);
    } catch (error) {
      console.log(error.message);
    }
  };

  const extra: ExtraMetadata = {
    collection: collection,
    category: category,
  };

  const token: Token = {
    owner_id: user,
    token_id: tokensSupply,
    metadata: {
      title: name,
      description: description,
      media: urlArr,
      media_hash: 'imagenenimagenimagenasdfasdfaiasdfam',
      extra: JSON.stringify(extra),
    },
  };

  const handleSubmit = async () => {
    if (royalties.length > 0) {
      let formattedRoyalties = {};
      royalties.forEach((r) => {
        formattedRoyalties[r.accountId] = parseFloat(String(r.value * 100));
      });
      // @ts-ignore: Unreachable code error
      await nearContext.contracts.nftContract.nft_mint(
        {
          token_id: token.token_id,
          metadata: token.metadata,
          receiver_id: token.owner_id,
          perpetual_royalties: formattedRoyalties,
        },
        '300000000000000',
        '465000000000000000000000'
      );
    }
    // @ts-ignore: Unreachable code error
    await nearContext.contracts.nftContract.nft_mint(
      {
        token_id: token.token_id,
        metadata: token.metadata,
        receiver_id: token.owner_id,
        perpetual_royalties: { 'mzterdox.testnet': 10 },
      },
      '300000000000000',
      '465000000000000000000000'
    );
  };

  React.useEffect(() => {
    console.log(mintContext)
    getTotalSupply();
  });

  return (
    <div className="lg:flex lg:justify-center lg:items-center lg:align-middle lg:p-9 h-screen">
      <div className="flex lg:justify-center lg:items-center lg:align-middle">
        <div className="mb-3 w-96 lg:mr-12">
          <div className={`${uploaded ? 'flex' : 'hidden'}`}>
            <img src={urlArr} alt="" className="w-72 h-72" />
          </div>
          <label htmlFor="formFile" className="inline-block mb-2 text-gray-700">
            NFT File *
          </label>
          <input
            required
            className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none lg:border-0 lg:bg-figma-200"
            type="file"
            id="formFile"
            onChange={(e) => {
              retrieveFile(e);
            }}
          />
          <h2 className={`${uploaded ? 'inline-block' : 'hidden'}`}>
            File Uploaded Succesfully!
          </h2>
        </div>
      </div>
      <div className="lg:w-1/2 ">
        <Input
          required
          label="Name *"
          name="name"
          type="text"
          placeholder="Enter NFT's Name"
          value={name}
          onChange={(e) => {
            e.preventDefault();
            setName(e.target.value);
          }}
        />

        <Input
          required
          label="Price *"
          name="price"
          type="number"
          placeholder="Enter NFT's Price in NEAR"
          value={price}
          onChange={(e) => {
            e.preventDefault();
            setPrice(e.target.value);
          }}
        />
        <Input
          label="Collection"
          name="collection"
          type="text"
          placeholder="Enter NFT's collection (Optional)"
          value={collection}
          onChange={(e) => {
            e.preventDefault();
            setCollection(e.target.value);
          }}
        />
        <Input
          required
          label="Description *"
          name="description"
          type="textarea"
          value={description}
          onChange={(e) => {
            e.preventDefault();
            setDescription(e.target.value);
          }}
        />

        <div className="p-6">
          {royalties.map((r, index) => (
            <h2 key={index}>
              {index + 1}.- {r.accountId}: {r.value}
            </h2>
          ))}
        </div>

        <div>
          {royaltyBool ? (
            <div className="flex justify-center self-center align-middle items-center p-3">
              <Input
                required
                label=""
                placeholder="mintos.near"
                name="Account"
                type="text"
                onChange={(e) => {
                  e.preventDefault();
                  setRoyaltyAccount(e.target.value);
                }}
              />
              <Input
                className="w-11 mx-4"
                required
                label=""
                placeholder="%"
                name="Amount"
                type="number"
                onChange={(e) => {
                  e.preventDefault();
                  setRoyaltyAmount(e.target.value);
                }}
              />
              <div>
                <button
                  type="button"
                  className="bg-figma-100  text-figma-300 rounded-full text-center h-9 w-9 font-bold hover:bg-figma-900"
                  onClick={() => {
                    confirmRoyalty();
                  }}
                >
                  +
                </button>
              </div>
            </div>
          ) : null}
        </div>

        <div className="lg:flex lg:justify-center lg:items-center lg:align-middle">
          <button
            type="button"
            className="w-full lg:w-60 lg:p-3 text-figma-100  font-semibold p-1 rounded-lg border border-solid border-figma-100 drop-shadow-lg"
            onClick={() => {
              addNewRoyalty();
            }}
          >
            Add Perpetual Royalties
          </button>
        </div>
        <button
          type="button"
          className="w-full mt-4 h-16 lg:p-3  bg-figma-100 text-figma-300 font-semibold p-1 rounded-lg border border-solid drop-shadow-lg"
          onClick={() => {
            handleSubmit();
          }}
        >
          Mint NFT
        </button>
      </div>
      <div className="mt-7"></div>
    </div>
  );
}
