export default function NavBar() {
  return (
    <nav className="fixed left-0 top-0 z-50 w-screen px-6 py-4">
      <a
        href="/"
        className="decoration-none flex items-center gap-1.5 font-lexend text-xl font-medium text-yellow"
      >
        <img src={'/coin.png'} alt="currency-hunter-logo" width={20} height={20} />
        <span>CURRENCY HUNTER</span>
      </a>
    </nav>
  );
}
