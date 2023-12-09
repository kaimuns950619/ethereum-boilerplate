import { VStack, useToast } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'
import React, { useState } from 'react'
import { contractAbi } from 'utils/contractAbi'
import { useDebounce } from 'use-debounce'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { contractAddress } from 'utils/global'
import useStorage from 'utils/useStorage';
import { readContract } from '@wagmi/core'
import { useRouter } from 'next/router';

const CreateCampaign = () => {
  // State
  const router = useRouter();
  const toast = useToast();
  const { setItem } = useStorage();
  const [currentCampaignId, setCurrentCampaignId] = useState(0);
  const [campaignName, setCampaignName] = useState("");
  const [campaignAbout, setCampaignAbout] = useState("");
  const [campaignTarget, setCampaignTarget] = useState(1);
  const [campaignLogoUrl, setCampaignLogoUrl] = useState("");
  const [campaignStartDate, setCampaignStartDate] = useState<Date | null>(new Date());
  const [campaignEndDate, setCampaignEndDate] = useState<Date | null>(new Date());
  const [campaignBeneficiaryAddr_1, setCampaignBeneficiaryAddr_1] = useState("0x0000000000000000000000000000000000000000");
  const [campaignBeneficiaryAddr_2, setCampaignBeneficiaryAddr_2] = useState("0x0000000000000000000000000000000000000000");
  const [campaignBeneficiaryAddr_3, setCampaignBeneficiaryAddr_3] = useState("0x0000000000000000000000000000000000000000");
  const [campaignBeneficiaryAddr_4, setCampaignBeneficiaryAddr_4] = useState("0x0000000000000000000000000000000000000000");
  const [campaignBeneficiaryAddr_5, setCampaignBeneficiaryAddr_5] = useState("0x0000000000000000000000000000000000000000");
  const [campaignBeneficiaryAddr_6, setCampaignBeneficiaryAddr_6] = useState("0x0000000000000000000000000000000000000000");
  const [campaignBeneficiaryAddr_7, setCampaignBeneficiaryAddr_7] = useState("0x0000000000000000000000000000000000000000");
  const [campaignBeneficiaryAddr_8, setCampaignBeneficiaryAddr_8] = useState("0x0000000000000000000000000000000000000000");
  const [campaignBeneficiaryAddr_9, setCampaignBeneficiaryAddr_9] = useState("0x0000000000000000000000000000000000000000");
  const [campaignBeneficiaryAddr_10, setCampaignBeneficiaryAddr_10] = useState("0x0000000000000000000000000000000000000000");
  const [campaignBeneficiaryPercent_1, setCampaignBeneficiaryPercent_1] = useState(0);
  const [campaignBeneficiaryPercent_2, setCampaignBeneficiaryPercent_2] = useState(0);
  const [campaignBeneficiaryPercent_3, setCampaignBeneficiaryPercent_3] = useState(0);
  const [campaignBeneficiaryPercent_4, setCampaignBeneficiaryPercent_4] = useState(0);
  const [campaignBeneficiaryPercent_5, setCampaignBeneficiaryPercent_5] = useState(0);
  const [campaignBeneficiaryPercent_6, setCampaignBeneficiaryPercent_6] = useState(0);
  const [campaignBeneficiaryPercent_7, setCampaignBeneficiaryPercent_7] = useState(0);
  const [campaignBeneficiaryPercent_8, setCampaignBeneficiaryPercent_8] = useState(0);
  const [campaignBeneficiaryPercent_9, setCampaignBeneficiaryPercent_9] = useState(0);
  const [campaignBeneficiaryPercent_10, setCampaignBeneficiaryPercent_10] = useState(0);
  const [category, setCategory] = useState(1);
  const [beneficiaries, setBeneficiaries] = useState('1');
  
  // Debounce
  const categoryId = ethers.BigNumber.from(useDebounce(category, 300)[0]);
  const name = String(useDebounce(campaignName, 300)[0]);
  const about = String(useDebounce(campaignAbout, 300)[0]);
  const logoUrl = String(useDebounce(campaignLogoUrl, 300)[0]);
  const target = ethers.BigNumber.from(ethers.utils.parseEther(String(useDebounce(campaignTarget, 300)[0]))._hex);
  const addr1: `0x${string}` = String(useDebounce(campaignBeneficiaryAddr_1, 300)[0]) as `0x${string}`;
  const addr2: `0x${string}` = String(useDebounce(campaignBeneficiaryAddr_2, 300)[0]) as `0x${string}`;
  const addr3: `0x${string}` = String(useDebounce(campaignBeneficiaryAddr_3, 300)[0]) as `0x${string}`;
  const addr4: `0x${string}` = String(useDebounce(campaignBeneficiaryAddr_4, 300)[0]) as `0x${string}`;
  const addr5: `0x${string}` = String(useDebounce(campaignBeneficiaryAddr_5, 300)[0]) as `0x${string}`;
  const addr6: `0x${string}` = String(useDebounce(campaignBeneficiaryAddr_6, 300)[0]) as `0x${string}`;
  const addr7: `0x${string}` = String(useDebounce(campaignBeneficiaryAddr_7, 300)[0]) as `0x${string}`;
  const addr8: `0x${string}` = String(useDebounce(campaignBeneficiaryAddr_8, 300)[0]) as `0x${string}`;
  const addr9: `0x${string}` = String(useDebounce(campaignBeneficiaryAddr_9, 300)[0]) as `0x${string}`;
  const addr10: `0x${string}` = String(useDebounce(campaignBeneficiaryAddr_10, 300)[0]) as `0x${string}`;
  const beneficiaryAddr = [addr1,addr2,addr3,addr4,addr5,addr6,addr7,addr8,addr9,addr10];
  const percent1 = ethers.BigNumber.from(useDebounce(campaignBeneficiaryPercent_1, 300)[0]);
  const percent2 = ethers.BigNumber.from(useDebounce(campaignBeneficiaryPercent_2, 300)[0]);
  const percent3 = ethers.BigNumber.from(useDebounce(campaignBeneficiaryPercent_3, 300)[0]);
  const percent4 = ethers.BigNumber.from(useDebounce(campaignBeneficiaryPercent_4, 300)[0]);
  const percent5 = ethers.BigNumber.from(useDebounce(campaignBeneficiaryPercent_5, 300)[0]);
  const percent6 = ethers.BigNumber.from(useDebounce(campaignBeneficiaryPercent_6, 300)[0]);
  const percent7 = ethers.BigNumber.from(useDebounce(campaignBeneficiaryPercent_7, 300)[0]);
  const percent8 = ethers.BigNumber.from(useDebounce(campaignBeneficiaryPercent_8, 300)[0]);
  const percent9 = ethers.BigNumber.from(useDebounce(campaignBeneficiaryPercent_9, 300)[0]);
  const percent10 = ethers.BigNumber.from(useDebounce(campaignBeneficiaryPercent_10, 300)[0]);
  const beneficiaryPercent = [percent1,percent2,percent3,percent4,percent5,percent6,percent7,percent8,percent9,percent10];
  
  const startDay = useDebounce(campaignStartDate, 300)[0]?.getDate();
  let startMonth = useDebounce(campaignStartDate, 300)[0]?.getMonth();
  startMonth = startMonth ? startMonth + 1 : 1;
  const startYear = useDebounce(campaignStartDate, 300)[0]?.getFullYear();
  const f_startDate = new Date(`${startYear}-${startMonth}-${startDay}`);
  
  const endDay = useDebounce(campaignEndDate, 300)[0]?.getDate();
  let endMonth = useDebounce(campaignEndDate, 300)[0]?.getMonth();
  endMonth = endMonth ? endMonth + 1 : 1;
  const endYear = useDebounce(campaignEndDate, 300)[0]?.getFullYear();
  const f_endDate = new Date(`${endYear}-${endMonth}-${endDay}`); 
  
  const startTime = ethers.BigNumber.from(f_startDate.getTime() / 1000);
  const endTime = ethers.BigNumber.from(f_endDate.getTime() / 1000);
  
  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'createCampaign',
    args: [name, about, logoUrl, target, beneficiaryPercent, startTime, endTime, beneficiaryAddr, categoryId],
  })
  const { data: useContractWriteData, write } = useContractWrite(config)

  const { isLoading } = useWaitForTransaction({
    hash: useContractWriteData?.hash
  })
  
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(Number(e.target.value));
  };
  
  const handleSelectChange2 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBeneficiaries(e.target.value);
	setCampaignBeneficiaryAddr_1("0x0000000000000000000000000000000000000000")
	setCampaignBeneficiaryAddr_2("0x0000000000000000000000000000000000000000")
	setCampaignBeneficiaryAddr_3("0x0000000000000000000000000000000000000000")
	setCampaignBeneficiaryAddr_4("0x0000000000000000000000000000000000000000")
	setCampaignBeneficiaryAddr_5("0x0000000000000000000000000000000000000000")
	setCampaignBeneficiaryAddr_6("0x0000000000000000000000000000000000000000")
	setCampaignBeneficiaryAddr_7("0x0000000000000000000000000000000000000000")
	setCampaignBeneficiaryAddr_8("0x0000000000000000000000000000000000000000")
	setCampaignBeneficiaryAddr_9("0x0000000000000000000000000000000000000000")
	setCampaignBeneficiaryAddr_10("0x0000000000000000000000000000000000000000")
	setCampaignBeneficiaryPercent_1(0)
	setCampaignBeneficiaryPercent_2(0)
	setCampaignBeneficiaryPercent_3(0)
	setCampaignBeneficiaryPercent_4(0)
	setCampaignBeneficiaryPercent_5(0)
	setCampaignBeneficiaryPercent_6(0)
	setCampaignBeneficiaryPercent_7(0)
	setCampaignBeneficiaryPercent_8(0)
	setCampaignBeneficiaryPercent_9(0)
	setCampaignBeneficiaryPercent_10(0)
  };
	  
  const handleSubmit = (event: any) => {
    event.preventDefault();

	let errMsg = ""
	// Validation form data
	if(campaignTarget < 1){
		errMsg += "Campaign Target must be more or equal than 1 RMT. "
	} 
	
	if(f_endDate.getTime() <= f_startDate.getTime()) {
		errMsg += "Campaign End Date must be later than Campaign Start Date. "
	} 
	
	if(campaignBeneficiaryAddr_1 === '0x0000000000000000000000000000000000000000'){
		errMsg += "Must have at least one Beneficiary Address. "
	}  
	
	if(Number(beneficiaries) >= 10){
		if(campaignBeneficiaryAddr_1 === '0x0000000000000000000000000000000000000000' || campaignBeneficiaryAddr_2 === '0x0000000000000000000000000000000000000000' || campaignBeneficiaryAddr_3 === '0x0000000000000000000000000000000000000000' || campaignBeneficiaryAddr_4 === '0x0000000000000000000000000000000000000000' || campaignBeneficiaryAddr_5 === '0x0000000000000000000000000000000000000000' || campaignBeneficiaryAddr_6 === '0x0000000000000000000000000000000000000000' || campaignBeneficiaryAddr_7 === '0x0000000000000000000000000000000000000000' || campaignBeneficiaryAddr_8 === '0x0000000000000000000000000000000000000000' || campaignBeneficiaryAddr_9 === '0x0000000000000000000000000000000000000000' || campaignBeneficiaryAddr_10 === '0x0000000000000000000000000000000000000000'){
			errMsg += "Please fill up all Beneficiary Addresses. "
		}
		if(campaignBeneficiaryPercent_1 === 0 || campaignBeneficiaryPercent_2 === 0 || campaignBeneficiaryPercent_3 === 0 || campaignBeneficiaryPercent_4 === 0 || campaignBeneficiaryPercent_5 === 0 || campaignBeneficiaryPercent_6 === 0 || campaignBeneficiaryPercent_7 === 0 || campaignBeneficiaryPercent_8 === 0 || campaignBeneficiaryPercent_9 === 0 || campaignBeneficiaryPercent_10 === 0){
			errMsg += "Please fill up all Beneficiary Percentages. "
		}
	} else if(Number(beneficiaries) >= 9){
		if(campaignBeneficiaryAddr_1 === '0x0000000000000000000000000000000000000000' || campaignBeneficiaryAddr_2 === '0x0000000000000000000000000000000000000000' || campaignBeneficiaryAddr_3 === '0x0000000000000000000000000000000000000000' || campaignBeneficiaryAddr_4 === '0x0000000000000000000000000000000000000000' || campaignBeneficiaryAddr_5 === '0x0000000000000000000000000000000000000000' || campaignBeneficiaryAddr_6 === '0x0000000000000000000000000000000000000000' || campaignBeneficiaryAddr_7 === '0x0000000000000000000000000000000000000000' || campaignBeneficiaryAddr_8 === '0x0000000000000000000000000000000000000000' || campaignBeneficiaryAddr_9 === '0x0000000000000000000000000000000000000000'){
			errMsg += "Please fill up all Beneficiary Addresses. "
		}
		if(campaignBeneficiaryPercent_1 === 0 || campaignBeneficiaryPercent_2 === 0 || campaignBeneficiaryPercent_3 === 0 || campaignBeneficiaryPercent_4 === 0 || campaignBeneficiaryPercent_5 === 0 || campaignBeneficiaryPercent_6 === 0 || campaignBeneficiaryPercent_7 === 0 || campaignBeneficiaryPercent_8 === 0|| campaignBeneficiaryPercent_9 === 0){
			errMsg += "Please fill up all Beneficiary Percentages. "
		}
	} else if(Number(beneficiaries) >= 8){
		if(campaignBeneficiaryAddr_1 === '0x0000000000000000000000000000000000000000' || campaignBeneficiaryAddr_2 === '0x0000000000000000000000000000000000000000' || campaignBeneficiaryAddr_3 === '0x0000000000000000000000000000000000000000' || campaignBeneficiaryAddr_4 === '0x0000000000000000000000000000000000000000' || campaignBeneficiaryAddr_5 === '0x0000000000000000000000000000000000000000' || campaignBeneficiaryAddr_6 === '0x0000000000000000000000000000000000000000' || campaignBeneficiaryAddr_7 === '0x0000000000000000000000000000000000000000' || campaignBeneficiaryAddr_8 === '0x0000000000000000000000000000000000000000'){
			errMsg += "Please fill up all Beneficiary Addresses. "
		}
		if(campaignBeneficiaryPercent_1 === 0 || campaignBeneficiaryPercent_2 === 0 || campaignBeneficiaryPercent_3 === 0 || campaignBeneficiaryPercent_4 === 0 || campaignBeneficiaryPercent_5 === 0 || campaignBeneficiaryPercent_6 === 0 || campaignBeneficiaryPercent_7 === 0 || campaignBeneficiaryPercent_8 === 0){
			errMsg += "Please fill up all Beneficiary Percentages. "
		}
	} else if(Number(beneficiaries) >= 7){
		if(campaignBeneficiaryAddr_1 === '0x0000000000000000000000000000000000000000' || campaignBeneficiaryAddr_2 === '0x0000000000000000000000000000000000000000' || campaignBeneficiaryAddr_3 === '0x0000000000000000000000000000000000000000' || campaignBeneficiaryAddr_4 === '0x0000000000000000000000000000000000000000' || campaignBeneficiaryAddr_5 === '0x0000000000000000000000000000000000000000' || campaignBeneficiaryAddr_6 === '0x0000000000000000000000000000000000000000' || campaignBeneficiaryAddr_7 === '0x0000000000000000000000000000000000000000'){
			errMsg += "Please fill up all Beneficiary Addresses. "
		}
		if(campaignBeneficiaryPercent_1 === 0 || campaignBeneficiaryPercent_2 === 0 || campaignBeneficiaryPercent_3 === 0 || campaignBeneficiaryPercent_4 === 0 || campaignBeneficiaryPercent_5 === 0 || campaignBeneficiaryPercent_6 === 0 || campaignBeneficiaryPercent_7 === 0){
			errMsg += "Please fill up all Beneficiary Percentages. "
		}
	} else if(Number(beneficiaries) >= 6){
		if(campaignBeneficiaryAddr_1 === '0x0000000000000000000000000000000000000000' || campaignBeneficiaryAddr_2 === '0x0000000000000000000000000000000000000000' || campaignBeneficiaryAddr_3 === '0x0000000000000000000000000000000000000000' || campaignBeneficiaryAddr_4 === '0x0000000000000000000000000000000000000000' || campaignBeneficiaryAddr_5 === '0x0000000000000000000000000000000000000000' || campaignBeneficiaryAddr_6 === '0x0000000000000000000000000000000000000000'){
			errMsg += "Please fill up all Beneficiary Addresses. "
		}
		if(campaignBeneficiaryPercent_1 === 0 || campaignBeneficiaryPercent_2 === 0 || campaignBeneficiaryPercent_3 === 0 || campaignBeneficiaryPercent_4 === 0 || campaignBeneficiaryPercent_5 === 0 || campaignBeneficiaryPercent_6 === 0){
			errMsg += "Please fill up all Beneficiary Percentages. "
		}
	} else if(Number(beneficiaries) >= 5){
		if(campaignBeneficiaryAddr_1 === '0x0000000000000000000000000000000000000000' || campaignBeneficiaryAddr_2 === '0x0000000000000000000000000000000000000000' || campaignBeneficiaryAddr_3 === '0x0000000000000000000000000000000000000000' || campaignBeneficiaryAddr_4 === '0x0000000000000000000000000000000000000000' || campaignBeneficiaryAddr_5 === '0x0000000000000000000000000000000000000000'){
			errMsg += "Please fill up all Beneficiary Addresses. "
		}
		if(campaignBeneficiaryPercent_1 === 0 || campaignBeneficiaryPercent_2 === 0 || campaignBeneficiaryPercent_3 === 0 || campaignBeneficiaryPercent_4 === 0 || campaignBeneficiaryPercent_5 === 0){
			errMsg += "Please fill up all Beneficiary Percentages. "
		}
	} else if(Number(beneficiaries) >= 4){
		if(campaignBeneficiaryAddr_1 === '0x0000000000000000000000000000000000000000' || campaignBeneficiaryAddr_2 === '0x0000000000000000000000000000000000000000' || campaignBeneficiaryAddr_3 === '0x0000000000000000000000000000000000000000' || campaignBeneficiaryAddr_4 === '0x0000000000000000000000000000000000000000'){
			errMsg += "Please fill up all Beneficiary Addresses. "
		}
		if(campaignBeneficiaryPercent_1 === 0 || campaignBeneficiaryPercent_2 === 0 || campaignBeneficiaryPercent_3 === 0 || campaignBeneficiaryPercent_4 === 0){
			errMsg += "Please fill up all Beneficiary Percentages. "
		}
	} else if(Number(beneficiaries) >= 3){
		if(campaignBeneficiaryAddr_1 === '0x0000000000000000000000000000000000000000' || campaignBeneficiaryAddr_2 === '0x0000000000000000000000000000000000000000' || campaignBeneficiaryAddr_3 === '0x0000000000000000000000000000000000000000'){
			errMsg += "Please fill up all Beneficiary Addresses. "
		}
		if(campaignBeneficiaryPercent_1 === 0 || campaignBeneficiaryPercent_2 === 0 || campaignBeneficiaryPercent_3 === 0){
			errMsg += "Please fill up all Beneficiary Percentages. "
		}
	} else if(Number(beneficiaries) >= 2){
		if(campaignBeneficiaryAddr_1 === '0x0000000000000000000000000000000000000000' || campaignBeneficiaryAddr_2 === '0x0000000000000000000000000000000000000000'){
			errMsg += "Please fill up all Beneficiary Addresses. "
		}
		if(campaignBeneficiaryPercent_1 === 0 || campaignBeneficiaryPercent_2 === 0){
			errMsg += "Please fill up all Beneficiary Percentages. "
		}
	} else if(Number(beneficiaries) >= 1){
		if(campaignBeneficiaryAddr_1 === '0x0000000000000000000000000000000000000000'){
			errMsg += "Please fill up all Beneficiary Addresses. "
		}
		if(campaignBeneficiaryPercent_1 === 0){
			errMsg += "Please fill up all Beneficiary Percentages. "
		}
	}
	
	
	if((campaignBeneficiaryPercent_1 + campaignBeneficiaryPercent_2 + campaignBeneficiaryPercent_3 + campaignBeneficiaryPercent_4 + campaignBeneficiaryPercent_5 + campaignBeneficiaryPercent_6 + campaignBeneficiaryPercent_7 + campaignBeneficiaryPercent_8 + campaignBeneficiaryPercent_9 + campaignBeneficiaryPercent_10) !== 100){
		errMsg += "Total Campaign Beneficiary Percentage must be 100%. "
	}
	
	if(!errMsg){
		write?.()
	} else {
	
		toast({
			title: 'Oops, something went wrong...',
			description: errMsg,
			status: 'error',
			position: 'bottom',
			duration: 2000,
			isClosable: true,
		});
	}
  };
  
  async function lastCampaignId() {
	const totalCampaignRes = await readContract({
	 address: contractAddress,
	 abi: contractAbi,
	 functionName: 'lastCampaignId',
	})
	const totalCampaign = Number(totalCampaignRes._hex);
	setCurrentCampaignId(totalCampaign)
   }
  
  lastCampaignId()
	
	if(useContractWriteData?.hash && !isLoading){
		toast({
			title: 'Campaign created successfully.',
			description: "",
			status: 'success',
			position: 'bottom',
			duration: 2000,
			isClosable: true,
		});
		setItem("campaignId",String(currentCampaignId+1)); 
		router.push('/account/campaigndetail');
	}
	
  return (
    <VStack w={'full'}>
	<div className='profile-heading'>
		<h3>Create Campaign</h3>
	</div>
		{(useContractWriteData?.hash && !isLoading) && (
		  <div className='alert-message success'>
			You may view your transaction at <a target='_blank' href={`https://testnet.bscscan.com/tx/${useContractWriteData?.hash}`}><b>Binance Smart Chain</b>.</a>
		  </div>
		)}
		
		<div className='tabbed-content'>
		<form onSubmit={handleSubmit}>
			<div className='row'>
				<div className='w-100 p-2'>
					<div className='input-group'>
					<label htmlFor="campaignAbout">Campaign Category</label>
					<select className='form-control' id="campaignAbout" onChange={handleSelectChange} value={category.toString()}>
					<option value="1" onClick={() => setCategory(1)}>Animal Welfare</option>
					<option value="2" onClick={() => setCategory(2)}>Art & Heritage</option>
					<option value="3" onClick={() => setCategory(3)}>Children & Youth</option>
					<option value="4" onClick={() => setCategory(4)}>Disability</option>
					<option value="5" onClick={() => setCategory(5)}>Education</option>
					<option value="6" onClick={() => setCategory(6)}>Elderly</option>
					<option value="7" onClick={() => setCategory(7)}>Women & Girls</option>
					</select>
					</div>
				</div>
			</div>
			<div className='row'>				
				<div className='w-50 p-2'>
					<div className='input-group'>
						<label>Campaign Name</label>
						<input className='form-control' name="campaignName" type="text" onChange={(e) => setCampaignName(e.target.value)} value={campaignName} required /><br/>
					</div>
				</div>	
				<div className='w-50 p-2'>
					<div className='input-group'>		
						<label>About Campaign</label>
						<input className='form-control' name="campaignAbout" type="text" onChange={(e) => setCampaignAbout(e.target.value)} value={campaignAbout} required /><br/>
					</div>
				</div>		
			</div>
			<div className='row'>
				<div className='w-50 p-2'>
					<div className='input-group'>				
						<label>Campaign Target (RMT)</label>
						<input className='form-control' name="campaignTarget" type="number" onChange={(e) => setCampaignTarget(e.target.value === "" ? 1 : parseInt(e.target.value))} value={campaignTarget} required /><br/>
					</div>
				</div>	
				<div className='w-50 p-2'>
					<div className='input-group'>							
						<label>Campaign Logo (URL)</label>
						<input className='form-control' name="campaignLogoUrl" type="text" onChange={(e) => setCampaignLogoUrl(e.target.value)} value={campaignLogoUrl} /><br/>
					</div>
				</div>		
			</div>
			<div className='row'>
				<div className='w-50 p-2'>
					<div className='input-group'>				
						<label>Campaign Start Date</label>
						<DatePicker className='form-control' selected={campaignStartDate} onChange={(date) => setCampaignStartDate(date)} /><br/>
					</div>
				</div>	
				<div className='w-50 p-2'>
					<div className='input-group'>							
						<label>Campaign End Date</label>
						<DatePicker className='form-control' selected={campaignEndDate} onChange={(date) => setCampaignEndDate(date)} /><br/>
					</div>
				</div>		
			</div>
			<div className='row'>	
				<div className='w-50 p-2'>
					<div className='input-group'>
					<label htmlFor="numberOfBeneficiary">Number of Beneficiary:</label>
					<select className='form-control' id="numberOfBeneficiary" onChange={handleSelectChange2} value={beneficiaries.toString()}>
					<option value='1' onClick={() => setBeneficiaries('1')}>1</option>
					<option value='2' onClick={() => setBeneficiaries('2')}>2</option>
					<option value='3' onClick={() => setBeneficiaries('3')}>3</option>
					<option value='4' onClick={() => setBeneficiaries('4')}>4</option>
					<option value='5' onClick={() => setBeneficiaries('5')}>5</option>
					<option value='6' onClick={() => setBeneficiaries('6')}>6</option>
					<option value='7' onClick={() => setBeneficiaries('7')}>7</option>
					<option value='8' onClick={() => setBeneficiaries('8')}>8</option>
					<option value='9' onClick={() => setBeneficiaries('9')}>9</option>
					<option value='10' onClick={() => setBeneficiaries('10')}>10</option>
					</select>
					</div>
				</div>
				<div className='w-50 p-2'>
					<div className='input-group'>	
					</div>
				</div>
			</div>
			<div className='row'>
				<div className='w-50 p-2'>
					<div className='input-group'>				
						<label>Campaign Beneficiary Address #1</label>
						<input className='form-control' name="campaignBeneficiaryAddr_1" type="text" onChange={(e) => setCampaignBeneficiaryAddr_1(e.target.value)} value={campaignBeneficiaryAddr_1} required /><br/>
					</div>
				</div>	
				<div className='w-50 p-2'>
					<div className='input-group'>		
						<label>Campaign Beneficiary Percentage #1</label>
						<input className='form-control' name="campaignBeneficiaryPercent_1" type="number" placeholder="" onChange={(e) => setCampaignBeneficiaryPercent_1(parseInt(e.target.value))} value={campaignBeneficiaryPercent_1} required /><br/>
					</div>
				</div>		
			</div>
			
			<div className='row' style={{display: Number(beneficiaries) >= 2 ? '' : 'none'}}>
				<div className='w-50 p-2'>
					<div className='input-group'>	
						<label>Campaign Beneficiary Address #2</label>
						<input className='form-control' name="campaignBeneficiaryAddr_2" type="text" onChange={(e) => setCampaignBeneficiaryAddr_2(e.target.value)} value={campaignBeneficiaryAddr_2} required /><br/>
						
					</div>
				</div>	
				<div className='w-50 p-2'>
					<div className='input-group'>	
						<label>Campaign Beneficiary Percentage #2</label>
						<input className='form-control' name="campaignBeneficiaryPercent_2" type="number" placeholder="" onChange={(e) => setCampaignBeneficiaryPercent_2(parseInt(e.target.value))} value={campaignBeneficiaryPercent_2} required /><br/>
					</div>
				</div>		
			</div>
			
			<div className='row' style={{display: Number(beneficiaries) >= 3 ? '' : 'none'}}>
				<div className='w-50 p-2'>
					<div className='input-group'>	
						<label>Campaign Beneficiary Address #3</label>
						<input className='form-control' name="campaignBeneficiaryAddr_3" type="text" onChange={(e) => setCampaignBeneficiaryAddr_3(e.target.value)} value={campaignBeneficiaryAddr_3} required /><br/>
					</div>
				</div>	
				<div className='w-50 p-2'>
					<div className='input-group'>	
						<label>Campaign Beneficiary Percentage #3</label>
						<input className='form-control' name="campaignBeneficiaryPercent_3" type="number" placeholder="" onChange={(e) => setCampaignBeneficiaryPercent_3(parseInt(e.target.value))} value={campaignBeneficiaryPercent_3} required /><br/>
					</div>
				</div>		
			</div>
			
			<div className='row' style={{display: Number(beneficiaries) >= 4 ? '' : 'none'}}>
				<div className='w-50 p-2'>
					<div className='input-group'>	
						<label>Campaign Beneficiary Address #4</label>
						<input className='form-control' name="campaignBeneficiaryAddr_4" type="text" onChange={(e) => setCampaignBeneficiaryAddr_4(e.target.value)} value={campaignBeneficiaryAddr_4} required /><br/>
					</div>
				</div>	
				<div className='w-50 p-2'>
					<div className='input-group'>	
						<label>Campaign Beneficiary Percentage #4</label>
						<input className='form-control' name="campaignBeneficiaryPercent_4" type="number" placeholder="" onChange={(e) => setCampaignBeneficiaryPercent_4(parseInt(e.target.value))} value={campaignBeneficiaryPercent_4} required /><br/>					
					</div>
				</div>		
			</div>
			 
			<div className='row' style={{display: Number(beneficiaries) >= 5 ? '' : 'none'}}>
				<div className='w-50 p-2'>
					<div className='input-group'>
						<label>Campaign Beneficiary Address #5</label>
						<input className='form-control' name="campaignBeneficiaryAddr_5" type="text" onChange={(e) => setCampaignBeneficiaryAddr_5(e.target.value)} value={campaignBeneficiaryAddr_5} required /><br/>
					</div>
				</div>	
				<div className='w-50 p-2'>
					<div className='input-group'>	
						<label>Campaign Beneficiary Percentage #5</label>
						<input className='form-control' name="campaignBeneficiaryPercent_5" type="number" placeholder="" onChange={(e) => setCampaignBeneficiaryPercent_5(parseInt(e.target.value))} value={campaignBeneficiaryPercent_5} required /><br/>
					</div>
				</div>		
			</div>
			
			<div className='row' style={{display: Number(beneficiaries) >= 6 ? '' : 'none'}}>
				<div className='w-50 p-2'>
					<div className='input-group'>	
						<label>Campaign Beneficiary Address #6</label>
						<input className='form-control' name="campaignBeneficiaryAddr_6" type="text" onChange={(e) => setCampaignBeneficiaryAddr_6(e.target.value)} value={campaignBeneficiaryAddr_6} required /><br/>
					</div>
				</div>	
				<div className='w-50 p-2'>
					<div className='input-group'>	
						<label>Campaign Beneficiary Percentage #6</label>
						<input className='form-control' name="campaignBeneficiaryPercent_6" type="number" placeholder="" onChange={(e) => setCampaignBeneficiaryPercent_6(parseInt(e.target.value))} value={campaignBeneficiaryPercent_6} required /><br/>
					</div>
				</div>		
			</div>
			
			<div className='row' style={{display: Number(beneficiaries) >= 7 ? '' : 'none'}}>
				<div className='w-50 p-2'>
					<div className='input-group'>	
						<label>Campaign Beneficiary Address #7</label>
						<input className='form-control' name="campaignBeneficiaryAddr_7" type="text" onChange={(e) => setCampaignBeneficiaryAddr_7(e.target.value)} value={campaignBeneficiaryAddr_7} required /><br/>
					</div>
				</div>	
				<div className='w-50 p-2'>
					<div className='input-group'>	
						<label>Campaign Beneficiary Percentage #7</label>
						<input className='form-control' name="campaignBeneficiaryPercent_7" type="number" placeholder="" onChange={(e) => setCampaignBeneficiaryPercent_7(parseInt(e.target.value))} value={campaignBeneficiaryPercent_7} required /><br/>
					</div>
				</div>		
			</div>
			
			<div className='row' style={{display: Number(beneficiaries) >= 8 ? '' : 'none'}}>
				<div className='w-50 p-2'>
					<div className='input-group'>	
						<label>Campaign Beneficiary Address #8</label>
						<input className='form-control' name="campaignBeneficiaryAddr_8" type="text" onChange={(e) => setCampaignBeneficiaryAddr_8(e.target.value)} value={campaignBeneficiaryAddr_8} required /><br/>
					</div>
				</div>	
				<div className='w-50 p-2'>
					<div className='input-group'>	
						<label>Campaign Beneficiary Percentage #8</label>
						<input className='form-control' name="campaignBeneficiaryPercent_8" type="number" placeholder="" onChange={(e) => setCampaignBeneficiaryPercent_8(parseInt(e.target.value))} value={campaignBeneficiaryPercent_8} required /><br/>
					</div>
				</div>		
			</div>
			
			<div className='row' style={{display: Number(beneficiaries) >= 9 ? '' : 'none'}}>
				<div className='w-50 p-2'>
					<div className='input-group'>	
						<label>Campaign Beneficiary Address #9</label>
						<input className='form-control' name="campaignBeneficiaryAddr_9" type="text" onChange={(e) => setCampaignBeneficiaryAddr_9(e.target.value)} value={campaignBeneficiaryAddr_9} required /><br/>
					</div>
				</div>	
				<div className='w-50 p-2'>
					<div className='input-group'>	
						<label>Campaign Beneficiary Percentage #9</label>
						<input className='form-control' name="campaignBeneficiaryPercent_9" type="number" placeholder="" onChange={(e) => setCampaignBeneficiaryPercent_9(parseInt(e.target.value))} value={campaignBeneficiaryPercent_9} required /><br/>
					</div>
				</div>		
			</div>
			
			<div className='row' style={{display: Number(beneficiaries) >= 10 ? '' : 'none'}}>
				<div className='w-50 p-2'>
					<div className='input-group'>	
						<label>Campaign Beneficiary Address #10</label>
						<input className='form-control' name="campaignBeneficiaryAddr_10" type="text" onChange={(e) => setCampaignBeneficiaryAddr_10(e.target.value)} value={campaignBeneficiaryAddr_10} required /><br/>
					</div>
				</div>	
				<div className='w-50 p-2'>
					<div className='input-group'>	
						<label>Campaign Beneficiary Percentage #10</label>
						<input className='form-control' name="campaignBeneficiaryPercent_10" type="number" placeholder="" onChange={(e) => setCampaignBeneficiaryPercent_10(parseInt(e.target.value))} value={campaignBeneficiaryPercent_10} required /><br/>
					</div>
				</div>		
			</div>
			<div className='row'>
				<div className='w-50 p-2'>
					<div className='input-group'>	
					</div>
				</div>	
				<div className='w-50 p-2'>
					<div className='input-group'>	
						<label style={{color: (campaignBeneficiaryPercent_1+campaignBeneficiaryPercent_2+campaignBeneficiaryPercent_3+campaignBeneficiaryPercent_4+campaignBeneficiaryPercent_5+campaignBeneficiaryPercent_6+campaignBeneficiaryPercent_7+campaignBeneficiaryPercent_8+campaignBeneficiaryPercent_9+campaignBeneficiaryPercent_10) < 100 ? 'orange' : (campaignBeneficiaryPercent_1+campaignBeneficiaryPercent_2+campaignBeneficiaryPercent_3+campaignBeneficiaryPercent_4+campaignBeneficiaryPercent_5+campaignBeneficiaryPercent_6+campaignBeneficiaryPercent_7+campaignBeneficiaryPercent_8+campaignBeneficiaryPercent_9+campaignBeneficiaryPercent_10) === 100 ? 'green' : 'red'}} ><b>Total Percentage</b></label>
						<input disabled className='form-control' name="total_percentage" type="number" value={campaignBeneficiaryPercent_1+campaignBeneficiaryPercent_2+campaignBeneficiaryPercent_3+campaignBeneficiaryPercent_4+campaignBeneficiaryPercent_5+campaignBeneficiaryPercent_6+campaignBeneficiaryPercent_7+campaignBeneficiaryPercent_8+campaignBeneficiaryPercent_9+campaignBeneficiaryPercent_10}/><br/>
					</div>
				</div>		
			</div>
			<div className='row'>
				<div className='w-50'>
					<button className='btn-default' type="submit">{isLoading ? 'Publishing...' : 'Publish Campaign'}</button>
				</div>
			</div>
			</form>
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
		.tabbed-content{
			padding:15px;
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
			text-transform:uppercase;
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

export default CreateCampaign;
