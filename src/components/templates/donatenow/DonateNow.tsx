import { VStack, Grid, GridItem, Radio, RadioGroup, Stack, Input, InputGroup, InputLeftElement, Button, useToast, Progress } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import Image from 'next/image';
import { useState } from 'react'
import { readContract } from '@wagmi/core'
import { contractAbi } from 'utils/contractAbi'
import { contractAddress, ETH_2_WEI_NUMBER } from 'utils/global'
import { ethers } from 'ethers';
import useStorage from 'utils/useStorage';

const DonateNow = () => {
  const toast = useToast();
  const today = new Date()
  const today_timestamp = today.getTime() / 1000
  const { setItem, getItem } = useStorage();
  const [selectCategory, setSelectCategory] = useState('0')
  const [refresh, setRefresh] = useState('999')
  const [keyword, setKeyword] = useState('')
  const [searching, setSearching] = useState(false)
  
  const [allCampaign, setAllCampaigns] = useState<{
  about: string;
  name: string;
  logoUrl: string;
  endTime: number;
  startTime: number;
  totalRaised: string;
  target: string;
  campaignIndex: number;
  campaignDonors: string[];
  dayRemain: number;
  ownerName: string;
  active: boolean;
  }[]>([]);

  async function CampaignsDetail (campaignId: number) {
	setItem('campaignId', campaignId.toString());
  }

  async function allCampaigns(campaignId: number) {
    const res = await readContract({
     address: contractAddress,
     abi: contractAbi,
     functionName: 'getCampaignProfile',
     args: [ethers.BigNumber.from(campaignId)],
    })
	
	if(res['status'] === true && today_timestamp >= Number(res['startTime']._hex)){
	
		const campaignDayRemain = Math.ceil(((Number(res['endTime']._hex) * 1000) - Number(today)) / (1000 * 60 * 60 * 24))
		
		const res2 = await readContract({
		 address: contractAddress,
		 abi: contractAbi,
		 functionName: 'allCampaigns',
		 args: [ethers.BigNumber.from(campaignId)],
		})

		const res3 = await readContract({
		 address: contractAddress,
		 abi: contractAbi,
		 functionName: 'allCharities',
		 args: [res2['owner']],
		})
	
		let campaignMax = false
		const thisTotalRaise = (Number(ethers.BigNumber.from(res['totalRaised']).toString()) / ETH_2_WEI_NUMBER).toFixed(0)
		const thisTarget = (Number(ethers.BigNumber.from(res['target']).toString()) / ETH_2_WEI_NUMBER).toFixed(0)
		
		if(Number(thisTotalRaise) < Number(thisTarget)){
			campaignMax = true
		}
	
		setAllCampaigns((prevCampaigns) => [
		...prevCampaigns,
		{
		about: res['about'],
		name: res['name'],
		logoUrl: res['logoUrl'],
		endTime: Number(res['endTime']._hex),
		startTime: Number(res['startTime']._hex),
		totalRaised: thisTotalRaise,
		target: thisTarget,
		campaignIndex: campaignId,
		campaignDonors: res['campaignDonors'].map((e) => e),
		dayRemain: campaignDayRemain,
		ownerName: res3['name'],
		active: campaignMax,
		},
		]);
		
		setSearching(false)
	}
   }
   
   async function allCampaigns2(campaignId: number) {
    const res = await readContract({
     address: contractAddress,
     abi: contractAbi,
     functionName: 'getCampaignProfile',
     args: [ethers.BigNumber.from(campaignId)],
    })
	
	if(res['status'] === true && today_timestamp >= Number(res['startTime']._hex)){
	
		const campaignDayRemain = Math.ceil(((Number(res['endTime']._hex) * 1000) - Number(today)) / (1000 * 60 * 60 * 24))
		
		const res2 = await readContract({
		 address: contractAddress,
		 abi: contractAbi,
		 functionName: 'allCampaigns',
		 args: [ethers.BigNumber.from(campaignId)],
		})

		const res3 = await readContract({
		 address: contractAddress,
		 abi: contractAbi,
		 functionName: 'allCharities',
		 args: [res2['owner']],
		})
	
		let campaignMax = false
		const thisTotalRaise = (Number(ethers.BigNumber.from(res['totalRaised']).toString()) / ETH_2_WEI_NUMBER).toFixed(0)
		const thisTarget = (Number(ethers.BigNumber.from(res['target']).toString()) / ETH_2_WEI_NUMBER).toFixed(0)
		
		if(Number(thisTotalRaise) < Number(thisTarget)){
			campaignMax = true
		}
	
		if(keyword !== ""){
			if(res['name'].toLowerCase().includes(keyword.toLowerCase())){
				setAllCampaigns((prevCampaigns) => [
				...prevCampaigns,
				{
				about: res['about'],
				name: res['name'],
				logoUrl: res['logoUrl'],
				endTime: Number(res['endTime']._hex),
				startTime: Number(res['startTime']._hex),
				totalRaised: thisTotalRaise,
				target: thisTarget,
				campaignIndex: campaignId,
				campaignDonors: res['campaignDonors'].map((e) => e),
				dayRemain: campaignDayRemain,
				ownerName: res3['name'],
				active: campaignMax,
				},
				]);
				
				setSearching(false)
			}
		}
	}
   }
   
	function isHttpsUrl(url : string) {
	  const httpsUrlPattern = /^https:\/\//;
	  return httpsUrlPattern.test(url);
	}

  async function lastCampaignId() {
	
	setKeyword("")
	setSearching(true)
  
	const totalCampaignRes = await readContract({
	 address: contractAddress,
	 abi: contractAbi,
	 functionName: 'lastCampaignId',
	})
	const totalCampaign = Number(totalCampaignRes._hex);
	
	for (let i = 1; i <= totalCampaign; i++) {
		allCampaigns(i)
	}
   }
   
   async function lastCampaignId2() {
	const totalCampaignRes = await readContract({
	 address: contractAddress,
	 abi: contractAbi,
	 functionName: 'lastCampaignId',
	})
	const totalCampaign = Number(totalCampaignRes._hex);
	
	for (let i = 1; i <= totalCampaign; i++) {
		allCampaigns2(i)
	}
   }
   
  async function getCampaignByCat(categoryId: string) {
  
	setKeyword("")
	setSearching(true)
	
	const campaignByCatRes = await readContract({
	 address: contractAddress,
	 abi: contractAbi,
	 functionName: 'getAllCategoryCampaigns',
	 args: [ethers.BigNumber.from(categoryId)],
	})
	
	const allCat = campaignByCatRes.map((e) => Number(e._hex))

	for (const category of allCat) {
		if(category !== 0){
			allCampaigns(category)
			
		} else {
			break
		}
	}
	
	setTimeout(() => {
		setSearching(false)
	}, 2000);
	
   }
  
  if(selectCategory === '0' && selectCategory !== refresh){
	setKeyword("")
	setAllCampaigns([])
	lastCampaignId()
	setRefresh(selectCategory)
  } else if(selectCategory !== refresh){
	setKeyword("")
	setAllCampaigns([])
	getCampaignByCat(selectCategory)
	setRefresh(selectCategory)
  }
  
  async function searchCampaign() {
	if(!keyword){
		toast({
			title: 'Keyword must not be empty.',
			description: "",
			status: 'error',
			position: 'bottom',
			duration: 1000,
			isClosable: true,
		});
	} else {
		setSearching(true)
		setAllCampaigns([]);
		setSelectCategory('999')
		setRefresh('999')
		lastCampaignId2()
		
		setTimeout(() => {
			setSearching(false)
		}, 2000);
	 }
   }
  
  return (
    <VStack w={'full'}>
	<br/>
	<InputGroup className='custom-input-group'>
		<InputLeftElement pointerEvents='none'>
		  <SearchIcon  />
		</InputLeftElement>
		<Input className='custom-input' type='text' placeholder="Search by Campaign's Name (Case Sensitive)" onChange={(e) => setKeyword(e.target.value)} value={keyword}/>
		  <Button size='sm' className='button-search' onClick={searchCampaign}>
          {searching === true ? 'Searching...' : 'Search'}
		  </Button>
    </InputGroup>
	<Grid w={'full'}
		height={100}
	  templateRows='repeat(2, 1fr)'
	  templateColumns='repeat(5, 1fr)'
	  gap={4}
	  pt='30px'
	>
	<GridItem rowSpan={2} colSpan={1}>
	<RadioGroup defaultValue='0' onChange={setSelectCategory} value={selectCategory}>
		<Stack spacing={2}>
			<h3>Filter by</h3>
			<Radio borderColor='#d3cff1' value='0'>
				All
			</Radio>
			<Radio borderColor='#d3cff1' value='1'>
				Animal Welfare
			</Radio>
			<Radio borderColor='#d3cff1' value='2'>
				Art & Heritage
			</Radio>
			<Radio borderColor='#d3cff1' value='3'>
				Children & Youth
			</Radio>
			<Radio borderColor='#d3cff1' value='4'>
				Disability
			</Radio>
			<Radio borderColor='#d3cff1' value='5'>
				Education
			</Radio>
			<Radio borderColor='#d3cff1' value='6'>
				Elderly
			</Radio>
			<Radio borderColor='#d3cff1' value='7'>
				Women & Girls
			</Radio>
		</Stack>
	</RadioGroup>
	</GridItem>
	<GridItem colSpan={4}>
	<div className='campaign-grid'>
	<>
	<p>{(!allCampaign?.length && searching === false) ? 'No Result Found' : ''}</p>
	{allCampaign.map((campaign) => (
	<div className='campaign-card'>
	<div className='campaign-card-body'>
		<div className='campaign-cover'>
		<div className='campaign-raise-detail'>
			<div className='campaign-raise-amount'>RMT {campaign.totalRaised}</div>
			<p>raised from <b>{campaign.campaignDonors.length ? campaign.campaignDonors.length : '0' } donors</b></p>
			<Progress hasStripe value={Number(((Number(campaign.totalRaised) / Number(campaign.target)) * 100).toFixed(0)) } />
			<p><b>{((Number(campaign.totalRaised) / Number(campaign.target)) * 100).toFixed(2) }%</b> of RMT {campaign.target} ({campaign.dayRemain >= 0 ? campaign.dayRemain : 0} more days)</p>
		</div>
		{isHttpsUrl(campaign.logoUrl) ? (
            <img
              loading="lazy"
              src={campaign.logoUrl}
              alt="Campaign Cover"
            />
          ) : (
            <Image
              src={'/default-campaign-cover.jpg'}
              alt="Campaign Cover"
            />
        )}
		</div>
		<div className='campaign-content'>
			<div className='campaign-title'>
			<a href='/account/campaigndetail'><button onClick={() => CampaignsDetail(campaign.campaignIndex)}>{campaign.name}</button></a>
			<p style={{marginTop:5, fontSize:12}}>by {campaign.ownerName}</p>
			</div>
			<p>{campaign.about}</p>		
			<div className='campaign-due-date'></div><br/><br/>
			<div className='card-bottom'>
				{(getItem("userSignIn") === 'donor' && getItem("donorStatus") === 'true' && campaign.active === true) ? (
				  <a href='/account/campaigndetail'><button className='btn-donate-now' onClick={() => CampaignsDetail(campaign.campaignIndex)}>
					<Image
					src={'/icon-donate-now.svg'}
					className='icon-donate-now'			
					alt=""
					/>
					Donate Now
				  </button>
				  </a>
				): (<a href='/account/campaigndetail'><button className='btn-learn-more' onClick={() => CampaignsDetail(campaign.campaignIndex)}>Learn More</button></a> )
				}	
			</div>
		</div>
	</div>
	</div>
	))}
	</>
	</div>
	</GridItem>
	</Grid>
	<style jsx global>{`
		::placeholder {
		  opacity: 0.5;
		}
		.dark-text{
			color:#46339b;
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
		.campaign-raise-detail{
			position:absolute;
			left:0;
			bottom:0;
			width:100%;
			z-index: 1;
			padding: 0 10px;
			margin-bottom: 10px;
			color:#fff;
		}
		.campaign-raise-amount{
			font-size:22px;
			font-weight:bold;
			color:#fff;
		}
		.campaign-raise-detail p{
			color:#fff !important;
			font-size:12px;
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
		.campaign-due-date{
			display:flex;
			align-items:center;
			font-size:12px;
			margin-bottom:10px;
		}
		.campaign-due-date img{
			width:22px !important;
			height:22px !important;
			margin-right:10px;
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
		.icon-donate-now{
			width:auto !important;
			height:16px !important;
			max-width:none !important;
			margin-right:5px;
		}
	`}</style>
      
    </VStack>
  );
};

export default DonateNow;
