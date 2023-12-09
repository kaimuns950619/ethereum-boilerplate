import { VStack } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

import { useEffect, useState } from 'react'
import { readContract } from '@wagmi/core'
import { contractAbi } from 'utils/contractAbi'
import { contractAddress, ETH_2_WEI_NUMBER } from 'utils/global'
import useStorage from 'utils/useStorage';

const Dashboard = () => {
  const { getItem } = useStorage();
  const userAddress: `0x${string}` = getItem('userAddress') as `0x${string}`;
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [registerDate, setRegisterDate] = useState(0);
  const [donorProSummary, setDonorSummary] = useState({
  amount: '',
  address: [""],
  donations: '',
  highestDonation: '',
  highestDonationDate: "",
  topSupportedCharity: "",
  });
  const [charityProSummary, setCharitySummary] = useState({
  totalCampaign: [""],
  totalRaise: '',
  totalDonor: 0,
  donations: '',
  topDonorAddress: '',
  topContributionCampaign: '',
  topDonationCampaign: '',
  });

  let profileFunctionName: "getDonorProfile" | "getCharityProfile"; 
  async function getDonorProSummary() {
    const res = await readContract({
     address: contractAddress,
     abi: contractAbi,
     functionName: 'userDonationSummary',
     args: [userAddress],
    })
	const thisDate = new Date(Number(res['currentHighestContributionDate']._hex) * 1000)
	
	const startDay = thisDate.getDate();
  let startMonth = thisDate.getMonth();
  startMonth = startMonth ? startMonth + 1 : 1;
  const startYear = thisDate.getFullYear();
 
	setDonorSummary({
	amount: (Number(res['0']._hex)/ETH_2_WEI_NUMBER).toFixed(0),
	address: res[1].map((e) => e),
	donations: (Number(res['2']._hex)/ETH_2_WEI_NUMBER).toFixed(0),
	highestDonation: (Number(res['currentHighestContribution']._hex)/ETH_2_WEI_NUMBER).toFixed(0),
	highestDonationDate: `${startYear}-${startMonth}-${startDay}`,
	topSupportedCharity: res['currentTopDonatedCharity'],
	
	})
   }

   async function getCharityInfo() {
   
    const res = await readContract({
     address: contractAddress,
     abi: contractAbi,
     functionName: 'getCharityInfo',
     args: [userAddress],
    })
	
	
	
	setCharitySummary({
	totalCampaign: res[0].map((e) => e.toString()),
	totalRaise: (Number(res['1']._hex)/ETH_2_WEI_NUMBER).toFixed(0),
	totalDonor: Number(res['2']._hex),
	donations: (Number(res['3']._hex)/ETH_2_WEI_NUMBER).toFixed(0),
	topDonorAddress: res['topDonor'],
	topContributionCampaign: res['topContributorCampaign'],
	topDonationCampaign: res['topDonationsCampaign'],
	})
   }
   
   
  async function getDonorProfileFunc() {
    const res = await readContract({
      address: contractAddress,
	  abi: contractAbi,
	  functionName: 'getDonorProfile',
	  args: [userAddress],
    })
	
	setEmail(res['email']);
	setName(res['name']);
	setGender(res['gender']);
	setRegisterDate(Math.ceil((Number(new Date()) - (Number(res['registrationDate']._hex) * 1000)) / (1000 * 60 * 60 * 24)))
	
   }
   
   
   async function getCharityProfileFunc() {
    const res = await readContract({
      address: contractAddress,
	  abi: contractAbi,
	  functionName: 'getCharityProfile',
	  args: [userAddress],
    })
	
	setEmail(res['email']);
	setName(res['name']);
   }
   
  useEffect(() => {
  
  if( getItem("userSignIn") === 'donor' ){
	   profileFunctionName = 'getDonorProfile';
	   getDonorProfileFunc()
       getDonorProSummary()
   }
   
   if( getItem("userSignIn") === 'charity' ){
		profileFunctionName = 'getCharityProfile';
		getCharityProfileFunc()
	    getCharityInfo()
	   
   }
   
   const fetchData = async () => {
	  const res = await readContract({
		  address: contractAddress,
		  abi: contractAbi,
		  functionName: profileFunctionName,
		  args: [userAddress],
		});
		
		setEmail(res['email']);
		setName(res['name']);
	};
	
	fetchData();
  }, [userAddress]);

  return (
    <VStack w={'full'}>
	<div className='profile-heading'>
		<h3>Dashboard</h3>
	</div>
	<div className='profile-detail'>
		<div className='profile-pic'>
			{gender === 'Female' ? (
				<Image src={'/female.png'} alt=""/>
			) : gender === 'Male' ? (
				<Image src={'/male.png'} alt=""/>
			) : (
				<Image src={'/default-user.jpg'} alt=""/>
			)}
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
		
		  {getItem("userSignIn") === 'charity' ? (
			<ul>
			<li><Link href='/account/profile'>Account</Link></li>
			<li><Link href='/account/mycampaign'>My Campaign</Link></li>
			<li><Link href='/account/dashboard' className='active'>Dashboard</Link></li>
			</ul>
		  ) : getItem("userSignIn") === 'donor' ? (
			<ul>
			<li><Link href='/account/donorprofile'>Account</Link></li>
			<li><Link href='/account/mydonation'>My Donation</Link></li>
			<li><Link href='/account/dashboard' className='active'>Dashboard</Link></li>
			</ul>
		  ) : null}
		  
		
	</div>
	<div className='content-wrapper'>
		<div className='dashboard-grid'>
			<div className='dashboard-grid-box'>
				<div className='dashboard-card'>
					{getItem("userSignIn") === 'donor' ? (
					  <div className='dashboard-card-header'>Donated to Charities</div>
					) : getItem("userSignIn") === 'charity' ? (
					  <div className='dashboard-card-header'>Raised For Charities</div>
					) : null}
					
					{getItem("userSignIn") === 'donor' ? (
					<div className='dashboard-card-body'>
					  <div className='donated-amount'>RMT {donorProSummary.amount ? donorProSummary.amount : '0'}</div>
					  <p>donated to charities</p>
					  <p>Find out which causes your dollars have supported</p>
					</div>
					) : getItem("userSignIn") === 'charity' ? (
					<div className='dashboard-card-body'>
					  <div className='donated-amount'>RMT {charityProSummary.totalRaise ? charityProSummary.totalRaise : '0'}</div>
					  <p>through <b>{charityProSummary.totalCampaign.length}</b> campaigns </p>
					  <p>Find our how well your campaigns have done</p>
					</div>
					) : null}
					
				</div>
			</div>
			<div className='dashboard-grid-box'>
				<div className='dashboard-card'>
					{getItem("userSignIn") === 'donor' ? (
					  <div className='dashboard-card-header'>Charities Supported</div>
					) : getItem("userSignIn") === 'charity' ? (
					  <div className='dashboard-card-header'>Contributed Donors</div>
					) : null}
					
					
					{getItem("userSignIn") === 'donor' ? (
					<div className='dashboard-card-body'>
					  <div className='donated-amount'>{(donorProSummary.address.length && donorProSummary.address[0] !== "") ? donorProSummary.address.length : '0'}</div>
					  <p>Total charities you have supported</p>
					  <p>Find out more charities to support</p>
					</div>
					) : getItem("userSignIn") === 'charity' ? (
					<div className='dashboard-card-body'>
					  <div className='donated-amount'>{charityProSummary.totalDonor ? charityProSummary.totalDonor : '0'} Donors</div>
					  <p>have supported donated to your campaign</p>
					</div>
					) : null}
						
					
				</div>
			</div>
			<div className='dashboard-grid-box'>
				<div className='dashboard-card'>
					<div className='dashboard-card-header'>Average Donation</div>
					
					{getItem("userSignIn") === 'donor' ? (
					<div className='dashboard-card-body'>
					  <div className='donated-amount'>RMT {(Number(donorProSummary.donations)/Number(donorProSummary.address.length)).toFixed(0)}</div>
					  <p>Average across {(donorProSummary.address.length && donorProSummary.address[0] !== "") ? donorProSummary.address.length : '0'} charities</p>
					  <p>Find out which cause your dollars have supported</p>
					</div>
					) : getItem("userSignIn") === 'charity' ? (
					<div className='dashboard-card-body'>
					  <div className='donated-amount'>
						  RMT {charityProSummary.totalDonor !== 0
							? (Number(charityProSummary.donations) / Number(charityProSummary.totalDonor)).toFixed(0)
							: '0'}
						</div>

					  <p>Average donation across {charityProSummary.totalDonor} Donors</p>
					</div>
					) : null}
					
				</div>
			</div>


















			<div className='dashboard-grid-box'>
				<div className='dashboard-card'>
					{getItem("userSignIn") === 'donor' ? (
					  <div className='dashboard-card-header'>Top Donation</div>
					) : getItem("userSignIn") === 'charity' ? (
					  <div className='dashboard-card-header'>Top Donors</div>
					) : null}
					
					{getItem("userSignIn") === 'donor' ? (
					<div className='dashboard-card-body'>
					  <div className='donated-amount'>RMT {donorProSummary.highestDonation ? donorProSummary.highestDonation : '0'}</div>
					  <p style={{display: donorProSummary.highestDonationDate !== '' ? 'block' : 'none' }}>on {donorProSummary.highestDonationDate}</p>
					  <p></p>
					</div>
					) : getItem("userSignIn") === 'charity' ? (
					<div className='dashboard-card-body'>
					  <div className='donated-amount'>{charityProSummary.topDonorAddress !== '' &&  charityProSummary.topDonorAddress !== '0x0000000000000000000000000000000000000000'? charityProSummary.topDonorAddress : '-'}</div>
					  <p>through <b>{charityProSummary.totalCampaign.length}</b> campaigns </p>
					  <p></p>
					</div>
					) : null}
					
				</div>
			</div>
			<div className='dashboard-grid-box'>
				<div className='dashboard-card'>
					{getItem("userSignIn") === 'donor' ? (
					  <div className='dashboard-card-header'>Donor Account Created</div>
					) : getItem("userSignIn") === 'charity' ? (
					  <div className='dashboard-card-header'>Top Contributor Campaign</div>
					) : null}
					{getItem("userSignIn") === 'donor' ? (
					<div className='dashboard-card-body'>
					  <div className='donated-amount'>{(registerDate > 0) ?  `${registerDate} Day(s)` : 'Today'}</div>
					  <p></p>
					</div>
					) : getItem("userSignIn") === 'charity' ? (
					<div className='dashboard-card-body'>
					  <div className='donated-amount'>{charityProSummary.topContributionCampaign !== '' ? charityProSummary.topContributionCampaign : '-'}</div>
					  <p>through <b>{charityProSummary.totalCampaign.length}</b> campaigns </p>
					</div>
					) : null}
						
					
				</div>
			</div>
			<div className='dashboard-grid-box'>
				<div className='dashboard-card'>
					{getItem("userSignIn") === 'donor' ? (
					  <div className='dashboard-card-header'>Top Supported Charity</div>
					) : getItem("userSignIn") === 'charity' ? (
					  <div className='dashboard-card-header'>Top Donations Campaign</div>
					) : null}
					{getItem("userSignIn") === 'donor' ? (
					<div className='dashboard-card-body'>
					  <div className='donated-amount'>{(donorProSummary.topSupportedCharity !== "") ? donorProSummary.topSupportedCharity : '-'}</div>
					  <p>amongs all donations</p>
					  <p></p>
					</div>
					) : getItem("userSignIn") === 'charity' ? (
					<div className='dashboard-card-body'>
					  <div className='donated-amount'>{(charityProSummary.topDonationCampaign !== "") ? charityProSummary.topDonationCampaign : '-'}</div>
					  <p>through <b>{charityProSummary.totalCampaign.length}</b> campaigns </p>
					</div>
					) : null}
					
				</div>
			</div>
		</div>
	</div>
	<style jsx global>{`
		.alert-message{
			width:100%;
			padding:5px 15px;
			border-radius:5px;
		}
		.alert-message.success{
			background-color:#dff0d8 !important;
			border:1px solid #b9d1af;
		}
		.alert-message.danger{
			background-color:#f2dede !important;
			border:1px solid #e1c3c3;
		}
		.dashboard-grid{
			flex-wrap:wrap;
			display:flex;
			justify-content:center;
			width:100%;
		}
		.dashboard-grid-box{
			padding:10px;
			width:33%;
		}
		.dashboard-card{
			background:#d3cff1;
			border-radius:20px;
			height:100%;
			display:flex;
			flex-direction:column;
		}
		.dashboard-card-header{
			background:#7b64dd;
			color:#fff;
			font-size:20px;
			font-weight:bold;
			padding:6px 15px;
			text-align:center;
			text-transform:uppercase;
			border-radius:20px 20px 0 0;
		}
		.dashboard-card-body{
			padding:15px;
			font-size:14px;
			min-height:180px;
			display:flex;
			flex-direction:column;
		}
		.donated-amount{
			font-size:18px;
			font-weight:bold;
			color:#5f47c3;
		}
		.table{
			border:1px solid #ccc;
			width:100%;
		}
		.table tr th{
			padding:10px;
			font-size:14px;
			color:#7b64dd;
		}
		.table tr td{
			padding:10px;
			border:1px solid #ccc;
			font-size:14px;
			color:#5a4b97;
		}
		.subtitle{
			font-size:16px;
			font-weight:bold;
			margin-bottom:15px;
		}
		.content-wrapper{
			width:100%;
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
		.btn-default{
			margin:15px 0;
			padding:10px 30px;
			background:#7b64dd;
			color:#fff;
			border-radius:25px;
		}
		.input-group{
			display:flex;
			flex-direction:column;
		}
		label{
			margin-bottom:5px;
		}
		.form-control{
			background:#dad8ef;
			border:1px solid #dad8ef;
			padding:10px;
		}
		input.form-control::placeholder{
			color:#000 !important;
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
		.user-name{
			font-size:16px;
			font-weight:bold;
		}
		.user-email{
			font-size:12px;
		}
		.text-center{
			text-align:center;
		}
		.btn-sign-up{
			width:100%;
			padding:6px;
			margin-bottom:5px;
			margin-top:auto;
			border-radius:25px;
			border:2px solid #7b64dd;
			color:#7b64dd;
			display:block;
			transition:all ease .3s;
		}
		.btn-sign-up:hover{
			background:#f1eeff;
		}
		.btn-outline {
			width: 100%;
			padding: 6px;
			margin-top:auto;
			margin-bottom: 5px;
			border-radius: 10px;
			border: 2px solid #7b64dd;
			color: #7b64dd;
			text-transform:uppercase;
			display: block;
			transition:all ease .3s;
		}
		.btn-outline:hover{
			background:#7b64dd;
			color:#fff;
		}
	`}</style>
    </VStack>
  );
};

export default Dashboard;
