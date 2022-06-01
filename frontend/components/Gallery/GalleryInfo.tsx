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
import Loader from '../common/Loader';
import RightArrowIcon from '../icons/RightArrowIcon';
import LeftArrowIcon from '../icons/LeftArrowIcon';
import { motion } from 'framer-motion';
import { useToast } from '@chakra-ui/react';

export default function GalleryInfo() {
  const [tokens, setTokens] = React.useState<Array<Token>>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [tokensPerPage] = React.useState(10);
  const [indexFirstNFT, setIndexFirstNFT] = React.useState('0');
  const [sales, setSales] = React.useState<Array<Sale>>([]);
  const [view, setView] = React.useState('list');
  const [wholeDataSet, setWholeDataSet] = React.useState<WholeToken[]>([]);
  const [nearContext, setNearContext] = useNear();
  const [maxSales, setMaxSales] = React.useState('');
  const [lastPage, setLastPage] = React.useState<number>();
  const toast = useToast();

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
    // @ts-ignore: Unreachable code error
    const maxSales = await NEAR.contracts.marketContract.get_supply_sales();
    setMaxSales(maxSales);
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

  const prev = () => {
    setCurrentPage(currentPage - 1);
    setIndexFirstNFT((Number(indexFirstNFT) - tokensPerPage).toPrecision());
  };

  const calculateLastPage = () => {
    const lastPage = Number(maxSales) / tokensPerPage;
    if (lastPage % 1 === 0) {
      setLastPage(lastPage);
    } else {
      setLastPage(Math.round(lastPage + 1));
    }
  };

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  React.useEffect(() => {
    if (tokens.length === 0) {
      getTokens();
    }
    getSalesData();
    getTokens();
    calculateLastPage();
  }, [sales]);

  return (
    <div className="min-h-screen">
      {wholeDataSet.length > 0 ? (
        <div className="min-h-screen min-w-full mb-12 md:mb-0">
          <div className="p-4">
            <div className="mt-6 lg:hidden flex md:mt-0">
              <SearchBar />
            </div>
            <div className="flex justify-between mt-5">
              <div>
                <h2 className="text-black flex lg:text-4xl lg:p-6 font-bold text-xl 2xl:px-12">
                  NFT Gallery{' '}
                  <div className="font-thin ml-5 text-figma-900">Latest</div>
                </h2>
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
              {wholeDataSet.length > 0
                ? wholeDataSet.map((nft) => (
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
                : null}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center w-full">
          <Loader />
        </div>
      )}
      <div className="flex justify-center items-center space-x-24 mb-8">
        <div>
          {currentPage === 1 ? (
            <motion.button
              type="button"
              onClick={() => {
                toast({
                  title: 'Already on first page.',
                  status: 'info',
                  duration: 3000,
                  isClosable: true,
                  position: 'bottom-left',
                });
              }}
              className="bg-gray-400 p-2 text-xl rounded-md text-gray-600 font-bold"
            >
              <LeftArrowIcon className="w-6 h-6" />
            </motion.button>
          ) : (
            <motion.button
              type="button"
              onClick={prev}
              className="bg-figma-100 p-2 text-xl rounded-md text-figma-300 font-bold"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <LeftArrowIcon className="w-6 h-6" />
            </motion.button>
          )}
        </div>
        <div className="my-8">
          {currentPage === lastPage ? (
            <motion.button
              type="button"
              onClick={() => {
                toast({
                  title: 'Last page reached.',
                  status: 'info',
                  duration: 3000,
                  isClosable: true,
                  position: 'bottom-left',
                });
              }}
              className="bg-gray-400 p-2 text-xl rounded-md text-gray-600 font-bold"
            >
              <RightArrowIcon className="w-6 h-6" />
            </motion.button>
          ) : (
            <motion.button
              type="button"
              onClick={next}
              className="bg-figma-100 p-2 text-xl rounded-md text-figma-300 font-bold"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <RightArrowIcon className="w-6 h-6" />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
