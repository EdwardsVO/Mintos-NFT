import React from 'react';
import NFTGalleryPreview from '../NFT/NFTGalleryPreview';
import SearchBarDesktop from '../Searchbar/SearchBarDesktop';
import Token from '../../models/Token';
import { initContract } from '../near/near';
import { ViewGridIcon, ViewListIcon } from '../icons';
import Sale from '../../models/Sale';
import WholeToken from '../../models/WholeToken';
import { useNear } from '../../hooks/useNear';
import SearchBar from '../Searchbar/SearchBar';

export default function GalleryInfo() {
  const [tokens, setTokens] = React.useState<Array<Token>>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [tokensPerPage] = React.useState(20);
  const [indexFirstNFT, setIndexFirstNFT] = React.useState('0');
  const [sales, setSales] = React.useState<Array<Sale>>([]);
  const [searchBarTokens, setSearchBarTokens] =
    React.useState<Array<Token>>(null);
  const [view, setView] = React.useState('grid');
  const [wholeDataSet, setWholeDataSet] = React.useState<WholeToken[]>([]);
  const [nearContext, setNearContext] = useNear();

  const getSalesData = async () => {
    const NEAR = await initContract();
    setNearContext(NEAR);
    const currentSales =
      // @ts-ignore: Unreachable code error
      await NEAR.contracts.marketContract.get_sales_by_nft_contract_id({
        nft_contract_id: NEAR.contracts.nftContract.contractId,
        from_index: indexFirstNFT,
        limit: tokensPerPage,
      });
    setSales(currentSales);
    wholeData();
  };

  const getTokens = async () => {
    let currentTokens = [];
    await sales.map(async (token) => {
      // @ts-ignore: Unreachable code error
      let tokenIterable = await nearContext.contracts.nftContract.nft_token({
        token_id: token.token_id,
      });
      currentTokens.push(tokenIterable);
    });
    setTokens(currentTokens);
  };

  const wholeData = () => {
    let wholeDataArray = [];
    for (let index = 0; index < sales.length; index++) {
      for (let j = 0; j < tokens.length; j++) {
        if (sales[index].token_id === tokens[j].token_id) {
          let wholeToken: WholeToken = {
            sale: sales[index],
            token: tokens[j],
          };
          wholeDataArray.push(wholeToken);
        }
      }
    }
    setWholeDataSet(wholeDataArray);
  };

  const next = () => {
    setCurrentPage(currentPage + 1);
    setIndexFirstNFT((Number(indexFirstNFT) + tokensPerPage).toPrecision());
  };

  React.useEffect(() => {
    if (tokens.length === 0) {
      getTokens();
    }
    getSalesData();
  }, [sales]);

  const categories = [
    {
      _id: 0,
      title: 'All',
      availableNfts: 99,
      banner: '/123123123.png',
    },
    {
      _id: 1,
      title: 'Aliens',
      availableNfts: 32,
      banner: '/123123123.png',
    },
    {
      _id: 2,
      title: 'Animals',
      availableNfts: 43,
      banner: '/123123123.png',
    },
    {
      _id: 3,
      title: 'People',
      availableNfts: 12,
      banner: '/123123123.png',
    },
  ];
  return (
    <div>
      <div className="min-h-screen min-w-full mb-20">
        <div className="p-4">
          <div className="mt-6 lg:hidden flex bg-red-300">
            <SearchBar/>
          </div>
          <div className="flex justify-between mt-5">
            <div>
              <h2 className="text-figma-400 font-semibold text-xl">
                NFT Gallery
              </h2>
              <h2>Current Page: {currentPage}</h2>
              <h2>first token index:{indexFirstNFT}</h2>
            </div>
            <div className="self-center flex space-x-2 md:hidden">
              <button
                type="button"
                onClick={() => setView('grid')}
                className={`${view === 'grid' ? 'text-figma-100' : ''}`}
              >
                <ViewGridIcon className="w-7 h-7" />
              </button>
              <button
                type="button"
                onClick={() => setView('list')}
                className={`${view === 'grid' ? '' : 'text-figma-100'}`}
              >
                <ViewListIcon className="w-7 h-7" />
              </button>
            </div>
          </div>
          <div
            className={`mt-3 ${
              view === 'grid'
                ? 'grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid lg:grid-cols-5 lg:justify-between'
                : 'text-center md:grid md:grid-cols-3 md:gap-3 lg:grid lg:grid-cols-5 lg:gap-6'
            } text-center`}
          >
            {wholeDataSet.length > 0 ? (
              wholeDataSet.map((nft) => (
                <div
                  key={nft.token.token_id}
                  className={`${view === 'grid' ? '' : 'py-4 md:py-0'}`}
                >
                  <NFTGalleryPreview
                    key={nft.token.token_id}
                    data={nft}
                    className={`mt-3 lg:mt-0 ${
                      view === 'grid'
                        ? 'w-36 h-36 lg:w-72 lg:h-72 md:w-52 md:h-52 '
                        : 'w-72 h-72 md:w-52 md:h-52 lg:h-72 lg:w-72 '
                    }`}
                  />
                </div>
              ))
            ) : (
              <div>Nothing to show yet...</div>
            )}
          </div>

          {/* WE NEED TO CREATE A PAGINATOR TO setPage */}
          <button onClick={next}>next</button>
        </div>
      </div>
    </div>
  );
}
