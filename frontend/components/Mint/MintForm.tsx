import React from 'react';
import Input from '../inputs/Input';
import { create } from 'ipfs-http-client';
import { useNear } from '../../hooks/useNear';
import Token from '../../models/Token';
import useUser from '../../hooks/useUser';
import { ONE_NEAR_IN_YOCTO } from '../utils';
import { useRouter } from 'next/router';

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

  // @ts-ignore: Unreachable code error
  const client = create('https://ipfs.infura.io:5001/api/v0');

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

  // const upload = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const created = await client.add(file);
  //     const url = `https://ipfs.infura.io/ipfs/${created.path}`;
  //     setUrlArr(url);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const token: Token = {
    owner_id: user,
    metadata: {
      title: name,
      price: BigInt(price * ONE_NEAR_IN_YOCTO).toString(),
      description: description,
      media: urlArr,
      media_hash: 'imagenenimagenimagenasdfasdfaiasdfam',
      on_sale: true,
    },
  };

  const handleSubmit = async () => {
    // @ts-ignore: Unreachable code error
    await nearContext.contract.minar(
      { token_owner_id: token.owner_id, token_metadata: token.metadata },
      '300000000000000',
      '465000000000000000000000'
    );
  };

  return (
    <div>
      <div className="flex">
        <div className="mb-3 w-96">
          <div className={`${uploaded ? 'flex' : 'hidden'}`}>
            <img src={urlArr} alt="" className="w-72 h-72" />
          </div>
          <label htmlFor="formFile" className="inline-block mb-2 text-gray-700">
            NFT File *
          </label>
          <input
            required
            className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="file"
            id="formFile"
            onChange={(e) => {
              retrieveFile(e);
            }}
          />
          <h2 className={`${uploaded ? 'inline-block' : 'hidden'}`}>
            File Uploaded Succesfully!
          </h2>
          {/* <button
            onClick={(d) => {
              upload(d);
            }}
            className="p-3 bg-figma-100 hover:bg-blue-800 rounded-lg"
          >
            Upload
          </button> */}
        </div>
      </div>
      <div>
        <Input
          required
          label="Name *"
          name="name"
          type="text"
          placeholder="Enter NFT's Name"
          value={name}
          onChange={(e) => {
            e.preventDefault();
            setName((e.target.value));
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
            setPrice((e.target.value));
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
      </div>
      <div className="mt-7">
        <button
          type="button"
          className="w-full bg-figma-100 text-figma-300 font-semibold p-1 rounded-lg border border-solid drop-shadow-lg"
          onClick={() => {
            handleSubmit();
          }}
        >
          Mint NFT
        </button>
      </div>
    </div>
  );
}
