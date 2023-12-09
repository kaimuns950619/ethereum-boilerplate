import { VStack, Text, useToast, Progress } from '@chakra-ui/react';
import { useAccount, usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'
import { contractAbi as tokenAbi, rmTokenContract } from 'utils/tokenAbi'
import { useDebounce } from 'use-debounce'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Portal
} from '@chakra-ui/react'
import Image from 'next/image';
import Link from 'next/link';
import useStorage from 'utils/useStorage';
import { useEffect, useState } from 'react'
import { readContract } from '@wagmi/core'
import { contractAbi } from 'utils/contractAbi'
import {  ethers } from 'ethers';
import { contractAddress, ETH_2_WEI_NUMBER } from 'utils/global'
import { Avatar } from '@chakra-ui/react';
import { useRouter } from 'next/router';
const CampaignDetail = () => {
  let campaignId;
  let totalDonor = 0;
  const { setItem, getItem } = useStorage();
  const [campaignProfile, setCampaignProfile] = useState({
  about: '',
  name: '',
  owner: '',
  ownerName: '',
  ownerPhone: '',
  ownerEmail: '',
  ownerAbout: '',
  beneficiaryAddr: [""],
  beneficiaryPercent: 0,
  campaignDonors: [""],
  logoUrl: '',
  endTime: 0,
  startTime: 0,
  status: false,
  totalRaised: '',
  target: '',
  campaignid: '',
  dayRemain: 0,
  });
  const today = new Date();
  const router = useRouter();
  const toast = useToast();
  const { address } = useAccount()
  const connectedAccount: `0x${string}` = address || '0x0000000000000000000000000000000000000000';
  const [userAllowance, setUserAllowance] = useState(0);
  const [donateAmount, setDonateAmount] = useState("1");
  const [showApproveBtn, setShowApproveBtn] = useState(1);
  const [showDonateBtn, setShowDonateBtn] = useState(0);
  const [finalDonateAmount, setFinalDonateAmount] = useState("1");
  const [showPopup, setShowPopup] = useState("true");

  /*READ CONTRACT*/
  useEffect(() => {
    async function getAllowance() {
      const res = await readContract({
        address: rmTokenContract,
        abi: tokenAbi,
        functionName: 'allowance',
        args: [connectedAccount, contractAddress],
      })
	  setUserAllowance(parseInt(ethers.utils.formatUnits(res, 18)))
    }
	
	getAllowance();
	const interval = setInterval(getAllowance, 3000);
	return () => clearInterval(interval);
  }, []);
  
  console.log("userAllowance",userAllowance)
  
  if( getItem('campaignId') ){
	campaignId = ethers.BigNumber.from(getItem('campaignId'));
  }else{
	campaignId = ethers.BigNumber.from("27");
  }
  const f_approveAmount = ethers.BigNumber.from(ethers.utils.parseEther(String(useDebounce(donateAmount, 300)[0]))._hex);
  const f_donateAmount = ethers.BigNumber.from(ethers.utils.parseEther(String(useDebounce(finalDonateAmount, 300)[0]))._hex);

  // Allowance
  const { config: allowanceConfig } = usePrepareContractWrite({
    address: rmTokenContract,
    abi: tokenAbi,
    functionName: 'approve',
    args: [contractAddress, f_approveAmount],
  })
  const { data: allowanceWriteData, write: writeAllowance } = useContractWrite(allowanceConfig)

  const { isLoading: allowanceLoading } = useWaitForTransaction({
    hash: allowanceWriteData?.hash
  })

  // Donate
  const { config: donateConfig } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'donate',
    args: [campaignId, f_donateAmount],
  })
  const { data: donateWriteData, write: writeDonate } = useContractWrite(donateConfig)

  const { isLoading: donateLoading } = useWaitForTransaction({
    hash: donateWriteData?.hash
  })
  
	if(userAllowance >= parseInt(donateAmount)){
		if(showApproveBtn){
		  setFinalDonateAmount(donateAmount)
		  setShowApproveBtn(0)
		  setShowDonateBtn(1)
		}
	} else {
		if(!showApproveBtn){
		  setShowApproveBtn(1)
		  setShowDonateBtn(0)
		}
	}
	
	if(getItem('amount') !== ''){
		setDonateAmount(getItem('amount').toString())
		setFinalDonateAmount(getItem('amount').toString())
		setItem('amount', "")
	}
	
	if(allowanceWriteData?.hash && !allowanceLoading){
		setItem('amount', donateAmount.toString());
		router.reload();
	}
	
	
	if(donateWriteData?.hash && !donateLoading){
	
		if(showPopup === 'true'){
			toast({
				title: 'Donate successfully.',
				description: "",
				status: 'success',
				position: 'bottom',
				duration: 2000,
				isClosable: true,
			});
			setShowPopup('false')
		}
	}
	
  function isHttpsUrl(url : string) {
	const httpsUrlPattern = /^https:\/\//;
	return httpsUrlPattern.test(url);
  }
	
  useEffect(() => {
  
  async function donorDetails(addr: string) {
  // Ensure addr starts with '0x'
  const formattedAddr = addr.startsWith('0x') ? addr : `0x${addr}`;

  const donorDetailsRes = await readContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'getCampaignTotalDonatedPerAddress',
    args: [ethers.BigNumber.from(getItem('campaignId')), formattedAddr as `0x${string}`],
  });
  const donatedAmount = (Number(ethers.BigNumber.from(donorDetailsRes).toString()) / ETH_2_WEI_NUMBER).toFixed(0);
  setCampaignProfile((prevProfile) => {
    // Filter out the entry with key '0'
    const { '0': _, ...rest } = prevProfile.campaignDonors;

    return {
      ...prevProfile,
      campaignDonors: {
        ...rest,
        [addr]: donatedAmount,
      },
    };
  });
  
 }

   async function CampaignsDetail () {
    // Your logic here, for example, fetching details from an API
	
	const detailRes = await readContract({
     address: contractAddress,
     abi: contractAbi,
     functionName: 'getCampaignProfile',
     args: [ethers.BigNumber.from(getItem('campaignId'))],
    })
	
	const allCampaignsRes = await readContract({
     address: contractAddress,
     abi: contractAbi,
     functionName: 'allCampaigns',
     args: [ethers.BigNumber.from(getItem('campaignId'))],
    })
	
	const allCharitiesRes = await readContract({
     address: contractAddress,
     abi: contractAbi,
     functionName: 'allCharities',
     args: [allCampaignsRes['owner']],
    })
	
	const donorAddresses = detailRes['campaignDonors'];

	// Create an array of promises for each readContract call
	donorAddresses.forEach((donorAddress) => {
	  donorDetails(donorAddress);
	});
	
	setCampaignProfile((prevProfile2) => ({
	...prevProfile2,
	about: detailRes['about'],
	beneficiaryAddr: detailRes['beneficiaryAddr'].map((e) => e),
	beneficiaryPercent: Number(detailRes['beneficiaryPercent']),
	endTime: Number(detailRes['endTime']._hex),
	logoUrl: detailRes['logoUrl'],
	name: detailRes['name'],
	owner: allCampaignsRes['owner'],
	ownerName: allCharitiesRes['name'],
	ownerPhone: allCharitiesRes['phone'],
	ownerEmail: allCharitiesRes['email'],
	ownerAbout: allCharitiesRes['about'],
	startTime: Number(detailRes['startTime']._hex),
	status: detailRes['status'],
	target: (Number(ethers.BigNumber.from(detailRes['target']).toString()) / ETH_2_WEI_NUMBER).toFixed(0),
	totalRaised: (Number(ethers.BigNumber.from(detailRes['totalRaised']).toString()) / ETH_2_WEI_NUMBER).toFixed(0),
	campaignid: getItem('campaignId'),
	dayRemain: Math.ceil(((Number(detailRes['endTime']._hex) * 1000) - Number(today)) / (1000 * 60 * 60 * 24)),
	 }));
	
  }
   CampaignsDetail();
  }, [getItem('campaignId')]);


 const handleSubmit = (event: any) => {
	
	event.preventDefault();
 
	const availableAmount = Number(campaignProfile.target) - Number(campaignProfile.totalRaised)
 
	if(Number(donateAmount) > availableAmount){
	
		let errmsg = "Available donation quota left: RMT "
		errmsg += availableAmount.toString()
		
		 toast({
			title: errmsg,
			description: "",
			status: 'error',
			position: 'bottom',
			duration: 2000,
			isClosable: true,
		});
	} else {
		writeAllowance?.()
	}
  };

  return (
    <VStack w={'full'}>
	{(donateWriteData?.hash && !donateLoading) && (
	  <div className='alert-message success'>
		You may view your transaction at <a target='_blank' href={`https://testnet.bscscan.com/tx/${donateWriteData?.hash}`}>Binance Smart Chain</a>
	  </div>
	)}
	<div className='profile-heading'>
		<h3>Campaign Detail</h3>
	</div>	
	<div className='content-wrapper'>
		<div className='row'>
			<div className='w-50 p-2'>
				{isHttpsUrl(campaignProfile.logoUrl) ? (
					<div className='campaign-cover-img'>
					<img
					  loading="lazy"
					  src={campaignProfile.logoUrl}
					  alt="Campaign Cover"
					/>
					</div>
				  ) : (
					<div className='campaign-cover-img'>
					<Image
						src={'/default-campaign-cover.jpg'}
						alt="Campaign Cover"
					/>
					</div>
				)}
				
				<h3>About campaign</h3>
				<p>{campaignProfile.about}</p>
			</div>
			<div className='w-50 p-2'>
				<div className='campaign-title'>{campaignProfile.name}</div>
				<div className='campaign-host'>
					<Avatar size="xs" style={{ width: '30px', height: '30px' }} />&nbsp;&nbsp;by {campaignProfile.ownerName}
				</div>
				<div className='campaign-raise-detail'>
					<div className='campaign-raise-amount'>RMT {campaignProfile.totalRaised}</div>
					<p>raised from <b>{Object.entries(campaignProfile.campaignDonors).map(([donorAddress, donatedAmount]) => {
					  if (donorAddress && +donatedAmount > 0) {
						totalDonor++;
					  }
					  return null;
					})}  {totalDonor} donors</b></p>
					<Progress hasStripe value={Number(((Number(campaignProfile.totalRaised) / Number(campaignProfile.target)) * 100).toFixed(0)) } />
					<p><b>{((Number(campaignProfile.totalRaised) / Number(campaignProfile.target)) * 100).toFixed(2)}%</b> of RMT {campaignProfile.target} ({campaignProfile.dayRemain >= 0 ? campaignProfile.dayRemain : 0} more days)</p>
				</div>
				
				<p>
				Starts on <b>{new Date(campaignProfile.startTime * 1000).toLocaleDateString()}</b><br/>
				Ends on <b>{new Date(campaignProfile.endTime * 1000).toLocaleDateString()}</b>
				</p>
				
				{(getItem("userSignIn") === 'charity' && campaignProfile.owner === connectedAccount && campaignProfile.status === true)? (
				  <div>
					<Link href='/account/updatecampaign' className='btn-default btn-donate-now text-center d-block mb-3' >
					  <Image src='/icon-donate-now.svg' className='icon-donate-now' alt=""/>
					  Edit Campaign
					</Link>
				  </div>
				) : (getItem("userSignIn") === 'donor' && getItem("donorStatus") === 'true') ? (
				  <div style={{ display: (campaignProfile.status === true && Number(campaignProfile.totalRaised) < Number(campaignProfile.target))? 'block' : 'none' }}>
				   <div className='p-2'>
					  <div className='input-group'>
						<label>Donation Amount (RMT)</label>
						<input className='form-control' value = {donateAmount} onChange={(e) => {setDonateAmount(e.target.value === "" ? "1" : e.target.value); setFinalDonateAmount(e.target.value === "" ? "1" : e.target.value)}} type="number" />
					  </div>
					</div>
					<span style={{ display: showApproveBtn ? 'block' : 'none' }}>
					  <Link href='' className='btn-default btn-donate-now text-center d-block mb-3' onClick={handleSubmit}>
						<Image src='/icon-donate-now.svg' className='icon-donate-now' alt=""/>
						{allowanceLoading ? 'Approving...' : 'Approve'}
					  </Link>
					</span>
					<span style={{ display: showDonateBtn ? 'block' : 'none' }}>
					  <Link href='' className='btn-default btn-donate-now text-center d-block mb-3' onClick={() => writeDonate?.()}>
						<Image src='/icon-donate-now.svg' className='icon-donate-now' alt=""/>
						{donateLoading ? 'Donating...' : 'Donate'}
					  </Link>
					</span>
				  </div>
				) : null}

				<h3>About charity</h3>
				<p>{campaignProfile.ownerAbout}</p>
				<p><b>Contact Person:</b></p>
				<ul>
					<li><Image src='/icon-email.png' className='small-icon mr-2' alt=''/><Link href={`tel:${campaignProfile.ownerPhone}`}>{campaignProfile.ownerPhone}</Link></li>
					<li><Image src='/icon-contact.png' className='small-icon mr-2' alt=''/><Link href={`mailto:${campaignProfile.ownerEmail}`}>{campaignProfile.ownerEmail}</Link></li>
				</ul>
				<h3>Recent Donors</h3>
				{Object.entries(campaignProfile.campaignDonors).length ? (
				  <div className='recent-donors-grid'>
					{Object.entries(campaignProfile.campaignDonors).map(([donorAddress, donatedAmount], key) => (
					  donorAddress && +donatedAmount > 0 ? (
						<Popover placement='top-start' trigger="hover" key={key}>
						  <PopoverTrigger>
							<Avatar size="xs" style={{ width: '30px', height: '30px' }} />
						  </PopoverTrigger>
						  <Portal>
							<PopoverContent bg='#46339b' color='#fff !important' maxW="120px">
							  <PopoverArrow bg='#46339b' />
							  <PopoverBody>
								<Text fontSize='sm' color='#fff !important'>
								  {donorAddress} <br/>
								  <b>RMT {donatedAmount}</b>
								</Text>
							  </PopoverBody>
							</PopoverContent>
						  </Portal>
						</Popover>
					  ) : <p>Donate now be the first donors.</p>
					))}
				  </div>
				) : (
					<p>Donate now be the first donors.</p>
				)}


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
		.recent-donors-grid{
			width:100%;
		}
		.recent-donors-grid ul{
			margin:0;
			padding:0;			
			display:flex;
			flex-wrap:wrap;
			width:100%;
		}
		.recent-donors-grid li{
			width:16.66%;			
			padding:5px;
			list-style:none;
		}
		.donors-details{
			background:#d3cff1;			
			width:100%;
			height:45px;
		}
		ul{
			padding:0;
			margin:0;
		}
		li{
			list-style:none;
			padding:5px 0;
			display:flex;
			align-items:center;
			font-size:14px;
		}
		.small-icon{
			width:auto;
			height:16px !important;
		}
		.campaign-raise-detail{
			width:100%;
			z-index: 1;
			margin-bottom: 10px;
		}
		.campaign-raise-amount{
			font-size:20px;
			font-weight:bold;
			color:#7b64dd;
		}
		.campaign-raise-detail p{
			font-size:12px;
		}
		.campaign-host-logo{
			width:30px;
			height:30px;
			margin-right:10px;
			background:#d3cff1;
			border-radius:5px;
			position:relative;
			overflow:hidden;
		}
		.campaign-host a{
			text-decoration:underline;
		}
		.campaign-host{
			display:flex;
			align-items:center;
			margin-bottom:10px;
		}
		.campaign-title{
			font-size:24px;
			font-weight:bold;
			color:#7b64dd;;
			margin-bottom:15px;
		}
		.campaign-cover-img{
			margin-bottom:10px;
		}
		.subtitle{
			font-size:16px;
			font-weight:bold;
			margin-bottom:15px;
		}
		.content-wrapper{
			width:100%;
		}
		.content-wrapper h3{
			font-weight:bold;
			font-size:22px;
			color:#7b64dd;
			margin-bottom:10px;
		}
		.content-wrapper p{
			margin-bottom:10px;
			font-size:14px;
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
		.mr-2{
			margin-right:10px !important;
		}
		.mb-3{
			margin-bottom:15px !important;
		}
		.ml-auto{
			margin-left:auto;
		}
		.d-block{
			display:block;
		}
		.d-inline-block{
			display:inline-block;
		}
		.btn-default{
			margin:15px 0;
			padding:10px 30px;
			background:#7b64dd;
			color:#fff;
			border-radius:25px;
			transition:all ease .3s;
		}
		.btn-default:hover{
			filter:brightness(0.8);
		}
		.btn-update{
			background:#ef4949 !important;
		}
		.btn-add{
			background:#58b964 !important;
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
			font-weight:bold;
			text-transform:uppercase;
			display: block;
			transition:all ease .3s;
		}
		.btn-outline:hover{
			background:#7b64dd;
			color:#fff;
		}
		.icon-donate-now{
			width:auto !important;
			height:16px !important;
			max-width:none !important;
			margin-right:5px;
		}
		.btn-donate-now{
			width:100%;
			margin-bottom:5px;
			background:#7b64dd!important;
			color:#fff;
			border-radius:10px;
			display:flex;
			align-items:center;
			justify-content:center;
		}
	`}</style>
    </VStack>
  );
};

export default CampaignDetail;
