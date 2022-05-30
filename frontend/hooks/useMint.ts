import { useContext } from 'react';
import { MintContext } from '../context/mintContext';

const useMint = () => {
  return useContext(MintContext);
};

export default useMint;
