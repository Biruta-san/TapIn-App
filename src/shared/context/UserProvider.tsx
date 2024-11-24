import React, {createContext, useState, ReactNode} from 'react';

export interface User {
  id: number;
  nome: string;
  email: string;
  hotelId: number | null;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

interface UserProviderProps {
  children: ReactNode;
}

export const userContext = createContext<UserContextType | undefined>(
  undefined,
);

export const UserProvider: React.FC<UserProviderProps> = ({children}) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
};
