import { useState, useRef, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
// types / constants
import { Currency, CurrencyTarget } from '../../types';
import { currencies } from '../../constants';
// components
import ChevronDownIcon from '../icons/chevron-down-icon';

interface CurrencySelectorProps {
  currency: Currency;
  target: CurrencyTarget;
  onSelect: (currency: Currency, target: CurrencyTarget) => void;
}

// Custom hook for dropdown logic
const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleDropdown();
    } else if (event.key === 'Escape') {
      closeDropdown();
    }
  };

  return {
    isOpen,
    dropdownRef,
    toggleDropdown,
    closeDropdown,
    handleKeyDown,
  };
};

const CurrencySelector = ({ currency, target, onSelect }: CurrencySelectorProps) => {
  const { isOpen, dropdownRef, toggleDropdown, closeDropdown, handleKeyDown } = useDropdown();

  const handleSelectCurrency = (selectedCurrency: Currency) => {
    closeDropdown();
    onSelect(selectedCurrency, target);
  };

  const selectedCurrencyInfo = currencies.find((c) => c.currency === currency);
  const isSymbolSmall = currency === 'TWD';
  const isOutput = target === 'output';

  if (isOutput) {
    return <OutputCurrencySelector currency={currency} target={target} onSelect={onSelect} />;
  }

  return (
    <div className={twMerge('relative', isOutput ? 'w-fit' : 'w-full')} ref={dropdownRef}>
      {target === 'all' && <label className="mb-2 block">Currency</label>}
      <button
        type="button"
        className={twMerge(
          'border-1 flex h-10 w-full items-center justify-between rounded-lg border border-grey-600 px-3 font-medium outline-none transition-all duration-300',
          isOpen && 'border-yellow'
        )}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center gap-1 text-white">
          <div
            className={twMerge(
              'flex size-3 items-center justify-center text-sm',
              isSymbolSmall && 'text-xs'
            )}
          >
            {selectedCurrencyInfo?.symbol}
          </div>
          <span className="text-sm font-medium">{currency}</span>
        </div>
        <ChevronDownIcon isOpen={isOpen} />
      </button>
      {isOpen && (
        <ul className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-lg border border-yellow bg-black">
          {currencies.map((currencyOption) => {
            const isSelected = currencyOption.currency === currency;
            const isOptionSymbolSmall = currencyOption.currency === 'TWD';

            return (
              <li
                key={currencyOption.currency}
                className={twMerge(
                  'flex cursor-pointer select-none items-center gap-1 px-3 py-2.5 hover:bg-zinc-900',
                  isSelected ? 'text-yellow' : 'text-grey-500 hover:text-white'
                )}
                onClick={() => handleSelectCurrency(currencyOption.currency)}
              >
                <div
                  className={twMerge(
                    'flex size-3 items-center justify-center text-sm',
                    isOptionSymbolSmall && 'text-xs'
                  )}
                >
                  {currencyOption.symbol}
                </div>
                <span className="text-sm font-medium">{currencyOption.currency}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default CurrencySelector;

const OutputCurrencySelector = ({ currency, target, onSelect }: CurrencySelectorProps) => {
  const { isOpen, dropdownRef, toggleDropdown, closeDropdown, handleKeyDown } = useDropdown();

  const handleSelectCurrency = (selectedCurrency: Currency) => {
    closeDropdown();
    onSelect(selectedCurrency, target);
  };

  return (
    <div className="relative w-fit" ref={dropdownRef}>
      <button
        type="button"
        className="flex items-center gap-2 rounded-full bg-zinc-800 px-3 py-0.5 font-medium outline-none transition-all duration-300"
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
      >
        <span className="w-9 text-sm font-medium">{currency}</span>
        <ChevronDownIcon isOpen={isOpen} />
      </button>
      {isOpen && (
        <ul className="absolute left-0 right-0 top-full z-50 mt-4 overflow-hidden rounded-lg border-2 border-yellow bg-black">
          {currencies.map((currencyOption) => {
            const isSelected = currencyOption.currency === currency;

            return (
              <li
                key={currencyOption.currency}
                className={twMerge(
                  'flex cursor-pointer select-none gap-1 px-3 py-2.5 hover:bg-zinc-900',
                  isSelected ? 'text-yellow' : 'text-grey-500 hover:text-white'
                )}
                onClick={() => handleSelectCurrency(currencyOption.currency)}
              >
                <span className="text-sm font-medium">{currencyOption.currency}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
