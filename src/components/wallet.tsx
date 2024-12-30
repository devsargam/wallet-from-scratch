interface WalletProps {
  name: string;
  index: number;
  privateKey: string;
  publicKey: string;
}

export function Wallet({ name, index, privateKey, publicKey }: WalletProps) {
  return (
    <div className="flex flex-col gap-y-2">
      <h2 className="text-2xl font-bold">Wallet {index + 1}</h2>
      {/* <div>{privateKey}</div> */}
      <div>{publicKey}</div>
    </div>
  );
}
