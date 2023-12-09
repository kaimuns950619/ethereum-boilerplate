import { useColorMode } from '@chakra-ui/react';
import Image from 'next/image';

const MoralisLogo = () => {
  const { colorMode } = useColorMode();

  return (
    <Image
      src={colorMode === 'dark' ? '/logo-ghc.svg' : '/logo-ghc.svg'}
      height={45}
      width={150}
      alt="Moralis"
	  className='logo'
    /> 
  );
};

export default MoralisLogo;
