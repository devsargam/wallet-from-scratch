import { useWalletContext } from "./wallet-context";
import { Button } from "./components/ui/button";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { useState } from "react";
import { Mnemonic } from "./components/mneomonic";
import { Wallet } from "./components/wallet";
import nacl from "tweetnacl";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { Wallet as WalletIcon, Plus } from "lucide-react";
import { ModeToggle } from "./components/theme-toggle";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  const { wallets, setWallets } = useWalletContext();
  const [mnemonic, setMnemonic] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [publicKeys, setPublicKeys] = useState<string[]>([]);

  const handleGetStarted = () => {
    const newMnemonic = generateMnemonic();
    setMnemonic(newMnemonic);
    const seed = mnemonicToSeedSync(newMnemonic);

    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);
    setCurrentIndex(currentIndex + 1);
    setPublicKeys([...publicKeys, keypair.publicKey.toString()]);

    setWallets((prev) => [
      ...prev,
      {
        id: (currentIndex + 1).toString(),
        name: "Solana Wallet",
        privateKey: keypair.secretKey.toString(),
        publicKey: keypair.publicKey.toString(),
        mnemonic: newMnemonic,
      },
    ]);
  };

  const handleWalletClick = (walletMnemonic: string) => {
    setMnemonic(walletMnemonic);
  };

  return (
    <ThemeProvider defaultTheme="system" storageKey="wallet-theme">
      <div className="min-h-screen bg-gradient-to-b from-background to-background/95 dark:from-background dark:to-background/90">
        <main className="container py-10 space-y-8">
          <header className="flex items-center justify-between pb-6 border-b border-border">
            <div className="flex items-center gap-3">
              <WalletIcon className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 dark:from-primary dark:to-primary/70">
                Wallet From Scratch
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <ModeToggle />
              <Button onClick={handleGetStarted} className="gap-2">
                <Plus className="w-4 h-4" />
                Create New Wallet
              </Button>
            </div>
          </header>

          <Mnemonic mnemonic={mnemonic} />

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-primary dark:text-primary/90">
              Your Wallets
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {wallets.length > 0 ? (
                wallets.map((wallet, index) => (
                  <Wallet
                    key={index}
                    name={wallet.name}
                    index={index}
                    publicKey={wallet.publicKey}
                    mnemonic={wallet.mnemonic}
                    onWalletClick={handleWalletClick}
                  />
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center p-12 text-center border rounded-lg border-dashed border-muted dark:border-muted/50">
                  <WalletIcon className="w-12 h-12 text-muted-foreground dark:text-muted-foreground/80 mb-4" />
                  <p className="text-lg text-muted-foreground dark:text-muted-foreground/80">
                    No wallets found. Create your first wallet to get started.
                  </p>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
