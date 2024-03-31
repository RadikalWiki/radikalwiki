import { usePathname } from 'next/navigation';

const usePath = () => {
  return decodeURI(usePathname());
};

export default usePath;
