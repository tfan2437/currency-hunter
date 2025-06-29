// Types
import { CurrencyData, Operation } from '../../types';

interface CurrencyOutputProps {
  output: CurrencyData;
  operation: Operation;
  currencySelector: React.ReactNode;
}

const CurrencyOutput = ({ output, operation, currencySelector }: CurrencyOutputProps) => {
  const isAddOperation = operation === 'add' || operation === 'add-currency';

  return (
    <div className="flex h-10 w-full select-none items-center justify-between rounded-full border-2 border-yellow bg-black pl-3 pr-2 text-sm font-medium text-grey-500">
      <span>{isAddOperation ? 'Total' : 'Difference'}</span>
      <div className="flex items-center gap-2">
        <span className="text-white">{output.value}</span>
        {currencySelector}
      </div>
    </div>
  );
};

export default CurrencyOutput;
