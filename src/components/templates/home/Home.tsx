import { Container, Text, Box, VStack, Grid, GridItem, Card, CardBody, Heading, Flex, Button, Image } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import useStorage from 'utils/useStorage';
import {ConfirmToast} from 'react-confirm-toast';
import { useDisconnect } from 'wagmi';
import { signOut } from 'next-auth/react';

const Home = () => {
  
  const { setItem, getItem } = useStorage();
  const { disconnectAsync } = useDisconnect();
  
  const handleDisconnect = async () => {
	setItem("charityStatus", "");
	setItem("donorStatus", "");
	setItem("userAddress", "");
	setItem("userSignIn", ""); 
    await disconnectAsync();
    signOut({ callbackUrl: '/' });
  };
  
  return (
    <VStack w={'full'}>
	<Grid
		w='100%'
		templateRows='repeat(1, 1fr)'
		templateColumns='repeat(5, 1fr)'
		gap={4}
		my='60px'
	>
	  <GridItem colSpan={3}>
		<Text fontSize='3xl' fontWeight='bold' className='color-theme' marginBottom='15px'>Web3 Solutions for Social Change</Text>
		<Text marginBottom='25px'>We are Give Hope Charity, a non-profit organization dedicated to building a future where Web3 technology is used as a force for good.</Text>
		<Text marginBottom='25px'>Connect wallet to get start now !</Text>
		<Flex>
			{getItem("userSignIn") === '' ? (
			    <a href='/connectwallet'><Box><Button className='btn-outline'>Connect Wallet</Button></Box></a>
			): (
				<Box w='100%' display='flex' alignItems='center'>
				<a href='/donatenow'><Box mr='20px'><Button className='btn-donate-now' mb='0px'><Image src={'/icon-donate-now.svg'} alt='Donate Now' className='icon-donate-now'/> Donate Now</Button></Box></a>
				<Box style={{ marginTop: "5px" }}>
				<ConfirmToast
					asModal={true}
					childrenClassName='margin-top-10'
					customCancel='Reject'
					customConfirm='Confirm'
					customFunction={handleDisconnect}
					message='Do you confirm to Disconnect Wallet?'
					showCloseIcon={false}
					theme='lilac'
				>
					<Button className='btn-outline'>Disconnect Wallet</Button>
				</ConfirmToast>
				</Box>
				</Box>
			)}	
		</Flex>
	  </GridItem>
	  <GridItem colSpan={2}>
		<Flex h='100%' alignItems='center'>
		<Box w='100%' h='100%' position='relative'>
			<Image src={'/logo-ghc.svg'} alt='Company Logo' boxSize='80%' m='auto' className='animated-float position-absolute' />
		</Box>
		</Flex>
	  </GridItem>
	</Grid>
	
	<Box w='100%' className='how-to-start'>
		<Container textAlign={'center'} mb={5}><Text as='b' fontSize='3xl' color='#7b64dd'>How to Start?</Text></Container>
		<Grid w={'full'} templateColumns='repeat(3, 1fr)' gap={6}>
		  <GridItem w='100%'>
			<Card bg='#fff' h='100%'>
			  <CardBody>
				<Heading as='h4' size='md' mb='10px' className='color-theme'><span className='number-label'>1</span> Connect Wallet</Heading>
				<Text color='#000' fontSize={14}>
                Begin your journey by connecting your wallet. It allows you to explore and view content on our platform
				</Text>
			  </CardBody>
			</Card>
		  </GridItem>
		  <GridItem w='100%'>
			<Card bg='#fff'>
			  <CardBody>
				<Heading as='h4' size='md' mb='10px' className='color-theme'><span className='number-label'>2</span> Sign Up for Full Access</Heading>
				<Text color='#000' fontSize={14}>                
                Ready for more? Sign up to unlock the full potential! Start your donation, track your donations, and gain access to exclusive features.      
				</Text>
			  </CardBody>
			</Card>
		  </GridItem>
		  <GridItem w='100%'>
			<Card bg='#fff'>
			  <CardBody>
				<Heading as='h4' size='md' mb='10px' className='color-theme'><span className='number-label'>3</span> Donate & Explore Features</Heading>
				<Text color='#000' fontSize={14}>                
                You've connected your wallet, signed up, and now it's time to make a real impact! Donate seamlessly and unlock premium features.
				</Text>
			  </CardBody>
			</Card>
		  </GridItem>
		</Grid>
	</Box>
	
	<Box w='100%' className='learn-more-about-us'>
		<Container textAlign={'center'} mb={5}><Text as='b' fontSize='3xl' color='#7b64dd'>Learn More About Us</Text></Container>
		<Grid w={'full'} templateColumns='repeat(3, 1fr)' gap={6}>
		  <GridItem w='100%'>
			<a target='_blank' href='https://originstamp.com/blog/what-is-web3-beginners-guide/#:~:text=Web%203%20Explained,best%20for%20enabling%20cryptocurrency%20transactions.'>
			<Card bg='#fff' h='100%' className='learn-more-link'>
				<CardBody>
					<Flex alignItems='center'>
						<Image src={'/icon-newtoweb3.png'} alt='New to Web3.0' width='75px' />
						<Heading as='h4' size='md' mb='10px' className='color-theme'>New to Web3.0 ? </Heading>
					</Flex>
					<Text color='#000' fontSize={14} mb='15px'>
						Web 3.0: The decentralized future of the internet, putting users in control with enhanced privacy and trustless interactions.
					</Text>
					<Text textAlign='right' fontSize={14}>Learn More <ChevronRightIcon /></Text>
				</CardBody>
			</Card>
			</a>
		  </GridItem>
		  <GridItem w='100%'>
			<a href='/commitment'>
			<Card bg='#fff' className='learn-more-link'>
			  <CardBody>
				<Flex alignItems='center'>
					<Image src={'/icon-ourcommitment.png'} alt='Our Commitment' width='75px' />
					<Heading as='h4' size='md' mb='10px' className='color-theme'>Our Commitment</Heading>
				</Flex>
				<Text color='#000' fontSize={14} mb='15px'>                
                We enable Wed3 as a driver of social transformation by making its education and research accessible to all, and advancing global solution for local humanitarian impact.      
				</Text>
				<Text textAlign='right' fontSize={14}>Learn More <ChevronRightIcon /></Text>
			  </CardBody>
			</Card>
			</a>
		  </GridItem>
		  <GridItem w='100%'>
			<a href='/approach'>
			<Card bg='#fff' className='learn-more-link'>
			  <CardBody>
				<Flex alignItems='center'>
					<Image src={'/icon-ourapproach.png'} alt='Our Approach' width='75px' />
					<Heading as='h4' size='md' mb='10px' className='color-theme'>Our Approach</Heading>
				</Flex>
				<Text color='#000' fontSize={14} mb='15px'>                
                At Give Hope Charity, we lead with a user-first mindset, offering enhanced privacy, ownership, and seamless trustless interactions in the decentralized web.
				</Text>
				<Text textAlign='right' fontSize={14}>Learn More <ChevronRightIcon /></Text>
			  </CardBody>
			</Card>
			</a>
		  </GridItem>
		</Grid>
	</Box>
	<style jsx global>{`
		::placeholder {
		  opacity: 0.5;
		}
		.dark-text{
			color:#46339b;
		}
		.color-theme{
			color:#7b64dd !important;
		}
		.custom-input-group{
			border:1px solid #d3cff1 !important;	
			border-radius:10px;
		}
		input.custom-input::placeholder{
			color:#000 !important;
		}
		.button-search{
			z-index:99;
			background:#7b64dd !important;
			color:#fff;
			padding:5px 10px;
			position:absolute !important;
			right:0;
			top:0;
			height:100% !important;
			border-radius:0 0.375rem 0.375rem 0 !important;
		}
		.main-banner-box{
			position:relative;
			overflow:hidden;
			max-height:360px;
			width:100%;
			display:flex;
			justify-content:center;
			align-items:center;
		}
		.campaign-grid {
          display: flex;
		  flex-wrap: wrap;
		  width: 100%;
        }
		.campaign-card {
		  width: 33.33%;
		  min-height: 320px;
		  padding: 10px;		  
		}
		.campaign-card-body{
		  border: 1px solid #d3cff1;
		  border-radius: 10px;
		  background: #fff;
		  height:100%;
		  display: flex;
		  flex-direction: column;
		}
		.campaign-title{
		  font-weight: bold;
		  font-size: 22px;
		  line-height:24px;
		  margin-bottom:15px;
		  color:#7b64dd;
		}
		.campaign-cover{
			height:125px;
			background:#efefef;
			border-radius:10px 10px 0 0;
			display:flex;
			align-items:center;
			justify-content:center;
			overflow:hidden;
			position:relative;
		}
		.campaign-cover img{
			max-width:110%;
			transition:all ease .3s;
		}
		.campaign-cover:hover img{
			transform:scale(1.2);
		}
		.campaign-content{
			padding:15px;
			display:flex;
			flex-direction:column;
		}
		.card-bottom{
			margin-top:auto;
			padding:0 15px 15px;
		}
		.campaign-content p{
			margin-bottom:10px;
			font-size:14px;
			line-height:normal;
		}
		.btn-donate-now{
			width:100%;
			padding:6px;
			margin-bottom:5px;
			background:#7b64dd!important;
			color:#fff;
			border-radius:10px;
			display:flex;
			align-items:center;
			justify-content:center;
		}
		.btn-learn-more{
			width:100%;
			padding:6px;
			margin-bottom:5px;
			border-radius:10px;
			border:2px solid #7b64dd;
			color:#7b64dd;
			display:block;
		}
		.btn-outline {
			width: 100%;
			padding: 6px;
			margin-top:auto;
			margin-bottom: 5px;
			border-radius: 10px;
			border: 2px solid #7b64dd;
			color: #7b64dd;
			font-weight:bold;
			text-transform:uppercase;
			display: block;
			transition:all ease .3s;
		}
		.btn-outline:hover{
			background:#7b64dd;
		}
		.icon-donate-now{
			width:auto !important;
			height:16px !important;
			max-width:none !important;
			margin-right:5px;
		}
		.how-to-start{
			margin:30px 0 !important;
		}
		.number-label{
			display:inline-block;
			padding:3px 10px;
			background:#7b64dd;
			color: #fff;
		}
		.learn-more-about-us{
			margin:30px 0 !important;
		}
		.learn-more-link{
			transition:all ease .3s;
		}
		.learn-more-link:hover{
			box-shadow:0 0 15px rgba(0,0,0,.15);
		}
		.section-wrapper{
			margin:30px 0 !important;
		}
		.leadership-avatar{
			width:250px;
			height:250px;
			background:#C4B5FF;
			border-radius:50%;
			border:1px solid #C4B5FF;
			overflow:hidden;
			display:flex;
			align-items:center;
			justify-content:center;
		}
		.leadership-avatar img{
			width:260;
			height:auto;
		}
		.position-absolute{
			position:absolute;
			left:0;
			right:0;
			top:0;
			bottom:0;
			transition:all ease .3s;
		}
		.animated-float{
			transition:all ease .3s;
			animation-name: floating;
			animation-duration: 4s;
			animation-iteration-count: infinite;
		}
		@keyframes floating{
			0%{bottom:0;}
			25%{bottom:-10px;}
			50%{bottom:0px;}
			75%{bottom:-10px;}
			100%{bottom:0px;}
		}
	`}</style>
      
    </VStack>
  );
};

export default Home;
