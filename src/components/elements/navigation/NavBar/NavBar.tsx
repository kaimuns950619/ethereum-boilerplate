import { HStack } from '@chakra-ui/react';
import { NavItem } from '../NavItem';
import NAV_LINKS from './paths';
import useStorage from 'utils/useStorage';

const NavBar = () => {
  const { getItem } = useStorage();
  
  if(getItem("userSignIn") !== ''){
	return (
		<HStack gap={'15px'}>
		  {NAV_LINKS.map((link) => (
			<NavItem key={`link-${link.label}`} {...link} />
		  ))}
		</HStack>
		
	  );
  } 
  
  if(getItem("userSignIn") === ''){
	return (
		<HStack gap={'15px'}>
		  {NAV_LINKS.map((link) => (
			<div style={{ display: link.label !== 'Donate Now' ? 'block' : 'none' }}>	
			<NavItem key={`link-${link.label}`} {...link} />
			</div>
		  ))}
		</HStack>
		
	  );
  }
  
  return (
	<HStack gap={'15px'}>
	</HStack>
  );
  
};


export default NavBar;
