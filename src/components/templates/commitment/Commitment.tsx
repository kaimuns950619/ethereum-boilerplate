import { Text, VStack, Grid, GridItem, Flex, Image} from '@chakra-ui/react';

const Commitment = () => {

  return (
    <VStack w={'full'}>
	<Grid
		w='100%'
		templateRows='repeat(1, 1fr)'
		templateColumns='repeat(5, 1fr)'
		gap={4}
		className='section-wrapper'
	>
	  <GridItem colSpan={3}>
		<Flex h='100%' alignItems='start' justifyContent='center' flexDirection='column'>
			<Text fontSize='3xl' fontWeight='bold' className='color-theme' marginBottom='35px'>Commitment</Text>
			<Text fontSize='2xl' fontWeight='bold' className='color-theme'>Collaborate</Text>
			<Text marginBottom='25px'>We build meaningful and robust partnerships with leading global humanitarian institutions so we can work to tackle the most pressing needs of vulnerable people.</Text>
			<Text fontSize='2xl' fontWeight='bold' className='color-theme'>Innovate</Text>
			<Text marginBottom='25px'>We rethink how technology could be used in both times of emergency and to improve lives longer-term. This includes innovative solutions like providing fast, borderless financial assistance and infrastructure so displaced people can directly receive funds anywhere, anytime.</Text>
			<Text fontSize='2xl' fontWeight='bold' className='color-theme'>Act</Text>
			<Text marginBottom='25px'>We mobilize the crypto local communities to help deliver basic human needs such as food, medical supplies, shelter and clean water.</Text>
		</Flex>
	  </GridItem>
	  <GridItem colSpan={2}>
		<Flex h='100%' alignItems='center'>
			<Image src={'/icon-commitment.png'} alt='Company Logo' boxSize='65%' m='auto' height='auto' />
		</Flex>
	  </GridItem>
	</Grid>
	<style jsx global>{`
		::placeholder {
		  opacity: 0.5;
		}
		.dark-text{
			color:#46339b;
		}
		.color-theme{
			color:#7b64dd !important;
		}
		.custom-input-group{
			border:1px solid #d3cff1 !important;	
			border-radius:10px;
		}
		input.custom-input::placeholder{
			color:#000 !important;
		}
		.button-search{
			z-index:99;
			background:#7b64dd !important;
			color:#fff;
			padding:5px 10px;
			position:absolute !important;
			right:0;
			top:0;
			height:100% !important;
			border-radius:0 0.375rem 0.375rem 0 !important;
		}
		.main-banner-box{
			position:relative;
			overflow:hidden;
			max-height:360px;
			width:100%;
			display:flex;
			justify-content:center;
			align-items:center;
		}
		.campaign-grid {
          display: flex;
		  flex-wrap: wrap;
		  width: 100%;
        }
		.campaign-card {
		  width: 33.33%;
		  min-height: 320px;
		  padding: 10px;		  
		}
		.campaign-card-body{
		  border: 1px solid #d3cff1;
		  border-radius: 10px;
		  background: #fff;
		  height:100%;
		  display: flex;
		  flex-direction: column;
		}
		.campaign-title{
		  font-weight: bold;
		  font-size: 22px;
		  line-height:24px;
		  margin-bottom:15px;
		  color:#7b64dd;
		}
		.campaign-cover{
			height:125px;
			background:#efefef;
			border-radius:10px 10px 0 0;
			display:flex;
			align-items:center;
			justify-content:center;
			overflow:hidden;
			position:relative;
		}
		.campaign-cover img{
			max-width:110%;
			transition:all ease .3s;
		}
		.campaign-cover:hover img{
			transform:scale(1.2);
		}
		.campaign-content{
			padding:15px;
			display:flex;
			flex-direction:column;
		}
		.card-bottom{
			margin-top:auto;
			padding:0 15px 15px;
		}
		.campaign-content p{
			margin-bottom:10px;
			font-size:14px;
			line-height:normal;
		}
		.btn-donate-now{
			width:100%;
			padding:6px;
			margin-bottom:5px;
			background:#7b64dd!important;
			color:#fff;
			border-radius:10px;
			display:flex;
			align-items:center;
			justify-content:center;
		}
		.btn-learn-more{
			width:100%;
			padding:6px;
			margin-bottom:5px;
			border-radius:10px;
			border:2px solid #7b64dd;
			color:#7b64dd;
			display:block;
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
		}
		.icon-donate-now{
			width:auto !important;
			height:16px !important;
			max-width:none !important;
			margin-right:5px;
		}
		.how-to-start{
			margin:30px 0 !important;
		}
		.number-label{
			display:inline-block;
			padding:3px 10px;
			background:#7b64dd;
			color: #fff;
		}
		.learn-more-about-us{
			margin:30px 0 !important;
		}
		.learn-more-link{
			transition:all ease .3s;
		}
		.learn-more-link:hover{
			box-shadow:0 0 15px rgba(0,0,0,.15);
		}
		.section-wrapper{
			margin:30px 0 !important;
		}
		.leadership-avatar{
			width:250px;
			height:250px;
			background:#C4B5FF;
			border-radius:50%;
			border:1px solid #C4B5FF;
			overflow:hidden;
			display:flex;
			align-items:center;
			justify-content:center;
		}
		.leadership-avatar img{
			width:260;
			height:auto;
		}
		.position-absolute{
			position:absolute;
			left:0;
			right:0;
			top:0;
			bottom:0;
			transition:all ease .3s;
		}
		.animated-float{
			transition:all ease .3s;
			animation-name: floating;
			animation-duration: 4s;
			animation-iteration-count: infinite;
		}
		@keyframes floating{
			0%{bottom:0;}
			25%{bottom:-10px;}
			50%{bottom:0px;}
			75%{bottom:-10px;}
			100%{bottom:0px;}
		}
	`}</style>
      
    </VStack>
  );
};

export default Commitment;
