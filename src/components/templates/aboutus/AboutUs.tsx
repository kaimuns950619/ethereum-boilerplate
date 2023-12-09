import { Container, Text, Box, VStack, Grid, GridItem, Flex, Image} from '@chakra-ui/react';
import { useState } from 'react'
import { readContract } from '@wagmi/core'
import { contractAbi } from 'utils/contractAbi'
import { contractAddress } from 'utils/global'
import { ethers } from 'ethers';
import useStorage from 'utils/useStorage';

const AboutUs = () => {
  
  const { getItem } = useStorage();
  const [totalCampaigns, setTotalCampaigns] = useState(0)
  const [totalDonors, setTotalDonors] = useState(0)
  const [totalRaisedCampaigns, setTotalRaisedCampaigns] = useState(0)
  const [totalActiveCampaigns, setTotalActiveCampaigns] = useState(0)
  const [totalFunds, setTotalFunds] = useState(0)
  
  async function lastCampaignId() {
	const totalCampaignRes = await readContract({
	 address: contractAddress,
	 abi: contractAbi,
	 functionName: 'lastCampaignId',
	})
	const totalCampaign = Number(totalCampaignRes._hex);
	setTotalCampaigns(totalCampaign)
   }
  
  lastCampaignId()
  
  async function generateSummary() {
	const totalDonorsRes = await readContract({
	 address: contractAddress,
	 abi: contractAbi,
	 functionName: 'totalDonors',
	})
	
	setTotalDonors(Number(totalDonorsRes._hex));
	
	const totalRaisedCampaignsRes = await readContract({
	 address: contractAddress,
	 abi: contractAbi,
	 functionName: 'totalCampaignReachedTarget',
	})
	
	setTotalRaisedCampaigns(Number(totalRaisedCampaignsRes._hex));
	
	const totalDonationsRes = await readContract({
	 address: contractAddress,
	 abi: contractAbi,
	 functionName: 'totalDonations',
	})

	setTotalFunds(parseInt(ethers.utils.formatUnits(totalDonationsRes, 18)))
	
	const totalActiveCampaignsRes = await readContract({
	 address: contractAddress,
	 abi: contractAbi,
	 functionName: 'getActiveCampaigns',
	})
	
	setTotalActiveCampaigns(Number(totalActiveCampaignsRes._hex));
	
   }

  generateSummary()
 
  
  return (
    <VStack w={'full'}>
	<Grid
		w='100%'
		templateRows='repeat(1, 1fr)'
		templateColumns='repeat(5, 1fr)'
		gap={4}
		className='section-wrapper'
	>
		<GridItem colSpan={5}>
			<Text fontSize='4xl' fontWeight='bold' className='color-theme' marginBottom='35px'>Our Leadership</Text>
		</GridItem>
		<GridItem colSpan={2}>
			<Flex h='100%' alignItems='center' justifyContent='center'>
				<Box className='leadership-avatar'>
					<Image src={'/LeaderShipAvatar.png'} alt='Our leadership avatar - Lukas' m='auto' />
				</Box>
			</Flex>
		</GridItem>
		<GridItem colSpan={3}>
		<Flex h='100%' alignItems='start' justifyContent='center' flexDirection='column'>
			<Text fontSize='4xl' fontWeight='bold' className='color-theme'>Lukas</Text>
			<Text fontSize='sm' marginBottom='30px'>Developer of GHC Website</Text><hr/>
			<b>
			<Text marginBottom='25px'>"At Give Hope Charity, we proudly stand as the world’s first blockchain-enabled donation platform. Our mission is to shape an inclusive Web3 by democratizing access to education and research, fostering innovation in humanitarian support.</Text>
			<Text marginBottom='25px'>In our pursuit, we strive for transparency in global giving, tackling issues like corruption, nonprofit trust concerns, high transfer fees, inefficient processes, and the lack of donor spending accountability.</Text>
			<Text marginBottom='25px'>Our transformative approach to philanthropy ensures 100% transparency, guaranteeing that every single donation goes directly to the people and projects in need, bringing hope to those who need it most."</Text>		
			</b>			
		</Flex>
		</GridItem>
		
		{getItem("userSignIn") === '' ? (
		  <GridItem colSpan={5}>
			<Box w='100%' p='15px' background='#fff' textAlign='center'>
				<Text fontSize='4xl' fontWeight='bold' className='color-theme' marginBottom='25px'>Our Impact</Text>
				<Text>Discover the impact of your generosity. Connect your wallet to access detailed insights on our charitable initiatives.</Text>
				<Text marginBottom='30px'>Your direct link to change awaits – <a href='/connectwallet'><b>Connect Wallet Now</b></a>.</Text>
			</Box>
		</GridItem>
		): null }	
	</Grid>
	
	{getItem("userSignIn") !== '' ? (
	 <div>
	 <Container textAlign={'center'} mb={10}><Text as='b' fontSize='3xl' color='#7b64dd'>Our Impact</Text></Container>
	 <GridItem colSpan={5}>
		<Box w='100%' background='#d3cff1' borderRadius='10px'>
			<Grid w={'full'}
				templateColumns='repeat(5, 1fr)'
				gap={4}			
			>
				<GridItem colSpan={1} textAlign={'center'} display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} py={10}>
					<Text fontSize='4xl' as='b' className='dark-text'>{totalCampaigns}</Text>
					<Text fontSize='md' className='dark-text'>Campaigns</Text>
				</GridItem>
				<GridItem colSpan={1} textAlign={'center'} display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} py={10}> 
					<Text fontSize='4xl' as='b' className='dark-text'>{totalDonors}</Text>
					<Text fontSize='md' className='dark-text'>Donors</Text>
				</GridItem>
				<GridItem colSpan={1} textAlign={'center'} display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} py={10}> 
					<Text fontSize='4xl' as='b' className='dark-text'>{totalRaisedCampaigns}</Text>
					<Text fontSize='md' className='dark-text'>Raised Campaigns</Text>
				</GridItem>
				<GridItem colSpan={1} textAlign={'center'} display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} py={10}> 
					<Text fontSize='4xl' as='b' className='dark-text'>{totalActiveCampaigns}</Text>
					<Text fontSize='md' className='dark-text'>Campaigns On Going</Text>
				</GridItem>
				<GridItem colSpan={1} textAlign={'center'} display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} py={10}> 
					<Text fontSize='4xl' as='b' className='dark-text'>RMT {totalFunds}</Text>
					<Text fontSize='md' className='dark-text'>Funds Collected</Text>
				</GridItem>
			</Grid>
		</Box>
	</GridItem>			
	</div>
	): null }
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

export default AboutUs;
