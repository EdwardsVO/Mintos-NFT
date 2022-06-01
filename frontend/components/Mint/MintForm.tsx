import React from 'react';
import Input from '../inputs/Input';
import { create } from 'ipfs-http-client';
import { useNear } from '../../hooks/useNear';
import Token from '../../models/Token';
import ExtraMetadata from '../../models/ExtraMetadata';
import useUser from '../../hooks/useUser';
import { useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';

export default function MintForm() {
  const [name, setName] = React.useState<string>(null);
  const [collection, setCollection] = React.useState<string>(null);
  const [description, setDescription] = React.useState<string>(null);
  const [file, setFile] = React.useState([]);
  const [urlArr, setUrlArr] = React.useState<string>(null);
  const [nearContext] = useNear();
  const [user] = useUser();
  const [uploaded, setUploaded] = React.useState(false);
  const [tokensSupply, setTokensSupply] = React.useState<string>('');
  const [category, setCategory] = React.useState<string>('');

  const [royaltyBool, setRoyaltyBool] = React.useState<boolean>(false);
  const [royaltyAccount, setRoyaltyAccount] = React.useState<string>();
  const [royaltyAmount, setRoyaltyAmount] = React.useState<number>();
  const [royalties] = React.useState([]);
  const toast = useToast();

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
      toast({
        title: 'File Uploaded Successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const extra: ExtraMetadata = {
    collection: collection,
    category: category,
  };

  const token: Token = {
    owner_id: user.username,
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
    try {
      if (
        name === '' ||
        name === null ||
        description === '' ||
        description === null ||
        urlArr === '' ||
        urlArr === null
      ) {
        toast({
          title: 'Error',
          description: 'Please fill out every field before proceeding.',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      } else {
        if (royalties.length > 0) {
          let formattedRoyalties = {};
          royalties.forEach((r) => {
            formattedRoyalties[r.accountId] = parseFloat(String(r.value * 100));
          });
          console.log(formattedRoyalties);
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
            perpetual_royalties: {},
          },
          '300000000000000',
          '465000000000000000000000'
        );
      }
    } catch (error) {
      toast({
        title: error,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  React.useEffect(() => {
    getTotalSupply();
  });

  return (
    <div className="lg:flex lg:justify-center  lg:px-9 lg:items-center">
      <div className="flex lg:justify-center lg:items-center lg:align-middle">
        <div className="w-96 lg:mr-12">
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

        <motion.button
          type="button"
          className="w-full mt-4 h-16 lg:p-3  bg-figma-100 text-figma-300 font-semibold p-1 rounded-lg border border-solid drop-shadow-lg"
          onClick={() => handleSubmit()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.9 }}
        >
          Mint NFT
        </motion.button>
      </div>
      <div className="mt-7"></div>
    </div>
  );
}
