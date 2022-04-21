import React from 'react';
import Input from '../inputs/Input';
import { create } from 'ipfs-http-client';
import { useNear } from '../../hooks/useNear';
import Token from '../../models/Token';
import useUser from '../../hooks/useUser';
import { ONE_NEAR_IN_YOCTO, toFixed } from '../utils';

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

  // @ts-ignore: Unreachable code error
  const client = create('https://ipfs.infura.io:5001/api/v0');

  const getTotalSupply = async () => {
    // @ts-ignore: Unreachable code error
    var tokenId = await nearContext.contracts.nftContract.nft_total_supply();
    setTokensSupply(tokenId)
  }

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

  const token: Token = {
    receiver_id: user,
    token_id: tokensSupply,
    metadata: {
      title: name,
      description: description,
      media: urlArr,
      media_hash: 'imagenenimagenimagenasdfasdfaiasdfam',
    },
  };

  const handleSubmit = async () => {
    alert(tokensSupply)
    // @ts-ignore: Unreachable code error
    await nearContext.contracts.nftContract.nft_mint(
      { token_id: token.token_id, metadata: token.metadata, receiver_id: token.receiver_id },
      '300000000000000',
      '465000000000000000000000'
    );
  };

  React.useEffect(() => {
    getTotalSupply();
  })

  return (
    <div className="lg:flex lg:justify-center lg:items-center lg:align-middle lg:p-9">
      <div className="flex lg:justify-center lg:items-center lg:align-middle">
        <div className="mb-3 w-96">
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
        <button
          type="button"
          className="w-full lg:p-3  bg-figma-100 text-figma-300 font-semibold p-1 rounded-lg border border-solid drop-shadow-lg"
          onClick={() => {
            handleSubmit();
          }}
        >
          Mint NFT
        </button>
        <button onClick={()=>{console.log(tokensSupply)}}>
          TEST ID
        </button>
      </div>
      <div className="mt-7"></div>
    </div>
  );
}
