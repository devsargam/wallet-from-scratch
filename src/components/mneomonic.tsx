export function Mnemonic({ mnemonic }: { mnemonic?: string }) {
  if (!mnemonic) return null;

  return (
    <section className="flex flex-col gap-y-10">
      <h2 className="text-2xl font-bold">Your Mnemonic</h2>
      <div className="text-xl font-mono border border-white rounded-md p-4">
        {mnemonic}
      </div>
    </section>
  );
}
