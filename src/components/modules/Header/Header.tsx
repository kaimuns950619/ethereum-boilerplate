import { Box, Container, Flex, HStack } from '@chakra-ui/react';
import { MoralisLogo, NavBar } from 'components/elements';
import { ConnectButton } from '../ConnectButton';

const Header = () => {
  return (
    <Box className="bg-header">
	<style jsx global>{`
        .bg-header {
          background: #D3CFF1;
        }
      `}</style>
      <Container maxW="container.xl" p={'10px'}>
        <Flex align="center" justify="space-between">
		<Box display="flex" alignItems="center">
          <MoralisLogo />
          <NavBar />
		</Box>
          <HStack gap={'10px'}>
            <ConnectButton />
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
