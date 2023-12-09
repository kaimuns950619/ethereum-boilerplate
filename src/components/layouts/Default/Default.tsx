import { FC, ReactNode } from 'react';
import { Container } from '@chakra-ui/react';
import { Footer, Header } from 'components/modules';
import Head from 'next/head';

const Default: FC<{ children: ReactNode; pageName: string }> = ({ children, pageName }) => (
  <>
    <Head>
      <title>{`GHC | ${pageName}`}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
	<Header />
	<style jsx>{`
        body {
          background: #F1EEFF !important;
        }
        p {
          color: blue;
        }
      `}</style>
      <style jsx global>{`
		body {
          background: #F1EEFF !important;
		  color: #666 !important;
        }
        p {
		  color: #000 !important;
        }
		.css-x5qy7s {
		  position: relative;
		}
		.css-x5qy7s:before {
		  content: "";
		  position: absolute;
		  width: 100%;
		  height: 5px;
		  background: #696ABD;
		  left: 0;
		  bottom: -20px;
		}
		.css-x5qy7s a {
		  color: #696ABD;
		  padding:0 15px !important;
		}
		/*.css-1keldt4 {
		  color: #000 !important;
		}
		.css-1keldt4 a {
		  color: #000 !important;
		}
		.css-1keldt4 a:hover {
		  color: #222 !important;
		}*/
		.custom-container{
			width:1280px !important;
			max-width:none !important;
		}
		.logo{
			margin-right:15px;
		}
		.custom-navbar{
			position: relative;
		}
		.custom-navbar a {
		  color: #696ABD;
		  padding:0 15px !important;
		}
      `}</style>    
    <Container maxW="container.lg" p={3} as="main" minH="70vh" className='custom-container'>
      {children}
    </Container>
    <Footer />
  </>

);

export default Default;
