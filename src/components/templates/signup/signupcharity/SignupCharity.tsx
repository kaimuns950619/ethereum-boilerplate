import { VStack, useToast } from '@chakra-ui/react';
import { useAccount, usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'
import { useEffect, useState } from 'react'
import { readContract } from '@wagmi/core'
import { contractAbi as charityAbi } from 'utils/contractAbi'
import { useDebounce } from 'use-debounce'
import { contractAddress } from 'utils/global'
import useStorage from 'utils/useStorage';
import { useRouter } from 'next/router';

const SignupCharity = () => {
  const router = useRouter();
  const { getItem } = useStorage();
  const toast = useToast();
  const { address } = useAccount()
  const connectedAccount: `0x${string}` = address || '0x0000000000000000000000000000000000000000';
  const [showSignupBtn, setShowSignupBtn] = useState(1);
  
  const [charityName, setCharityName] = useState("");
  const [charityEmail, setCharityEmail] = useState("");
  const [charityPhone, setCharityPhone] = useState("");
  const [charityAbout, setCharityAbout] = useState("");
  
  if( getItem("userSignIn") !== 'charity' || !getItem("userAddress") ){
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
        functionName: 'allCharities',
        args: [connectedAccount],
      })

	  if(res.status === true){
		setShowSignupBtn(0)
	  }
    }
	checkSignupStatus();
  }, []);

  const name = String(useDebounce(charityName, 300)[0]);
  const email = String(useDebounce(charityEmail, 300)[0]);
  const phone = String(useDebounce(charityPhone, 300)[0]);
  const about = String(useDebounce(charityAbout, 300)[0]);

  // Signup
  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: charityAbi,
    functionName: 'registerCharity',
    args: [name, email, phone, about],
  })
  const { data: useContractWriteData, write } = useContractWrite(config)

  const { isLoading } = useWaitForTransaction({
    hash: useContractWriteData?.hash
  })
  
  const handleSubmit = (event: any) => {
	
	event.preventDefault();
	
	let error_msg = ""
	
	if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(charityEmail) && charityEmail !== '') {
		error_msg += "Invalid Email format. "
	  } 
	  
	if(!/^(\+?6?01)[02-46-9]-*[0-9]{7}$|^(\+?6?01)[1]-*[0-9]{8}$/.test(charityPhone) && charityPhone !== '') {
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
		
		router.push('/account/profile');
	}
 
  return (
	<VStack w={'full'}>
	<div className='profile-heading'>
		<h3>Sign Up Charity</h3>
	</div>
	{(useContractWriteData?.hash && !isLoading) && (
	  <div className='alert-message success'>
		You may view your transaction at <a target='_blank' href={`https://testnet.bscscan.com/tx/${useContractWriteData?.hash}`}>Binance Smart Chain</a>
	  </div>
	)}
	{(!showSignupBtn) && (
	  <div className='alert-message danger'>
		Error: You already registered as a Charity.
	  </div>
	)}
	<div className='tabbed-content'>
	<form onSubmit={handleSubmit}>
		<div className='row'>
			<div className='w-50 p-2'>
				<div className='input-group'>
					<label>Charity Name</label>
					<input className='form-control' value = {charityName} onChange={(e) => setCharityName(e.target.value)} type="text" required/>
				</div>
			</div>	
			<div className='w-50 p-2'>
				<div className='input-group'>		
					<label>Charity Email</label>
					<input className='form-control' value = {charityEmail} onChange={(e) => setCharityEmail(e.target.value)} type="text" required/>
				</div>
			</div>		
		</div>
		<div className='row'>
			<div className='w-50 p-2'>
				<div className='input-group'>
					<label>Charity Phone No.</label>
					<input className='form-control' value = {charityPhone} onChange={(e) => setCharityPhone(e.target.value)} type="text" required/>
				</div>
			</div>	
			<div className='w-50 p-2'>
				<div className='input-group'>		
					<label>About Charity</label>
					<input className='form-control' value = {charityAbout} onChange={(e) => setCharityAbout(e.target.value)} type="text" required/>
				</div>
			</div>	
		</div>
		<div className='row'>
			<div className='w-50'>
				<button className='btn-default' style={{display: showSignupBtn ? 'block' : 'none' }} type="submit">{isLoading ? 'Signing Up...' : 'Sign Up'}</button>
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

export default SignupCharity;
