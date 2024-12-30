import { Shield, Copy } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

export function Mnemonic({ mnemonic }: { mnemonic?: string }) {
  const [copied, setCopied] = useState(false);

  if (!mnemonic) return null;

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(mnemonic);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-primary/10 dark:bg-primary/20">
            <Shield className="w-5 h-5 text-primary dark:text-primary/90" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-primary dark:text-primary/90">
              Recovery Phrase
            </h2>
            <p className="text-sm text-muted-foreground dark:text-muted-foreground/80">
              Write these words down in order and keep them safe
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 dark:bg-background/95"
            onClick={copyToClipboard}
          >
            <Copy className="w-4 h-4" />
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        {mnemonic.split(" ").map((word, index) => (
          <MnemonicWord key={index} word={word} index={index} />
        ))}
      </div>
    </section>
  );
}

function MnemonicWord({ word, index }: { word: string; index: number }) {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 dark:from-primary/30 dark:to-primary/20 rounded-lg blur-sm transition-all duration-300 group-hover:blur-md" />
      <div className="relative flex items-center p-3 bg-card dark:bg-card/95 border rounded-lg shadow-sm transition-all duration-300 group-hover:shadow-md dark:border-border/50">
        <span className="text-sm text-muted-foreground dark:text-muted-foreground/80 mr-2">
          {index + 1}.
        </span>
        <span className="font-mono text-sm font-medium dark:text-foreground/90">
          {word}
        </span>
      </div>
    </div>
  );
}
