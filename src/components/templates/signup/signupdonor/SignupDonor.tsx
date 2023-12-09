import { VStack, useToast, Tooltip } from '@chakra-ui/react';
import { useAccount, usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'
import React, { useEffect, useState } from 'react'
import { readContract } from '@wagmi/core'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { contractAbi as charityAbi } from 'utils/contractAbi'
import { contractAddress } from 'utils/global'
import { useDebounce } from 'use-debounce'
import useStorage from 'utils/useStorage';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';

const SignupDonor = () => {
  const router = useRouter();
  const { getItem } = useStorage();
  const toast = useToast();
  const { address } = useAccount()
  const connectedAccount: `0x${string}` = address || '0x0000000000000000000000000000000000000000';
  const [showSignupBtn, setShowSignupBtn] = useState(0);
  
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [donorGender, setDonorGender] = useState("");
  const [donorBirthday, setDonorBirthday] = useState<Date | null>(new Date());
  const [showBirthday, setShowBirthday] = useState("false");
  
	if( getItem("userSignIn") !== 'donor' || !getItem("userAddress") ){
		useEffect(() => {
		  // Redirect to home page after component mounts
		  router.push('/');
		}, []);

		return null;
	}
  
  /*READ CONTRACT*/
  useEffect(() => {
    async function checkSignupStatus() {
      const res = await readContract({
        address: contractAddress,
        abi: charityAbi,
        functionName: 'allDonors',
        args: [connectedAccount],
      })

	  if(res.status === false){
		setShowSignupBtn(1)
	  }
    }
	checkSignupStatus();
  }, []);

  const name = String(useDebounce(donorName, 300)[0]);
  const email = String(useDebounce(donorEmail, 300)[0]);
  const phone = String(useDebounce(donorPhone, 300)[0]);
  const gender = String(useDebounce(donorGender, 300)[0]);
  
  let birthday = ethers.BigNumber.from(0);
  
  const startDay = useDebounce(donorBirthday, 300)[0]?.getDate();
  let startMonth = useDebounce(donorBirthday, 300)[0]?.getMonth();
  startMonth = startMonth ? startMonth + 1 : 1;
  const startYear = useDebounce(donorBirthday, 300)[0]?.getFullYear();
  const f_birthday = new Date(`${startYear}-${startMonth}-${startDay}`);
	
  if(showBirthday === 'true'){
	birthday = ethers.BigNumber.from(f_birthday.getTime() / 1000);
  }
  
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDonorGender(e.target.value);
  };
  
  const handleSelectChange2 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setShowBirthday(e.target.value);
  };

  // Signup
  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: charityAbi,
    functionName: 'registerDonor',
    args: [name, email, phone, gender, birthday],
  })
  const { data: useContractWriteData, write } = useContractWrite(config)

  const { isLoading } = useWaitForTransaction({
    hash: useContractWriteData?.hash
  })
  
  const handleSubmit = (event: any) => {
	
	event.preventDefault();
	
	let error_msg = ""
	
	if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(donorEmail) && donorEmail !== '') {
		error_msg += "Invalid Email format. "
	  } 
	  
	if(!/^(\+?6?01)[02-46-9]-*[0-9]{7}$|^(\+?6?01)[1]-*[0-9]{8}$/.test(donorPhone) && donorPhone !== '') {
		error_msg += "Invalid Phone No."
	  }
 
	if(error_msg){
		 toast({
			title: error_msg,
			description: "",
			status: 'error',
			position: 'bottom',
			duration: 2000,
			isClosable: true,
		});
	} else {
		write?.()
	}
  };
 
  if(useContractWriteData?.hash && !isLoading){
		toast({
			title: 'Donor signed up created successfully.',
			description: "",
			status: 'success',
			position: 'bottom',
			duration: 2000,
			isClosable: true,
		});
		
		router.push('/account/donorprofile');
	}
 
  return (
	<VStack w={'full'}>
	<div className='profile-heading'>
		<h3>Sign Up Donor</h3>
	</div>
	{(useContractWriteData?.hash && !isLoading) && (
	  <div className='alert-message success'>
		You may view your transaction at <a target='_blank' href={`https://testnet.bscscan.com/tx/${useContractWriteData?.hash}`}>Binance Smart Chain</a>
	  </div>
	)}
	{(!showSignupBtn) && (
	  <div className='alert-message danger'>
		Error: You already registered as a Donor.
	  </div>
	)}
	<div className='tabbed-content'>
	<form onSubmit={handleSubmit}>
		<div className='row'>
			<div className='w-50 p-2'>
				<div className='input-group'>
					<label>Donor Name (Optional)</label>
					<input className='form-control' value = {donorName} onChange={(e) => setDonorName(e.target.value)} type="text" />
				</div>
			</div>	
			<div className='w-50 p-2'>
				<div className='input-group'>		
					<label>Donor Email (Optional)</label>
					<input pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" className='form-control' value = {donorEmail} onChange={(e) => setDonorEmail(e.target.value)} type="text" />
				</div>
			</div>		
		</div>
		<div className='row'>
			<div className='w-50 p-2'>
				<div className='input-group'>
					<label>Donor Phone No. (Optional)</label>
					<input className='form-control' value = {donorPhone} onChange={(e) => setDonorPhone(e.target.value)} type="text" />
				</div>
			</div>	
			<div className='w-50 p-2'>
				<div className='input-group'>
				<label>Donor Gender (Optional)</label>
				<select className='form-control' id="donorGender" onChange={handleSelectChange} value={donorGender}>
				<option value="" onClick={() => setDonorGender('')}>Not To Tell</option>
				<option value="Male" onClick={() => setDonorGender('Male')}>Male</option>
				<option value="Female" onClick={() => setDonorGender('Female')}>Female</option>
				</select>
				</div>
			</div>	
		</div>
		<div className='row'>
			<div className='w-50 p-2'>
				<div className='input-group'>
				<label>Show Birthday?</label>
				<select className='form-control' id="showBirthday" onChange={handleSelectChange2} value={showBirthday}>
				<option value="false" onClick={() => setShowBirthday('false')}>No</option>
				<option value="true" onClick={() => setShowBirthday('true')}>Yes</option>
				</select>
				</div>
			</div>	
			<div className='w-50 p-2' style={{ display: showBirthday === 'true' ? 'block' : 'none' }} >
				<div className='input-group'>				
					<label>Donor Birthday (Optional)</label>
					<DatePicker className='form-control' selected={donorBirthday} onChange={(date) => setDonorBirthday(date)} /><br/>
				</div>
			</div>	
		</div>
		<div className='row'>
			<div className='w-50'>
				<Tooltip label="Stay Anonymous: Click 'Sign Up' without filling out." placement='right' isOpen>
				  <button className='btn-default' style={{display: showSignupBtn ? 'block' : 'none' }} type="submit">{isLoading ? 'Signing Up...' : 'Sign Up'}</button>
				</Tooltip>
			
				
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

export default SignupDonor;
