import { useWalletContext } from "./wallet-context";
import { Button } from "./components/ui/button";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { useState } from "react";
import { Mnemonic } from "./components/mneomonic";
import { Wallet } from "./components/wallet";
import nacl from "tweetnacl";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";

function App() {
  const { wallets, setWallets } = useWalletContext();
  const [mnemonic, setMnemonic] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [publicKeys, setPublicKeys] = useState<string[]>([]);

  const handleGetStarted = () => {
    const mnemonic = generateMnemonic();
    console.log("Generated Mnemonic:", mnemonic);
    setMnemonic(mnemonic);
    const seed = mnemonicToSeedSync(mnemonic);
    console.log(seed.toString("hex"));

    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);
    setCurrentIndex(currentIndex + 1);
    setPublicKeys([...publicKeys, keypair.publicKey.toString()]);

    setWallets((prev) => [
      ...prev,
      {
        id: "1",
        name: "MetaMask",
        privateKey: keypair.secretKey.toString(),
        publicKey: keypair.publicKey.toString(),
      },
    ]);
  };

  return (
    <main className="text-white container py-10 flex flex-col gap-y-10">
      <div className="flex gap-10 items-center flex-wrap justify-between">
        <h1 className="text-4xl font-bold">Wallet From Scratch</h1>
        <Button variant="secondary" onClick={handleGetStarted}>
          Get Started
        </Button>
      </div>
      <Mnemonic mnemonic={mnemonic} />
      <div className="flex flex-col gap-y-10">
        {wallets.length > 0 ? (
          wallets.map((wallet, index) => (
            <Wallet
              key={index}
              name={wallet.name}
              index={index}
              privateKey={wallet.privateKey}
              publicKey={wallet.publicKey}
            />
          ))
        ) : (
          <div className="text-center text-xl text-gray-200">
            No wallets found
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
