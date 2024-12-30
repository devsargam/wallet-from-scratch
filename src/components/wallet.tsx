import { Copy, ExternalLink, Key } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface WalletProps {
  name: string;
  index: number;
  publicKey: string;
  mnemonic: string;
  onWalletClick: (mnemonic: string) => void;
}

export function Wallet({
  name,
  index,
  publicKey,
  mnemonic,
  onWalletClick,
}: WalletProps) {
  const [copied, setCopied] = useState(false);
  const [showMnemonic, setShowMnemonic] = useState(false);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 10)}...${address.slice(-10)}`;
  };

  const handleClick = () => {
    setShowMnemonic(!showMnemonic);
    onWalletClick(mnemonic);
  };

  return (
    <div
      className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex flex-col space-y-4">
        {/* Wallet Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              <Key className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">{name}</h3>
              <p className="text-sm text-muted-foreground">
                Wallet {index + 1}
              </p>
            </div>
          </div>
        </div>

        {/* Public Key */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Public Key
          </label>
          <div className="flex items-center gap-2">
            <code className="flex-1 p-2 text-sm bg-muted rounded">
              {truncateAddress(publicKey)}
            </code>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                copyToClipboard(publicKey);
              }}
              className="shrink-0"
            >
              <Copy className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                window.open(
                  `https://explorer.solana.com/address/${publicKey}`,
                  "_blank"
                );
              }}
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Copy Status */}
        {copied && (
          <p className="text-sm text-muted-foreground text-center">
            Copied to clipboard!
          </p>
        )}
      </div>
    </div>
  );
}
