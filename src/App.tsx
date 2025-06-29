import './styles.css';
import NavBar from './components/nav-bar';
import CurrencyCalculator from './components/currency-calculator';

export default function App() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-black">
      <NavBar />
      <div className="h-[400px] w-fit">
        <CurrencyCalculator />
      </div>
    </div>
  );
}
