import { VStack, useToast } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'
import { useEffect, useState } from 'react'
import { readContract } from '@wagmi/core'
import { contractAbi } from 'utils/contractAbi'
import { useDebounce } from 'use-debounce'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import useStorage from 'utils/useStorage';
import { contractAddress } from 'utils/global'
import { useRouter } from 'next/router';

const Kelvin = () => {
  // State
  const router = useRouter();
  const { setItem, getItem } = useStorage();
  const toast = useToast();
  
  let campaignId: ethers.BigNumber = ethers.BigNumber.from("0");
  if( getItem('campaignId') ){
	campaignId = ethers.BigNumber.from(getItem('campaignId'));
  }else{
	campaignId = ethers.BigNumber.from("27");
  }
  
  const [campaignStatus, setCampaignStatus] = useState("true");
  const [campaignName, setCampaignName] = useState("");
  const [campaignAbout, setCampaignAbout] = useState("");
  const [campaignTarget, setCampaignTarget] = useState(1);
  const [campaignLogoUrl, setCampaignLogoUrl] = useState("");
  const [campaignStartDate, setCampaignStartDate] = useState<Date | null>(new Date());
  const [campaignEndDate, setCampaignEndDate] = useState<Date | null>(new Date());
  const [campaignCategory, setCampaignCategory] = useState(1);
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
  
  /*READ CONTRACT*/
  useEffect(() => {
    async function getProfile() {
      const res = await readContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'getCampaignProfile',
        args: [campaignId],
      })

	 setCampaignStatus(String(res.status))
	 setCampaignLogoUrl(res.logoUrl)
	 setCampaignName(res.name)
	 setCampaignAbout(res.about)
	 setCampaignTarget(parseInt(ethers.utils.formatUnits(res.target, 18)))
	 setCampaignStartDate(new Date(Number(res.startTime) * 1000))
	 setCampaignEndDate(new Date(Number(res.endTime) * 1000))
	 setCampaignCategory(Number(res.categoryId._hex))
	 
	 const resBeneficiaryAddr = res['beneficiaryAddr'].map((e) => e)
	 const resBeneficiaryPercent = res['beneficiaryPercent'].map((e) => e._hex)
	 
	 let counter = 0
	 for (const addr of resBeneficiaryAddr) {
		counter += 1
		
		if(counter === 1){
			setCampaignBeneficiaryAddr_1(addr)
		} else if(counter === 2){
			setCampaignBeneficiaryAddr_2(addr)
		} else if(counter === 3){
			setCampaignBeneficiaryAddr_3(addr)
		} else if(counter === 4){
			setCampaignBeneficiaryAddr_4(addr)
		} else if(counter === 5){
			setCampaignBeneficiaryAddr_5(addr)
		} else if(counter === 6){
			setCampaignBeneficiaryAddr_6(addr)
		} else if(counter === 7){
			setCampaignBeneficiaryAddr_7(addr)
		} else if(counter === 8){
			setCampaignBeneficiaryAddr_8(addr)
		} else if(counter === 9){
			setCampaignBeneficiaryAddr_9(addr)
		} else if(counter === 10){
			setCampaignBeneficiaryAddr_10(addr)
		}
	  }
	  
	 counter = 0
	
	 for (const percent of resBeneficiaryPercent) {
		counter += 1
		
		if(counter === 1){
			setCampaignBeneficiaryPercent_1(Number(percent))
		} else if(counter === 2){
			setCampaignBeneficiaryPercent_2(Number(percent))
		} else if(counter === 3){
			setCampaignBeneficiaryPercent_3(Number(percent))
		} else if(counter === 4){
			setCampaignBeneficiaryPercent_4(Number(percent))
		} else if(counter === 5){
			setCampaignBeneficiaryPercent_5(Number(percent))
		} else if(counter === 6){
			setCampaignBeneficiaryPercent_6(Number(percent))
		} else if(counter === 7){
			setCampaignBeneficiaryPercent_7(Number(percent))
		} else if(counter === 8){
			setCampaignBeneficiaryPercent_8(Number(percent))
		} else if(counter === 9){
			setCampaignBeneficiaryPercent_9(Number(percent))
		} else if(counter === 10){
			setCampaignBeneficiaryPercent_10(Number(percent))
		}
	  }
	 
    }
	getProfile();
  }, []);
  
  // Debounce
  const name = String(useDebounce(campaignName, 300)[0]);
  const about = String(useDebounce(campaignAbout, 300)[0]);
  const logoUrl = String(useDebounce(campaignLogoUrl, 300)[0]);
  
  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'updateCampaign',
    args: [campaignId, name, about, logoUrl],
  })
  const { data: useContractWriteData, write } = useContractWrite(config)

  const { isLoading } = useWaitForTransaction({
    hash: useContractWriteData?.hash
  })
  
  const handleSubmit = (event: any) => {
    event.preventDefault();
	write?.()
  };
  
  const handleDelete = (event: any) => {
    event.preventDefault();
	deleteWrite?.()
  };

	if(useContractWriteData?.hash && !isLoading){
		toast({
			title: 'Campaign updated successfully.',
			description: "",
			status: 'success',
			position: 'bottom',
			duration: 2000,
			isClosable: true,
		});
		
		setItem("campaignId",String(campaignId)); 
		router.push('/account/campaigndetail');
	}
	
  // Delete Campaign
  const { config: deleteConfig } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'removeCampaign',
    args: [campaignId],
  })
  const { data: deleteWriteData, write: deleteWrite } = useContractWrite(deleteConfig)

  const { isLoading: deleteLoading} = useWaitForTransaction({
    hash: deleteWriteData?.hash
  })
  
  if(deleteWriteData?.hash && !deleteLoading && campaignStatus === "true"){
		
	setCampaignStatus("false")
	
	toast({
			title: 'Campaign deleted successfully.',
			description: "",
			status: 'success',
			position: 'bottom',
			duration: 2000,
			isClosable: true,
		});
		
	setItem("campaignId",String(campaignId)); 
	router.push('/account/campaigndetail');
	
	}

	
  return (
    <VStack w={'full'}>
		<div className='profile-heading'>
			<h3>Edit Campaign</h3>
		</div>
		{(useContractWriteData?.hash && !isLoading) && (
		  <div className='alert-message success'>
			You may view your transaction at <a target='_blank' href={`https://testnet.bscscan.com/tx/${useContractWriteData?.hash}`}><b>Binance Smart Chain</b>.</a>
		  </div>
		)}
		
		{(deleteWriteData?.hash && !deleteLoading) && (
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
					<select disabled className='form-control' id="campaignAbout" value={campaignCategory.toString()}>
					<option value="1">Animal Welfare</option>
					<option value="2">Art & Heritage</option>
					<option value="3">Children & Youth</option>
					<option value="4">Disability</option>
					<option value="5">Education</option>
					<option value="6">Elderly</option>
					<option value="7">Women & Girls</option>
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
						<input disabled className='form-control' name="campaignTarget" type="number" onChange={(e) => setCampaignTarget(e.target.value === "" ? 1 : parseInt(e.target.value))} value={campaignTarget} required /><br/>
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
						<DatePicker disabled className='form-control' selected={campaignStartDate} onChange={(date) => setCampaignStartDate(date)} /><br/>
					</div>
				</div>	
				<div className='w-50 p-2'>
					<div className='input-group'>							
						<label>Campaign End Date</label>
						<DatePicker disabled className='form-control' selected={campaignEndDate} onChange={(date) => setCampaignEndDate(date)} /><br/>
					</div>
				</div>		
			</div>
			<div className='row' style={{display: campaignBeneficiaryAddr_1 !== '0x0000000000000000000000000000000000000000' ? '' : 'none'}}>
				<div className='w-50 p-2'>
					<div className='input-group'>				
						<label>Campaign Beneficiary Address #1</label>
						<input disabled className='form-control' name="campaignBeneficiaryAddr_1" type="text" onChange={(e) => setCampaignBeneficiaryAddr_1(e.target.value)} value={campaignBeneficiaryAddr_1} required /><br/>
					</div>
				</div>	
				<div className='w-50 p-2'>
					<div className='input-group'>			
						<label>Campaign Beneficiary Percentage #1</label>
						<input disabled className='form-control' name="campaignBeneficiaryPercent_1" type="number" placeholder="" onChange={(e) => setCampaignBeneficiaryPercent_1(parseInt(e.target.value))} value={campaignBeneficiaryPercent_1} required /><br/>
					</div>
				</div>		
			</div>
			<div className='row' style={{display: campaignBeneficiaryAddr_2 !== '0x0000000000000000000000000000000000000000' ? '' : 'none'}}>
				<div className='w-50 p-2'>
					<div className='input-group'>
						<label>Campaign Beneficiary Address #2</label>
						<input disabled className='form-control' name="campaignBeneficiaryAddr_2" type="text" onChange={(e) => setCampaignBeneficiaryAddr_2(e.target.value)} value={campaignBeneficiaryAddr_2} required /><br/>
						
					</div>
				</div>	
				<div className='w-50 p-2'>
					<div className='input-group'>
						<label>Campaign Beneficiary Percentage #2</label>
						<input disabled className='form-control' name="campaignBeneficiaryPercent_2" type="number" placeholder="" onChange={(e) => setCampaignBeneficiaryPercent_2(parseInt(e.target.value))} value={campaignBeneficiaryPercent_2} required /><br/>						
					</div>
				</div>		
			</div>
			<div className='row' style={{display: campaignBeneficiaryAddr_3 !== '0x0000000000000000000000000000000000000000' ? '' : 'none'}}>
				<div className='w-50 p-2'>
					<div className='input-group'>	
						<label>Campaign Beneficiary Address #3</label>
						<input disabled className='form-control' name="campaignBeneficiaryAddr_3" type="text" onChange={(e) => setCampaignBeneficiaryAddr_3(e.target.value)} value={campaignBeneficiaryAddr_3} required /><br/>
						
					</div>
				</div>	
				<div className='w-50 p-2'>
					<div className='input-group'>	
						<label>Campaign Beneficiary Percentage #3</label>
						<input disabled className='form-control' name="campaignBeneficiaryPercent_3" type="number" placeholder="" onChange={(e) => setCampaignBeneficiaryPercent_3(parseInt(e.target.value))} value={campaignBeneficiaryPercent_3} required /><br/>
					</div>
				</div>		
			</div>
			<div className='row' style={{display: campaignBeneficiaryAddr_4 !== '0x0000000000000000000000000000000000000000' ? '' : 'none'}}>
				<div className='w-50 p-2'>
					<div className='input-group'>
						<label>Campaign Beneficiary Address #4</label>
						<input disabled className='form-control' name="campaignBeneficiaryAddr_4" type="text" onChange={(e) => setCampaignBeneficiaryAddr_4(e.target.value)} value={campaignBeneficiaryAddr_4} required /><br/>
					</div>
				</div>	
				<div className='w-50 p-2'>
					<div className='input-group'>	
						<label>Campaign Beneficiary Percentage #4</label>
						<input disabled className='form-control' name="campaignBeneficiaryPercent_4" type="number" placeholder="" onChange={(e) => setCampaignBeneficiaryPercent_4(parseInt(e.target.value))} value={campaignBeneficiaryPercent_4} required /><br/>
					</div>
				</div>		
			</div>
			<div className='row' style={{display: campaignBeneficiaryAddr_5 !== '0x0000000000000000000000000000000000000000' ? '' : 'none'}}>
				<div className='w-50 p-2'>
					<div className='input-group'>	
						<label>Campaign Beneficiary Address #5</label>
						<input disabled className='form-control' name="campaignBeneficiaryAddr_5" type="text" onChange={(e) => setCampaignBeneficiaryAddr_5(e.target.value)} value={campaignBeneficiaryAddr_5} required /><br/>	
					</div>
				</div>	
				<div className='w-50 p-2'>
					<div className='input-group'>	
						<label>Campaign Beneficiary Percentage #5</label>
						<input disabled className='form-control' name="campaignBeneficiaryPercent_5" type="number" placeholder="" onChange={(e) => setCampaignBeneficiaryPercent_5(parseInt(e.target.value))} value={campaignBeneficiaryPercent_5} required /><br/>
					</div>
				</div>		
			</div>
			<div className='row' style={{display: campaignBeneficiaryAddr_6 !== '0x0000000000000000000000000000000000000000' ? '' : 'none'}}>
				<div className='w-50 p-2'>
					<div className='input-group'>	
						<label>Campaign Beneficiary Address #6</label>
						<input disabled className='form-control' name="campaignBeneficiaryAddr_6" type="text" onChange={(e) => setCampaignBeneficiaryAddr_6(e.target.value)} value={campaignBeneficiaryAddr_6} required /><br/>
					</div>
				</div>	
				<div className='w-50 p-2'>
					<div className='input-group'>	
						<label>Campaign Beneficiary Percentage #6</label>
						<input disabled className='form-control' name="campaignBeneficiaryPercent_6" type="number" placeholder="" onChange={(e) => setCampaignBeneficiaryPercent_6(parseInt(e.target.value))} value={campaignBeneficiaryPercent_6} required /><br/>
					</div>
				</div>		
			</div>
			<div className='row' style={{display: campaignBeneficiaryAddr_7 !== '0x0000000000000000000000000000000000000000' ? '' : 'none'}}>
				<div className='w-50 p-2'>
					<div className='input-group'>	
						<label>Campaign Beneficiary Address #7</label>
						<input disabled className='form-control' name="campaignBeneficiaryAddr_7" type="text" onChange={(e) => setCampaignBeneficiaryAddr_7(e.target.value)} value={campaignBeneficiaryAddr_7} required /><br/>
					</div>
				</div>	
				<div className='w-50 p-2'>
					<div className='input-group'>	
						<label>Campaign Beneficiary Percentage #7</label>
						<input disabled className='form-control' name="campaignBeneficiaryPercent_7" type="number" placeholder="" onChange={(e) => setCampaignBeneficiaryPercent_7(parseInt(e.target.value))} value={campaignBeneficiaryPercent_7} required /><br/>
					</div>
				</div>		
			</div>
			<div className='row' style={{display: campaignBeneficiaryAddr_8 !== '0x0000000000000000000000000000000000000000' ? '' : 'none'}}>
				<div className='w-50 p-2'>
					<div className='input-group'>	
						<label>Campaign Beneficiary Address #8</label>
						<input disabled className='form-control' name="campaignBeneficiaryAddr_8" type="text" onChange={(e) => setCampaignBeneficiaryAddr_8(e.target.value)} value={campaignBeneficiaryAddr_8} required /><br/>
					</div>
				</div>	
				<div className='w-50 p-2'>
					<div className='input-group'>	
						<label>Campaign Beneficiary Percentage #8</label>
						<input disabled className='form-control' name="campaignBeneficiaryPercent_8" type="number" placeholder="" onChange={(e) => setCampaignBeneficiaryPercent_8(parseInt(e.target.value))} value={campaignBeneficiaryPercent_8} required /><br/>
					</div>
				</div>		
			</div>
			<div className='row' style={{display: campaignBeneficiaryAddr_9 !== '0x0000000000000000000000000000000000000000' ? '' : 'none'}}>
				<div className='w-50 p-2'>
					<div className='input-group'>	
						<label>Campaign Beneficiary Address #9</label>
						<input disabled className='form-control' name="campaignBeneficiaryAddr_9" type="text" onChange={(e) => setCampaignBeneficiaryAddr_9(e.target.value)} value={campaignBeneficiaryAddr_9} required /><br/>
					</div>
				</div>	
				<div className='w-50 p-2'>
					<div className='input-group'>	
						<label>Campaign Beneficiary Percentage #9</label>
						<input disabled className='form-control' name="campaignBeneficiaryPercent_9" type="number" placeholder="" onChange={(e) => setCampaignBeneficiaryPercent_9(parseInt(e.target.value))} value={campaignBeneficiaryPercent_9} required /><br/>
					</div>
				</div>		
			</div>
			<div className='row' style={{display: campaignBeneficiaryAddr_10 !== '0x0000000000000000000000000000000000000000' ? '' : 'none'}}>
				<div className='w-50 p-2'>
					<div className='input-group'>	
						<label>Campaign Beneficiary Address #10</label>
						<input disabled className='form-control' name="campaignBeneficiaryAddr_10" type="text" onChange={(e) => setCampaignBeneficiaryAddr_10(e.target.value)} value={campaignBeneficiaryAddr_10} required /><br/>
					</div>
				</div>	
				<div className='w-50 p-2'>
					<div className='input-group'>	
						<label>Campaign Beneficiary Percentage #10</label>
						<input disabled className='form-control' name="campaignBeneficiaryPercent_10" type="number" placeholder="" onChange={(e) => setCampaignBeneficiaryPercent_10(parseInt(e.target.value))} value={campaignBeneficiaryPercent_10} required /><br/>
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
						<label>Total Percentage</label>
						<input disabled className='form-control' name="total_percentage" type="number" value={campaignBeneficiaryPercent_1+campaignBeneficiaryPercent_2+campaignBeneficiaryPercent_3+campaignBeneficiaryPercent_4+campaignBeneficiaryPercent_5+campaignBeneficiaryPercent_6+campaignBeneficiaryPercent_7+campaignBeneficiaryPercent_8+campaignBeneficiaryPercent_9+campaignBeneficiaryPercent_10}/><br/>
					</div>
				</div>		
			</div>
			<div className='row'>
				<div className='w-50'>
					<button style={{display: campaignStatus === 'true' ? 'block' : 'none' }} className='btn-default' type="submit">{isLoading ? 'Updating...' : 'Update Campaign'}</button>
				</div>
				<div className='w-50'>
					<button style={{display: campaignStatus === 'true' ? 'block' : 'none' }} className='btn-default' onClick={handleDelete}>{deleteLoading ? 'Deleting...' : 'Delete Campaign'}</button>
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

export default Kelvin;
