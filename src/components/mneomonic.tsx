export function Mnemonic({ mnemonic }: { mnemonic?: string }) {
  if (!mnemonic) return null;

  return (
    <section className="flex flex-col gap-y-10">
      <h2 className="text-2xl font-bold">Your Mnemonic</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {mnemonic.split(" ").map((word, index) => (
          <MnemonicWord key={index} word={word} />
        ))}
      </div>
    </section>
  );
}

function MnemonicWord({ word }: { word: string }) {
  return (
    <div className="text-xl font-mono border border-white rounded-md p-4 hover:bg-gray-300 hover:text-black transition-all duration-500">
      {word}
    </div>
  );
}
