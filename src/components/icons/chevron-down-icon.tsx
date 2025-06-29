import { twMerge } from 'tailwind-merge';

const ChevronDownIcon = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <svg
      className={twMerge(
        'h-3 w-3 flex-shrink-0 text-grey-500 transition-transform duration-300',
        isOpen && 'rotate-180'
      )}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
    </svg>
  );
};

export default ChevronDownIcon;
