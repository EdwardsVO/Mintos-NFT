import { createContext, FC, useState } from 'react';
import React from 'react';

export const MintContext = createContext<
  [boolean | null, React.Dispatch<React.SetStateAction<boolean | null>> | null]
>([false, null]);

const MintContextProvider: FC = ({ children }) => {
  const [mintContext, setMintContext] = useState<boolean | null>(false);

  React.useEffect(() => {
    setMintContext(mintContext);
  }, []);

  return (
    <MintContext.Provider value={[mintContext, setMintContext]}>
      {children}
    </MintContext.Provider>
  );
};

export default MintContextProvider;
