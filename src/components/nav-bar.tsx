export default function NavBar() {
  return (
    <nav className="fixed left-0 top-0 z-50 flex w-screen items-center justify-between px-6 py-4">
      <a
        href="/"
        className="decoration-none flex items-center gap-1.5 font-lexend text-xl font-medium text-yellow"
      >
        <img src={'/coin.png'} alt="currency-hunter-logo" width={20} height={20} />
        <span>CURRENCY HUNTER</span>
      </a>
      <HotKeyInstruction />
    </nav>
  );
}

const HotKeyInstruction = () => {
  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-1.5 font-lexend text-sm text-grey-500">
        <span className="font-semibold">Increment: </span>
        <span>Input Focus + </span>
        <div className="rounded border border-grey-500 p-1 text-xs">UP</div>
      </div>
      <div className="h-7 border-l border-r-0 border-grey-500" />
      <div className="flex items-center gap-1.5 font-lexend text-sm text-grey-500">
        <span className="font-semibold">Decrement: </span>
        <span>Input Focus + </span>
        <div className="rounded border border-grey-500 p-1 text-xs">DN</div>
      </div>
    </div>
  );
};
