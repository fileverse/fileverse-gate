const { ethers } = require('ethers');
const { EthersAdapter } = require('@safe-global/protocol-kit');
const { networkFromChainId } = require('../../contract/erc1155Contract');
const { getNetworkUrl } = require('../../contract/provider');
const SafeApiKit = require('@safe-global/api-kit');

async function isSafeAddress({ address, chainId }) {
  const network = networkFromChainId(chainId);
  const networkUrl = getNetworkUrl(network);
  const web3Provider = new ethers.providers.JsonRpcBatchProvider(networkUrl);
  const provider = new ethers.providers.Web3Provider(web3Provider);
  const safeOwner = provider.getSigner(0);
  const ethAdapter = new EthersAdapter({
    ethers,
    signerOrProvider: safeOwner,
  });
  const safeApiKit = new SafeApiKit({
    txServiceUrl: 'https://safe-transaction-mainnet.safe.global',
    ethAdapter,
  });

  const safeAccountInfo = safeApiKit.getSafeInfo(address);
  if (safeAccountInfo) return true;
  return false;
}

module.exports = isSafeAddress;
