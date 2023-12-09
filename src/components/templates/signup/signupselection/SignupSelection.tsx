import { VStack } from '@chakra-ui/react';
import Image from 'next/image';
import useStorage from 'utils/useStorage';
const SignUpSelection = () => {
  const { getItem } = useStorage();
  return (
    <VStack w={'full'}>

	<div className='join-heading'>
		<h3>Join Our extraordinary community!</h3>
		<h4>Choose your account type and sign up now!</h4>
	</div>
	<div className='signup-grid'>
	{getItem("userSignIn") === 'donor' ? (
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
			<a href='/signup/singupdonor'><button className='btn-sign-up' id="myBtn">Sign Up</button></a>
		</div>
		</div>
		</div>
	) : getItem("userSignIn") === 'charity' ? (
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
			<a href='/signup/signupcharity'><button className='btn-sign-up' id="myBtn">Sign Up</button></a>
		</div>
		</div>
		</div>
	) : null}
	</div>
	<style jsx global>{`
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
	`}</style>
    </VStack>
  );
};

export default SignUpSelection;
