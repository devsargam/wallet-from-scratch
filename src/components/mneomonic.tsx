import { Shield } from "lucide-react";

export function Mnemonic({ mnemonic }: { mnemonic?: string }) {
  if (!mnemonic) return null;

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-primary/10">
          <Shield className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-primary">
            Recovery Phrase
          </h2>
          <p className="text-sm text-muted-foreground">
            Write these words down in order and keep them safe
          </p>
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
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur-sm transition-all duration-300 group-hover:blur-md" />
      <div className="relative flex items-center p-3 bg-card border rounded-lg shadow-sm transition-all duration-300 group-hover:shadow-md">
        <span className="text-sm text-muted-foreground mr-2">{index + 1}.</span>
        <span className="font-mono text-sm font-medium">{word}</span>
      </div>
    </div>
  );
}
