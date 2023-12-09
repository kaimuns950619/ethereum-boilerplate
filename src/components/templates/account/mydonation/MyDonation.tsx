import { VStack } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

import { useEffect, useState } from 'react'
import { readContract } from '@wagmi/core'
import { contractAbi } from 'utils/contractAbi'
import { contractAddress, ETH_2_WEI_NUMBER } from 'utils/global'
import {  ethers } from 'ethers';
import useStorage from 'utils/useStorage';
import { useRouter } from 'next/router';

const MyDonation = () => {
  const router = useRouter();
  const { setItem, getItem } = useStorage();
  const userAddress: `0x${string}` = getItem('userAddress') as `0x${string}`;
  const [allDonations, setAllDonations] = useState<{
  amount: number;
  campaignId: number;
  owner: string;
  name: string;
  timestamp: number;
  }[]>([]);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  
	if( getItem("userSignIn") !== 'donor' || !getItem("userAddress") ){
		useEffect(() => {
		  // Redirect to home page after component mounts
		  router.push('/');
		}, []);

		return null;
	}
  
  useEffect(() => {
   const fetchData = async () => {
	  const res = await readContract({
		  address: contractAddress,
		  abi: contractAbi,
		  functionName: 'getDonorProfile',
		  args: [userAddress],
		});
		
		setEmail(res['email']);
		setName(res['name']);
		setGender(res['gender']);
	};
	
   const processDonation = async (donationId:number) => {
   const res2 = await readContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'allDonations',
    args: [ethers.BigNumber.from(donationId)],
   });
   
   const res3 = await readContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'allCampaigns',
    args: [ethers.BigNumber.from(res2['campaignId']._hex)],
   });
   
   setAllDonations((prevCampaigns) => [
	...prevCampaigns,
	{
	amount: Number(res2['amount']._hex),
	campaignId: Number(res2['campaignId']._hex),
	owner: res3['owner'],
	timestamp: Number(res2['timestamp']._hex),
	name: res3['name'],
	},
	]);
	
   // Your logic for each donationId goes here
   };
   async function getDonorProfile() {
    const res = await readContract({
     address: contractAddress,
     abi: contractAbi,
     functionName: 'getDonorProfile',
     args: [userAddress],
    })
	
	const donationIds = res['donationIds'].map((e) => Number(e._hex));
	await Promise.all(donationIds.map(processDonation));
   }
   
   fetchData();
   getDonorProfile()
  }, [userAddress]);
  
  async function CampaignsDetail (campaignId: number) {
	setItem('campaignId', campaignId.toString());
  }
  
  return (
    <VStack w={'full'}>
	<div className='profile-heading'>
		<h3>My donation</h3>
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
		<ul>
			<li><Link href='/account/donorprofile'>Account</Link></li>
			<li><Link href='/account/mydonation' className='active'>My Donation</Link></li>
			<li><Link href='/account/dashboard'>Dashboard</Link></li>
		</ul>
	</div>
	<div className='content-wrapper'>
	
		<table className='table'>
			<tr>
				<th>Donation Date</th>
				<th>Donated Campaign</th>
				<th>Donation Amount</th>
			</tr>
			{allDonations?.length ? (
			  allDonations.map((allDonation, key) => (
				<tr key={key}>
				  <td>{new Date(allDonation.timestamp * 1000).toLocaleDateString()}</td>
				  <td> <a href='/account/campaigndetail'><button onClick={() => CampaignsDetail(allDonation.campaignId)}>{allDonation?.name}</button></a></td>
				  <td>RMT {allDonation?.amount !== undefined ? (allDonation.amount / ETH_2_WEI_NUMBER).toFixed(0) : 'N/A'}</td>
				</tr>
			  ))
			) : (
			  <tr><td colSpan={5} style={{ textAlign: 'center' }}>Looks Like you do not have any transactions</td></tr>
			)}
		</table>
	</div>
	<style jsx global>{`
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
	`}</style>
    </VStack>
  );
};

export default MyDonation;
