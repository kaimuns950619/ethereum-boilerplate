import axios from 'axios';
import { contractAddress, chainId, BSC_NODE_URL } from 'utils/global'
import { contractAbi } from 'utils/contractAbi'
import {  ethers } from 'ethers';


async function call({ functionName, args }: { functionName: string; args: any[]; }) {
  const contract = new ethers.Contract(contractAddress, contractAbi, ethers.getDefaultProvider());
  const encodedData = contract.interface.encodeFunctionData(functionName, args);

  try {
	const response = await axios.post(BSC_NODE_URL, {
	  jsonrpc: '2.0',
	  id: chainId,
	  method: 'eth_call',
	  params: [
		{
		  to: contractAddress,
		  data: encodedData,
		},
		'latest',
	  ],
	});
	console.log('here : ', response);
    return response;
  } catch (error) {
    console.error('Error reading contract:', error);
    throw error;
  }
}

export { call };