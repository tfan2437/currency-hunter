// Components
import ArrowUpIcon from '../icons/arrow-up-icon';
import ArrowDownIcon from '../icons/arrow-down-icon';

interface CurrencyInputProps {
  value: number;
  input: 'inputA' | 'inputB';
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>, input: 'inputA' | 'inputB') => void;
  handleInputAction: (input: 'inputA' | 'inputB', action: 'increase' | 'decrease') => void;
}

const CurrencyInput = ({
  value,
  input,
  handleInputChange,
  handleInputAction,
}: CurrencyInputProps) => {
  const label = input === 'inputA' ? 'Input A' : 'Input B';

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={input}>{label}</label>
      <div className="relative">
        <span className="absolute bottom-0 left-3 top-0 flex select-none items-center text-sm font-medium text-grey-500">
          Amount
        </span>
        <input
          id={input}
          type="number"
          value={value}
          onChange={(e) => handleInputChange(e, input)}
          className="input-number h-10 w-full rounded-lg border border-grey-600 bg-transparent pr-9 text-right text-sm font-medium text-white outline-none transition-colors duration-300 hover:border-yellow focus:border-yellow"
        />
        <div className="absolute bottom-0 right-0 top-0 flex flex-col border-l border-grey-600">
          <button
            type="button"
            className="z-10 flex h-5 w-6 cursor-pointer items-center justify-center border-none text-grey-500 outline-none transition-colors duration-300 hover:text-white"
            onClick={() => handleInputAction(input, 'increase')}
          >
            <ArrowUpIcon />
          </button>
          <hr className="border-b-1 w-full border-grey-600" />
          <button
            type="button"
            className="z-10 flex h-5 w-6 cursor-pointer items-center justify-center border-none text-grey-500 outline-none transition-colors duration-300 hover:text-white"
            onClick={() => handleInputAction(input, 'decrease')}
          >
            <ArrowDownIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurrencyInput;
