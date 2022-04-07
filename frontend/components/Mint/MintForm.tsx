import React from 'react';
import Input from '../inputs/Input';

export default function MintForm() {
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [collection, setCollection] = React.useState('');
  const [description, setDescription] = React.useState('');
  return (
    <div>
      <div className="flex justify-center">
        <div className="mb-3 w-96">
          <label htmlFor="formFile" className="inline-block mb-2 text-gray-700">
            NFT File *
          </label>
          <input
            required
            className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="file"
            id="formFile"
          />
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
      </div>
      <div className="mt-7">
        <button
          type="button"
          className="w-full bg-figma-100 text-figma-300 font-semibold p-1 rounded-lg border border-solid drop-shadow-lg"
        >
          Mint NFT
        </button>
      </div>
    </div>
  );
}
