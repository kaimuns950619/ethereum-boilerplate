import { VStack, Grid, GridItem, Radio, RadioGroup, Stack, Progress } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react'
import { readContract } from '@wagmi/core'
import { contractAbi } from 'utils/contractAbi'
import { contractAddress, ETH_2_WEI_NUMBER } from 'utils/global'
import useStorage from 'utils/useStorage';
import { useRouter } from 'next/router';
import {  ethers } from 'ethers';

const MyCampaign = () => {
  const router = useRouter();
  const { setItem, getItem } = useStorage();
  const userAddress: `0x${string}` = getItem('userAddress') as `0x${string}`;
  
  const [campaignProfile, setCampaignProfile] = useState<{
  about: string;
  name: string;
  beneficiaryAddr: string[];
  beneficiaryPercent: number;
  campaignDonors: string[];
  logoUrl: string;
  endTime: number;
  startTime: number;
  status: boolean;
  totalRaised: string;
  target: string;
  campaignid: number;
  dayRemain: number;
  startIn: number;
  opacity: string;
  }[]>([]);
  
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [selectCategory, setSelectCategory] = useState('0')
  const [refresh, setRefresh] = useState('999')
  const today = new Date();
	
	if( getItem("userSignIn") !== 'charity' || !getItem("userAddress") ){
		useEffect(() => {
		  // Redirect to home page after component mounts
		  router.push('/');
		}, []);

		return null;
	}
	
	async function CampaignsDetail (campaignId: number) {
    // Your logic here, for example, fetching details from an API
	
		const detailRes = await readContract({
		 address: contractAddress,
		 abi: contractAbi,
		 functionName: 'getCampaignProfile',
		 args: [ethers.BigNumber.from(campaignId)],
		})
		
		const campaignDayRemain = Math.ceil(((Number(detailRes['endTime']._hex) * 1000) - Number(today)) / (1000 * 60 * 60 * 24))
		const campaignStartIn = Math.ceil(((Number(detailRes['startTime']._hex) * 1000) - Number(today)) / (1000 * 60 * 60 * 24))
		
		let thisOpacity = "1.0"
		
		if(detailRes['status'] === false){
			thisOpacity = "0.3"
		}
		
		let display = false
		
		if(selectCategory === '0'){
			display = true
		} else if(selectCategory === '1' && campaignStartIn < 0 && campaignDayRemain < 0){
			display = true
		} else if(selectCategory === '2' && campaignStartIn > 0){
			display = true
		} else if(selectCategory === '3' && detailRes['status'] === false){
			display = true
		} 

		if(display === true){
			setCampaignProfile((prevCampaigns) => [
			...prevCampaigns,
			{
			about: detailRes['about'],
			beneficiaryAddr: detailRes['beneficiaryAddr'].map((e) => e),
			beneficiaryPercent: Number(detailRes['beneficiaryPercent']),
			campaignDonors: detailRes['campaignDonors'].map((e) => e),
			endTime: Number(detailRes['endTime']._hex),
			logoUrl: detailRes['logoUrl'],
			name: detailRes['name'],
			startTime: Number(detailRes['startTime']._hex),
			status: detailRes['status'],
			target: (Number(ethers.BigNumber.from(detailRes['target']).toString()) / ETH_2_WEI_NUMBER).toFixed(0),
			totalRaised: (Number(ethers.BigNumber.from(detailRes['totalRaised']).toString()) / ETH_2_WEI_NUMBER).toFixed(0),
			campaignid: campaignId,
			dayRemain: campaignDayRemain,
			startIn: campaignStartIn,
			opacity: thisOpacity,
			},
			]);
		}
    }
  
	function isHttpsUrl(url : string) {
	  const httpsUrlPattern = /^https:\/\//;
	  return httpsUrlPattern.test(url);
	}
  
	function setCampaign(id : number) {
	  setItem("campaignId",String(id)); 
	}
	
	const fetchData = async () => {
	  const res = await readContract({
		  address: contractAddress,
		  abi: contractAbi,
		  functionName: 'getCharityProfile',
		  args: [userAddress],
		});
		console.log('res : ', res);
		setEmail(res['email']);
		setName(res['name']);
		const campaignIds = res['campaignIds'].map((e) => Number(e._hex));
		await Promise.all(campaignIds.map(CampaignsDetail));
	};
	
	if(selectCategory !== refresh){
		setCampaignProfile([])
		setRefresh(selectCategory)
		fetchData();
	  } 

  return (
    <VStack w={'full'}>
	<div className='profile-heading'>
		<h3>My Campaign</h3>
	</div>
	<div className='profile-detail'>
		<div className='profile-pic'>
			<Image
			src={'/default-user.jpg'}
			alt=""
			/>
		</div>
		<div className='text-center'>
			<div className='user-name'>
				{name ? name:'-'}
			</div>
			<div className='user-email'>
				{email ? email:'-'}
			</div>
		</div>
	</div>
	<div className='tabbed-bar'>
		<ul>
			<li><Link href='/account/profile'>Account</Link></li>
			<li><Link href='/account/mycampaign' className='active'>My Campaign</Link></li>
			<li><Link href='/account/dashboard'>Dashboard</Link></li>
		</ul>
	</div>
	<div className='content-wrapper' style = {{width:'100%'}}>
		<p>{campaignProfile?.length ? campaignProfile.length : '0'} Result Found</p>
		<Link href='/account/createcampaign'><div className='add-new-campaign'><button className='btn-outline ml-auto d-inline-block'>Fundraise Now</button></div></Link>
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
					On Going
				</Radio>
				<Radio borderColor='#d3cff1' value='2'>
					Future
				</Radio>
				<Radio borderColor='#d3cff1' value='3'>
					Deleted
				</Radio>
			</Stack>
		</RadioGroup>
		</GridItem>
		<GridItem colSpan={4}>	
		<div className='campaign-grid'>
			{campaignProfile.map((allCampaign) => (
				<div className='campaign-card' style={{ opacity: allCampaign.opacity }}>
				<div className='campaign-card-body'>
					<div className='campaign-cover'>
					<div className='campaign-raise-detail'>
						<div className='campaign-raise-amount'>RMT {allCampaign.totalRaised}</div>
						<p>raised from <b>{allCampaign.campaignDonors.length ? allCampaign.campaignDonors.length : '0' } donors</b></p>
						<Progress hasStripe value={Number(((Number(allCampaign.totalRaised) / Number(allCampaign.target)) * 100).toFixed(0)) } />
						<p><b>{((Number(allCampaign.totalRaised) / Number(allCampaign.target)) * 100).toFixed(2) }%</b> of RMT {allCampaign.target} ({allCampaign.dayRemain >= 0 ? allCampaign.dayRemain : 0} more days)</p>
					</div>
					{isHttpsUrl(allCampaign.logoUrl) ? (
						<img
						  loading="lazy"
						  src={allCampaign.logoUrl}
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
						<a href='/account/campaigndetail'><button onClick={() => setCampaign(allCampaign.campaignid)}>{allCampaign.name}</button></a>
						<p style={{marginTop:5, fontSize:12}}>by {allCampaign.name}</p>
						</div>
						<p>{allCampaign.about}</p>
						<div className='campaign-due-date'>
							<Image
								src={'/icon-calander-duedate.png'}
								alt="Icon calander"
							/>
							
							{(allCampaign.startIn > 0) ? (
								<div className='' style={{color:'orange'}}>
								  <b>{allCampaign.startIn} Days</b> to start<br/>
								  Starts on <b>{new Date(allCampaign.startTime * 1000).toLocaleDateString()}</b><br/>
									Ends on <b>{new Date(allCampaign.endTime * 1000).toLocaleDateString()}</b>
								</div>
							) : (allCampaign.dayRemain <= 0) ? (
								<div className='' style={{color:'red'}}>
									<b>Ended</b><br/>
									Starts on <b>{new Date(allCampaign.startTime * 1000).toLocaleDateString()}</b><br/>
									Ends on <b>{new Date(allCampaign.endTime * 1000).toLocaleDateString()}</b>
								</div>
							) : (allCampaign.status === false) ? (
								<div className='' style={{color:'red'}}>
									<b>Deleted</b><br/>
									Starts on <b>{new Date(allCampaign.startTime * 1000).toLocaleDateString()}</b><br/>
									Ends on <b>{new Date(allCampaign.endTime * 1000).toLocaleDateString()}</b>
								</div>
							) : (
								<div className='' style={{color:'green'}}>
									Starts on <b>{new Date(allCampaign.startTime * 1000).toLocaleDateString()}</b><br/>
									Ends on <b>{new Date(allCampaign.endTime * 1000).toLocaleDateString()}</b>
								</div>
							)}
						</div>
						{(allCampaign.dayRemain <= 0 || allCampaign.status === false) ? (
						  <a href='/account/campaigndetail'><button className='btn-outline' onClick={() => setCampaign(allCampaign.campaignid)}>View Campaign</button></a>
						) : (<a href='/account/updatecampaign'><button className='btn-outline' onClick={() => setCampaign(allCampaign.campaignid)}>Edit Campaign</button></a>)}
						
					</div>
				</div>
				</div>
			  ))}
		</div>
	</GridItem>
	</Grid>
	</div>
	<style jsx global>{`
		.user-name{
			font-size:16px;
			font-weight:bold;
		}
		.user-email{
			font-size:12px;
		}
		.row{
			display:flex;
		}
		.w-50{
			width:50%;
		}
		.w-100{
			width:100%;
		}
		.p-2{
			padding:10px;
		}
		.m-2{
			margin:10px !important;
		}
		.mb-3{
			margin-bottom:15px;
		}
		.ml-auto{
			margin-left:auto;
		}
		.d-inline-block{
			display:inline-block;
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
		.main-banner-box{
			position:relative;
			overflow:hidden;
			max-height:360px;
			width:100%;
			display:flex;
			justify-content:center;
			align-items:center;
		}
		.add-new-campaign{
			width:100%;
			display:flex;
			justify-content:end;
			font-size:12px;
		}
		.add-new-campaign button{
			width:165px;
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
		.icon-donate-now{
			width:auto !important;
			height:16px !important;
			max-width:none !important;
			margin-right:5px;
		}
		.tabbed-bar{
			width:100%;
			margin-bottom:15px !important;
		}
		.tabbed-bar ul{
			margin:0;
			padding:0;
			display:flex;
			justify-content:center;
			border-bottom: 1px solid #7b64dd;
		}
		.tabbed-bar li{
			position:relative;
			list-style:none;
		}
		.tabbed-bar li a.active{
			border-bottom:3px solid #7b64dd;
		}
		.tabbed-bar li a{
			padding:10px 15px;
			display:block;
			transition:all ease .3s;
		}
		.tabbed-bar li a:hover{
			background:#d3cff1;
		}		
		.profile-heading{
			margin-bottom:20px;
			width:100%;
		}
		.profile-heading h3{
			font-size:2em;
			font-weight:bold;
			color:#7b64dd;			
		}
		.profile-detail{
			display:flex;
			flex-direction:column;
			justify-content:center;
			margin:10px 0;
		}
		.profile-pic{
			width:60px;
			height:60px;
			margin:auto;
			margin-bottom:10px;
			border-radius:50%;
			border:1px solid #efefef;
			overflow:hidden;
			display:flex;
			align-items:center;
			justify-content:center;
		}
		.profile-pic img{
			width:60px;
			height:60px;
			max-width:none !important;
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
			color:#fff;
		}
		.text-center{
			text-align:center;
		}
	`}</style>
    </VStack>
  );
};

export default MyCampaign;
