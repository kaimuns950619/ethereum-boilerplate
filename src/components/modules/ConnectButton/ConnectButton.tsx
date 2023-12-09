import { InjectedConnector } from 'wagmi/connectors/injected';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';
import { Button, Text, HStack, Avatar, useToast } from '@chakra-ui/react';
import { getEllipsisTxt } from 'utils/format';
import { useAuthRequestChallengeEvm } from '@moralisweb3/next';
import Image from 'next/image';
import {ConfirmToast} from 'react-confirm-toast';

import { contractAddress } from 'utils/global'
import { contractAbi } from 'utils/contractAbi'
import { readContract } from '@wagmi/core'
import Link from 'next/link';
import useStorage from 'utils/useStorage';
import { useState } from 'react'
import { useRouter } from 'next/router';
const ConnectButton = () => {
  const router = useRouter();
  const { connectAsync } = useConnect({ connector: new InjectedConnector() });
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const toast = useToast();
  const { data } = useSession();
  const { requestChallengeAsync } = useAuthRequestChallengeEvm();
  const { setItem, getItem } = useStorage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  
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

  const handleDisconnect = async () => {
	setItem("charityStatus", "");
	setItem("donorStatus", "");
	setItem("userAddress", "");
	setItem("userSignIn", ""); 
    await disconnectAsync();
    signOut({ callbackUrl: '/' });
  };
  
  async function getDonorProfile() {
    const res = await readContract({
     address: contractAddress,
     abi: contractAbi,
     functionName: 'getDonorProfile',
     args: [data?.user.address],
    })
	setItem("donorStatus", res['status'].toString());
	setItem("charityStatus", '');
	setEmail(res['email']);
	setName(res['name']);
	setGender(res['gender'])
   }
   
   async function getCharityProfile() {
    const res = await readContract({
     address: contractAddress,
     abi: contractAbi,
     functionName: 'getCharityProfile',
     args: [data?.user.address],
    })
	setItem("charityStatus", res['status'].toString());
	setItem("donorStatus", '');
	setEmail(res['email']);
	setName(res['name']);
   }
   
  if( data?.user.address ){
	setItem("userAddress", data?.user.address); 
	if( getItem("userSignIn") === 'donor' ){
		getDonorProfile()
	}
	
	if( getItem("userSignIn") === 'charity' ){
		getCharityProfile()
	}
	
	if( (getItem("donorStatus") === 'false' || !getItem("donorStatus")) && getItem("userSignIn") === 'donor' ){
	
		return (
		
		  <div style={{ display: 'flex', alignItems: 'center' }}>
			<Link href="/signup/signupdonor">
			<HStack cursor={'pointer'} style={{ marginRight: '10px', backgroundColor: '#d3cff1', padding: '10px', borderRadius: '10px' }} >
			
				{gender === 'Female' ? (
					<Image style={{ width:'30px'}} src={'/female.png'} alt=""/>
				) : gender === 'Male' ? (
					<Image style={{ width:'30px'}} src={'/male.png'} alt=""/>
				) : (
					<Avatar size="xs" style={{ width: '30px', height: '30px' }} />
				)}
				
				<div>
				<Text fontWeight="medium" style={{ fontSize: '14px' , display: name ? 'block' : 'none'}}>{name}</Text>
				<Text fontWeight="medium" style={{ fontSize: '12px', display: email ? 'block' : 'none' }}>{email}</Text>
				</div>
			</HStack>
			</Link>
			<ConfirmToast
				asModal={true}
				childrenClassName='margin-top-10'
				customCancel='Reject'
				customConfirm='Confirm'
				customFunction={handleDisconnect}
				message='Do you confirm to Disconnect Wallet?'
				showCloseIcon={false}
				theme='lilac'
			>
				<button>
					<div style={{ padding: '10px', backgroundColor: '#c4b9ef', marginRight: '10px', borderRadius: '10px' }}>
					<Text fontWeight="medium" style={{ fontSize: '14px', textAlign: 'center' }}>Connected</Text>
					<Text fontWeight="medium" style={{ fontSize: '12px' }}>{getEllipsisTxt(data.user.address)}</Text>
					</div>
				</button>
			</ConfirmToast>
			<a href="/signup/signupdonor">
			<Button size="sm" colorScheme="blue" className="btn-signup shadow">
			  Sign Up
			</Button>
			</a>
			<style jsx global>{`
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
			</div>
		  
		);
	}

	if( (getItem("charityStatus") === 'false' || !getItem("charityStatus")) && getItem("userSignIn") === 'charity' ){
		return (
		  <div style={{ display: 'flex', alignItems: 'center' }}>
			<Link href="/signup/signupcharity">
			<HStack cursor={'pointer'} style={{ marginRight: '10px', backgroundColor: '#d3cff1', padding: '10px', borderRadius: '10px' }} >
				<Avatar size="xs" style={{ width: '30px', height: '30px' }} />
				<div>
				<Text fontWeight="medium" style={{ fontSize: '14px' , display: name ? 'block' : 'none'}}>{name}</Text>
				<Text fontWeight="medium" style={{ fontSize: '12px', display: email ? 'block' : 'none' }}>{email}</Text>
				</div>
			</HStack>
			</Link>
			<ConfirmToast
				asModal={true}
				childrenClassName='margin-top-10'
				customCancel='Reject'
				customConfirm='Confirm'
				customFunction={handleDisconnect}
				message='Do you confirm to Disconnect Wallet?'
				showCloseIcon={false}
				theme='lilac'
			>
				<button>
					<div style={{ padding: '10px', backgroundColor: '#c4b9ef', marginRight: '10px', borderRadius: '10px' }}>
					<Text fontWeight="medium" style={{ fontSize: '14px', textAlign: 'center' }}>Connected</Text>
					<Text fontWeight="medium" style={{ fontSize: '12px' }}>{getEllipsisTxt(data.user.address)}</Text>
					</div>
				</button>
			</ConfirmToast>
			<a href="/signup/signupcharity">
			<Button size="sm" colorScheme="blue" className="btn-signup shadow">
			  Sign Up
			</Button>
			</a>
			<style jsx global>{`
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
			</div>
		  
		);
	}
	
	return (
	  <div style={{ display: 'flex', alignItems: 'center' }}>
		{getItem("userSignIn") === 'charity' ? (
			<Link href="/account/profile">
				<HStack cursor={'pointer'} style={{ marginRight: '10px', backgroundColor: '#d3cff1', padding: '10px', borderRadius: '10px' }} >
				<Avatar size="xs" style={{ width: '30px', height: '30px' }} />
				<div>
				<Text fontWeight="medium" style={{ fontSize: '14px' , display: name ? 'block' : 'none'}}>{name}</Text>
				<Text fontWeight="medium" style={{ fontSize: '12px', display: email ? 'block' : 'none' }}>{email}</Text>
				</div>
			</HStack>
			</Link>
		) : getItem("userSignIn") === 'donor' ? (
			<Link href="/account/donorprofile">
				<HStack cursor={'pointer'} style={{ marginRight: '10px', backgroundColor: '#d3cff1', padding: '10px', borderRadius: '10px' }} >
				{gender === 'Female' ? (
					<Image style={{ width:'30px'}} src={'/female.png'} alt=""/>
				) : gender === 'Male' ? (
					<Image style={{ width:'30px'}} src={'/male.png'} alt=""/>
				) : (
					<Avatar size="xs" style={{ width: '30px', height: '30px' }} />
				)}
				<div>
				<Text fontWeight="medium" style={{ fontSize: '14px' , display: name ? 'block' : 'none'}}>{name}</Text>
				<Text fontWeight="medium" style={{ fontSize: '12px', display: email ? 'block' : 'none' }}>{email}</Text>
				</div>
			</HStack>
			</Link>
		) : (
			<Link href="/account/profile">
				<HStack cursor={'pointer'} style={{ marginRight: '10px', backgroundColor: '#d3cff1', padding: '10px', borderRadius: '10px' }} >
				<Avatar size="xs" style={{ width: '30px', height: '30px' }} />
				<div>
				<Text fontWeight="medium" style={{ fontSize: '14px' , display: name ? 'block' : 'none'}}>{name}</Text>
				<Text fontWeight="medium" style={{ fontSize: '12px', display: email ? 'block' : 'none' }}>{email}</Text>
				</div>
			</HStack>
			</Link>
		)}
		<ConfirmToast
			asModal={true}
			childrenClassName='margin-top-10'
			customCancel='Reject'
			customConfirm='Confirm'
			customFunction={handleDisconnect}
			message='Do you confirm to Disconnect Wallet?'
			showCloseIcon={false}
			theme='lilac'
		>
			<button>
				<div style={{ padding: '10px', backgroundColor: '#c4b9ef', marginRight: '10px', borderRadius: '10px' }}>
				<Text fontWeight="medium" style={{ fontSize: '14px', textAlign: 'center' }}>Connected</Text>
				<Text fontWeight="medium" style={{ fontSize: '12px' }}>{getEllipsisTxt(data.user.address)}</Text>
				</div>
			</button>
		</ConfirmToast>
		<style jsx global>{`
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
		</div>
      
    );
  }

  return (
	<div>
	<a href='/connectwallet'>
	<Button size="sm" colorScheme="blue" className="btn-connect-donor-wallet shadow">
	<Image
    src={ '/icon-wallet.svg'}
    height={16}
    width={16}
    alt=""
    /> 
	Connect Wallet
    </Button>
	</a>
	<div style={{display:'none'}}>
		<Button size="sm" onClick={handleAuth} colorScheme="blue" className="btn-connect-donor-wallet shadow">
		<Image
		src={ '/icon-donor.svg'}
		height={16}
		width={16}
		alt=""
		/> 
		Donor Wallet
		</Button>
		<Button size="sm" onClick={handleAuth2} colorScheme="blue" className="btn-connect-charity-wallet shadow">
		<Image
		src={ '/icon-charity-host.svg'}
		height={16}
		width={16}
		alt=""
		/>
		  Charity Wallet
		</Button>
	</div>
	<style jsx global>{`
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
	</div>
  );
};

export default ConnectButton;
