import { createContext, FC, useState } from "react";

export const UserContext = createContext<
  [
    string | null,
    React.Dispatch<React.SetStateAction<string | null>> | null
  ]
>(["", null]);

const UserContextProvider: FC = ({ children }) => {
  const [user, setUser] = useState<string | null>("");

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;