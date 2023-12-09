import { Container, Text, Box, VStack, Grid, GridItem, Card, CardBody, Heading, Flex, Image} from '@chakra-ui/react';

const Approach = () => {

  return (
    <VStack w={'full'}>
	<br/>
	<Grid
		w='100%'
		templateRows='repeat(1, 1fr)'
		templateColumns='repeat(5, 1fr)'
		gap={4}
		className='section-wrapper'
	>
	  <GridItem colSpan={3}>
		<Flex h='100%' alignItems='start' justifyContent='center' flexDirection='column'>
			<Text fontSize='3xl' fontWeight='bold' className='color-theme' marginBottom='35px'>Benefits of Direct Crypto Giving</Text>
			<Text marginBottom='25px'>Crypto has long been able to reach places the traditional financial system cannot, serving those who can’t access typical banking methods.There are more people with mobile devices than bank accounts, which means we can relook at how we build financial infrastructure. Crypto giving is faster, less costly, and more transparent than other methods, and importantly, people don’t need bank accounts, just access to digital wallets.</Text>			
		</Flex>
	  </GridItem>
	  <GridItem colSpan={2}>
		<Flex h='100%' alignItems='center'>
			<Box h='100%' w='100%' position='relative'>
				<Image src={'/approach-img.png'} alt='Company Logo' boxSize='80%' m='auto' height='auto' className='animated-float position-absolute' />
			</Box>
		</Flex>
	  </GridItem>
	</Grid>
	
	<Box w='100%' my='30px' className='how-it-work'>
		<Container textAlign={'center'} mb={10}><Text as='b' fontSize='3xl' color='#7b64dd'>How It Works</Text></Container>
		<Grid w={'full'} templateColumns='repeat(3, 1fr)' gap={6}>
		  <GridItem w='100%'>
			<Card bg='#fff' h='100%'>
			  <CardBody textAlign='center'>
				<Heading as='h4' size='md' color='#b2bb1e' mb='10px'>Charities</Heading>
				<Text color='#000' fontSize={14}>
                <b>Champion Your Cause with GHC:</b><br/>
				Charities play a pivotal role as the driving force behind meaningful campaigns. Create and manage your initiatives on GHC, connect with a global audience, and witness the direct impact of your cause. Leverage our blockchain-powered platform for transparent fundraising and build lasting connections with donors who share your passion.
              </Text>
			  </CardBody>
			</Card>
		  </GridItem>
		  <GridItem w='100%'>
			<Card bg='#fff'>
			  <CardBody textAlign='center'>
				<Heading as='h4' size='md' color='#f08b1d' mb='10px'>Donors</Heading>
				<Text color='#000' fontSize={14}>                
                <b>Empower Positive Change with GHC:</b><br/>
				As a donor on GHC , you are the catalyst for positive change. Discover a diverse range of causes, contribute effortlessly, and track your impact in real-time. Your support directly fuels the success of charitable initiatives, and our blockchain technology ensures transparency, allowing you to see exactly how your contributions make a difference.       
              </Text>
			  </CardBody>
			</Card>
		  </GridItem>
		  <GridItem w='100%'>
			<Card bg='#fff'>
			  <CardBody textAlign='center'>
				<Heading as='h4' size='md' color='#80a1b6' mb='10px'>Blockchain</Heading>
				<Text color='#000' fontSize={14}>                
                <b>Ensuring Trust and Transparency with GHC:</b><br/>
				Blockchain is the backbone of GHC, providing a secure and transparent foundation for all transactions. Every donation is securely recorded on the blockchain, creating an immutable ledger that donors and charities can trust. This innovative technology ensures the highest level of security, transparency, and accountability, fostering an environment of trust and collaboration.
              </Text>
			  </CardBody>
			</Card>
		  </GridItem>
		</Grid>
	</Box>
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

export default Approach;
