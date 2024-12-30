import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface Wallet {
  id: string;
  name: string;
  privateKey: string;
  publicKey: string;
}

interface WalletContextType {
  isLoading: boolean;
  wallets: Wallet[];
  setWallets: Dispatch<SetStateAction<Wallet[]>>;
}

const defaultContextValue: WalletContextType = {
  isLoading: false,
  wallets: [],
  setWallets: () => {},
};

const WalletContext = createContext<WalletContextType>(defaultContextValue);

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [wallets, setWallets] = useState<Wallet[]>([]);

  return (
    <WalletContext.Provider value={{ isLoading: false, wallets, setWallets }}>
      {children}
    </WalletContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWalletContext = () => {
  const context = useContext(WalletContext);

  if (!context) {
    throw new Error("useWalletContext must be used within a WalletProvider");
  }

  return context;
};
