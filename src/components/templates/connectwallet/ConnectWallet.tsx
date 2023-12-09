import { VStack, useToast, Tooltip } from '@chakra-ui/react';
import Image from 'next/image';
import useStorage from 'utils/useStorage';
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';
import { useRouter } from 'next/router';
import { useAuthRequestChallengeEvm } from '@moralisweb3/next';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { signIn } from 'next-auth/react';

const ConnectWallet = () => {
  const { setItem } = useStorage();
  const router = useRouter();
  const { connectAsync } = useConnect({ connector: new InjectedConnector() });
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const toast = useToast();
  const { requestChallengeAsync } = useAuthRequestChallengeEvm();
  
  const handleAuth = async () => {
	setItem("userSignIn","donor"); 
    if (isConnected) {
      await disconnectAsync();
    }
    try {
      const { account, chain } = await connectAsync();

      const challenge = await requestChallengeAsync({ address: account, chainId: chain.id });

      if (!challenge) {
        throw new Error('No challenge received');
      }

      const signature = await signMessageAsync({ message: challenge.message });

      await signIn('moralis-auth', { message: challenge.message, signature, network: 'Evm', redirect: false });
	  router.push('/donatenow').then(() => router.reload());
    } catch (e) {
      toast({
        title: 'Oops, something went wrong...',
        description: (e as { message: string })?.message,
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    }
  };
  
  const handleAuth2 = async () => {
    setItem("userSignIn","charity"); 
    if (isConnected) {
      await disconnectAsync();
    }
    try {
      const { account, chain } = await connectAsync();

      const challenge = await requestChallengeAsync({ address: account, chainId: chain.id });

      if (!challenge) {
        throw new Error('No challenge received');
      }

      const signature = await signMessageAsync({ message: challenge.message });

      await signIn('moralis-auth', { message: challenge.message, signature, network: 'Evm', redirect: false });
	  router.push('/donatenow').then(() => router.reload());
    } catch (e) {
      toast({
        title: 'Oops, something went wrong...',
        description: (e as { message: string })?.message,
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    }
  };
	
  const tooltipsStr = "Getting Started is Simple: \n Let's get you set up with a wallet in just a few easy steps: \n 1. Click on the 'Create Now' button. \n 2. Follow the on-screen instructions to set up your wallet. \n 3. Safeguard your private key – it's your key to ownership!"
  
  tooltipsStr.replace(/\n/g, "<br />")
  
  return (
    <VStack w={'full'}>

	<div className='join-heading'>
		<h3>Join Our extraordinary community!</h3>
		<h4>Choose your account type and connect wallet to get start now!</h4>
	</div>
	<div className='signup-grid'>
		<div className='signup-card'>
		<div className='signup-card-body'>			
		<div className='signup-content'>
			<div className='signup-card-header individual'>
			Individual
			</div>
			<div className='icon-label'>
			<Image
			src={'/icon-donor-reverse.svg'}
			alt=""
			/>
			</div>
			<div className='signup-title'>			
			Donate, Fundraise and Volunteer
			</div>
			<p>With over 400 charities to choose from, you'll definitely find something close to your heart.</p>
			<button className='btn-sign-up' onClick={handleAuth} id="myBtn">Connect Wallet</button>
		</div>
		</div>
		</div>
		<div className='signup-card'>
		<div className='signup-card-body'>			
		<div className='signup-content'>
			<div className='signup-card-header registerd-charity'>
			Registered charity
			</div>
			<div className='icon-label'>
			<Image
			src={'/icon-charity-host-reverse.svg'}
			alt=""
			/>
			</div>
			<div className='signup-title'>			
			A One-Stop Giving Platform
			</div>
			<p>Whether you want to raise funds or recruit volunteers, you can easily manage all givers in one place.</p>
			<button className='btn-sign-up' onClick={handleAuth2} id="myBtn">Connect Wallet</button>
		</div>
		</div>
		</div>
		<div className='signup-card'>
		<div className='signup-card-body'>			
		<div className='signup-content'>
			<div className='signup-card-header wallet'>
			Don't Have Wallet?
			</div>
			<div className='icon-label'>
			<Image
			src={'/icon-wallet-reverse1.png'}
			alt=""
			/>
			</div>
			<div className='signup-title'>			
			Why Create a Wallet?
			</div>
			<p>To make your charitable contributions seamless and secure, we utilize blockchain technology. Creating a wallet ensures your donations are transparent, traceable, and empower impactful change.</p>
			<br/>
			<p><p className='blue-p'>Need Help</p><Tooltip label={tooltipsStr} aria-label='A tooltip'><Image style={{float:'left', width:'20px'}} src={'/icon-question.png'} alt=""/></Tooltip><a href='https://metamask.io/'  target='_blank'><button style={{width:'50%', float:'right'}} className='btn-sign-up' id="myBtn">Create Now</button></a></p>
			
		</div>
		</div>
		</div>
	</div>
	<style jsx global>{`
		.blue-p{
			margin-right:5px;
			float:left;
			color:#6597FF !important;
			
		}
		.join-heading{
			margin-bottom:40px;
			text-align:center;
		}
		.join-heading h3{
			font-size:2em;
			font-weight:bold;
			color:#7b64dd;
		}
		.join-heading h4{
			font-size:20px;
			font-weight:500;
			color:#7b64dd;
		}
		.signup-grid {
          display: flex;
		  width: 100%;
		  justify-content:center;
        }
		.signup-card {
		  width: 33.33%;
		  min-height: 320px;
		  padding: 10px;		  
		}
		.signup-card-body{
		  border: 1px solid #d3cff1;
		  border-radius: 10px;
		  background: #fff;
		  height:100%;
		}
		.signup-card-header{
			padding:10px 15px;
			text-transform:uppercase;
			font-size:20px;
			font-weight:bold;
			border-radius: 10px;
			border: 1px solid #ddd;
		}
		.signup-card-header.individual{
			background:#e1fffc;
		}
		.signup-card-header.registerd-charity{
			background:#ffe1ec;
		}
		.signup-card-header.wallet{
			color: white;
			background:#6597FF;
		}
		.signup-title{
		  font-weight: bold;
		  font-size: 16px;
		  margin-bottom:10px;
		}
		.signup-content{
			padding:15px;
			height:100%;
			display:flex;
			flex-direction:column;
		}
		.signup-content p{
			margin-bottom:10px;
			font-size:14px;
			line-height:normal;
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
		.icon-label{
			width:60px;
			height:60px;
			padding:15px;
			border-radius:50%;
			background:#7b64dd;
			display:block;
			margin:20px auto;
			margin-bottom:10px;
			transition:all ease .3s;
		}
		.icon-label img{
			height:auto !important;
			max-width:100% !important;
			transition:all ease .3s;			
		}
		.icon-label:hover img{
			transform:rotateY(180deg);
		}
		.modal {
		  display: none;
		  position: fixed;
		  z-index: 1;
		  padding-top: 100px;
		  left: 0;
		  top: 0;
		  width: 100%;
		  height: 100%;
		  overflow: auto;
		  background-color: rgb(0,0,0);
		  background-color: rgba(0,0,0,0.4);
		}
		.modal-content {
		  position: relative;
		  background-color: #fefefe;
		  margin: auto;
		  padding: 0;
		  border: 1px solid #888;
		  width: 80%;
		  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
		  -webkit-animation-name: animatetop;
		  -webkit-animation-duration: 0.4s;
		  animation-name: animatetop;
		  animation-duration: 0.4s
		}
		@-webkit-keyframes animatetop {
		  from {top:-300px; opacity:0} 
		  to {top:0; opacity:1}
		}
		@keyframes animatetop {
		  from {top:-300px; opacity:0}
		  to {top:0; opacity:1}
		}
		.close {
		  color: white;
		  float: right;
		  font-size: 28px;
		  font-weight: bold;
		}
		.close:hover,
		.close:focus {
		  color: #000;
		  text-decoration: none;
		  cursor: pointer;
		}
		.modal-header {
		  padding: 2px 16px;
		  background-color: #5cb85c;
		  color: white;
		}
		.modal-body {padding: 2px 16px;}
		.modal-footer {
		  padding: 2px 16px;
		  background-color: #5cb85c;
		  color: white;
		}
		.shadow {
		  box-shadow: 3px 3px 10px rgba(0,0,0,.15);
		}
        .btn-connect-donor-wallet {
          background: #e1fffc !important;
		  margin-right: 5px;
		  transition: all ease .3s;
        }
		.btn-connect-donor-wallet:hover {
		  background: #c4e9e6 !important;
		}
		.btn-connect-donor-wallet img {
		  margin-right: 5px;
		}
		.btn-connect-charity-wallet {
		  background: #ffe1ec !important;
		  margin-right: 5px;
		  transition: all ease .3s;
		}
		.btn-connect-charity-wallet:hover {
		  background: #ebbece !important;
		}
		.btn-connect-charity-wallet img {
		  margin-right: 5px;
		}
		.btn-signup {
		  background: #7b64dd !important;
		  margin-right: 5px;
		  color: #fff !important;
		}
	`}</style>
    </VStack>
  );
};

export default ConnectWallet;
